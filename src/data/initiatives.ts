// Initiatives are built from the plans' own words. Each one lists where in the documents it is described,
// and the text shown on its page is copied from those places by search, never retyped.

export type Passage = { title?: string; text: string };
export type Source = { label: string; href?: string; passages: Passage[] };
export type Initiative = {
  slug: string; name: string; status: 'live' | 'active' | 'planned';
  sources: Source[]; phase?: { label: string; text: string }; external?: string; group: 'platform' | 'chambers' | 'education' | 'funds' | 'legal';
};

export const coreSlugs = ['education-and-youth', 'hunger-and-spiritual-enrichment', 'human-rights-and-justice', 'disaster-and-climate', 'healthcare-and-medical-security'];
type Src = { edu: any; legal: any; core: any; site: { boycottPlatform: string } };
export function buildInitiatives({ edu, legal, core, site }: Src): Initiative[] {
const ep = (n: number) => edu.pillars.find((p: any) => p.number === n)!;
const eduSource = (n: number, needle?: string): Source => {
  const items = needle ? ep(n).items.filter((t) => t.includes(needle)) : ep(n).items;
  return { label: `The Educational Plan, pillar ${n}: ${ep(n).title}`, href: `/plans/education/${n}/`, passages: items.map((text) => ({ text })) };
};
const corePillarSource = (i: number, needle: string): Source => {
  const p = core.pillars[i];
  const items = p.objectives.filter((o) => o.includes(needle));
  return { label: `Our core pillars: ${p.title}`, href: `/what-we-do/${coreSlugs[i]}/`, passages: items.map((text) => ({ text })) };
};
const phase = (i: number) => ({ label: `${edu.roadmap[i].phase}: ${edu.roadmap[i].name} (${edu.roadmap[i].years})`, text: edu.roadmap[i].text });
const lp30 = legal.pillars.find((p: any) => p.number === 30)!.items[0];

return [
  {
    slug: 'boycott-israel-platform', name: 'Boycott Israel Platform', status: 'live', group: 'platform', external: site.boycottPlatform,
    sources: [{ label: 'From the platform itself', passages: [
      { text: 'We are building a comprehensive, evidence-based educational resource dedicated to documenting global human rights violations and examining the systemic power of strategic boycotts.' },
      { text: 'A unified platform for awareness, education, and collective accountability is coming soon.' },
    ] }],
  },
  {
    slug: 'legal-chambers', name: 'Takweyat Legal Chambers', status: 'active', group: 'chambers',
    sources: [{ label: 'The Legal Aid and Justice Plan, achievements', href: '/plans/justice/', passages: [{ text: legal.achievements[0] }] }],
  },
  { slug: 'publishing-house', name: 'Takweyat Publishing House and Translation Bureau', status: 'planned', group: 'education', phase: phase(0), sources: [eduSource(19)] },
  { slug: 'chain-of-progressive-schools', name: 'Takweyat Chain of Progressive Schools', status: 'planned', group: 'education', phase: phase(1), sources: [eduSource(16)] },
  { slug: 'chain-of-advanced-colleges', name: 'Takweyat Chain of Advanced Colleges', status: 'planned', group: 'education', phase: phase(1), sources: [eduSource(17)] },
  { slug: 'global-open-university', name: 'Takweyat Global Open University (TGOU)', status: 'planned', group: 'education', phase: phase(2), sources: [eduSource(18)] },
  { slug: 'teacher-training-academy', name: 'Takweyat Teacher Training Academy', status: 'planned', group: 'education', sources: [eduSource(9, 'Teacher Training Academy')] },
  { slug: 'central-library', name: 'Takweyat Central Library', status: 'planned', group: 'education', sources: [eduSource(11, 'Central Library')] },
  { slug: 'vocational-institutes', name: 'Takweyat Vocational Institutes', status: 'planned', group: 'education', sources: [eduSource(27, 'Vocational Institutes')] },
  { slug: 'startup-incubator', name: 'Takweyat Startup Incubator', status: 'planned', group: 'education', sources: [eduSource(24, 'Startup Incubator')] },
  { slug: 'learner-app', name: 'Takweyat Learner App', status: 'planned', group: 'education', sources: [eduSource(13, 'Learner App')] },
  { slug: 'climate-action-fund', name: 'Climate Action Fund', status: 'planned', group: 'funds', sources: [corePillarSource(3, 'Climate Action Fund')] },
  { slug: 'medical-security-fund', name: 'Medical Security Fund', status: 'planned', group: 'funds', sources: [corePillarSource(4, 'Medical Security Fund')] },
  {
    slug: 'global-legal-coalition', name: 'Takweyat Global Legal Coalition', status: 'planned', group: 'legal',
    sources: [{ label: `The Legal Aid and Justice Plan, pillar 30: ${legal.pillars.find((p: any) => p.number === 30)!.title}`, href: '/plans/justice/30/', passages: [{ title: `${lp30.id} ${lp30.title}`, text: lp30.text }] }],
  },
  ];
}
export const statusLabel = { live: 'Live', active: 'Active', planned: 'Planned' } as const;
