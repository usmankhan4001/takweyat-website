# content

Structured, verbatim text from the owner's documents. This is what the pages and PDFs render. Do not paraphrase.

- `legal-plan.json`: `title, goal, summary, roadmap[4], targets[4], achievementsHeading, achievements[4], team, pillarsHeading, pillars[50]` (each pillar: `number, title, sourceLine, intro, items[10]{id,title,text}`).
- `education-plan.json`: `title, executiveSummary, ultimateGoal, roadmapHeading, roadmap[4], pillarsHeading, pillars[35]` (each pillar: `number, title, items[10]` strings).
- `core-pillars.json`: `heroBanner, achievementsIntro, achievements[7], pillarsIntro, pillars[5]` (each: `number, title, goal, roadmap, objectives[12]`), `draftingNoteExcluded`.
- `source-about.txt`, `source-legal.txt`, `source-member.txt`: cleaned page documents used for About, Free legal aid, Join.

Raw originals and raw extractions: `../source-documents/`. Parser: `../tools/parse_content.py` (needs Python). Proof that nothing was lost: `npm run verify`. Rules: `../docs/context/04-content-rules.md`.
