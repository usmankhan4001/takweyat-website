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
  const cp: any = page('core');
  const core = pillars.length ? {
    heroBanner: cp.heroBanner ?? coreFile.heroBanner, achievementsIntro: cp.achievementsIntro ?? coreFile.achievementsIntro,
    pillarsIntro: cp.pillarsIntro ?? coreFile.pillarsIntro,
    achievements: achievements.length ? [...achievements].sort(byOrder).map((a: any) => ({ title: a.title, text: a.text })) : coreFile.achievements,
    pillars: [...pillars].sort((a: any, b: any) => a.number - b.number).map((p: any) => ({ number: p.number, title: p.title, goal: p.goal, roadmap: p.roadmap, objectives: p.objectives ?? [] })),
  } : coreFile;

  const edu = plans.find((p: any) => p.slug === 'education')?.data ?? eduFile;
  const legal = plans.find((p: any) => p.slug === 'justice')?.data ?? legalFile;
  const nets = networks.length ? [...networks].sort(byOrder) : networksFile;
  const rels = releases.length ? [...releases].sort(byOrder).map((r: any) => ({ slug: r.slug, title: r.title, date: orNull(r.date), summary: r.summary, pdf: r.pdf })) : releasesFile;
  return { site, core, edu, legal, networks: nets, releases: rels, copy: page, initiatives: buildInitiatives({ edu, legal, core, site }) };
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
