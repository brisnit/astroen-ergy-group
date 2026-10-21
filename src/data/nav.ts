import { solutionPages } from './solutions.ts';
import { industrySummaries } from './industries.ts';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

const blurbs: Record<string, string> = {
  'energy-audits': 'ASHRAE audits, utility analysis and condition assessments',
  'energy-modeling': 'Compare upgrade options with eQUEST simulation',
  'design-build': 'Design, construction, commissioning and project management',
  'monitoring-verification': 'Eco-1 analytics and measurement & verification',
  'funding-incentives': 'Financing conversations and incentive documentation',
};

export const solutionLinks: NavLink[] = solutionPages.map((p) => ({ label: p.label, href: p.url, description: blurbs[p.id] }));

export const industryLinks: NavLink[] = industrySummaries.map((i) => ({
  label: i.name,
  href: i.href ?? `/industries/#${i.anchor}`,
}));

export const primaryNav: NavItem[] = [
  { label: 'Solutions', href: '/solutions/', children: solutionLinks },
  { label: 'Industries', href: '/industries/', children: industryLinks },
  { label: 'Our Approach', href: '/approach/' },
  { label: 'About', href: '/about/' },
];
