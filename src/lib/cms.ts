// Reads the site's content from EmDash (the CMS database) on every request, falling back to the files in /content and
// /src/data when the CMS has nothing yet, so the site never goes blank. Cached for a few seconds so a page that asks
// several times costs one query.
import { getEmDashCollection } from 'emdash';
import coreFile from '../../content/core-pillars.json';
import eduFile from '../../content/education-plan.json';
import legalFile from '../../content/legal-plan.json';
import { site as siteFile } from '../data/site';
import { networks as networksFile } from '../data/networks';
import { releases as releasesFile } from '../data/press';
import * as formsFile from '../data/forms';
import * as processFile from '../data/legalAid';
import { eduGroups as eduGroupsFile, justiceGroups as justiceGroupsFile } from '../data/groups';
import { buildInitiatives } from '../data/initiatives';
import defaults from '../data/copy.defaults.json';

const list = async (name: string) => {
  try { return (await getEmDashCollection(name)).entries.map((e: any) => ({ slug: e.slug as string, ...e.data })); } catch { return []; }
};
const byOrder = (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0);
const orNull = (v: unknown) => (typeof v === 'string' && v.trim() ? v : null);

async function load() {
  const [siteRows, pillars, achievements, networks, releases, plans, copy] = await Promise.all(
    ['site', 'pillars', 'achievements', 'networks', 'releases', 'plans', 'copy'].map(list),
  );
  const s: any = siteRows[0];
  const site = s ? {
    ...siteFile,
    name: s.title || siteFile.name, short: s.short || siteFile.short, nameUrdu: s.name_urdu || siteFile.nameUrdu,
    email: s.email || siteFile.email, phone: orNull(s.phone), whatsapp: orNull(s.whatsapp), helpline: orNull(s.helpline),
    boycottPlatform: s.boycott_platform || siteFile.boycottPlatform,
    offices: s.offices ?? siteFile.offices, nav: s.nav ?? siteFile.nav, footerLinks: s.footer_links ?? siteFile.footerLinks,
  } : siteFile;

  const page = (slug: string) => copy.find((c: any) => c.slug === slug)?.text ?? {};
  // shortcut: shape checks are shallow (arrays and required keys), not a full schema; upgrade if editors start breaking deeper fields.
  const okField = (f: any) => f && typeof f.name === 'string' && typeof f.label === 'string';
  const okGroup = (g: any) => g && typeof g.name === 'string' && Array.isArray(g.pillars);
  const okPair = (p: any) => Array.isArray(p) && p.length === 2 && p.every((x) => typeof x === 'string');
  const checks: Record<string, (v: any) => boolean> = {
    forms: (v) => Array.isArray(v) && v.every(okField), eduGroups: (v) => Array.isArray(v) && v.every(okGroup), justiceGroups: (v) => Array.isArray(v) && v.every(okGroup),
    scope: (v) => Array.isArray(v) && v.every(okPair), steps: (v) => Array.isArray(v) && v.every(okPair),
  };
  const doc = (slug: string, fallback: any) => {
    const v: any = page(slug); if (!v || !Object.keys(v).length) return fallback;
    const out: any = { ...fallback };
    for (const [k, val] of Object.entries(v)) { const chk = slug === 'forms' ? checks.forms : checks[k]; if (!chk || chk(val)) out[k] = val; }
    return out;
  };
  const forms: any = doc('forms', { ...formsFile });
  const process: any = doc('legal-aid-process', { scope: processFile.scope, steps: processFile.steps });
  const groups: any = doc('plan-groups', { eduGroups: eduGroupsFile, justiceGroups: justiceGroupsFile });
  const cp: any = page('core');
  const core = pillars.length ? {
    heroBanner: cp.heroBanner ?? coreFile.heroBanner, achievementsIntro: cp.achievementsIntro ?? coreFile.achievementsIntro,
    pillarsIntro: cp.pillarsIntro ?? coreFile.pillarsIntro,
    achievements: achievements.length ? [...achievements].sort(byOrder).map((a: any) => ({ title: a.title, text: a.text })) : coreFile.achievements,
    pillars: [...pillars].sort((a: any, b: any) => a.number - b.number).map((p: any) => ({ number: p.number, title: p.title, goal: p.goal, roadmap: p.roadmap, objectives: typeof p.objectives_text === 'string' && p.objectives_text.trim() ? p.objectives_text.split(/\r?\n/).map((l: string) => l.trim()).filter(Boolean) : p.objectives ?? [] })),
  } : coreFile;

  const okPlan = (d: any, n: number) => d && Array.isArray(d.pillars) && d.pillars.length >= n && Array.isArray(d.roadmap);
  const eduRow = plans.find((p: any) => p.slug === 'education')?.data;
  const edu = okPlan(eduRow, 1) ? eduRow : eduFile;
  const legalRow = plans.find((p: any) => p.slug === 'justice')?.data;
  const legal = okPlan(legalRow, 1) ? legalRow : legalFile;
  const nets = networks.length ? [...networks].sort(byOrder) : networksFile;
  const rels = releases.length ? [...releases].sort(byOrder).map((r: any) => ({ slug: r.slug, title: r.title, date: orNull(r.date), summary: r.summary, pdf: r.pdf })) : releasesFile;
  return { site, core, edu, legal, networks: nets, releases: rels, forms, process, groups, copy: page, initiatives: buildInitiatives({ edu, legal, core, site }) };
}

let cache: { t: number; v: ReturnType<typeof load> } | undefined;
export const getCms = () => {
  if (!cache || Date.now() - cache.t > 5000) cache = { t: Date.now(), v: load() };
  return cache.v;
};

// Page text: the CMS entry for a page wins; the wording the page shipped with is the fallback, so a missing entry never blanks a page.
export const copyFor = (cms: { copy: (slug: string) => Record<string, string> }, page: string) => {
  const live = cms.copy(page);
  return (key: string): string => (typeof live[key] === 'string' && live[key] !== '' ? live[key] : (defaults as Record<string, Record<string, string>>)[page]?.[key] ?? '');
};
