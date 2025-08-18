(function() {
	function slugify(text) {
		const base = text.trim().toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9_\-\u0400-\u04FF]/g, '')
			.replace(/-+/g, '-');
		return base || '';
	}

	document.addEventListener('DOMContentLoaded', function() {
		const essayBody = document.querySelector('.essay-body');
		const toc = document.querySelector('.toc');
		const tocList = document.querySelector('.toc-list');
		if (!essayBody || !toc || !tocList) return;

		const headings = Array.from(essayBody.querySelectorAll('h2, h3'));
		if (headings.length === 0) {
			// No headings, hide outline control
			toc.style.display = 'none';
			return;
		}

		// Ensure IDs and build nested list
		let currentLevel = 2;
		const stack = [tocList];

		headings.forEach(function(h, index) {
			const level = parseInt(h.tagName.substring(1), 10); // 2 or 3
			if (!h.id) {
				let id = slugify(h.textContent);
				if (!id) id = 'h-' + index;
				// Avoid duplicate IDs
				let uniqueId = id;
				let counter = 1;
				while (document.getElementById(uniqueId)) {
					uniqueId = id + '-' + counter++;
				}
				h.id = uniqueId;
			}

			while (level > currentLevel) {
				const lastLi = stack[stack.length - 1].lastElementChild;
				const newOl = document.createElement('ol');
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

			const li = document.createElement('li');
			if (level === 3) li.classList.add('toc-level-3');
			const a = document.createElement('a');
			a.href = '#' + h.id;
			a.textContent = h.textContent;
			li.appendChild(a);
			stack[stack.length - 1].appendChild(li);
		});

		// Optional: highlight active section
		try {
			const linkById = new Map();
			Array.from(tocList.querySelectorAll('a')).forEach(function(a) {
				const id = a.getAttribute('href').slice(1);
				linkById.set(id, a);
			});
			const observer = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					const id = entry.target.id;
					const link = linkById.get(id);
					if (!link) return;
					if (entry.isIntersecting) {
						link.classList.add('is-active');
					} else {
						link.classList.remove('is-active');
					}
				});
			}, { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] });
			headings.forEach(function(h) { observer.observe(h); });
		} catch (e) {
			// noop if IntersectionObserver unsupported
		}
	});
})(); 