# Takweyat website

Static site for Takweyat International Organization, built with Astro 5. 124 pages generated from verbatim content files, plus four designed PDFs.

**AI agents and new contributors: start with [`AGENTS.md`](AGENTS.md), then [`docs/README.md`](docs/README.md).** The history, decisions, design system, content rules and open items are written down in `docs/context/`.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Work on the site at http://localhost:4321 |
| `npm run build` | Build the 124 pages into `dist/` |
| `npm run verify` | After a build, confirm every passage of the documents appears word for word |
| `npm run pdfs` | Rebuild the PDFs in `public/downloads/` (needs Google Chrome) |
| `npm run content` | Re-parse the documents into `content/*.json` (needs Python) |
| `npm run board` | Rebuild the style board artifact |
| `npm run prompts` | Rebuild the image prompt pack |

## Folders

`src/` pages, components, data, styles. `content/` verbatim JSON. `source-documents/` the six originals and their extracted text. `public/` fonts, media, icons, PDFs. `tools/` build helpers. `docs/` context and artifacts. `assets-source/` raw downloads. `assets-in/` drop zone for new images.

## Before launch

Wire forms to n8n (`formEndpoint` in `src/data/site.ts`), add phone/WhatsApp/helpline numbers, have a lawyer review `privacy`, `terms`, `accessibility` and the plans' strong wording, replace placeholders with the owner's images, decide "Foundation" vs "International Organization" in the logo, deploy on Dokploy (Dockerfile, port 80). EmDash CMS is the last step. Full list: `docs/context/07-open-items.md`.
