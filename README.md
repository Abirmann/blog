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

## Local preview

### Установка (Arch Linux)

1. **Установите Ruby и Bundler:**
   ```bash
   sudo pacman -S ruby ruby-bundler
   ```

2. **Установите зависимости проекта:**
   ```bash
   cd /home/abirman/repos/blog
   bundle install
   ```

3. **Запустите локальный сервер:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

   Сайт будет доступен по адресу: http://localhost:4000

   Флаг `--livereload` автоматически обновляет страницу при изменении файлов.

### Альтернативный способ (без Bundler)

Если предпочитаете установить Jekyll глобально:

```bash
sudo pacman -S ruby
gem install jekyll bundler
jekyll serve --livereload
```

**Рекомендуется использовать Bundler** для управления зависимостями проекта.

## Structure

- `_essays/` — коллекция эссе (каждый файл — отдельная страница)
- `_layouts/` — базовые шаблоны (`default.html`, `essay.html`)
- `assets/css/main.css` — типографика и стили
- `index.html` — список всех эссе 