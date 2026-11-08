# AGENTS.md: Takweyat website (read this first)

Static marketing and information site for **Takweyat International Organization** (تقویت), a Pakistani civil-society coalition of lawyers, doctors, educators and social workers. Built with **Astro 5**, **GSAP**, plain CSS. 124 pages. Deployed as static files behind nginx (Dokploy, Dockerfile).

If you are an AI agent: read this file, then `docs/README.md` (index of all context). Do not guess the history. It is written down in `docs/context/`.

## 60-second orientation

| Question | Answer |
| --- | --- |
| Run it | `npm install` then `npm run dev` (http://localhost:4321). A dev server is usually already running on `127.0.0.1:4321`. |
| Build | `npm run build` (124 pages into `dist/`) |
| Prove content is intact | `npm run verify` must print `ALL PRESENT, word for word` |
| Where does text come from? | `content/*.json` (verbatim from the owner's documents). Never retype or paraphrase it. |
| Where do names, menu, offices live? | `src/data/site.ts` |
| Design tokens | top of `src/styles/global.css` (`:root`) |
| Fonts | **Gloock** (display, headings only) and **DM Sans** (everything else). Self-hosted in `public/fonts/`. The owner rejected Newsreader and wants Gloock kept. |
| Python on this machine | Not installed. `npm run content` (parse_content.py) cannot run here. Use Node for new scripts. |

## Non-negotiable rules (from the owner)

1. **Verbatim content.** Text from the six source documents is used word for word. Run `npm run verify` after any change that touches pages or content. Short summaries on hub pages must be made only of exact sentences from the documents, or be approved by the owner first. See `docs/context/04-content-rules.md`.
2. **No women in imagery.** Photos, video and illustrations show men or boys, shown from behind, as faceless figures, or hands only. Pakistani setting, nothing American-looking. Animals and Western stereotypes are out.
3. **Colour system.** Teal-led. Raspberry is only for urgent help (legal aid) and highlights, never on teal. The yellowy colours (olive `#937623`, warm cream `#F3EFE6`) are retired. `--olive` still exists as a token but now resolves to deep teal `#00504F`. See `docs/context/03-design-system.md`.
4. **Less bold.** UI weights are 400 and 500 only. Gloock stays at its single weight and only for main headings. On phones, `h3`/`h4`, card and tile titles use DM Sans.
5. **No boxed icon tiles and no ribbon cards.** The owner called these ugly. Tiles are image- or video-led, icons are small and inline, corners are square (`--r: 0`).
6. **Do not draw illustrations.** The owner called the agent-drawn SVG scenes "shit" and had them removed. Illustrations come from the owner (ChatGPT image generation using `docs/artifacts/image-prompts.html`, or the Figma set) and are dropped into `assets-in/`.
7. **CMS comes last.** The owner decided EmDash (Cloudflare's Astro CMS) is the final step, after design and content are settled. Do not start it.
8. **Ask before outward actions.** Deploying, publishing, sending, or changing Dokploy needs the owner's yes.

## Repository map

```
website/
  AGENTS.md  CLAUDE.md  README.md      you are here
  astro.config.mjs  package.json  Dockerfile  nginx.conf  .dockerignore
  content/                  verbatim JSON from the documents + cleaned source text (see content/README.md)
  src/
    layouts/Base.astro      head, header/footer, global scripts (menu, scroll reveals, word-fill quotes, count-up, phase toggles)
    components/             Header (mega menu + phone menu), CtaRoll (rolling button), PageHead, Photo (photo/video slot), LeadForm, Footer, Arrow
    data/                   site.ts, groups.data.mjs, groups.ts, initiatives.ts, networks.ts, press.ts
    pages/                  one file per page type; [n].astro and [slug].astro generate many pages
    styles/global.css       the whole design system
  public/
    fonts/ media/ icons/ downloads/   static files served as-is (see docs/context/06-media-and-assets.md)
  tools/                    build helpers (PDFs, content verify, style board, prompt pack, content parser)
  docs/
    README.md               index
    context/                the written history, decisions, design system, structure, open items
    artifacts/              HTML artifacts made during discussion (style board, image prompts, sitemap) + their generators' templates
  source-documents/         the six original documents and their extracted text (the single source of truth for wording)
  assets-source/            raw downloads from the owner (icon set, hands video), not served
  assets-in/                drop zone: images the owner generates or downloads, named per docs/artifacts/image-prompts.html
  dist/                     build output (ignored)
```

Parent folder `D:\Apps\Takweyat\` also holds unrelated certificate files (`Certificate Builder`, `TKW-*.pdf`, `takweyat-certificates*`, `index.html`, `logo*.png`). They are **not** part of this website. Leave them alone.

## How pages are built

- `content/legal-plan.json` (50 pillars × 10 items), `content/education-plan.json` (35 pillars × 10 bullets), `content/core-pillars.json` (5 pillars × 12 objectives, 7 areas of work) feed the plan pages, pillar pages, initiatives and the PDFs. One source, many outputs.
- `src/data/groups.data.mjs` groups pillars (8 groups each plan). It is a plain `.mjs` so both Astro and `tools/make_pdfs.mjs` import it. `groups.ts` re-exports it typed and fails the build if a pillar is missing or repeated.
- `src/data/initiatives.ts` defines 14 initiatives. Their text is pulled from the plans by lookup, never retyped.
- Forms post to `site.formEndpoint` (n8n webhook, not set yet). With no endpoint they show an email fallback. Every form has a honeypot field named `website`.

## Header, menu and call-to-action

- Main nav is 4 items in `site.nav` (About us, What we do, Our plans, Get involved). Each opens a full-width mega menu defined in `Header.astro` (`menus` object: layout `list` or `cards`, links with Phosphor icon names, a visual tile).
- Phone menu is an accordion with a pinned CTA. `CtaRoll.astro` is one button that rolls label, icon, colour and link through 5 asks: Get free legal aid (raspberry), Become a volunteer, Partner with us, Press enquiries, Stay updated (teal). It renders twice: `variant="top"` in the header and `variant="bar"` as the fixed bottom bar below 1240px.
- Icons: Phosphor Icons (`@phosphor-icons/core`, SVG read at build time from `node_modules`). The owner's recoloured nonprofit icon set is in `public/icons/` (used on home work tiles).

## Gotchas already paid for (do not repeat)

- A class named `hdr` or `wrap` inside the header collides with `.hdr` / `.hdr .wrap`. The CTA variant is `top`, and the mega panel uses `.mega-in`, for this reason.
- `.nav a` sets a `background` shorthand (underline effect). Any link inside the nav that needs its own background must override `background-image`/`background-size` with higher specificity (see `.nav .mega-vis`).
- `.menu a` (old overlay link style) overrides `.btn` fonts. Buttons inside the menu need `.menu .menu-cta .btn` overrides.
- Never declare a global function named `top` in inline scripts (breaks the whole script). Pages published as claude.ai artifacts must follow the artifact rules (see `docs/context/08-artifacts-and-links.md`).
- The hero is a GSAP ScrollTrigger pin with a zoom into the "o" of "action". Its counter hole is measured with a canvas using the heading font. If the font changes, re-tune `.oph`. The hole is currently transparent so the video shows through.
- `[data-rise]` reveals are added automatically in `Base.astro` to paragraphs, cards, tiles and rows (stagger via `--d`). They start at `opacity: .001` and are disabled under `prefers-reduced-motion`.
- Astro's dev toolbar shows as a dark pill at the bottom of dev screenshots. It is not part of the site.
- `taskkill` on all Chrome processes is refused and would close the owner's browser. Screenshot scripts live in the session scratchpad, not in the repo (see `docs/context/09-workflows.md`).

## What is done, what is not

Done: all 124 pages, verified verbatim, 4 designed PDFs, colour/type system, mega menu, rolling CTA, take-action page with 5 forms, phase road timeline, scroll reveals, two hero videos, Phosphor icons, recoloured icon set, style board and a 193-prompt image pack.

Not done (details in `docs/context/07-open-items.md`): shorten hub-page text, apply Title Case and copy fixes, place owner-generated images and illustrations, wire n8n, phone/WhatsApp/helpline numbers, legal review of privacy/terms/accessibility, logo says "Foundation", Dokploy preview deploy, git repo, EmDash migration (last).
