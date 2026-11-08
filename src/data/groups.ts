// Pillar grouping lives in groups.data.mjs so the PDF generator can use the same lists.
import { eduGroups as eg, justiceGroups as jg } from './groups.data.mjs';

export type Group = { name: string; pillars: number[] };
export const eduGroups: Group[] = eg;
export const justiceGroups: Group[] = jg;

// Fail the build if a pillar is missing from, or repeated across, the groups.
function check(name: string, groups: Group[], total: number) {
  const all = groups.flatMap((g) => g.pillars).sort((a, b) => a - b);
  const want = Array.from({ length: total }, (_, i) => i + 1);
  if (JSON.stringify(all) !== JSON.stringify(want)) throw new Error(`${name} groups do not cover pillars 1..${total} exactly once`);
}
check('Education', eduGroups, 35);
check('Justice', justiceGroups, 50);

export const groupOf = (groups: Group[], n: number) => groups.find((g) => g.pillars.includes(n))!;
