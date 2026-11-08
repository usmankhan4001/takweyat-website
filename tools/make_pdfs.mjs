// Builds the designed PDF documents from the same content files as the website, then prints them with Chrome.
// Usage: node tools/make_pdfs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const legal = read('content/legal-plan.json'), edu = read('content/education-plan.json'), core = read('content/core-pillars.json');
const { eduGroups, justiceGroups } = await import('../src/data/groups.data.mjs');
const url = (p) => pathToFileURL(path.join(root, p)).href;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = path.join(root, 'public/downloads'), tmp = path.join(root, 'tools/pdf');
fs.mkdirSync(outDir, { recursive: true }); fs.mkdirSync(tmp, { recursive: true });

const css = (accent) => `
@font-face{font-family:Gloock;src:url(${url('public/fonts/gloock-latin-400-normal.woff2')}) format('woff2')}
@font-face{font-family:'DM Sans';font-weight:100 1000;src:url(${url('public/fonts/dm-sans-latin-wght-normal.woff2')}) format('woff2')}
@page{size:A4;margin:20mm 18mm 22mm;@bottom-center{content:counter(page);font:500 9pt 'DM Sans';color:#7B7B7B}}
@page:first{margin:0;@bottom-center{content:none}}
*{box-sizing:border-box;margin:0}
body{font:400 10pt/1.55 'DM Sans',sans-serif;color:#0B0902;--a:${accent}}
h1,h2,h3{font-family:Gloock,serif;font-weight:400;line-height:1.1}
.cover{height:297mm;width:210mm;background:var(--a);color:#F3EFE6;padding:26mm 22mm;display:flex;flex-direction:column;justify-content:space-between;page-break-after:always;break-after:page}
.cover img{height:15mm;align-self:flex-start}
.cover h1{font-size:46pt;letter-spacing:-.01em}
.cover p{font-size:15pt;margin-top:8mm;max-width:130mm;opacity:.92}
.cover small{font-size:9pt;opacity:.8}
.pg{break-before:page}
h2{font-size:24pt;margin-bottom:6mm;color:var(--a)}
h3{font-size:14pt}
.lede{font-size:12pt;line-height:1.5;max-width:150mm}
.phases{display:grid;grid-template-columns:1fr 1fr;gap:5mm;margin-top:6mm}
.ph{border-top:3mm solid var(--a);background:#F3EFE6;padding:5mm}
.ph small{font-weight:700;color:var(--a)} .ph h3{margin:2mm 0}
ul.t{padding-left:5mm} ul.t li{margin-bottom:3mm}
.toc h3{margin:7mm 0 2mm;color:var(--a);font-size:13pt;border-bottom:.4mm solid #0B0902;padding-bottom:1.5mm}
.toc li{list-style:none;display:flex;gap:4mm;margin:1.4mm 0} .toc b{font-family:Gloock;color:var(--a);width:8mm;flex:none}
.pillar{break-before:page}
.pillar .n{font:400 54pt/1 Gloock;color:var(--a)}
.pillar h2{margin:1mm 0 7mm;color:#0B0902;font-size:21pt}
.it{margin-top:5.5mm;padding-top:3.5mm;border-top:.35mm solid #cfc8b6;break-inside:avoid}
.it h3{font-size:12pt;color:var(--a)} .it h3 i{font:700 8.5pt 'DM Sans';font-style:normal;margin-right:2mm;color:#0B0902}
.it p{margin-top:1.5mm}
.bl li{margin:0 0 3.2mm 5mm;break-inside:avoid}
.end{margin-top:14mm;color:#7B7B7B;font-size:9pt}
`;
const shell = (title, accent, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${css(accent)}</style></head><body>${body}</body></html>`;
const logo = url('public/logo-cream.png');
const cover = (title, sub, tag) => `<section class="cover"><img src="${logo}"><div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div><small>${esc(tag)}</small></section>`;
const roadmap = (r) => `<div class="phases">${r.map((p) => `<div class="ph"><small>${esc(p.phase)} · ${esc(p.years)}</small><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p></div>`).join('')}</div>`;
const toc = (groups, plan) => `<section class="pg toc"><h2>Contents</h2>${groups.map((g) => `<h3>${esc(g.name)}</h3><ul>${g.pillars.map((n) => `<li><b>${n}</b><span>${esc(plan.pillars.find((p) => p.number === n).title)}</span></li>`).join('')}</ul>`).join('')}</section>`;

const docs = [];

// ---- Educational Plan
docs.push({
  file: 'takweyat-educational-plan', title: 'The Educational Plan', accent: '#007A7A',
  html: shell('Takweyat Educational Plan: The Global Vision', '#007A7A',
    cover('The Educational Plan', 'The Global Vision', 'Takweyat International Organization') +
    `<section class="pg"><h2>Executive Summary</h2><p class="lede">${esc(edu.executiveSummary)}</p><h2 style="margin-top:12mm">Our Ultimate Goal</h2><p class="lede">${esc(edu.ultimateGoal)}</p></section>` +
    `<section class="pg"><h2>${esc(edu.roadmapHeading)}</h2>${roadmap(edu.roadmap)}</section>` +
    toc(eduGroups, edu) +
    edu.pillars.map((p) => `<section class="pillar"><div class="n">${p.number}</div><h2>${esc(p.title)}</h2><ul class="bl">${p.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>`).join('') +
    `<p class="end">End of the Educational Plan. These pillars are long-term goals, not completed work.</p>`),
});

// ---- Legal Aid and Justice Plan
docs.push({
  file: 'takweyat-legal-aid-and-justice-plan', title: 'The Global Legal Aid and Justice Plan', accent: '#A21E66',
  html: shell('Takweyat Global Legal Aid and Justice Plan: The Manifesto of Rights', '#A21E66',
    cover('The Global Legal Aid and Justice Plan', 'The Manifesto of Rights', 'Takweyat International Organization') +
    `<section class="pg"><h2>Our Goal</h2><p class="lede">${esc(legal.goal)}</p><h2 style="margin-top:12mm">Our Summary</h2><p class="lede">${esc(legal.summary)}</p></section>` +
    `<section class="pg"><h2>Our Roadmap</h2>${roadmap(legal.roadmap)}<h2 style="margin-top:12mm">Our Targets</h2><ul class="t">${legal.targets.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></section>` +
    `<section class="pg"><h2>${esc(legal.achievementsHeading)}</h2><ul class="t">${legal.achievements.map((t) => `<li>${esc(t)}</li>`).join('')}</ul><h2 style="margin-top:12mm">Our Team</h2><p class="lede">${esc(legal.team)}</p></section>` +
    toc(justiceGroups, legal) +
    legal.pillars.map((p) => `<section class="pillar"><div class="n">${p.number}</div><h2>${esc(p.title)}</h2>${p.items.map((i) => `<div class="it"><h3><i>${i.id}</i>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('')}</section>`).join('') +
    `<p class="end">End of the Global Legal Aid and Justice Plan. These pillars are long-term goals, not completed work.</p>`),
});

// ---- Takweyat at a glance
const g = (t) => esc(t);
docs.push({
  file: 'takweyat-profile', title: 'Takweyat at a glance', accent: '#00504F',
  html: shell('Takweyat at a glance', '#00504F',
    cover('Takweyat at a glance', 'A Coalition of Professionals. A Commitment to Society.', 'Takweyat International Organization') +
    `<section class="pg"><h2>Who we are</h2><p class="lede">Takweyat International Organization (تقویت) is a dynamic collective of civil society members originating from diverse professional backgrounds. We are lawyers, doctors, educators, and social workers who believe that true societal strength comes from active, on-ground participation rather than passive observation. Grounded in core Islamic values of justice, ethical responsibility, and brotherhood, we pool our own professional expertise and time to intervene where society needs it most.</p><h2 style="margin-top:12mm">What we do</h2><ul class="t">${core.achievements.map((a) => `<li><b>${g(a.title)}:</b> ${g(a.text)}</li>`).join('')}</ul></section>` +
    `<section class="pg"><h2>Our five pillars</h2>${core.pillars.map((p) => `<div class="it"><h3>${g(p.title)}</h3><p>${g(p.goal)}</p></div>`).join('')}</section>` +
    `<section class="pg"><h2>Our long-term plans</h2><div class="it"><h3>The Educational Plan: The Global Vision</h3><p>${g(edu.ultimateGoal)}</p></div><div class="it"><h3>The Global Legal Aid and Justice Plan: The Manifesto of Rights</h3><p>${g(legal.goal)}</p></div><h2 style="margin-top:12mm">How to take part</h2><p class="lede">We do not ask for your funds; we ask for your expertise. Write to contact@takweyat.org.</p></section>`),
});

// ---- press release stub
docs.push({
  file: 'takweyat-press-release-stub', title: 'Press release stub', accent: '#007A7A', plain: true,
  html: shell('Takweyat press release (stub)', '#007A7A',
    `<style>@page:first{margin:20mm 18mm 22mm;@bottom-center{content:none}}h1.r{font-size:26pt;margin:6mm 0}</style><img src="${url('public/logo.png')}" style="height:16mm"><p style="margin-top:12mm;font-weight:700;letter-spacing:.06em">FOR IMMEDIATE RELEASE</p><h1 class="r">[Headline: what is being announced, in one clear line]</h1><p class="lede"><b>[City, Date]</b> — [Opening paragraph: who, what, when and where, in two or three sentences.]</p><p style="margin-top:5mm">[Second paragraph: why it matters and who it helps.]</p><p style="margin-top:5mm">[A short quotation from a spokesperson, with name and role.]</p><p style="margin-top:5mm">[Practical details: how to take part, how to get help, or where to find out more.]</p><h3 style="margin-top:14mm">About Takweyat International Organization</h3><p style="margin-top:2mm">Takweyat International Organization (تقویت) is a dynamic collective of civil society members originating from diverse professional backgrounds. We are lawyers, doctors, educators, and social workers who believe that true societal strength comes from active, on-ground participation rather than passive observation.</p><h3 style="margin-top:8mm">Media contact</h3><p style="margin-top:2mm">contact@takweyat.org</p>`),
});

for (const d of docs) {
  const html = path.join(tmp, d.file + '.html'), pdf = path.join(outDir, d.file + '.pdf');
  fs.writeFileSync(html, d.html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=20000', `--print-to-pdf=${pdf}`, pathToFileURL(html).href], { stdio: 'ignore', timeout: 240000 });
  console.log(d.file + '.pdf', (fs.statSync(pdf).size / 1024).toFixed(0) + ' KB');
}
