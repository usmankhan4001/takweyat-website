// A sitemap listing every generated page.
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const pages = import.meta.glob('./**/*.astro');
  const base = 'https://takweyat.org';
  const urls = new Set<string>(['/']);
  const files = Object.keys(pages).map((f) => f.replace('./', '').replace(/\.astro$/, ''));
  for (const f of files) {
    if (f === 'index' || f === '404' || f.includes('[')) continue;
    urls.add('/' + f.replace(/\/index$/, '') + '/');
  }
  const { default: edu } = await import('../../content/education-plan.json');
  const { default: legal } = await import('../../content/legal-plan.json');
  const { initiatives, coreSlugs } = await import('../data/initiatives');
  edu.pillars.forEach((p) => urls.add(`/plans/education/${p.number}/`));
  legal.pillars.forEach((p) => urls.add(`/plans/justice/${p.number}/`));
  initiatives.forEach((i) => urls.add(`/initiatives/${i.slug}/`));
  coreSlugs.forEach((s) => urls.add(`/what-we-do/${s}/`));
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].sort().map((u) => `  <url><loc>${base}${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml' } });
};
