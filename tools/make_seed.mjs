// Builds .emdash/seed.json (collections + the current site content) from content/*.json and src/data/*.ts.
// Applied with `emdash seed` (skips anything that already exists, so CMS edits are never overwritten).
import fs from 'node:fs';
import { site } from '../src/data/site.ts';
import { networks } from '../src/data/networks.ts';
import { releases } from '../src/data/press.ts';
import copyDefaults from '../src/data/copy.defaults.json' with { type: 'json' };
const j = (f) => JSON.parse(fs.readFileSync(new URL(`../content/${f}.json`, import.meta.url), 'utf8'));
const core = j('core-pillars'), edu = j('education-plan'), legal = j('legal-plan');
const coreSlugs = ['education-and-youth', 'hunger-and-spiritual-enrichment', 'human-rights-and-justice', 'disaster-and-climate', 'healthcare-and-medical-security'];
const f = (slug, label, type = 'string', extra = {}) => ({ slug, label, type, ...extra });
const col = (slug, label, labelSingular, fields, extra = {}) => ({ slug, label, labelSingular, supports: ['drafts', 'revisions'], fields, ...extra });

const collections = [
  col('site', 'Site settings', 'Site settings', [
    f('title', 'Name', 'string', { required: true }), f('short', 'Short name'), f('name_urdu', 'Name in Urdu'),
    f('email', 'Contact email'), f('phone', 'Phone'), f('whatsapp', 'WhatsApp'), f('helpline', 'Helpline'), f('boycott_platform', 'Boycott platform link', 'url'),
    f('offices', 'Offices (list of {name, lines})', 'json'), f('nav', 'Main menu (list of {label, href})', 'json'), f('footer_links', 'Footer links (groups of {label, href})', 'json'),
  ], { sortOrder: 1 }),
  col('pillars', 'Core pillars', 'Pillar', [
    f('title', 'Title', 'string', { required: true }), f('number', 'Number', 'integer'), f('goal', 'Goal', 'text'), f('roadmap', 'Roadmap', 'text'), f('objectives', 'Objectives (list of text)', 'json'),
  ], { sortOrder: 2 }),
  col('achievements', 'Achievements', 'Achievement', [f('title', 'Title', 'string', { required: true }), f('text', 'Text', 'text'), f('order', 'Order', 'integer')], { sortOrder: 3 }),
  col('networks', 'Volunteer networks', 'Network', [
    f('title', 'Title', 'string', { required: true }), f('who', 'Who it is for'), f('color', 'Colour (CSS value)'), f('text', 'Text', 'text'), f('order', 'Order', 'integer'),
  ], { sortOrder: 4 }),
  col('releases', 'Press releases', 'Press release', [
    f('title', 'Title', 'string', { required: true }), f('date', 'Date (text)'), f('summary', 'Summary', 'text'), f('pdf', 'PDF link'), f('order', 'Order', 'integer'),
  ], { sortOrder: 5 }),
  col('plans', 'Plans (full documents)', 'Plan', [f('title', 'Title', 'string', { required: true }), f('data', 'Whole plan (JSON)', 'json')], { sortOrder: 6 }),
  col('copy', 'Page text', 'Page text', [f('title', 'Page', 'string', { required: true }), f('text', 'Text blocks (JSON: name → text)', 'json')], { sortOrder: 7 }),
];
const e = (id, slug, data) => ({ id, slug, status: 'published', data });
const content = {
  site: [e('site', 'site', { title: site.name, short: site.short, name_urdu: site.nameUrdu, email: site.email, phone: site.phone ?? '', whatsapp: site.whatsapp ?? '', helpline: site.helpline ?? '', boycott_platform: site.boycottPlatform, offices: site.offices, nav: site.nav, footer_links: site.footerLinks })],
  pillars: core.pillars.map((p, i) => e(`pillar-${i}`, coreSlugs[i], { title: p.title, number: p.number, goal: p.goal, roadmap: p.roadmap, objectives: p.objectives })),
  achievements: core.achievements.map((a, i) => e(`ach-${i}`, `achievement-${i + 1}`, { ...a, order: i })),
  networks: networks.map((n, i) => e(`net-${i}`, `network-${i + 1}`, { ...n, order: i })),
  releases: releases.map((r, i) => e(`rel-${i}`, r.slug, { title: r.title, date: r.date ?? '', summary: r.summary, pdf: r.pdf, order: i })),
  plans: [e('plan-edu', 'education', { title: edu.title, data: edu }), e('plan-justice', 'justice', { title: legal.title, data: legal })],
  copy: [...Object.entries(copyDefaults).map(([page, text]) => e(`copy-${page}`, page, { title: `Page text: ${page}`, text })), e('copy-core', 'core', { title: 'Core pillars page text', text: { heroBanner: core.heroBanner, achievementsIntro: core.achievementsIntro, pillarsIntro: core.pillarsIntro } })],
};
fs.mkdirSync(new URL('../.emdash/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../.emdash/seed.json', import.meta.url), JSON.stringify({ version: '1', meta: { name: 'Takweyat' }, collections, content }));
console.log('seed written', Object.fromEntries(Object.entries(content).map(([k, v]) => [k, v.length])));
