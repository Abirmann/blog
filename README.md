# Essays

Static site for essays, built with Jekyll and deployed to GitHub Pages.

## Publish

1. Create a GitHub repository and push this folder.
2. GitHub Pages will deploy via the included workflow (`.github/workflows/pages.yml`).
3. In repo Settings → Pages, set Source to "GitHub Actions" if needed.
4. Optionally set `url` and `baseurl` in `_config.yml` for a project site.

## Add an essay

- Create a new file in `_essays/` with front matter:

```markdown
---
title: Заголовок
# date: 2025-01-01 # optional; inferred from commit if omitted
# description: Короткое описание (используется в мета и превью)
---

Текст эссе...
```

- Commit and push. The homepage (`/`) lists all essays by date.

## Local preview (optional)

You can rely on GitHub Actions only. For local preview, install Ruby/Jekyll and run:

```bash
jekyll serve --livereload
```

## Structure

- `_essays/` — коллекция эссе (каждый файл — отдельная страница)
- `_layouts/` — базовые шаблоны (`default.html`, `essay.html`)
- `assets/css/main.css` — типографика и стили
- `index.html` — список всех эссе 