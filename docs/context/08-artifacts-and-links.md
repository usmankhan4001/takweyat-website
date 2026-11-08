# 08 Artifacts and links

Artifacts are private claude.ai pages (shared via the page's Share menu by the owner). Their source is in `../artifacts/`. Republish by passing the same file path (or the URL) to the Artifact tool.

| Artifact | URL | Source file | Rebuild |
| --- | --- | --- | --- |
| Takweyat Style Board (palette, buttons by surface, rolling CTA demo, type weights, Phosphor icons, sample page, three questions) | https://claude.ai/artifact/WZsbAh7xMgHVDMqAfktBhU | `artifacts/style-board.html` (from `style-board.template.html`) | `npm run board` |
| Takweyat Image Prompts (193 prompts, copy buttons, filter, done ticks) | https://claude.ai/artifact/Wpe2ncuW4TAfEzMurYgMW8 | `artifacts/image-prompts.html` (+ `.md`, `.json`, template) | `npm run prompts` |
| Visual sitemap | published earlier; URL not recorded | `artifacts/sitemap.html` | static |
| Takweyat Website Showcase (older, owner-shared reference: Newsreader + Figtree, large editorial type, pinned zoom hero) | https://claude.ai/artifact/FbjCsb3VKt6Tfzd1D6PueH | Saved copy was in the session tool results; not in the repo | n/a |

## Artifact contract reminders (if you republish)
- Author as `.html` with a `<title>` (2 to 4 words, a name), `<meta name="claude:viewport-fit-sides" content="cover">`, side gutters `padding-left/right: max(16px, env(safe-area-inset-*, 0px))`.
- Colours as tokens on `:root`, dark-mode redefinitions under `@media (prefers-color-scheme: dark)` guarded `:root:not([data-theme="light"])` and `:root[data-theme="dark"]`; explicit body background.
- External scripts only from cdnjs/jsdelivr/unpkg/tailwind CDN/jquery; stylesheets only from Google Fonts. No download links, no `window.print`.
- Do not define a global function named `top` in inline scripts.

## Other links
- Aesthetic reference: https://www.farmafrica.org/
- Live platform linked from the site: https://boycottisraelonline.com
- Vercel Web Interface Guidelines source: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
- EmDash: https://github.com/emdash-cms/emdash
- Full session transcript: see `docs/README.md`.
