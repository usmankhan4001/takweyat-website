# 09 Workflows and commands

## npm scripts
| Command | Does |
| --- | --- |
| `npm run dev` | Astro dev server on :4321 (live reload). Bind explicitly: `npm run dev -- --host 127.0.0.1 --port 4321` |
| `npm run build` | Build 124 pages into `dist/` (about 2 s) |
| `npm run preview` | Serve `dist/` |
| `npm run verify` | After a build: confirm every content passage appears word for word. Must say `ALL PRESENT, word for word` |
| `npm run pdfs` | Rebuild the 4 PDFs into `public/downloads/` (needs Chrome at `C:/Program Files/Google/Chrome/Application/chrome.exe`) |
| `npm run content` | Re-parse documents into `content/*.json` (needs Python, not installed here) |
| `npm run board` | Rebuild `docs/artifacts/style-board.html` with Phosphor icons inlined |
| `npm run prompts` | Rebuild the image prompt pack (`.md`, `.json`, `.html`) |

## Making a change safely
1. Edit. 2. `npm run build`. 3. `npm run verify`. 4. Look at it in the dev server at 1440 px and 390 px. 5. Update `docs/context/` if a decision changed.

## Screenshots without a browser tool
The session used a small Chrome DevTools script (`cap.mjs`/`cap3.mjs` in the session scratchpad, not in the repo): launches headless Chrome on a free `--remote-debugging-port`, sets the viewport, navigates, scrolls to given offsets and saves JPEGs, optionally evaluates a JS expression first. Use an absolute output directory. Never kill all Chrome processes.

## Deploy (not done)
`Dockerfile`: node:22-alpine builds, nginx:1.27-alpine serves `dist/` with `nginx.conf` (gzip, cache headers for `/_astro/`, `/fonts/`, `/downloads/`). Dokploy: application from this repository, build type Dockerfile, path `Dockerfile`, port 80. `.dockerignore` excludes `node_modules`, `dist`, `docs`, `assets-source`, `assets-in`, `source-documents`.
Earlier Dokploy usage (status page): server "usmankhan", app `web`, GitLab branch `status-page`. Confirm with the owner before deploying or touching DNS.

## Machine notes
Windows 11, Git Bash and PowerShell, Node 24, no Python, ffmpeg available, Chrome 157 installed. Paths contain spaces (`C:\Users\Usman Khan\`). Use the scratchpad for temp files.
