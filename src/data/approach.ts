import type { Page } from './types.ts';

/**
 * The five-step summary is a plain-language view of Astro's Project Delivery Model.
 * Phase activities are transcribed from the legacy flowchart images on
 * conceptualizationphase.html, designphase.html, constructiondocuments.html,
 * construction.html and closeout.html.
 */

export interface Step {
  id: string;
  name: string;
  summary: string;
  detail: string;
  service: { href: string; label: string };
}

export const steps: Step[] = [
  {
    id: 'assess',
    name: 'Assess',
    summary: 'Understand how your buildings use energy today.',
    detail: 'Infrastructure assessment, utility billing analysis, an energy-use baseline and early Eco-1 analytics.',
    service: { href: '/solutions/energy-audits/', label: 'Energy audits & assessments' },
  },
  {
    id: 'prioritize',
    name: 'Prioritize',
    summary: 'Decide which improvements matter most.',
    detail: 'Energy modeling, measure concepts, cost estimates and payback analysis, ranked against your goals and funding.',
    service: { href: '/solutions/energy-modeling/', label: 'Energy modeling & analysis' },
  },
  {
    id: 'plan',
    name: 'Plan',
    summary: 'Design the work and line up approvals and funding.',
    detail: 'Design, construction documents, phasing, budget, schedule, permits and a funding pathway.',
    service: { href: '/solutions/funding-incentives/', label: 'Funding & incentive support' },
  },
  {
    id: 'implement',
    name: 'Implement',
    summary: 'Build and commission the improvements.',
    detail: 'Integrated design/build delivery with commissioning, change management and construction administration.',
    service: { href: '/solutions/design-build/', label: 'Integrated design/build' },
  },
  {
    id: 'verify',
    name: 'Verify',
    summary: 'Confirm the improvements are working, and keep them working.',
    detail: 'Measurement and verification against the baseline, incentive reporting and ongoing Eco-1 monitoring.',
    service: { href: '/solutions/monitoring-verification/', label: 'Monitoring & verification' },
  },
];

export interface Phase {
  id: string;
  name: string;
  summary: string;
  activities: string[];
  gate: string;
}

export const phases: Phase[] = [
  {
    id: 'phase-conceptualization',
    name: 'Conceptualization',
    summary: 'Form the team, set energy goals, assess the facility and build the business case.',
    activities: [
      'Design/build team formation', 'Establish energy goals', 'Project work plan development', 'Campus infrastructure assessment',
      'Campus energy utilization and operational efficiency review', 'Eco-1 preliminary energy-use analytics', 'Data gathering and analysis',
      'Building energy simulation modeling', 'Preliminary concepts development', 'Building energy systems efficiency analysis',
      'Building operational efficiency analysis', 'Phasing and disruption analysis', 'Strategic energy projects capital plan',
      'Energy measure concept estimating', 'Energy measure payback analysis', 'Project schedule', 'Prioritizing measures for funding',
      'Project budget', 'Project tracking and reporting plan',
    ],
    gate: 'Owner approval, then notice to proceed.',
  },
  {
    id: 'phase-design',
    name: 'Design',
    summary: 'Engineer the improvements and confirm budget, schedule and compliance.',
    activities: [
      'Infrastructure improvements architecture and engineering', 'Energy measures architecture and engineering', 'Commissioning integration',
      'Building automation and controls integration', 'Equipment selection and pricing', 'Mechanical systems specifications',
      'Electrical systems specifications', 'Energy simulation modeling update', 'Agency and authority having jurisdiction compliance',
      'Design development schedule', 'Design development budget',
    ],
    gate: 'Owner approval, then construction documents.',
  },
  {
    id: 'phase-construction-documents',
    name: 'Construction documents',
    summary: 'Complete the documents, plans and budget needed for permits and procurement.',
    activities: [
      'Infrastructure and energy measure construction documents', 'Mechanical, electrical, architectural and structural documents',
      'Building automation and controls documents', 'Phasing and disruption plan', 'General contractor and general requirements planning',
      'Commissioning plan', 'Energy simulation modeling update', 'Procurement plan', 'Construction documents schedule', 'Construction documents budget',
    ],
    gate: 'Owner approval, then agency review and permits.',
  },
  {
    id: 'phase-construction',
    name: 'Construction',
    summary: 'Build, commission and monitor the work while the facility keeps operating.',
    activities: [
      'Project permitting', 'Construction kickoff', 'Construction work plan', 'Agency and authority having jurisdiction coordination',
      'Owner energy goals measurement and verification', 'Building automation and controls integration', 'Commissioning plan integration',
      'Facility operations integration', 'Phasing and disruption integration', 'Construction', 'Change management',
      'Construction management and administration', 'Project funds administration', 'Building automation and Eco-1 measurement and verification',
    ],
    gate: 'Substantial completion.',
  },
  {
    id: 'phase-closeout',
    name: 'Closeout and verification',
    summary: 'Hand over the project, capture incentives and verify performance.',
    activities: [
      'Performance monitoring and verification', 'Project documentation deliverables', 'Beneficial use of the project', 'Contracts and final payment',
      'Utility rebates', 'Lessons learned', 'Commissioning data and reports', 'Equipment status and load reports', 'M&V metrics and alarm reporting',
      'Energy efficiency goal reports', 'Metering point usage and cost reports', 'Owner-required reports', 'Dashboard configuration',
      'Baseline comparison reports', 'Negative deviation reports',
    ],
    gate: 'Project complete, with ongoing monitoring available.',
  },
];

export const approach: Page = {
  id: 'approach',
  url: '/approach/',
  title: 'Our Approach',
  label: 'Our Approach',
  metaTitle: 'Our Approach: From Assessment to Verified Results | Astro Energy Group',
  description:
    'How Astro’s project delivery model moves a building from assessment through prioritization, planning, implementation and verification, with owner approval at each stage.',
  lede: 'A coordinated path from understanding your buildings to verified results, with your approval before each major step.',
  category: 'Approach',
  keywords: ['process', 'how it works', 'project delivery model', 'pdm', 'phases', 'steps', 'engagement', 'timeline', 'what happens'],
  sections: [
    {
      id: 'goals',
      heading: 'What the delivery model is designed to do',
      list: [
        'Plan each project around your energy and cost-reduction objectives.',
        'Design, build and commission measures that work as intended.',
        'Move efficiently, compressing the schedule where it is practical.',
        'Keep project cost as low as the scope allows.',
      ],
    },
    {
      id: 'adaptable',
      heading: 'Scaled to the project',
      body: [
        'Astro’s Project Delivery Model provides guidelines, workshops and tools for planning, designing and building capital projects. How much of it applies depends on the type, size, scope and strategic importance of the project.',
        'A single-building audit uses a small part of it. A campus-wide program may use all of it.',
      ],
    },
    {
      id: 'approvals',
      heading: 'You approve each stage',
      body: [
        'Each phase ends with an owner approval point. You see the budget, schedule and design before the next phase begins, so there are no surprises in construction.',
      ],
      keywords: ['approval', 'decision points', 'gates', 'control'],
    },
  ],
};
