# AGENTS.md

Operational knowledge for AI coding agents working on this repo.

## What this project is

`a11en4z.github.io` is a personal knowledge base / blog ("Allen Space") built with **VuePress 1.8** and the `vuepress-theme-vdoing` theme. Content lives as Markdown under `docs/`. There is no backend — it builds to a static site that GitHub Actions publishes to the `gh-pages` branch (see `.github/workflows/build-deploy.yml`).

## Commands

| Task | Command |
|---|---|
| Dev server (hot reload) | `npm run dev` → http://localhost:8080/ |
| Production build | `npm run build` → `docs/.vuepress/dist` |
| Import notes from an Obsidian vault | `npm run import:obsidian` (needs `OBSIDIAN_K8S_DIR`) |

There is no lint script and no test suite.

## Cursor Cloud specific instructions

Environment is ready after the startup update script runs `npm install`.

- **Node 17+ needs the legacy OpenSSL flag.** VuePress 1.x runs on webpack 4, which breaks on the cloud VM's Node (v22) with `ERR_OSSL_EVP_UNSUPPORTED`. Run dev/build with the flag set: `NODE_OPTIONS=--openssl-legacy-provider npm run dev` (and same for `npm run build`). The GitHub Actions workflow avoids this by pinning Node 18, so the flag is only needed locally/in-cloud, not in CI.
- **Dev server** listens on `http://localhost:8080/` and takes ~5-10s for the first webpack compile.
- **The site has a client-side passcode gate** (`docs/.vuepress/enhanceApp.js`). Only the SHA-256 of the passcode (`SITE_ACCESS_HASH`) is committed — the plaintext is intentionally NOT in the repo, so do not hardcode it anywhere. To view rendered content you must enter the owner-provided passcode at the gate; without it every page is blocked.
