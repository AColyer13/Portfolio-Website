# Why this folder exists

GitHub may run **`actions/jekyll-build-pages`** when **Settings → Pages** uses **Deploy from a branch** with the **`/docs`** folder. That job **requires** this directory to exist or the workflow errors (`chdir … /docs`).

The **real site** is the Vite app in `src/`, deployed by **`.github/workflows/deploy.yml`**. To serve that build:

1. **Settings → Pages → Source:** **GitHub Actions** (not “Deploy from a branch”).
2. Use workflow **Deploy Vite site to GitHub Pages**.

The Markdown files here are only a minimal Jekyll site so branch-based `/docs` builds do not fail. They are **not** the React portfolio unless you keep branch deployment as the only Pages source.
