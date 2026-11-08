# 02 Decisions log

Chronological. "Owner" means the project owner. Quotes are their words.

## Phase 0: the status page (earlier session)
- Built a one-page "coming soon" site for the **Boycott Israel Platform** in the Takweyat theme, deployed to Dokploy (usmankhan instance, `web` app, GitLab branch `status-page`). Owner feedback shaped later taste: "it looks slop", wanted a bdsmovement.net-like feel, bigger visible text, three prominent pillars, icons with cut-outs, Urdu, logo with no background, "Jameel Noori Nastaleeq not noto", later Mehr/Gulzar Urdu fonts, a pink highlighted "platform", a fixed footer, "coming soon" prominent and good on mobile.
- That status page is separate from this repo. boycottisraelonline.com still shows it.

## Phase 1: aesthetics and structure
- Owner: build the Takweyat site replicating farmafrica.org's look, animation and fonts, using their six documents.
- First showcase was rejected as "cartoonish" (pink/gold/mint tints, Fraunces). Reverted to the calm approved look using the real brand colours. Navbar made plain and serious; hero made practical and relevant (not vague).
- Fonts explored: Newsreader, Source Serif, then locked **Gloock + DM Sans**.
- Structure agreed (about 123 pages): home, about, what we do plus 5 pillar pages, free legal aid, plans hub plus Educational Plan hub with 35 pillar pages plus Legal Plan hub with 50 pillar pages, initiatives list plus 14 details, get involved, join the movement, contact, press list plus a stub release, media kit, whitepapers, privacy/terms/accessibility, 404.
- Owner rules: original wording and verbatim; whitepaper PDFs are designed documents; lead forms wired later with n8n; press release is only a downloadable stub; no Urdu for now; photo placeholders for now; initiatives pages get a CTA to the original platform.

## Phase 2: the build
- Content parsed from the PDFs/DOCX into JSON with mechanical glyph repair, 14 integrity checks, then a build-time verifier proving every passage is on a page (1,545 passages across 93 pages).
- Mistakes corrected on the way: a claim that pillars 32/35 were truncated (they were not), a claim that pillar 40 was missing (it exists in a later copy of the source).

## Phase 3: "outlook" rework (the current phase)
Owner: "the website has all the content and things I want but not the outlook."
- **Colour:** "I don't like the yellowy color" = the **cream paper**. Olive removal was fine too. Palette made teal-led; raspberry for urgent help only; cool mist paper.
- **Weight:** "too much bold, looks abnormal" → UI weights 400/500.
- **CTA:** the header/mobile button text itself should animate through variants (get legal aid, volunteer, partner, press, stay updated), and "the icon isn't changing" → icon, label, colour and link all roll together. Built as `CtaRoll`.
- **Motion:** "low on animation" → scroll reveals for paragraphs/cards, word-by-word quote fill, count-up numbers.
- **Icons:** "as good as Phosphor" → Phosphor adopted. Then: no boxed icon tiles ("don't do this that you did with icons"), no ribbons/rounded corners ("what the shit is the ribbons and corners"), "I asked for more visual not more textual".
- **Phases:** card with colored top ribbon replaced by a **road timeline** (numbered stops on a dashed route, text opens on tap).
- **Navbar:** wrapped on two lines → fixed; reduced to **4 main links** with dropdowns; then a **visual mega menu** (list/cards layouts, specific icons, visual tile). Owner then said inside-menu icons/spacing "aren't meaningful / boxy": icons made subject-specific, boxes softened (still under review).
- **Phone:** "too much Gloock" → Gloock only for main headings on phones. Phone menu rebuilt as accordion with pinned CTA. The white border around the bottom button was a box-shadow ring and was removed.
- **Hero:** "hasn't anything visual, put video behind" → Islamabad aerial plays behind the headline under a deep teal tint; scales video appears after the zoom. Abnormal star pattern removed. Awkward intro section (three buttons, curved image) simplified to statement + one button + justice video.
- **Illustrations:** agent-drawn SVG scenes were produced, then rejected ("your illustrations are shit remove them"); deleted. Owner will generate imagery via ChatGPT using the prompt pack, may also use a Figma illustration set (link was truncated, full link still needed), and has Envato.
- **Fonts:** tried Newsreader again after a reference artifact, owner said "no go back to Gloock". Reverted.
- **Content length:** "website pages have needlessly more text... for document preserve the text, for website glance info." Direction under discussion: short lines on hubs made of exact sentences from the documents, full text one tap away. Owner said content "needs to be discussed more".
- **CMS:** owner suggested EmDash and said it is "the absolute last one" after design and content.

## Standing preferences
- Respond briefly, show visuals, avoid asking many questions, but "ask away" is welcome when design direction is unclear.
- No women in any media. Local, Pakistani, not American.
- Prefers flat, calm, dignified, image-led layouts; dislikes boxes, ribbons, tiny icons on big empty blocks, anything "slop" or cartoonish.
