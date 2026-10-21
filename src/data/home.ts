import type { Page } from './types.ts';

/** "What are you trying to improve?" pathways on the homepage. */
export const goals = [
  {
    id: 'costs',
    title: 'Understand high energy costs',
    text: 'Find out where your energy spend is going and why it keeps rising.',
    href: '/solutions/energy-audits/',
    cta: 'Start with an assessment',
  },
  {
    id: 'equipment',
    title: 'Plan aging equipment upgrades',
    text: 'Identify which systems are degrading and what to replace first.',
    href: '/solutions/design-build/',
    cta: 'See design/build',
  },
  {
    id: 'performance',
    title: 'Improve building performance',
    text: 'Compare upgrade options on a model before you spend capital.',
    href: '/solutions/energy-modeling/',
    cta: 'Explore energy modeling',
  },
  {
    id: 'funding',
    title: 'Explore project funding',
    text: 'Discuss financing options and incentives, and the documentation they need.',
    href: '/solutions/funding-incentives/',
    cta: 'Review funding support',
  },
  {
    id: 'verify',
    title: 'Verify improvements are working',
    text: 'Measure equipment performance against the baseline, and keep it there.',
    href: '/solutions/monitoring-verification/',
    cta: 'See Eco-1 monitoring',
  },
];

export const askSuggestions = [
  'Where should we start if our energy bills keep increasing?',
  'What is the difference between an audit and energy modeling?',
  'Can you help us plan upgrades for aging equipment?',
  'What does Eco-1 monitor?',
  'What funding options should we discuss?',
  'Do you work with schools?',
];

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
