// Public health check: how many entries each CMS collection holds. A zero means the pages are on their built-in fallback text.
import type { APIRoute } from 'astro';
import { getEmDashCollection } from 'emdash';

export const GET: APIRoute = async () => {
  const counts: Record<string, number> = {};
  for (const c of ['site', 'pillars', 'achievements', 'networks', 'releases', 'plans', 'copy']) {
    try { counts[c] = (await getEmDashCollection(c)).entries.length; } catch { counts[c] = -1; }
  }
  return new Response(JSON.stringify(counts), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
};
