import type { Page } from './types.ts';

/**
 * Industry content. The legacy site lists: Hospitals, Schools, Colleges, Commercial,
 * Industrial, Federal. It does not document sector-specific projects or credentials,
 * so these pages describe common concerns and how Astro's services apply, without
 * implying past work in the sector.
 */

export interface IndustrySummary {
  id: string;
  name: string;
  anchor: string;
  /** Detail page, only where there is enough material for a useful page. */
  href?: string;
  /** Building type value carried into the contact form. */
  buildingType: string;
  concerns: string[];
  services: string[];
}

export const industrySummaries: IndustrySummary[] = [
  {
    id: 'healthcare',
    name: 'Hospitals & healthcare',
    anchor: 'healthcare',
    href: '/industries/healthcare/',
    buildingType: 'Hospital or healthcare',
    concerns: ['Facilities that never shut down', 'Aging central plants and infrastructure', 'Work phased around patient care'],
    services: ['energy-audits', 'design-build', 'monitoring-verification'],
  },
  {
    id: 'education',
    name: 'Schools, colleges & universities',
    anchor: 'education',
    href: '/industries/education/',
    buildingType: 'K-12 school',
    concerns: ['Deferred maintenance across many buildings', 'Tight capital budget cycles', 'Campus-wide infrastructure planning'],
    services: ['energy-audits', 'funding-incentives', 'design-build'],
  },
  {
    id: 'commercial',
    name: 'Commercial buildings',
    anchor: 'commercial',
    buildingType: 'Commercial office or retail',
    concerns: ['Operating costs that erode margins', 'Occupant comfort and complaints', 'Controls that drift from their original settings'],
    services: ['energy-audits', 'energy-modeling', 'monitoring-verification'],
  },
  {
    id: 'industrial',
    name: 'Industrial facilities',
    anchor: 'industrial',
    buildingType: 'Industrial or manufacturing',
    concerns: ['Large equipment and process loads', 'Power quality and electrical demand', 'Upgrades that cannot interrupt production'],
    services: ['monitoring-verification', 'energy-audits', 'design-build'],
  },
  {
    id: 'federal',
    name: 'Federal and public facilities',
    anchor: 'federal',
    buildingType: 'Federal or public facility',
    concerns: ['Energy goals that must be documented', 'Long-term capital planning', 'Detailed reporting requirements'],
    services: ['energy-audits', 'monitoring-verification', 'funding-incentives'],
  },
];

export const industriesOverview: Page = {
  id: 'industries',
  url: '/industries/',
  title: 'Industries',
  label: 'Industries',
  metaTitle: 'Energy Services for Hospitals, Schools, Commercial & Industrial Buildings | Astro Energy Group',
  description:
    'How Astro’s assessment, modeling, design/build, monitoring and funding support apply to hospitals, schools, colleges, commercial, industrial and federal facilities.',
  lede: 'Every building type has its own constraints. Here is how Astro’s services apply to the facilities we work with.',
  category: 'Industries',
  keywords: ['sectors', 'who do you work with', 'building types', 'markets'],
  sections: [
    {
      id: 'commercial',
      heading: 'Commercial buildings',
      body: [
        'For offices, retail and other commercial property, energy is one of the largest controllable operating costs. Systems and controls often drift from their original settings, and occupant complaints can be the first sign.',
        'An audit and utility baseline show where costs come from. Modeling compares upgrade options, and monitoring confirms results after the work is complete.',
      ],
      keywords: ['office', 'retail', 'property', 'landlord', 'tenant', 'commercial real estate'],
    },
    {
      id: 'industrial',
      heading: 'Industrial facilities',
      body: [
        'Industrial facilities combine building loads with process equipment, large motors and significant electrical demand. Upgrades must be planned around production.',
        'Eco-1 power-quality and equipment-level monitoring helps separate where energy goes, and phased design/build planning keeps work from disrupting operations.',
      ],
      keywords: ['manufacturing', 'plant', 'warehouse', 'process', 'motors', 'power quality'],
    },
    {
      id: 'federal',
      heading: 'Federal and public facilities',
      body: [
        'Public facilities often work toward defined energy goals with detailed reporting requirements and long capital planning horizons.',
        'Assessments establish a documented baseline, and measurement and verification reporting shows progress against goals over time.',
      ],
      keywords: ['government', 'municipal', 'public sector', 'agency', 'city', 'county'],
    },
  ],
};

export const healthcare: Page = {
  id: 'industry-healthcare',
  url: '/industries/healthcare/',
  title: 'Hospitals & Healthcare Facilities',
  label: 'Healthcare',
  metaTitle: 'Energy & Infrastructure Services for Hospitals and Healthcare | Astro Energy Group',
  description:
    'Infrastructure assessments, phased design/build and monitoring for hospitals and healthcare facilities that operate around the clock.',
  lede: 'Hospitals run around the clock, so energy and infrastructure work has to be planned around patient care, critical systems and constrained budgets.',
  category: 'Industries',
  keywords: ['hospital', 'hospitals', 'healthcare', 'health care', 'medical', 'clinic', 'medical center', 'patient'],
  sections: [
    {
      id: 'concerns',
      heading: 'What healthcare facilities tell us matters',
      list: [
        'Operational continuity: systems serve occupied, critical spaces 24 hours a day, so shutdowns must be planned carefully.',
        'Aging infrastructure: central plants, air handling and electrical systems are often at or past their expected life.',
        'Budget pressure: capital renewal competes with clinical priorities for funding.',
        'Comfort and environmental control: patients and staff depend on stable temperature, humidity and air quality.',
      ],
      keywords: ['24/7', 'continuity', 'critical systems', 'downtime', 'central plant'],
    },
    {
      id: 'how-astro-helps',
      heading: 'How Astro’s services apply',
      list: [
        'Infrastructure and energy assessments identify degrading systems and support capital renewal decisions.',
        'Phasing and disruption analysis is part of every stage of Astro’s project delivery model, from concept through construction.',
        'Commissioning is planned from design onward, so systems are checked against the facility’s requirements.',
        'Eco-1 monitoring tracks equipment performance before, during and after improvements.',
        'Funding and incentive support helps document projects for funders and utility programs.',
      ],
    },
    {
      id: 'questions',
      heading: 'Questions worth discussing early',
      list: [
        'Which systems are closest to failure, and what would an unplanned outage affect?',
        'Which areas can tolerate planned shutdowns, and when?',
        'What review will regulators or the authority having jurisdiction require for the work?',
        'How will capital renewal be funded, and over what timeframe?',
      ],
      keywords: ['ahj', 'authority having jurisdiction', 'permits', 'regulatory review'],
    },
  ],
};

export const education: Page = {
  id: 'industry-education',
  url: '/industries/education/',
  title: 'Schools, Colleges & Universities',
  label: 'Education',
  metaTitle: 'Energy Audits & Infrastructure Planning for Schools and Colleges | Astro Energy Group',
  description:
    'Campus infrastructure assessments, energy audits, funding support and design/build for K-12 schools, colleges and universities.',
  lede: 'School districts and campuses manage many buildings of different ages on fixed budgets. A clear assessment makes it easier to decide what to fix first and how to pay for it.',
  category: 'Industries',
  keywords: ['school', 'schools', 'k-12', 'k12', 'district', 'college', 'colleges', 'university', 'universities', 'campus', 'education', 'community college'],
  sections: [
    {
      id: 'concerns',
      heading: 'Common concerns',
      list: [
        'Deferred maintenance: aging buildings and equipment across a district or campus, with renewal budgets that have been cut back.',
        'Planning across many buildings: deciding where to invest first when needs exceed funds.',
        'Budget cycles: capital and operating budgets are often set well in advance and are hard to change.',
        'Occupied buildings: work has to be scheduled around classes, events and the academic calendar.',
      ],
      keywords: ['deferred maintenance', 'aging schools', 'school budget', 'summer work'],
    },
    {
      id: 'how-astro-helps',
      heading: 'How Astro’s services apply',
      list: [
        'Campus infrastructure assessments and campus energy-use analysis are early steps in Astro’s project delivery model.',
        'ASHRAE audits and a utility baseline help rank energy conservation measures across buildings.',
        'Funding and incentive support helps identify financing options and document incentives that may apply.',
        'Integrated design/build includes phasing and disruption planning for occupied buildings.',
        'Monitoring and verification documents results for boards, funders and incentive programs.',
      ],
    },
    {
      id: 'questions',
      heading: 'Questions worth discussing early',
      list: [
        'Which buildings or systems generate the most maintenance calls and comfort complaints?',
        'When are your capital planning and budget approval deadlines?',
        'Which work windows, such as summer or breaks, are available?',
        'What documentation will your board or funders expect?',
      ],
    },
  ],
};

export const industryPages: Page[] = [healthcare, education];
