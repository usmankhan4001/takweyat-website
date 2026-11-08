# 06 Media and assets

## Served files (`public/`)
| Path | What |
| --- | --- |
| `fonts/` | `gloock-latin-400-normal.woff2`, `dm-sans-latin-wght-normal.woff2` (self-hosted, preloaded in `Base.astro`) |
| `media/islamabad.mp4`, `islamabad.jpg` | Islamabad aerial with the Faisal Mosque, 14 s silent loop, 1080p, 1.9 MB (from the owner's Envato clip `islamabad-with-the-faisal-mosque-...mp4`). Hero background and About menu tile |
| `media/justice.mp4`, `justice.jpg` | Scales of justice, gavel, law books, 14 s loop, 0.4 MB (Envato `scales-of-justice-gavel-and-law-books-...mov`). Hero second stage, intro band, legal aid page, Plans menu tile |
| `icons/*.svg` | The owner's nonprofit icon set, duotone, recoloured to deep teal + raspberry (animal-shelter, book-donation, community, disaster-relief, donation-jar, dove, education-support, fundraiser, global-aid, helping-hand, medical-aid, megaphone, orphan-care, social-impact, volunteer, water-charity) |
| `downloads/` | The four generated PDFs (below) |
| `logo.png`, `logo-cream.png`, `favicon.svg`, `robots.txt` | Brand files. The logo graphic still says "Foundation" |

Envato clips are licensed to the owner's account; check the licence covers website use before launch.

## PDFs (`public/downloads/`, built by `tools/make_pdfs.mjs` with headless Chrome)
- `takweyat-educational-plan.pdf` (40 pp), `takweyat-legal-aid-and-justice-plan.pdf` (106 pp), `takweyat-profile.pdf` (4 pp, "Takweyat at a glance"), `takweyat-press-release-stub.pdf` (1 p).
- Built from the same JSON as the site (`content/*.json`). A4, cover, contents, one page per pillar, page numbers in margin boxes. They still reference the old Gloock/DM Sans files from `public/fonts`. The profile PDF's accent was olive and is now deep teal `#00504F` (rebuild with `npm run pdfs` to apply).
- The owner also has older copies of `takweyat-educational-plan.pdf` and `takweyat-profile.pdf` in Downloads.

## Raw downloads (`assets-source/`, not served)
- `icon-set-nonprofit/`: 16 nonprofit icons × (Dypta duotone, Line, Solid) × (colour, black) in SVG, PNG, EPS, AI. Navy `#293a4c` and orange `#ff5f00` in the colour set.
- `hands-video/`: `helping hand Color.mov` and `helping hand Alpha.mov` (ProRes 1080p, 10 s, hands reaching toward each other; Alpha has transparency). Not yet placed. Suggested use: compress to a short loop on `/join/` or Get involved.

## Owner-supplied imagery workflow
1. Owner opens `../artifacts/image-prompts.html` (193 prompts, each with exact filename, size and placement).
2. Generates images in one ChatGPT conversation (master style block repeated for consistency) or downloads from Envato.
3. Saves files with the exact filenames into `assets-in/`.
4. An agent resizes, compresses (AVIF/WebP/JPEG for photos, SVG/PNG for icons), moves them into `public/`, and replaces placeholders (`Photo.astro` `video`/`poster`, or add an `image` prop; page banners go into `PageHead`).
Filenames follow patterns: `banner-*`, `home-*`, `pillar-*`, `tile-*`, `phase-edu-1..4`, `phase-jus-1..4`, `edu-group-1..8`, `jus-group-1..8`, `legal-step-1..4`, `legal-scope-1..4`, `join-step-1..3`, `network-*`, `init-<slug>`, `figure-*`, `spot-*`, `icon-*`, `cover-*`, `share-*`, `state-*`, `photo-*`, `video-*`.
Honesty note: AI-generated photos are atmosphere only; never present them as real people helped or real events.

## Figma illustration set (pending)
The owner wants illustrations from a Figma community file ("Illustrations set", node 110-61, "Community") but the pasted link was truncated and has no file key. Need the full URL. A Figma MCP connector exists in the session. The owner also suggested `claude plugin install figma@claude-plugins-official`.

## Removed on purpose
Nine agent-drawn SVG illustrations (`public/art/`, `tools/make_art.mjs`) were deleted at the owner's request. Do not recreate them.
