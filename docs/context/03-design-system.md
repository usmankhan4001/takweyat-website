# 03 Design system

Source of truth: `src/styles/global.css` (`:root` tokens at the top). The visual reference is `../artifacts/style-board.html`.

## Colour
| Token | Value | Role |
| --- | --- | --- |
| `--teal` | `#007A7A` | The brand. Structure, links, main buttons |
| `--teal-dark` | 66% teal + black | Dark bands, hero tint, footers |
| `--olive` | `#00504F` | Retired olive, remapped to deep teal so old markup still works |
| `--raspberry` | `#A21E66` | One job: urgent help (legal aid), highlights. Never on teal (contrast 1.4) |
| `--charcoal` | `#0D1716` | Text and dark bands (green-black) |
| `--paper` | `#F3F6F5` | Page background (cool mist, replaced warm cream) |
| `--ink-soft` | `#44524F` | Secondary text |
| `--line` | `#D5DFDC` | Rules and borders |
| `--slate` | `#7B7B7B` | Legacy, avoid (fails contrast on small text); still used in `networks.ts` |
Soft tints for image/panel use: `#DCEEEC` (mint), `#F6E1EC` (raspberry tint), `#8FE0DA` (light teal on dark).
Proportion: about 60% mist/white, 28% teal, 12% raspberry. Contrast checked: ink on mist 16.8, white on teal 5.2, white on raspberry 7.2.

## Typography
- Display: **Gloock** (single weight 400), headings only. Self-hosted `public/fonts/gloock-latin-400-normal.woff2`.
- Everything else: **DM Sans** variable (`dm-sans-latin-wght-normal.woff2`), weights 400 and 500 only.
- Phones (<760px): `h3`, `h4`, card/tile/phase/pillar titles switch to DM Sans 500. Gloock stays on h1/h2, the intro statement, quotes and the menu section names.
- Headings use `text-wrap: balance`. Sizes are fluid (`clamp`). The owner liked the large editorial sizes of an earlier showcase (hero up to 5rem, h2 up to ~3.9rem).

## Shapes
Square. `--r: 0px`. No coloured top ribbons, no boxed icon tiles. Round shapes only for phase numerals and the hero scroll button.

## Buttons (`.btn`)
Flat fill with a colour wipe from the bottom on hover. Choose by surface: teal on mist/white, white on deep teal/ink, raspberry only for legal aid. Variants: `.btn.teal`, `.cream`, `.white`, `.ghost`, `.outline`. Key sizes: 54px high, 46px in the header.

## Call-to-action
`CtaRoll.astro`. Five asks rolling every 2.8s (pause on hover/focus, static under reduced motion): Get free legal aid → `/free-legal-aid/`; Become a volunteer → `/take-action/#volunteer`; Partner with us → `#partner`; Press enquiries → `#press`; Stay updated → `#updates`. Icon, label, colour (raspberry for legal aid, teal for the rest) and `href` all change together. Fixed bar at the bottom below 1240px with a soft shadow (no ring).

## Menus
- Desktop (≥1240px): 4 items, full-width mega panels (`.mega`, `.mega-in`, `.mega-links.list|cards`, `.mega-vis` tile). Each link has a Phosphor icon chosen for its subject.
- Phone: overlay accordion (`details name="mm"`), section names in Gloock, links in DM Sans with icons, pinned CTA buttons and email.

## Motion
- Hero: pinned GSAP ScrollTrigger scene, headline zooms into the "o" of "action", Islamabad video behind (teal tint `.bgv-tint`), then the scales video fades in and the second statement types in with a raspberry highlight.
- `[data-rise]`: slide-up + fade with stagger; auto-applied to paragraphs, cards, tiles, rows.
- `.wf`: word-by-word fill on scroll (founder quote).
- `.num`: count-up for 35/50.
- `.phase`: tap to expand text.
- All gated by `prefers-reduced-motion`.

## Icons
- **Phosphor Icons** (`@phosphor-icons/core`, regular weight, 256 viewBox, `fill: currentColor`), inlined at build in `Header.astro`/`CtaRoll.astro`.
- Owner's nonprofit icon set (16 subjects in outline/solid/duotone) lives in `assets-source/icon-set-nonprofit`; the duotone SVGs recoloured to deep teal + raspberry are in `public/icons/` and used on home work tiles via `iconFor()` in `index.astro`.
- Rule: icons are small and functional; never a lone icon on a big colour block.

## Imagery rules
Men/boys only, from behind, faceless or hands only. Pakistani settings. Flat vector illustration style for spot art: palette limited to the table above. Photos/video muted teal grade. Videos: no audio, 10 to 15 s loops. See `06-media-and-assets.md` and `../artifacts/image-prompts.html`.

## Accessibility and quality bar
Skip link, visible focus (`:focus-visible`), real `button`/`a`, labelled form fields with honeypot, aria on decorative SVG, reduced-motion support, balanced headings. The Vercel Web Interface Guidelines review (rules list fetched in session) has not yet been run file by file; it is an open item.
