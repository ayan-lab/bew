export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  heroImage: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "peb-contractor-west-bengal",
    title: "How to Choose a PEB Contractor in West Bengal",
    description:
      "A practical guide for plant owners comparing pre-engineered building contractors — design, fabrication quality, erection safety, and handover checks.",
    category: "PEB Works",
    readMinutes: 6,
    publishedAt: "2026-06-12",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=1200&auto=format&fit=crop&q=60",
    keywords: [
      "PEB contractor West Bengal",
      "pre-engineered building",
      "industrial shed contractor",
    ],
    sections: [
      {
        heading: "Why PEB matters for industrial sites",
        paragraphs: [
          "Pre-engineered buildings (PEB) are widely used for factories, warehouses, and process sheds across West Bengal because they deliver large clear spans faster than conventional RCC frames. For production teams, the real risk is not the concept — it is poor detailing, weak shop fabrication, or rushed erection that later shows up as leaks, misalignment, or costly rework.",
          "Choosing the right PEB contractor means evaluating engineering clarity, steel quality control, site methodology, and how the team coordinates with your civil and utility packages.",
        ],
      },
      {
        heading: "What to ask before you award the job",
        paragraphs: [
          "Request preliminary design loads, bay spacing rationale, cladding specification, and a clear bill of materials. Ask how secondary members, purlins, and bracing are protected against corrosion in humid coastal-adjacent conditions common in parts of the state.",
          "Insist on a method statement for lifting and bolting sequences, plus weather contingencies during monsoon months. A capable contractor will discuss crane access, temporary bracing, and safety exclusion zones without being prompted.",
        ],
      },
      {
        heading: "Handover checks that protect your investment",
        paragraphs: [
          "Before accepting a PEB package, walk the roof and wall interfaces, verify bolt torque records where applicable, check gutter falls, and confirm that openings for doors, docks, and utilities match approved drawings. Document punch lists with photos.",
          "Baidya Engineering Works delivers PEB packages from Chikrand with shop fabrication discipline and on-site erection crews experienced in live industrial environments across West Bengal.",
        ],
      },
    ],
  },
  {
    slug: "plant-maintenance-reduce-downtime",
    title: "Plant Maintenance That Actually Reduces Downtime",
    description:
      "How manufacturing and process plants in West Bengal can structure preventive maintenance, emergency response, and shutdowns with a local industrial contractor.",
    category: "Maintenance",
    readMinutes: 7,
    publishedAt: "2026-05-28",
    heroImage:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&auto=format&fit=crop&q=80",
    keywords: [
      "plant maintenance West Bengal",
      "industrial maintenance contractor",
      "shutdown support",
    ],
    sections: [
      {
        heading: "Preventive beats reactive — when it is planned properly",
        paragraphs: [
          "Unplanned breakdowns cost far more than scheduled interventions: lost production, overtime, and secondary damage to aligned equipment. A practical preventive programme starts with asset criticality — which lines stop revenue if they fail — then sets inspection intervals for lubrication, seals, belts, electrical panels, and utility headers.",
          "Local contractors who know West Bengal plant culture can help build checklists that fit real shift patterns, not textbook templates that never get used.",
        ],
      },
      {
        heading: "Emergency response without chaos",
        paragraphs: [
          "When a pump seizes or a utility line fails mid-shift, speed matters — but so does method. Keep a shortlist of approved contractors with after-hours contacts, spare critical flanges and gaskets on site, and isolation drawings accessible to supervisors.",
          "Baidya Engineering Works supports both planned maintenance windows and urgent mobilisation for industrial clients who need welders, fitters, and supervisors who already understand plant permit systems.",
        ],
      },
      {
        heading: "Shutdowns: treat them like mini-projects",
        paragraphs: [
          "Successful turnarounds have a scope freeze date, material staging, daily progress boards, and a punch-list owner. Bundle mechanical, piping, and utility tasks so crews are not waiting on each other.",
          "If you are preparing a shutdown in Hooghly, Howrah, or surrounding industrial belts, engage your maintenance partner early enough to fabricate spool pieces and order long-lead items before the gate closes.",
        ],
      },
    ],
  },
  {
    slug: "industrial-pipeline-fabrication-basics",
    title: "Industrial Pipeline Fabrication & Erection: What Plant Owners Should Know",
    description:
      "A plain-language overview of pipeline fabrication, site erection, supports, and testing — written for project managers awarding mechanical packages in West Bengal.",
    category: "Pipelines",
    readMinutes: 8,
    publishedAt: "2026-04-15",
    heroImage:
      "https://images.unsplash.com/photo-1673423707246-e8b78e272125?w=1200&auto=format&fit=crop&q=60",
    keywords: [
      "pipeline fabrication",
      "pipeline erection West Bengal",
      "industrial piping contractor",
    ],
    sections: [
      {
        heading: "Shop fabrication vs site welding",
        paragraphs: [
          "Where access and transport allow, shop fabrication improves fit-up quality and weather protection. Spools are cut, bevelled, welded, and marked under controlled conditions, then shipped for erection. Site welding remains necessary for final tie-ins, complex geometry, and brownfield constraints.",
          "Clarify in your tender which joints are shop vs field, who supplies consumables, and which WPS / welder qualifications apply.",
        ],
      },
      {
        heading: "Supports, alignment, and testing",
        paragraphs: [
          "Pipelines fail as often from poor support design and thermal expansion neglect as from bad welds. Confirm hanger locations, guide vs anchor intent, and slope for drainable lines. Hydrostatic or pneumatic testing should follow an agreed procedure with calibrated gauges and isolation of instruments.",
          "Document as-built mark-ups — they become invaluable for the next maintenance campaign.",
        ],
      },
      {
        heading: "Working with a West Bengal fabrication partner",
        paragraphs: [
          "Look for a contractor who can take isometric drawings, produce cut lists, run NDT where specified, and erect with disciplined lifting plans. Communication between shop and site is what keeps field cut-outs rare.",
          "Baidya Engineering Works fabricates and erects industrial pipelines for process and utility services, supporting plant owners who need a single accountable team from spool to support to test.",
        ],
      },
    ],
  },
  {
    slug: "industrial-utility-systems-factories",
    title: "Industrial Utility Systems Every Factory Needs to Get Right",
    description:
      "Electrical, plumbing, HVAC, and compressed air — how utility engineering choices affect uptime, energy use, and future expansion at industrial sites.",
    category: "Utilities",
    readMinutes: 6,
    publishedAt: "2026-03-20",
    heroImage:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&auto=format&fit=crop&q=80",
    keywords: [
      "industrial utility engineering",
      "factory utility systems",
      "HVAC industrial West Bengal",
    ],
    sections: [
      {
        heading: "Utilities are production infrastructure",
        paragraphs: [
          "On a factory floor, utilities are not background services — they are part of the production machine. Undersized electrical distribution, poorly drained process water lines, or HVAC that cannot handle monsoon humidity will show up as scrap, downtime, or unsafe work conditions.",
          "Good utility engineering starts with load lists, diversity factors, and a layout that leaves room for future machines without ripping out main headers.",
        ],
      },
      {
        heading: "Coordinate early with civil and process teams",
        paragraphs: [
          "Cable trays, trenches, and pipe racks need space decisions before flooring and cladding close. Involve your utility contractor during layout freeze so sleeves, floor openings, and roof penetrations are correct the first time.",
          "Baidya Engineering Works installs and maintains industrial utility packages — electrical, plumbing, HVAC, and related mechanical services — for plants across West Bengal that need local accountability and clean handovers.",
        ],
      },
      {
        heading: "Commissioning and documentation",
        paragraphs: [
          "Never treat energisation or first air as the finish line. Record as-built single-line diagrams, valve tags, and maintenance access points. Train shift supervisors on isolation points for emergencies.",
          "When utilities are documented well, every future expansion and maintenance job becomes faster — and safer.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((a) => a.slug === slug);
}
