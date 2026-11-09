// Compares the text of every page served by the CMS-backed server against a static build of the same site.
import fs from 'node:fs'; import path from 'node:path';
const [root, base] = process.argv.slice(2);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name === 'index.html' ? [path.join(d, e.name)] : []);
const E = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', copy: '©', middot: '·' };
const dec = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1)) : (E[e] ?? m));
const txt = (h) => dec(h.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
let bad = 0, n = 0;
for (const f of walk(root)) {
  const url = '/' + path.relative(root, path.dirname(f)).split(path.sep).join('/'); const u = url === '/' ? '/' : url + '/';
  const r = await fetch(base + u); const live = await r.text(); n++;
  if (!r.ok || txt(live) !== txt(fs.readFileSync(f, 'utf8'))) { bad++; console.log(r.status, u, txt(live).length, txt(fs.readFileSync(f, 'utf8')).length); }
}
console.log(`${n} pages compared, ${bad} differ`);
