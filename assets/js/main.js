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
		
		// First, collect all nodes that belong to each section
		var sectionNodes = [];
		h1s.forEach(function(h1, i) {
			var nodes = [h1];
			var node = h1.nextSibling;
			var nextH1 = (i < h1s.length - 1) ? h1s[i + 1] : null;
			
			// Collect all siblings until we hit the next h1
			while (node) {
				if (node === nextH1) break;
				var next = node.nextSibling;
				nodes.push(node);
				node = next;
			}
			
			sectionNodes.push(nodes);
		});
		
		// Now create wrappers and move nodes
		sectionNodes.forEach(function(nodes, i) {
			if (nodes.length === 0) return;
			
			var h1 = nodes[0];
			var wrapper = document.createElement('div');
			wrapper.className = 'essay-page';
			wrapper.dataset.pageIndex = i;
			
			// Insert wrapper before first node (h1)
			var parent = h1.parentNode;
			parent.insertBefore(wrapper, h1);
			
			// Move all nodes into wrapper
			nodes.forEach(function(node) {
				wrapper.appendChild(node);
			});
			
			sections.push({
				el: wrapper,
				title: h1.textContent.replace(/^\d+\.\s*/, '').trim() // strip leading "1. "
			});
		});

		if (sections.length <= 1 && sections.length > 0) {
			// Only one section — no pagination needed, just show it
			sections[0].el.style.display = '';
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
			a.addEventListener('click', function(e) {
				e.preventDefault();
				showPage(i);
			});
			li.appendChild(a);
			tocList.appendChild(li);
		});

		// ── Navigation elements ─────────────────────
		var prevLink = pageNav.querySelector('.page-nav-prev');
		var nextLink = pageNav.querySelector('.page-nav-next');
		var indicator = pageNav.querySelector('.page-nav-indicator');
		var currentPage = 0;

		function showPage(index) {
			if (index < 0 || index >= sections.length) return;
			currentPage = index;

			sections.forEach(function(s, i) {
				s.el.style.display = (i === index) ? '' : 'none';
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
				prevLink.style.visibility = 'visible';
				prevLink.querySelector('.page-nav-label').textContent = sections[index - 1].title;
			} else {
				prevLink.style.visibility = 'hidden';
			}

			// Next button
			if (index < sections.length - 1) {
				nextLink.style.visibility = 'visible';
				nextLink.querySelector('.page-nav-label').textContent = sections[index + 1].title;
			} else {
				nextLink.style.visibility = 'hidden';
			}

			// Indicator
			indicator.textContent = (index + 1) + ' / ' + sections.length;

			// Show nav
			pageNav.style.display = '';

			// Scroll to top
			window.scrollTo({ top: 0, behavior: 'smooth' });

			// Update URL hash
			history.replaceState(null, '', '#page-' + index);
		}

		prevLink.addEventListener('click', function(e) {
			e.preventDefault();
			showPage(currentPage - 1);
		});

		nextLink.addEventListener('click', function(e) {
			e.preventDefault();
			showPage(currentPage + 1);
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
