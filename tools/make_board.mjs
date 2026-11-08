// Builds docs/artifacts/style-board.html (the colour/icon/CTA discussion board) with Phosphor icons inlined.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const dir = (w) => path.join(root, 'node_modules/@phosphor-icons/core/assets', w);
const names = ['scales','gavel','handshake','hand-heart','graduation-cap','stethoscope','bowl-food','lifebuoy','users-three','book-open-text','shield-check','newspaper','envelope-simple','map-pin','download-simple','arrow-right','arrow-up-right','seal-check','lock-key','clock','file-text','hands-praying','tree-evergreen','drop','house-line','first-aid-kit','microphone-stage','hand-waving'];
const inner = (w, n) => {
  const f = path.join(dir(w), w === 'regular' ? `${n}.svg` : `${n}-${w}.svg`);
  return fs.readFileSync(f, 'utf8').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
};
const sprite = names.map((n) => `<symbol id="i-${n}" viewBox="0 0 256 256">${inner('regular', n)}</symbol><symbol id="f-${n}" viewBox="0 0 256 256">${inner('fill', n)}</symbol>`).join('');
const ic = (n, c = '', fill = false) => `<svg class="ic ${c}" aria-hidden="true"><use href="#${fill ? 'f' : 'i'}-${n}"/></svg>`;
const html = fs.readFileSync(path.join(root, 'docs/artifacts/style-board.template.html'), 'utf8')
  .replace('{{ICONGRID}}', names.map((n) => '<div class="icell">' + ic(n) + n + '</div>').join(''))
  .replace('<!--SPRITE-->', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${sprite}</svg>`)
  .replace(/\{\{ic:([a-z-]+)(?::([a-z-]*))?(:fill)?\}\}/g, (_, n, c, f) => ic(n, c || '', !!f));
fs.writeFileSync(path.join(root, 'docs/artifacts/style-board.html'), html);
console.log('docs/artifacts/style-board.html', (html.length / 1024).toFixed(0) + ' KB');
