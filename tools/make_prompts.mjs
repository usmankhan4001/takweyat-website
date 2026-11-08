// Builds the image prompt pack: docs/artifacts/image-prompts.md and docs/artifacts/image-prompts.html
// Usage: node tools/make_prompts.mjs
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');

const PAL = 'Strict palette only: deep teal #00504F, teal #007A7A, light teal #8FE0DA, pale mint #DCEEEC, off-white #F3F6F5, near-black #0D1716, and raspberry #A21E66 used once or twice as the single accent.';
const BASE = `Flat vector editorial illustration. Geometric shapes, no outlines, no gradients, no shadows, no texture, no text, no letters, no numbers. ${PAL} Calm, dignified, modern. Pakistani setting with local architecture and clothing, no stereotypes. Any people are men or boys, shown from behind, as faceless simple figures, or as hands only. No women.`;
const MINT = 'Plain pale mint #DCEEEC background.';
const TRANS = 'Transparent background, subject isolated, no ground shadow.';
const WIDE = 'Wide composition with calm empty space on the left third where a headline will sit.';
const ICON = (s) => `Single-weight line icon, 6px rounded stroke on a 512px canvas, deep teal #00504F, with one small raspberry #A21E66 accent shape, centred with generous padding, transparent background, no text, no gradient, no shadow, consistent geometric style across the set. Subject: ${s}.`;
const PHOTO = (s) => `Documentary photograph, natural light, Pakistan, ${s}. Shot from behind or at a distance, no visible faces, no women, muted teal-leaning colour grade, shallow depth of field, realistic, no text, no logos.`;
const VIDEO = (s) => `Slow, steady camera, soft natural light, Pakistan, ${s}. No faces in focus, no women, muted teal colour grade, 1080p, seamless 10 second loop, no audio, no text.`;

const items = [];
const add = (sec, file, size, where, prompt) => items.push({ sec, file, size, where, prompt });
const ill = (sec, file, size, where, scene, extra = MINT) => add(sec, file, size, where, `${BASE} ${scene} ${extra}`);

// 1 page banners
const B = '2400 x 1350 (16:9)';
ill('1. Page header banners', 'banner-about.png', B, 'About us header, right side', 'Skyline of Islamabad with the Faisal Mosque in the distance, hills behind, a raspberry sun low on the horizon.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-what-we-do.png', B, 'What we do header', 'A wide landscape road with five small vignettes along it in a row: a village school, a food table, a courthouse, a flood relief tent, a medical camp tent.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-legal-aid.png', B, 'Free legal aid header', 'A courthouse interior, a long corridor, scales of justice on a plinth, light falling through a tall arched window.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-plans.png', B, 'Our plans header', 'A long road winding over hills towards a distant city, small milestone markers along the road.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-initiatives.png', B, 'Initiatives header', 'A skyline of simple buildings side by side: school, library, clinic, university dome, law chamber.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-get-involved.png', B, 'Get involved and Join headers', 'Open hands reaching up towards a rising sun over low hills.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-contact.png', B, 'Contact header', 'A desk seen from above with an envelope, a phone and a map pin.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-press.png', B, 'Press and media kit headers', 'A microphone, a notebook and a camera on a table, flat shapes.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-whitepapers.png', B, 'Whitepapers header', 'A stack of printed documents tied with a ribbon and a download arrow.', `${WIDE} ${MINT}`);
ill('1. Page header banners', 'banner-404.png', B, '404 page', 'An empty road sign pointing two ways, a lost lantern, a crescent moon.', `${WIDE} ${MINT}`);

// 2 home page
const SQ = '1600 x 1200 (4:3)';
ill('2. Home page', 'home-legal-spot.png', '1200 x 1500 (4:5)', 'Home legal aid spotlight (beside or instead of the video)', 'Two men at a wooden desk seen from behind, a file tied with a ribbon between them, a desk lamp, shelves of law books.');
ill('2. Home page', 'home-plans-education.png', SQ, 'Home, Educational Plan panel', 'A rising path of books and school roofs climbing a hill towards a bright sun.');
ill('2. Home page', 'home-plans-justice.png', SQ, 'Home, Legal Aid and Justice Plan panel', 'Scales of justice above an open law book, a courthouse in the distance.');
ill('2. Home page', 'home-join.png', SQ, 'Home, closing call to join', 'A lawyer in a black coat, a doctor in a white coat and a teacher with a book, all seen from behind, facing a rising sun.');
ill('2. Home page', 'home-networks.png', SQ, 'Home, volunteer networks', 'Five hands of different skin tones stacking one on another over a pale map shape of Pakistan in light teal.');

// 3 pillars and areas of work
ill('3. Five pillars and seven areas of work', 'pillar-education.png', SQ, 'Pillar page: Educational Reforms & Youth Empowerment', 'A small village school with a flat roof and arched door, boys\' school bags on a bench, an open book in the foreground, a raspberry sun behind.');
ill('3. Five pillars and seven areas of work', 'pillar-hunger.png', SQ, 'Pillar page: Hunger Eradication & Spiritual Enrichment', 'A big pot of steaming rice on a low table, a stack of flatbreads, a lantern, a crescent moon and one star, hands passing a plate.');
ill('3. Five pillars and seven areas of work', 'pillar-rights.png', SQ, 'Pillar page: Human Rights Protection & Social Justice', 'A courthouse with columns, scales of justice in front, a man in a black coat seen from behind climbing the steps.');
ill('3. Five pillars and seven areas of work', 'pillar-disaster.png', SQ, 'Pillar page: Disaster Management & Climate Change', 'A flooded village street, a relief tent on dry ground, men carrying boxes of supplies, rain clouds clearing.');
ill('3. Five pillars and seven areas of work', 'pillar-health.png', SQ, 'Pillar page: Healthcare Access & Medical Security', 'A medical camp under a tent, a folding table with a first-aid box, a doctor from behind holding a stethoscope, a queue of silhouetted men.');
const T = '1200 x 1500 (4:5)';
const tiles = [
  ['fighting-hunger', 'Fighting Hunger', 'Hands packing food parcels along a long table, steam rising from a pot.'],
  ['ramadan', 'Ramadan & Spiritual Activities', 'An iftar spread on a low table at dusk, a lantern, dates, a crescent moon in the sky.'],
  ['disaster-relief', 'Disaster Relief', 'Relief tents on dry ground beside a flooded field, men carrying supply boxes.'],
  ['free-legal-aid', 'Free Legal Aid', 'A lawyer in a black coat seen from behind handing a file to a seated client.'],
  ['education-counseling', 'Education & Career Counseling', 'A teacher at a blackboard seen from behind with boys listening, a rising arrow drawn on the board.'],
  ['medical-camps', 'Medical Camps', 'A doctor from behind examining a seated patient under a tent, a first-aid box on the table.'],
  ['community-support', 'Community Support', 'A group of men in simple clothes building a small wall together, one holding a level.'],
];
for (const [f, n, s] of tiles) ill('3. Five pillars and seven areas of work', `tile-${f}.png`, T, `Home and What we do: "${n}" tile background`, s);

// 4 plans
const eduPh = ['The Grassroots Foundation: a seedling growing from a cracked field, a small village in the distance.', 'Institutional Infrastructure: a school building under construction, a crane, a stack of bricks.', 'The Higher Education & Tech Leap: a domed university with a library tower and a laptop floating beside it.', 'Global Expansion & Policy Leadership: a globe with a ring of small school and hospital shapes around it.'];
const jusPh = ['Domestic Consolidation: a small law chamber with a lit window and files stacked on the step.', 'Corporate & Systemic Litigation: a tall glass tower with a courthouse facing it, scales between them.', 'Cross-Border & Precedent Transfer: a document being passed from one pair of hands to another across a river bridge.', 'Global Restitution & International Law: a globe with scales above and a dove carrying an olive branch.'];
const SQR = '1600 x 1600 (1:1)';
eduPh.forEach((s, i) => ill('4. Plans: phases and groups', `phase-edu-${i + 1}.png`, SQR, `Educational Plan roadmap, phase ${i + 1}`, s));
jusPh.forEach((s, i) => ill('4. Plans: phases and groups', `phase-jus-${i + 1}.png`, SQR, `Legal Aid and Justice Plan roadmap, phase ${i + 1}`, s));
ill('4. Plans: phases and groups', 'plan-education-hero.png', B, 'Educational Plan page header', 'A long path of books and school roofs rising over hills to a distant university dome.', `${WIDE} ${MINT}`);
ill('4. Plans: phases and groups', 'plan-justice-hero.png', B, 'Legal Aid and Justice Plan page header', 'A long road from a small law chamber over hills to a domed courthouse with scales above it.', `${WIDE} ${MINT}`);
const eduG = ['Vision and values: a compass resting on an open book.', 'Truth, history and civics: a scroll, a quill and a column of old stone.', 'Language and culture: two joined speech shapes, a pen nib and a book. No lettering.', 'Technology and skills: a laptop beside a toolbox with a leaf of circuit lines growing from it.', 'Reaching every child: a line of school bags walking along a village path towards a school.', 'Teachers and institutions: a teacher at a blackboard seen from behind, a chalk line of arrows.', 'Knowledge infrastructure: a library tower with a satellite dish, a stack of servers and books.', 'Society and policy: a town hall with a balanced scale and a ballot box.'];
const jusG = ['Rights of people: a raised open palm inside a circle of linked hands.', 'State power, courts and prisons: a courtroom bench beside a barred window with light coming through.', 'Corporate power and markets: a tall tower casting a long shadow over a small shop.', 'Health and medicine: a stethoscope shaped into a heart over a capsule.', 'Environment, land and resources: a river between two fields, a tree and a water drop.', 'Technology and information: a padlock on a phone, a data stream turning into a shield.', 'Education, culture and history: a school bench, a scroll and a column.', 'Global order and peace: a globe with a dove above it carrying an olive branch.'];
eduG.forEach((s, i) => ill('4. Plans: phases and groups', `edu-group-${i + 1}.png`, SQR, `Educational Plan, group ${i + 1} header (${s.split(':')[0]})`, s));
jusG.forEach((s, i) => ill('4. Plans: phases and groups', `jus-group-${i + 1}.png`, SQR, `Legal Plan, group ${i + 1} header (${s.split(':')[0]})`, s));

// 5 legal aid and join
const steps = ['A man at a phone filling in a form, a document with a tick beside him.', 'Two figures reviewing a file under a lamp at a desk.', 'A lawyer and a client at a desk, seen from behind, an open file between them.', 'A lawyer in a black coat walking up courthouse steps with a file.'];
steps.forEach((s, i) => ill('5. Legal aid, Join and Take action', `legal-step-${i + 1}.png`, SQ, `Free legal aid, step ${i + 1} of 4`, s));
const scope = ['Criminal Defense for the Marginalized: a barred window with a lit lamp and a file on a bench.', 'Human Rights & Constitutional Violations: a raised hand and an open book of law.', 'Domestic Violence & Family Protection: a house with a protective shield shape over the roof.', 'Public Interest Litigation: a courthouse facing a crowd of silhouettes, a megaphone shape.'];
scope.forEach((s, i) => ill('5. Legal aid, Join and Take action', `legal-scope-${i + 1}.png`, SQ, `Free legal aid, scope item ${i + 1}`, s));
const onb = ['Application: a form with a pen and an envelope.', 'Review: a committee table seen from behind, a magnifier over a folder.', 'Orientation: a small classroom with a whiteboard, men seated, a lantern on the desk.'];
onb.forEach((s, i) => ill('5. Legal aid, Join and Take action', `join-step-${i + 1}.png`, SQ, `Join the movement, onboarding step ${i + 1}`, s));
ill('5. Legal aid, Join and Take action', 'join-hero.png', B, 'Join the movement header', 'Professionals in silhouette (a lawyer in a black coat, a doctor in a white coat, a teacher with a book) walking together towards a rising sun.', `${WIDE} ${MINT}`);
const ta = [['legal-aid', 'a scale on a desk beside a file'], ['volunteer', 'two hands joining over a pair of work gloves'], ['partner', 'two buildings joined by a bridge'], ['press', 'a microphone and a notebook'], ['updates', 'an open envelope with a letter rising from it']];
ta.forEach(([f, s]) => ill('5. Legal aid, Join and Take action', `take-action-${f}.png`, '1200 x 1200 (1:1)', `Take action, "${f}" card`, `${s.charAt(0).toUpperCase() + s.slice(1)}. Single centred subject with lots of empty space.`, TRANS));

// 6 networks
const nets = [['legal', 'The Legal Network', 'Advocates and law students: a lawyer in a black coat seen from behind, law books and a petition in hand.'], ['medical', 'The Medical & Healthcare Network', 'Doctors and nurses: a doctor from behind with a stethoscope, a medical bag and a medicine box.'], ['education', 'The Education & Mentorship Panel', 'Teachers and corporate professionals: a mentor from behind at a whiteboard with a laptop and an open book.'], ['field', 'The Field Action & Relief Squad', 'Youth and civil society: young men in vests carrying relief boxes along a flooded street.'], ['partners', 'In-Kind & Institutional Partnerships', 'Businesses and organisations: a bakery counter handing a tray of bread to a volunteer, a printing press beside it.']];
nets.forEach(([f, n, s]) => ill('6. Volunteer networks', `network-${f}.png`, SQ, `About and home: "${n}"`, s));

// 7 initiatives
const inits = [['boycott-israel-platform', 'Boycott Israel Platform: a megaphone beside a globe, an awareness leaflet.'], ['legal-chambers', 'Takweyat Legal Chambers: a small law chamber building with a lit window and a nameplate shape.'], ['publishing-house', 'Takweyat Publishing House and Translation Bureau: a printing press and a stack of books with a pen.'], ['chain-of-progressive-schools', 'Takweyat Chain of Progressive Schools: three small school buildings in a row.'], ['chain-of-advanced-colleges', 'Takweyat Chain of Advanced Colleges: a college building with a clock tower and a graduation cap.'], ['global-open-university', 'Takweyat Global Open University: a domed building with a globe and a laptop.'], ['teacher-training-academy', 'Takweyat Teacher Training Academy: a teacher at a blackboard with a small group seated.'], ['central-library', 'Takweyat Central Library: a grand library with tall shelves of books and a reading lamp.'], ['vocational-institutes', 'Takweyat Vocational Institutes: a workshop with tools, a sewing machine and a wrench.'], ['startup-incubator', 'Takweyat Startup Incubator: a lightbulb over a small seedling in a pot, a laptop.'], ['learner-app', 'Takweyat Learner App: a phone showing a simple lesson card and an open book.'], ['climate-action-fund', 'Climate Action Fund: a tree with a water drop and a coin in cupped hands.'], ['medical-security-fund', 'Medical Security Fund: a medical cross over a shield with a coin.'], ['global-legal-coalition', 'Takweyat Global Legal Coalition: joined hands around a globe with scales above.']];
inits.forEach(([f, s]) => ill('7. The 14 initiatives', `init-${f}.png`, SQ, `Initiative page and menu: ${f}`, `${s} Single object or small building in the centre with lots of empty space.`));

// 8 people and spot art, transparent
const sil = ['A lawyer in a black coat holding a file', 'A doctor in a white coat with a stethoscope', 'A teacher holding a book and chalk', 'A social worker holding a clipboard', 'A student with a school bag', 'A volunteer carrying a box of food', 'An elder in a prayer cap seated on a stool', 'Two boys reading one book together'];
sil.forEach((s, i) => add('8. People and spot art (transparent)', `figure-${i + 1}.png`, '1200 x 1600 (3:4)', 'Used small beside paragraphs and in cards', `${BASE} Full-body flat figure seen from behind or in profile, faceless, no women. ${s}. ${TRANS}`));
const spots = ['A lantern', 'A crescent moon with one star', 'A date palm', 'A river with a small boat', 'An open door with light spilling out', 'A key', 'Scales with a heart on one pan', 'A seed in cupped hands'];
spots.forEach((s, i) => add('8. People and spot art (transparent)', `spot-${i + 1}.png`, '1024 x 1024 (1:1)', 'Small decoration between sections', `${BASE} ${s}. Single centred object. ${TRANS}`));

// 9 backgrounds, covers, share
add('9. Backgrounds, covers and share images', 'pattern-geometric.png', '1024 x 1024 seamless tile', 'Very faint section background if wanted', `A seamless repeating Islamic geometric tile pattern, thin lines, light teal #8FE0DA on transparent background, very low contrast, flat vector, no text, tiles perfectly on all four edges.`);
add('9. Backgrounds, covers and share images', 'skyline-mosque.png', '3000 x 1000 (3:1)', 'Footer decoration', `${BASE} A calm skyline silhouette of mosque domes and minarets with a few trees, single colour deep teal #00504F. ${TRANS}`);
add('9. Backgrounds, covers and share images', 'route-line.png', '2400 x 600 (4:1)', 'Plans roadmap connector', `${BASE} A thin dashed road line curving left to right with four small round stops along it, near-black #0D1716 line, light teal stops. ${TRANS}`);
add('9. Backgrounds, covers and share images', 'seal.png', '1024 x 1024', 'Footer and press pages', `${BASE} A round seal: a crescent, a balanced scale and an open book inside a thin double ring. One colour deep teal #00504F with a raspberry accent. No lettering. ${TRANS}`);
const cov = [['educational-plan', 'Educational Plan cover: a rising path of books and school roofs in teal and mint.'], ['legal-plan', 'Legal Aid and Justice Plan cover: scales above an open law book in raspberry and deep teal.'], ['profile', 'Takweyat at a glance cover: a circle of silhouetted men and boys under a rising sun.'], ['press', 'Press release letterhead: a thin deep teal band across the top, nothing else.']];
cov.forEach(([f, s]) => ill('9. Backgrounds, covers and share images', `cover-${f}.png`, '2480 x 3508 (A4 portrait)', `PDF: ${f}`, `${s} Leave the top third plain for the title.`));
const share = [['default', 'a raspberry sun on a horizon over deep teal hills'], ['education', 'a school and open book'], ['hunger', 'a steaming pot and a lantern'], ['rights', 'scales and a courthouse'], ['disaster', 'a relief tent beside water'], ['health', 'a medical tent with a cross']];
share.forEach(([f, s]) => ill('9. Backgrounds, covers and share images', `share-${f}.png`, '1200 x 630', 'Link preview image (headline added in code)', `${s.charAt(0).toUpperCase() + s.slice(1)}. Wide, centred right, empty space left.`, MINT));
add('9. Backgrounds, covers and share images', 'state-success.png', '800 x 800', 'Form sent', `${BASE} An open envelope with a check mark in a circle above it. ${TRANS}`);
add('9. Backgrounds, covers and share images', 'state-empty.png', '800 x 800', 'Empty list or no results', `${BASE} An empty folder with a ribbon and a small lantern. ${TRANS}`);

// 10 icons
const icons = {
  'Subjects (large marks)': ['scales of justice', 'gavel', 'open book', 'graduation cap', 'stethoscope', 'first-aid kit', 'bowl of food', 'crescent moon and star', 'lifebuoy', 'two helping hands', 'handshake', 'school building', 'university dome', 'library shelves', 'megaphone', 'tree', 'water droplet', 'house with shield', 'seedling', 'globe'],
  'Plans and navigation': ['map', 'compass', 'road with a milestone', 'flag', 'calendar', 'clock', 'magnifier', 'menu lines', 'close cross', 'arrow up-right', 'arrow right', 'chevron down'],
  'Forms and contact': ['user', 'phone', 'envelope', 'location pin', 'document', 'upload tray', 'padlock', 'check in a circle', 'warning triangle', 'chat bubble'],
  'Press and media': ['microphone', 'camera', 'newspaper', 'download tray', 'link chain', 'share nodes', 'play button', 'image frame'],
  'People and roles': ['lawyer with a briefcase', 'doctor with a cross', 'teacher at a board', 'social worker with a heart', 'student with a cap', 'volunteer with a box'],
};
for (const [g, list] of Object.entries(icons)) list.forEach((s) => add(`10. Icons: ${g}`, `icon-${s.replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')}.png`, '512 x 512', 'Menus, lists, cards, forms', ICON(s)));

// 11 photos
const photos = [['courthouse-corridor', 'a courthouse corridor with a lawyer in a black coat walking away'], ['school-courtyard', 'a school courtyard at morning with boys in uniform seen from behind'], ['food-packing', 'volunteers\' hands packing food parcels on a long table'], ['flood-relief', 'a flooded street with relief tents and men carrying boxes'], ['medical-camp', 'a medical camp tent with a doctor from behind examining a patient'], ['signing', 'hands signing a document on a wooden desk'], ['reading-tree', 'boys reading together under a tree'], ['meeting', 'a group of men at a table in discussion seen from behind']];
photos.forEach(([f, s]) => add('11. Photographic atmosphere (optional)', `photo-${f}.jpg`, '2400 x 1600 (3:2)', 'Backgrounds only. Never as proof of real work', PHOTO(s)));

// 12 video
const vids = [['hero-islamabad', 'slow aerial pass over Islamabad at dusk with the Faisal Mosque', 'Islamabad aerial Faisal Mosque drone (you already have this)'], ['justice-scales', 'slow push-in on scales of justice, a gavel and law books', 'scales of justice gavel law books (you already have this)'], ['education', 'boys\' school bags on a bench, a hand turning a page, soft morning light', 'Pakistan school boys classroom, children reading'], ['hunger', 'hands packing food parcels along a long table, steam rising', 'food distribution packing hands, iftar'], ['healthcare', 'a stethoscope, a medicine box and a hand writing notes at a camp table', 'doctor stethoscope medical camp hands'], ['disaster', 'slow pan across a flooded field towards relief tents', 'flood relief camp tents aerial'], ['volunteers', 'close shot of hands joining one on another', 'hands joining teamwork together (you already have this)'], ['pattern-loop', 'slowly drifting Islamic geometric pattern in teal', 'Islamic geometric pattern animation loop teal']];
vids.forEach(([f, s, q]) => add('12. Video (AI generation or Envato)', `video-${f}.mp4`, '1920 x 1080, 10 to 15 s, no audio', 'Section and hero backgrounds', `${VIDEO(s)}  |  Envato search: ${q}`));

const secs = [...new Set(items.map((i) => i.sec))];
// markdown
let md = '# Takweyat image prompt pack\n\nSave each result with the exact filename shown, in `D:\\Apps\\Takweyat\\website\\assets-in\\`.\n';
for (const s of secs) { md += `\n## ${s}\n`; for (const i of items.filter((x) => x.sec === s)) md += `\n### ${i.file}\n- Size: ${i.size}\n- Used: ${i.where}\n\n\`\`\`\n${i.prompt}\n\`\`\`\n`; }
fs.writeFileSync(path.join(root, 'docs/artifacts/image-prompts.md'), md);
fs.writeFileSync(path.join(root, 'docs/artifacts/image-prompts.json'), JSON.stringify({ secs, items }));
console.log(items.length + ' prompts in ' + secs.length + ' sections');
// the shareable page with copy buttons
const tpl = fs.readFileSync(path.join(root, 'docs/artifacts/image-prompts.template.html'), 'utf8');
fs.writeFileSync(path.join(root, 'docs/artifacts/image-prompts.html'), tpl.replace('__DATA__', () => JSON.stringify({ secs, items })));
