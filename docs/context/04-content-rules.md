# 04 Content rules and pipeline

## The rule
Owner: "i want original wording and verbatim." Text from the documents must appear exactly as written (including the documents' own capitalisation and punctuation). Interface copy (buttons, form labels, menu names, error messages, the take-action page) is written by the agent and is not verbatim.

## Source documents
Six originals in `../../source-documents/original/`; their extracted text in `../../source-documents/extracted/`. See `../../source-documents/README.md` for which is which.

## Pipeline (`tools/parse_content.py`)
1. PDFs are text-extracted (outside the repo) to `source-documents/extracted/*.txt`.
2. Mechanical repairs only: private-use glyphs mapped back (`U+E081` "(", `U+E082` ")", `U+E088` en dash, `U+E092` colon, `U+E09D` "+", `U+E083` "["), Arabic name restored as تقویت, wrapped lines joined.
3. Duplicates in the legal plan text: first genuine occurrence of each pillar is used; pillar 40 comes from the later copy (source line 5604); the 19.8 copyright version is used; variant pillars 34/35/39/50 use the first copy.
4. Output: `content/legal-plan.json` (pillars[50], each with number, title, sourceLine, intro, 10 items {id,title,text}), `content/education-plan.json` (pillars[35] × 10 bullets, roadmap[4], executiveSummary, ultimateGoal), `content/core-pillars.json` (5 pillars each with goal, roadmap, 12 objectives; 7 achievements; heroBanner), plus cleaned page texts `content/source-about.txt`, `source-legal.txt`, `source-member.txt`.
5. 14 integrity checks run during parsing (counts, balanced parentheses, no private-use glyphs).
6. `npm run verify` (`tools/verify_build.mjs`) opens built HTML and checks every content passage is present: last result 1,545 passages across 93 pages, ALL PRESENT.
Python is not installed on this Windows machine, so the parser cannot currently be re-run; the JSON is the working source. Edit JSON directly if wording must change (and say so to the owner).

## Hand-written pages (need review)
`privacy`, `terms`, `accessibility` were drafted by the agent and need a lawyer's review. The press release is a stub (`src/data/press.ts`, PDF stub). Take-action form labels and the mega-menu tile blurbs are agent copy.

## Known content notes
- The documents contain strong language and long-term claims; the plan pages state "long-term goals, not completed work" in the PDFs. Legal review of strong wording is an open item.
- The founder's message is on About (verbatim from the .docx). Founder photo is a placeholder.
- A drafting note in the core pillars source was deliberately excluded (`draftingNoteExcluded` in `core-pillars.json`).

## The text-reduction plan (under discussion)
Owner: pages carry "needlessly more text"; documents keep full text, the website should be glanceable. Agreed direction (owner has not yet chosen how short lines are made):
1. Option 2 (recommended): short lines made only of exact sentences from the documents, trimmed by the agent, nothing new written.
2. Option 1: agent writes short lines, owner approves (departs from verbatim).
3. Option 3: first sentence of each passage plus "Read more".
Layers: glance (headline, one line, 3 to 4 facts) → hub summary → full verbatim detail (the 85 pillar pages and PDFs stay complete). Hub pages: home (headline, one line, tiles), what-we-do and pillar pages (goal in one line, roadmap in two sentences, objectives behind a toggle), plans (phases as title + one line, pillar list as titles), legal aid (4 steps, 3 eligibility points), join (4 criteria, conduct collapsed), initiatives (name, status, one line).
Copy rules the owner is considering from the Vercel guidelines: Title Case for headings and buttons (mine only), numerals not words ("35 pillars"), specific button labels ("Send Message" instead of "Submit Application" on contact; keep verbatim on join), curly quotes and real ellipsis, non-breaking spaces in the brand name, second person for UI copy only. Awaiting owner yes/no.
