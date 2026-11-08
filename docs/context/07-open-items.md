# 07 Open items and next steps

Ordered. "Owner" items need an answer before the agent proceeds.

## A. Waiting on the owner
1. **Text reduction method** (exact sentences / agent-written and approved / first sentence + Read more). Recommended: exact sentences. See `04-content-rules.md`.
2. **Copy rules**: Title Case for my own headings and buttons? Change contact button "Submit Application" to "Send Message"? Run the Vercel web-interface guidelines review on the pages?
3. **Full Figma link** for the illustration set (the pasted one is cut off).
4. **Generated imagery**: owner is producing images from `artifacts/image-prompts.html` into `assets-in/`. Start with the first 22: 10 page banners, 5 pillar scenes, 8 phase squares.
5. **Which name**: "Takweyat International Organization" (documents) or "Takweyat Foundation" (logo graphic)? Logo needs a new version if the first.
6. **Phone, WhatsApp, 24/7 helpline numbers** (empty in `site.ts`; lines appear when filled).
7. **Hands video placement** (Join page suggested).

## B. Agent work, ready to start when answers arrive
1. Hub-page text reduction with a "See all" toggle (pillar objectives, plan pillars, join conduct).
2. Copy and typography polish (numerals, curly quotes, nbsp in the brand name, `translate="no"` on the brand, specific button labels).
3. Mega menu polish: owner said spacing is uneven and boxes do not suit; the cards layout for "What we do" and "Get involved" may need to become open lists with inline icons.
4. Place owner-supplied images/videos; add `width`/`height`/`loading="lazy"`; compress.
5. Web-interface-guidelines review file by file (a11y, focus, forms, animation, typography, images, performance).
6. Rebuild PDFs (`npm run pdfs`) so the profile PDF uses the new accent colour; consider new covers from `cover-*` images.
7. Heading hierarchy check on hubs; `content-visibility: auto` on the 50-item justice list.
8. Hero zoom hole: retune `.oph` for Gloock if the zoom looks off (hole is currently transparent).

## C. Before launch
- Wire forms to the n8n webhook (`site.formEndpoint`). Until then forms show the email fallback.
- Lawyer review: `privacy`, `terms`, `accessibility`, and the strong wording of the plans.
- Set up a git repository (the project is not under version control). `.gitignore` exists.
- Create a Dokploy application for the site (Dockerfile build, port 80). `boycottisraelonline.com` still serves the old status page; the site was not deployed. The Dokploy/Browser MCP connections were intermittent in earlier sessions.
- Confirm Envato licences cover web use; add credits where required.
- Real photos for impact claims (no AI-generated "proof").
- Urdu translation (explicitly deferred).

## D. Last: CMS
EmDash (Cloudflare, MIT, Astro integration; admin panel, media library, runs on Node + SQLite or Cloudflare). Costs: upgrade Astro 5 → 6, run as a Node app with a DB volume instead of static nginx, import the verbatim JSON, re-run verification. Lower-risk alternative if editing is rare: Keystatic or Decap over the existing JSON in git. Owner decision: EmDash last, only after design and content are settled.
