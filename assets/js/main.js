(function() {
	function slugify(text) {
		var base = text.trim().toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9_\-\u0400-\u04FF]/g, '')
			.replace(/-+/g, '-');
		return base || '';
	}

	/* ──────────────────────────────────────────────
	   Classic TOC for non-paginated essays (h2/h3)
	   ────────────────────────────────────────────── */
	function buildClassicToc(essayBody, toc, tocList) {
		var headings = Array.from(essayBody.querySelectorAll('h2, h3'));
		if (headings.length === 0) {
			toc.style.display = 'none';
			return;
		}

		var currentLevel = 2;
		var stack = [tocList];

		headings.forEach(function(h, index) {
			var level = parseInt(h.tagName.substring(1), 10);
			if (!h.id) {
				var id = slugify(h.textContent);
				if (!id) id = 'h-' + index;
				var uniqueId = id;
				var counter = 1;
				while (document.getElementById(uniqueId)) {
					uniqueId = id + '-' + counter++;
				}
				h.id = uniqueId;
			}

			while (level > currentLevel) {
				var lastLi = stack[stack.length - 1].lastElementChild;
				var newOl = document.createElement('ol');
				if (lastLi) {
					lastLi.appendChild(newOl);
					stack.push(newOl);
				}
				currentLevel++;
			}
			while (level < currentLevel && stack.length > 1) {
				stack.pop();
				currentLevel--;
			}

			var li = document.createElement('li');
			if (level === 3) li.classList.add('toc-level-3');
			var a = document.createElement('a');
			a.href = '#' + h.id;
			a.textContent = h.textContent;
			li.appendChild(a);
			stack[stack.length - 1].appendChild(li);
		});

		// highlight active section
		try {
			var linkById = new Map();
			Array.from(tocList.querySelectorAll('a')).forEach(function(a) {
				var id = a.getAttribute('href').slice(1);
				linkById.set(id, a);
			});
			var observer = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					var id = entry.target.id;
					var link = linkById.get(id);
					if (!link) return;
					if (entry.isIntersecting) {
						link.classList.add('is-active');
					} else {
						link.classList.remove('is-active');
					}
				});
			}, { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] });
			headings.forEach(function(h) { observer.observe(h); });
		} catch (e) {}
	}

	/* ──────────────────────────────────────────────
	   Paginated essays (split by h1 inside .essay-body)
	   ────────────────────────────────────────────── */
	function buildPagination(essayBody, toc, tocList) {
		// Gather all h1 elements inside essay-body (not just direct children)
		var h1s = Array.from(essayBody.querySelectorAll('h1'));
		if (h1s.length === 0) return false; // no h1 → not a paginated essay

		var pageNav = document.querySelector('.page-nav');
		if (!pageNav) return false;

		// ── Build sections ──────────────────────────
		// Each section = h1 + all following siblings until next h1
		var sections = [];
		
		// First, collect all nodes for each section BEFORE moving anything
		var sectionNodes = [];
		h1s.forEach(function(h1, i) {
			var nodes = [h1];
			var node = h1.nextElementSibling;
			var nextH1 = (i < h1s.length - 1) ? h1s[i + 1] : null;
			
			// Collect all element siblings until we hit the next h1
			while (node) {
				if (node === nextH1) break;
				var next = node.nextElementSibling;
				nodes.push(node);
				node = next;
			}
			
			sectionNodes.push({
				h1: h1,
				nodes: nodes,
				title: h1.textContent.replace(/^\d+\.\s*/, '').trim()
			});
		});
		
		// Now create wrappers and move nodes (process in reverse to avoid position shifts)
		for (var i = sectionNodes.length - 1; i >= 0; i--) {
			var data = sectionNodes[i];
			var wrapper = document.createElement('div');
			wrapper.className = 'essay-page';
			wrapper.dataset.pageIndex = i;
			wrapper.style.display = 'none'; // Hide by default
			
			// Insert wrapper before first node (h1)
			essayBody.insertBefore(wrapper, data.h1);
			
			// Move all collected nodes into wrapper
			data.nodes.forEach(function(node) {
				wrapper.appendChild(node);
			});
			
			sections[i] = {
				el: wrapper,
				title: data.title
			};
		}
		
		// Sections are already in correct order (no reverse needed)

		if (sections.length <= 1 && sections.length > 0) {
			// Only one section — no pagination needed, just show it
			sections[0].el.style.display = 'block';
			pageNav.style.display = 'none';
			toc.style.display = 'none';
			return true;
		}

		// ── TOC as page navigator ───────────────────
		tocList.innerHTML = '';
		sections.forEach(function(sec, i) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = '#page-' + i;
			a.textContent = sec.title;
			a.dataset.pageIndex = i;
			li.appendChild(a);
			tocList.appendChild(li);
		});

		// ── Navigation elements ─────────────────────
		var prevLink = pageNav.querySelector('.page-nav-prev');
		var nextLink = pageNav.querySelector('.page-nav-next');
		var indicator = pageNav.querySelector('.page-nav-indicator');
		var currentPage = 0;
		
		// Initially hide page nav, will be shown by showPage
		pageNav.style.display = 'none';

		function showPage(index) {
			if (index < 0 || index >= sections.length) return;
			currentPage = index;

			// Hide all pages, show only current
			sections.forEach(function(s, i) {
				if (i === index) {
					s.el.style.display = 'block';
				} else {
					s.el.style.display = 'none';
				}
			});

			// Update TOC active state
			Array.from(tocList.querySelectorAll('a')).forEach(function(a, i) {
				if (i === index) {
					a.classList.add('is-active');
				} else {
					a.classList.remove('is-active');
				}
			});

			// Prev button
			if (index > 0) {
				prevLink.style.display = 'flex';
				prevLink.querySelector('.page-nav-label').textContent = sections[index - 1].title;
				prevLink.href = '#page-' + (index - 1);
			} else {
				prevLink.style.display = 'none';
			}

			// Next button
			if (index < sections.length - 1) {
				nextLink.style.display = 'flex';
				nextLink.querySelector('.page-nav-label').textContent = sections[index + 1].title;
				nextLink.href = '#page-' + (index + 1);
			} else {
				nextLink.style.display = 'none';
			}

			// Indicator
			indicator.textContent = (index + 1) + ' / ' + sections.length;

			// Show nav
			pageNav.style.display = 'flex';

			// Scroll to top
			window.scrollTo({ top: 0, behavior: 'smooth' });

			// Update URL hash
			history.replaceState(null, '', '#page-' + index);
		}

		// Add click handlers to TOC links
		Array.from(tocList.querySelectorAll('a')).forEach(function(a, i) {
			a.addEventListener('click', function(e) {
				e.preventDefault();
				showPage(i);
			});
		});

		prevLink.addEventListener('click', function(e) {
			e.preventDefault();
			if (currentPage > 0) {
				showPage(currentPage - 1);
			}
		});

		nextLink.addEventListener('click', function(e) {
			e.preventDefault();
			if (currentPage < sections.length - 1) {
				showPage(currentPage + 1);
			}
		});

		// Handle browser back/forward for hash changes
		window.addEventListener('hashchange', function() {
			var hash = window.location.hash;
			if (hash.indexOf('#page-') === 0) {
				var p = parseInt(hash.split('-')[1], 10);
				if (!isNaN(p) && p >= 0 && p < sections.length) {
					showPage(p);
				}
			}
		});

		// Determine start page from URL hash
		var hash = window.location.hash;
		var startPage = 0;
		if (hash.indexOf('#page-') === 0) {
			var p = parseInt(hash.split('-')[1], 10);
			if (!isNaN(p) && p >= 0 && p < sections.length) {
				startPage = p;
			}
		}
		showPage(startPage);

		return true;
	}

	/* ──────────────────────────────────────────────
	   Init
	   ────────────────────────────────────────────── */
	document.addEventListener('DOMContentLoaded', function() {
		var essayBody = document.querySelector('.essay-body');
		var toc = document.querySelector('.toc');
		var tocList = document.querySelector('.toc-list');
		if (!essayBody || !toc || !tocList) return;

		// Try paginated mode first (h1-based)
		var paginated = buildPagination(essayBody, toc, tocList);

		if (!paginated) {
			// Fallback: classic TOC for non-paginated essays
			buildClassicToc(essayBody, toc, tocList);
			// Hide page-nav if present
			var pageNav = document.querySelector('.page-nav');
			if (pageNav) pageNav.style.display = 'none';
		}
	});
})();
