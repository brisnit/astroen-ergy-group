import type { Page } from './types.ts';

/** "What are you trying to improve?" pathways on the homepage. */
export const goals = [
  {
    id: 'costs',
    title: 'Understand high energy costs',
    text: 'See where your energy spend goes, and why it keeps rising.',
    href: '/solutions/energy-audits/',
    cta: 'Assessments',
  },
  {
    id: 'equipment',
    title: 'Plan aging equipment upgrades',
    text: 'Find the systems that are degrading and decide what to replace first.',
    href: '/solutions/design-build/',
    cta: 'Design/build',
  },
  {
    id: 'performance',
    title: 'Improve building performance',
    text: 'Compare upgrade options on a model before spending capital.',
    href: '/solutions/energy-modeling/',
    cta: 'Energy modeling',
  },
  {
    id: 'funding',
    title: 'Explore project funding',
    text: 'Discuss financing options, incentives and the paperwork they need.',
    href: '/solutions/funding-incentives/',
    cta: 'Funding support',
  },
  {
    id: 'verify',
    title: 'Verify improvements are working',
    text: 'Measure performance against the baseline, and keep it there.',
    href: '/solutions/monitoring-verification/',
    cta: 'Eco-1 monitoring',
  },
];

/** Short prompt labels for the Ask Astro panel; each runs the full question. */
export const askPrompts = [
  { label: 'Rising energy bills', q: 'Where should we start if our energy bills keep increasing?' },
  { label: 'Audit vs. modeling', q: 'What is the difference between an audit and energy modeling?' },
  { label: 'Aging equipment', q: 'Can you help us plan upgrades for aging equipment?' },
  { label: 'What Eco-1 monitors', q: 'What does Eco-1 monitor?' },
  { label: 'Funding options', q: 'What funding options should we discuss?' },
  { label: 'Working with schools', q: 'Do you work with schools?' },
];

export const askSuggestions = askPrompts.map((p) => p.q);

export const home: Page = {
  id: 'home',
  url: '/',
  title: 'Better-performing buildings. Lower energy costs.',
  label: 'Home',
  metaTitle: 'Astro Energy Group | Energy Audits, Design/Build & Verification for Buildings',
  description:
    'Astro Energy Group helps building owners understand energy use, prioritize improvements and move from assessment through design/build to verified performance.',
  lede: 'Understand how your facilities use energy, decide which improvements matter most, and carry them through design, construction and verification with one coordinated team.',
  category: 'Home',
  sections: [
    {
      id: 'who-we-help',
      heading: 'Who we help',
      body: [
        'Building owners, facility managers, finance leaders and institutional decision-makers responsible for hospitals, schools, colleges, commercial buildings, industrial facilities and federal facilities.',
      ],
    },
  ],
};
