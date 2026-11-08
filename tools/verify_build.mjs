// Confirms that every word of the content files appears, unchanged, on the built pages.
import fs from 'node:fs';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const legal = read('content/legal-plan.json'), edu = read('content/education-plan.json'), core = read('content/core-pillars.json');
const decode = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16))).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const norm = (s) => decode(s).trim();
const page = (path) => decode(fs.readFileSync(`dist${path}index.html`, 'utf8'));
let checked = 0; const bad = [];
const must = (html, text, where) => { checked++; if (!html.includes(norm(text))) bad.push(`${where}: ${text.slice(0, 70)}`); };

for (const p of legal.pillars) {
  const h = page(`/plans/justice/${p.number}/`);
  must(h, p.title, `justice ${p.number} title`);
  for (const it of p.items) { must(h, it.title, `justice ${it.id} title`); must(h, it.text, `justice ${it.id} text`); }
}
for (const p of edu.pillars) {
  const h = page(`/plans/education/${p.number}/`);
  must(h, p.title, `education ${p.number} title`);
  p.items.forEach((t, k) => must(h, t, `education ${p.number}.${k + 1}`));
}
const slugs = ['education-and-youth', 'hunger-and-spiritual-enrichment', 'human-rights-and-justice', 'disaster-and-climate', 'healthcare-and-medical-security'];
core.pillars.forEach((p, i) => {
  const h = page(`/what-we-do/${slugs[i]}/`);
  must(h, p.title, `core ${p.number} title`); must(h, p.goal, `core ${p.number} goal`); must(h, p.roadmap, `core ${p.number} roadmap`);
  p.objectives.forEach((o, k) => must(h, o, `core ${p.number} objective ${k + 1}`));
});
// plan hubs
const jh = page('/plans/justice/'); [legal.goal, legal.summary, legal.team, ...legal.targets, ...legal.achievements, ...legal.roadmap.map((r) => r.text)].forEach((t, k) => must(jh, t, `justice hub #${k}`));
const eh = page('/plans/education/'); [edu.executiveSummary, edu.ultimateGoal, ...edu.roadmap.map((r) => r.text)].forEach((t, k) => must(eh, t, `education hub #${k}`));
const wh = page('/what-we-do/'); core.achievements.forEach((a) => { must(wh, a.title, 'achievement title'); must(wh, a.text, 'achievement text'); });
console.log(`checked ${checked} passages across ${legal.pillars.length + edu.pillars.length + 5 + 3} pages`);
console.log(bad.length ? 'MISSING:\n' + bad.join('\n') : 'ALL PRESENT, word for word');
process.exit(bad.length ? 1 : 0);
