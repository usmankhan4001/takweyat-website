// One-off: moves the literal text of pages into CMS "Page text" entries.
// Each text node <p>Hello</p> becomes <p>{t('hello')}</p>; the original wording is kept in src/data/copy.defaults.json
// (the fallback and the seed). Run once; re-running is a no-op on already converted files.
import fs from 'node:fs'; import path from 'node:path';
const ent = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', copy: '©', middot: '·', times: '×', rarr: '→', larr: '←' };
const dec = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1)) : (ent[e] ?? m));
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : p.endsWith('.astro') && files.push(p); });
walk('src/pages'); ['Footer', 'CtaRoll', 'ActionPage', 'PageHead'].forEach((n) => files.push(`src/components/${n}.astro`));
const defaults = {};
const pageName = (f) => f.split(path.sep).join('/').replace(/^src\/(pages|components)\//, '').replace(/\.astro$/, '').replace(/\/index$/, '').replace(/^index$/, 'home').replace(/[\[\]]/g, '').replace(/\//g, '-');
const slug = (t, used) => { let b = t.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').split('_').slice(0, 6).join('_') || 'text'; let k = b, n = 2; while (used.has(k)) k = `${b}_${n++}`; used.add(k); return k; };
let total = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8'); const crlf = s.includes('\r\n'); s = s.replace(/\r\n/g, '\n');
  const m = s.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/); if (!m || /copyFor\(/.test(m[1])) continue;
  const page = pageName(f); const used = new Set(); const map = {};
  // mask script/style so their contents are never touched
  const masks = []; let body = m[2].replace(/<(script|style)\b[\s\S]*?<\/\1>/g, (x) => { masks.push(x); return `\u0000${masks.length - 1}\u0000`; });
  const put = (raw) => { const text = dec(raw).replace(/\s+/g, ' ').trim(); const k = slug(text, used); map[k] = text; return k; };
  body = body.replace(/>([^<>{}\u0000]+)</g, (all, txt) => {
    const t = txt.trim(); if (!/\p{L}/u.test(t)) return all;
    const k = put(txt); return `>${txt.match(/^\s*/)[0]}{t('${k}')}${txt.match(/\s*$/)[0]}<`;
  });
  body = body.replace(/(<(?:Base|PageHead|ActionPage)\b[^>]*?)(\s(?:title|description|lede|headline)=)"([^"{}]*)"/g, (all, pre, attr, val) => {
    if (!/\p{L}/u.test(val)) return all; const k = put(val); return `${pre}${attr}{t('${k}')}`;
  });
  body = body.replace(/\u0000(\d+)\u0000/g, (_, i) => masks[+i]);
  if (!Object.keys(map).length) continue;
  const rel = path.relative(path.dirname(f), 'src/lib').split(path.sep).join('/');
  let fm = m[1].split('\n'); let last = -1; fm.forEach((l, i) => { if (/^import /.test(l)) last = i; });
  fm.splice(last + 1, 0, `import { getCms, copyFor } from '${rel}/cms';`, `const t = copyFor(await getCms(), '${page}');`);
  s = `---\n${fm.join('\n')}\n---\n${body}`; fs.writeFileSync(f, crlf ? s.replace(/\n/g, '\r\n') : s);
  defaults[page] = map; total += Object.keys(map).length; console.log(page, Object.keys(map).length);
}
fs.writeFileSync('src/data/copy.defaults.json', JSON.stringify(defaults, null, 1));
console.log('total', total);
