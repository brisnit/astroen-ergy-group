import type { Page } from './types.ts';

/**
 * Service pages. Source: legacy astroenergygroup.com pages audits.html, equest.html,
 * delivery.html, page16.html (Eco-1) and funding.html, rewritten for clarity.
 * Claims withheld pending confirmation are listed in docs/content-verification.md.
 *
 * Section ids used by the service template: problem, audience, work, deliverables, next.
 * Any other section is rendered after "work" in order.
 */

export const energyAudits: Page = {
  id: 'energy-audits',
  url: '/solutions/energy-audits/',
  title: 'Energy Audits & Assessments',
  label: 'Audits & Assessments',
  metaTitle: 'Energy Audits & Building Assessments (ASHRAE Level 1–3) | Astro Energy Group',
  description:
    'Building infrastructure assessments, utility billing analysis and ASHRAE Level 1, 2 and 3 energy audits that show how your facilities use energy and what to improve first.',
  lede: 'Find out how your buildings use energy, which systems are holding them back, and which improvements are worth pursuing first.',
  category: 'Solutions',
  keywords: ['audit', 'assessment', 'ashrae', 'level 1', 'level 2', 'level 3', 'utility bills', 'baseline', 'energy costs', 'deferred maintenance', 'capital renewal', 'condition assessment'],
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      body: [
        'Many energy audits are little more than a walk-through and a list of observations. That rarely shows how a building actually consumes energy, how much each system costs to run, or where capital will do the most good.',
        'At the same time, many schools, municipal buildings and healthcare facilities are aging faster than renewal budgets allow. Deferred maintenance adds cost and risk, and traditional condition inspections can be slow, subjective and expensive.',
      ],
      keywords: ['high energy bills', 'rising costs', 'aging buildings'],
    },
    {
      id: 'audience',
      heading: 'Who it’s for',
      list: [
        'Facility and energy managers whose utility costs keep climbing without a clear explanation.',
        'Owners planning capital renewal who need to know which systems are degrading and what to replace first.',
        'Organizations that need documented analysis before pursuing funding or utility incentives.',
        'Institutions managing several buildings or a central utility plant.',
      ],
    },
    {
      id: 'work',
      heading: 'What the work involves',
      list: [
        'Existing-conditions assessment of building systems and infrastructure to identify degradation and inefficiency.',
        'Utility billing analysis to establish an energy-use and cost baseline.',
        'An ASHRAE Level 1, 2 or 3 energy audit, scoped to the decision you need to make.',
        'Demand monitoring and analytics that show when and where energy is used, which can use Astro’s Eco-1 system.',
        'A review of your utility rate structure and, where relevant, on-site generation options.',
        'Identification of energy conservation measures and low-cost operational improvements.',
      ],
      keywords: ['walk-through', 'survey', 'site visit', 'demand analysis', 'utility rates', 'tariff', 'self-generation'],
    },
    {
      id: 'audit-levels',
      heading: 'ASHRAE audit levels at a glance',
      body: [
        'ASHRAE describes three levels of commercial building energy audit, each going deeper than the one before. The right level depends on the decision in front of you, not on a default package.',
      ],
      keywords: ['difference between audit levels', 'investment grade audit', 'walk-through audit', 'energy survey', 'which audit do I need'],
    },
    {
      id: 'deliverables',
      heading: 'What you receive',
      list: [
        'A baseline of current energy use and cost.',
        'Findings on the condition and operating efficiency of key building systems.',
        'A prioritized list of energy conservation measures, analyzed to the depth of the audit level chosen.',
        'Clear recommendations for next steps, whether that is modeling, design, monitoring or a funding conversation.',
      ],
    },
    {
      id: 'next',
      heading: 'How it connects to the next stage',
      body: [
        'Audit findings become the starting point for energy modeling, which tests combinations of improvements, and for integrated design/build, which implements them. The same baseline is later used to verify whether completed improvements are working.',
      ],
    },
  ],
  terms: [
    { term: 'ASHRAE', definition: 'The American Society of Heating, Refrigerating and Air-Conditioning Engineers, which publishes widely used building standards, including procedures for commercial energy audits.' },
    { term: 'Energy conservation measure (ECM)', definition: 'A specific change that reduces energy use, such as replacing a chiller, retuning controls or improving insulation.' },
    { term: 'Baseline', definition: 'A record of how much energy a building uses, and what it costs, before improvements. Later results are compared against it.' },
    { term: 'Demand', definition: 'The rate at which a building draws power at a given moment. Many utility bills charge for peak demand as well as total energy used.' },
  ],
};

export const energyModeling: Page = {
  id: 'energy-modeling',
  url: '/solutions/energy-modeling/',
  title: 'Energy Modeling & Analysis',
  label: 'Energy Modeling',
  metaTitle: 'Building Energy Modeling & eQUEST Simulation | Astro Energy Group',
  description:
    'Building energy simulation, including eQUEST modeling, to compare upgrade options and design decisions before you commit capital.',
  lede: 'Test improvement options on a model of your building before committing capital, and compare them against a clear energy goal.',
  category: 'Solutions',
  keywords: ['modeling', 'modelling', 'simulation', 'equest', 'doe-2', 'energy model', 'what if', 'scenario', 'eui', 'ashrae 90.1'],
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      body: [
        'Building systems interact. A new chiller, a controls upgrade and an envelope improvement each change how the others perform, so estimating measures one at a time can overstate or understate the result.',
        'Without a model, it is hard to compare realistic combinations of equipment, measures and operating schedules before money is spent.',
      ],
    },
    {
      id: 'audience',
      heading: 'Who it’s for',
      list: [
        'Owners comparing several upgrade or replacement options.',
        'Design teams at any phase, including early schematic design.',
        'Projects working toward a defined energy-use goal or measuring performance against a standard such as ASHRAE 90.1.',
      ],
    },
    {
      id: 'work',
      heading: 'What the work involves',
      list: [
        'Building an energy simulation model of the facility, commonly using eQUEST.',
        'Grounding the model in the building’s actual characteristics and utility baseline.',
        'Running multiple scenarios with different equipment configurations, measures and operating conditions.',
        'Comparing results against an energy-use goal, typically expressed as energy use per square foot per year.',
        'Comparing design options against applicable standards and code baselines.',
      ],
      keywords: ['multiple models', 'equipment configurations', 'operating conditions', 'kbtu per square foot'],
    },
    {
      id: 'equest',
      heading: 'About eQUEST',
      body: [
        'eQUEST is a widely used building energy simulation tool built on the DOE-2 simulation engine. It is not Astro software. Astro uses it within this service because it can support design decisions at every phase, from early concepts through detailed design.',
        'eQUEST produces detailed tables and charts of modeled energy use by end use, measure and scenario, which makes options easier to compare.',
      ],
      keywords: ['what is equest', 'equest software', 'doe2'],
    },
    {
      id: 'audit-vs-modeling',
      heading: 'Audit or modeling: what’s the difference?',
      body: [
        'An energy audit examines the building as it is today: how it uses energy, what condition systems are in, and which measures look promising.',
        'Energy modeling looks forward. It simulates how the building would perform with different combinations of measures, so you can compare options before choosing one. Many projects start with an audit and use modeling to test the most promising measures.',
      ],
      keywords: ['audit vs model', 'difference between audit and modeling', 'compare', 'which first'],
    },
    {
      id: 'deliverables',
      heading: 'What you receive',
      list: [
        'Modeled results for each scenario studied.',
        'Tables and charts comparing energy use across options.',
        'Analysis that supports measure selection, payback evaluation and design decisions.',
      ],
    },
    {
      id: 'next',
      heading: 'How it connects to the next stage',
      body: [
        'In Astro’s project delivery model, the energy model is revisited during design and again during construction documents, so the final design stays aligned with the energy goal set at the start.',
      ],
    },
  ],
  terms: [
    { term: 'Energy simulation model', definition: 'A computer model that estimates a building’s energy use hour by hour based on its construction, systems, schedules and local weather.' },
    { term: 'Energy use intensity (EUI)', definition: 'Energy used per square foot per year, often in thousand BTU (kBtu). It allows buildings of different sizes to be compared.' },
    { term: 'ASHRAE 90.1', definition: 'An ASHRAE energy standard for commercial buildings, often used as a design baseline.' },
  ],
};

export const designBuild: Page = {
  id: 'design-build',
  url: '/solutions/design-build/',
  title: 'Integrated Design/Build',
  label: 'Design/Build',
  metaTitle: 'Integrated Design/Build, Commissioning & Project Management | Astro Energy Group',
  description:
    'One coordinated team for planning, design, construction, commissioning and program management of energy and infrastructure improvements.',
  lede: 'One coordinated team to plan, design, build and commission energy and infrastructure improvements, with clear approval points along the way.',
  category: 'Solutions',
  keywords: ['design build', 'design-build', 'construction', 'commissioning', 'retrofit', 'upgrade', 'replacement', 'aging equipment', 'program management', 'project management', 'lean', 'bim', 'contractor', 'implementation'],
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      body: [
        'Traditional delivery methods, such as design-bid-build or time-and-materials, separate the owner, architects, engineers, contractors and technology providers. Responsibility gets split, and problems appear at the handoffs.',
        'Owners and investors are left asking whether an energy project will finish on time, stay on budget and perform as designed.',
      ],
    },
    {
      id: 'audience',
      heading: 'Who it’s for',
      list: [
        'Owners ready to implement energy conservation measures or replace aging equipment.',
        'Capital projects involving central plants, mechanical and electrical systems, controls or the building envelope.',
        'Organizations that want one coordinated team instead of managing many separate contracts.',
      ],
    },
    {
      id: 'work',
      heading: 'What the work involves',
      list: [
        'Forming the design/build team early, during conceptualization, so everyone works from the owner’s goals.',
        'LEAN design and construction methods to reduce waste and compress the schedule where possible.',
        'Building information modeling (BIM) for clash detection and coordination between trades.',
        'Commissioning planned from design onward, not added at the end.',
        'Phasing and disruption planning for occupied and operating facilities.',
        'Program and project management across planning, design, construction and closeout.',
      ],
      keywords: ['team', 'schedule', 'phasing', 'occupied buildings', 'clash detection', 'coordination'],
    },
    {
      id: 'ppn',
      heading: 'The Preferred Provider Network',
      body: [
        'Astro’s Preferred Provider Network (PPN) is a group of design professionals, consultants and contractors chosen through a competitive selection process for qualifications, responsiveness and cost.',
        'PPN firms provide preconstruction services, architectural design, project management, energy technologies, commissioning and construction, and are trained on Astro’s project delivery model.',
      ],
      keywords: ['ppn', 'preferred provider network', 'partners', 'subcontractors', 'consultants'],
    },
    {
      id: 'contracts',
      heading: 'Contracts and pricing',
      body: [
        'Astro uses standard forms of agreement with PPN providers that set out performance expectations and risk allocation for each party. Project participants should review them carefully, as they may differ from other industry forms.',
        'Pricing structure, including whether a guaranteed maximum price applies, is defined in each project agreement.',
      ],
      keywords: ['guaranteed maximum price', 'gmp', 'agreement', 'contract'],
    },
    {
      id: 'deliverables',
      heading: 'What you receive',
      list: [
        'Design and construction documents for mechanical, electrical, architectural, structural and controls work.',
        'Equipment selection and pricing.',
        'A phasing and disruption plan and a commissioning plan.',
        'Budget and schedule updates at each owner approval point.',
        'Closeout documentation, including commissioning records and lessons learned.',
      ],
    },
    {
      id: 'next',
      heading: 'How it connects to the next stage',
      body: [
        'Monitoring and verification are built into construction and closeout, so you can see whether completed measures perform as planned and document results for incentives or funders.',
      ],
    },
  ],
  terms: [
    { term: 'Commissioning', definition: 'A quality process that checks building systems are designed, installed and working to meet the owner’s requirements.' },
    { term: 'LEAN design and construction', definition: 'Methods that remove waste and delay from design and construction through close coordination and planning.' },
    { term: 'BIM', definition: 'Building information modeling: a shared 3D model used to coordinate trades and catch conflicts before construction.' },
    { term: 'BAS', definition: 'Building automation system: the controls that run heating, cooling, ventilation and other equipment.' },
  ],
};

export const monitoring: Page = {
  id: 'monitoring-verification',
  url: '/solutions/monitoring-verification/',
  title: 'Monitoring & Verification with Eco-1',
  label: 'Monitoring & Analytics',
  metaTitle: 'Eco-1 Energy Monitoring, Analytics and M&V | Astro Energy Group',
  description:
    'Eco-1 monitoring and analytics show how equipment uses energy before, during and after improvements, with measurement and verification reporting.',
  lede: 'See how your equipment actually uses energy, before, during and after improvements, and document whether those improvements are working.',
  category: 'Solutions',
  keywords: ['eco-1', 'eco1', 'eco 1', 'monitoring', 'analytics', 'm&v', 'measurement and verification', 'metering', 'power quality', 'dashboard', 'is it working', 'persistence', 'reporting'],
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      body: [
        'Modern facilities and their control systems generate far more operating data than anyone can analyze by hand. Useful patterns stay hidden.',
        'Without measurement, it is hard to know whether improvements are delivering what was expected, and some incentive programs will not pay without ongoing proof of performance.',
      ],
    },
    {
      id: 'audience',
      heading: 'Who it’s for',
      list: [
        'Facilities that want a clear picture of current energy use and cost.',
        'Projects that need measurement and verification for incentives or funders.',
        'Owners who want to make sure performance holds up after a project is complete.',
      ],
    },
    {
      id: 'work',
      heading: 'What Eco-1 monitors',
      body: [
        'Eco-1 is Astro’s monitoring and analytics system. It automates the analysis of utility and operations data to identify operational and utility savings opportunities without manual data processing, and expresses results in both energy units and cost.',
      ],
      list: [
        'Power-quality readings, including phase amperage, phase and total voltage, and power factor.',
        'Energy use by individual piece of equipment, by distinguishing between equipment loads.',
        'Energy use and cost tables and charts for selected equipment.',
      ],
      keywords: ['what does eco-1 monitor', 'amperage', 'voltage', 'power factor', 'equipment level', 'loads', 'submetering'],
    },
    {
      id: 'stages',
      heading: 'Before, during and after',
      list: [
        'Before: installed early to establish current-state use and cost. This alone can reveal operational improvements that cost little or nothing.',
        'During: monitoring during construction supports commissioning and confirms that selected measures are performing.',
        'After: post-measure monitoring checks that performance continues over time.',
      ],
      keywords: ['verify savings', 'is it working', 'after construction', 'ongoing'],
    },
    {
      id: 'deliverables',
      heading: 'What you receive',
      list: [
        'Equipment status and load reports, and commissioning data.',
        'Baseline comparison reports that show performance against the starting point.',
        'Negative deviation reports that flag when performance slips.',
        'Alarm and metering-point reports, energy goal tracking and owner-required reports.',
        'A configured dashboard view of the data that matters to your team.',
      ],
    },
    {
      id: 'next',
      heading: 'How it connects to the next stage',
      body: [
        'Monitoring data supports incentive documentation and funder reporting, and it feeds the next round of assessment. Verification closes the loop from assessment to results.',
      ],
    },
  ],
  terms: [
    { term: 'Measurement and verification (M&V)', definition: 'Measuring energy use after a project and comparing it with the baseline to confirm what changed.' },
    { term: 'Power factor', definition: 'A measure of how effectively electrical equipment uses the power supplied to it. Low power factor can raise costs and strain equipment.' },
    { term: 'Negative deviation', definition: 'Measured performance that has drifted worse than the expected or verified level.' },
  ],
};

export const funding: Page = {
  id: 'funding-incentives',
  url: '/solutions/funding-incentives/',
  title: 'Funding & Incentive Support',
  label: 'Funding & Incentives',
  metaTitle: 'Energy Project Funding & Incentive Documentation | Astro Energy Group',
  description:
    'Discuss financing options through Astro’s funding partners and get help documenting utility and tax incentives for energy efficiency projects.',
  lede: 'Explore ways to pay for energy improvements, and get help with the documentation incentives require.',
  category: 'Solutions',
  keywords: ['funding', 'financing', 'finance', 'capital', 'loan', 'investor', 'private equity', 'incentive', 'rebate', 'tax credit', 'utility program', 'budget', 'pay for'],
  sections: [
    {
      id: 'problem',
      heading: 'The problem',
      body: [
        'Energy efficiency projects often lose out when capital is allocated. Yet rising energy costs and regulatory pressure to cut energy use and emissions make those projects harder to postpone.',
        'Incentives can help, but programs are complex, documentation is detailed, and some only pay after performance is proven.',
      ],
    },
    {
      id: 'audience',
      heading: 'Who it’s for',
      list: [
        'Organizations with limited capital budgets for energy or infrastructure work.',
        'Projects that may qualify for utility incentives or tax incentives.',
        'Finance leaders who need a clear, documented case before approving a project.',
      ],
    },
    {
      id: 'work',
      heading: 'What the work involves',
      list: [
        'Funding conversations: Astro works with funding partners, including private equity investor groups, to explore financing options for energy projects.',
        'Building the case: audits, energy modeling and monitoring plans give funders the engineering analysis they need to evaluate a project.',
        'Incentive identification: finding utility and tax incentives that may apply to the planned measures.',
        'Incentive documentation: preparing the detailed documentation many programs require before a reservation is submitted.',
        'Performance reporting: measurement and verification reports for incentives that pay on proven results, some on a monthly basis.',
      ],
      keywords: ['how to pay', 'capital', 'investors', 'rebates', 'paperwork', 'reservation'],
    },
    {
      id: 'expectations',
      heading: 'What to expect',
      body: [
        'Financing is subject to each funder’s own review and terms, and incentive programs change over time. Eligibility depends on the program, the utility and the project.',
        'Astro does not promise financing approval, savings or budget outcomes in advance. We will tell you which options are realistic once we understand your project.',
      ],
      keywords: ['guarantee', 'approval', 'eligibility', 'zero upfront', 'no cost'],
    },
    {
      id: 'deliverables',
      heading: 'What you receive',
      list: [
        'A discussion of funding pathways that may suit your project.',
        'Incentive documentation prepared for submission.',
        'Ongoing performance reports where a program or funder requires them.',
      ],
    },
    {
      id: 'next',
      heading: 'Useful things to bring to the conversation',
      list: [
        'Your capital planning cycle and any budget constraints.',
        'Who owns and operates the buildings involved.',
        'Your utility provider, so applicable programs can be identified.',
        'Rough project timing and any equipment that is near failure.',
      ],
      keywords: ['questions to ask', 'prepare'],
    },
  ],
  terms: [
    { term: 'Utility incentive', definition: 'A payment or rebate from a utility for measures that reduce energy use or demand, subject to the program’s rules.' },
    { term: 'Incentive reservation', definition: 'An application that sets aside incentive funds for a planned project before work begins.' },
  ],
};

export const solutionPages: Page[] = [energyAudits, energyModeling, designBuild, monitoring, funding];

export const solutionsOverview: Page = {
  id: 'solutions',
  url: '/solutions/',
  title: 'Solutions',
  label: 'Solutions',
  metaTitle: 'Energy Efficiency Solutions for Buildings | Astro Energy Group',
  description:
    'Energy audits, energy modeling, integrated design/build, Eco-1 monitoring and verification, and funding and incentive support for building owners.',
  lede: 'Five connected services that take a building from understanding its energy use to verified improvements. Start with the one that fits where you are.',
  category: 'Solutions',
  keywords: ['services', 'what do you do', 'offerings'],
  sections: [
    {
      id: 'how-they-connect',
      heading: 'How the services connect',
      body: [
        'Audits establish where you stand. Modeling tests what to change. Design/build delivers the change. Monitoring and verification confirms it is working. Funding and incentive support runs alongside, so the project can be paid for and documented.',
        'You can start with any one of them. Many organizations begin with an assessment and decide on next steps from the findings.',
      ],
    },
  ],
};

/** Comparison of ASHRAE commercial building audit levels, in plain language. No prices or timelines. */
export const auditLevels = [
  {
    level: 'Level 1',
    name: 'Walk-through analysis',
    bestFor: 'A first look at a building, or screening several buildings to decide where to dig deeper.',
    involves: 'Utility bill review, benchmarking and a brief site visit.',
    receive: 'No-cost and low-cost measures, plus a list of larger opportunities worth studying.',
  },
  {
    level: 'Level 2',
    name: 'Energy survey and engineering analysis',
    bestFor: 'Building a prioritized improvement plan with cost and savings estimates.',
    involves: 'A detailed site survey and a breakdown of where energy is used.',
    receive: 'Recommended measures with estimated costs and savings, and a financial comparison.',
  },
  {
    level: 'Level 3',
    name: 'Detailed analysis of capital-intensive measures',
    bestFor: 'Major investment decisions, where a higher-confidence analysis is needed.',
    involves: 'More extensive field data, often with monitoring and energy modeling.',
    receive: 'Detailed engineering and financial analysis of major capital measures.',
  },
];
