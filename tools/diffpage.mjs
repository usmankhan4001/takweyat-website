import fs from 'node:fs';
const [file, url] = process.argv.slice(2);
const E = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', mdash: '—', ndash: '–', hellip: '…', copy: '©', middot: '·' };
const dec = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : +e.slice(1)) : (E[e] ?? m));
const txt = (h) => dec(h.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const a = txt(await (await fetch(url)).text()), b = txt(fs.readFileSync(file, 'utf8'));
let i = 0; while (a[i] === b[i]) i++;
console.log('first diff at', i, '\nlive  :', a.slice(Math.max(0, i - 40), i + 80), '\nstatic:', b.slice(Math.max(0, i - 40), i + 80));
