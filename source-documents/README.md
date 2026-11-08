# source-documents

The single source of truth for Takweyat's wording. The owner's six original documents (copied from `C:\Users\Usman Khan\Downloads\`, originals untouched there) and the plain text extracted from them.

| Original (`original/`) | Downloads name | Extracted (`extracted/`) | What it is | Feeds |
| --- | --- | --- | --- | --- |
| `legal-aid-and-justice-plan.pdf` | Takweyat Global Legal Aid & Justice Plan.pdf | `plan.txt` | The Manifesto of Rights: goal, summary, roadmap, targets, achievements, team, 50 pillars × 10 items (contains duplicate copies of some pillars) | `content/legal-plan.json`, justice plan pages, PDF |
| `educational-plan.pdf` | Education .pdf | `education.txt` | The Educational Plan: The Global Vision: executive summary, goal, roadmap, 35 pillars × 10 bullets | `content/education-plan.json`, education pages, PDF |
| `become-a-member.pdf` | Become a member .pdf | `member.txt` | Membership criteria, code of conduct, onboarding | `/join/`, `content/source-member.txt` |
| `legal-aid.pdf` | Legal aid.pdf | `legal.txt` | Free legal aid: scope, eligibility, process, form fields | `/free-legal-aid/`, `content/source-legal.txt` |
| `about.pdf` | About (1).pdf | `about.txt` | Who we are, networks, offices | `/about/`, `content/source-about.txt` |
| `takweyat-founder-document.docx` | Takweyat .docx | `docx.txt` | Founder message, work areas, five pillars, achievements, hero banner text, drafting note | `content/core-pillars.json`, home and What we do |

Extraction notes: the PDFs use private-use glyphs for some punctuation and an Arabic name that extracts garbled; `tools/parse_content.py` repairs these mechanically (see `docs/context/04-content-rules.md`). The `.txt` files here are raw extractions, not cleaned. The cleaned, structured versions are in `../content/`.

The four generated PDFs (derived, not sources) are in `../public/downloads/`. Do not edit wording in derived files; change `content/*.json` (and tell the owner) or, better, the source and re-parse.
