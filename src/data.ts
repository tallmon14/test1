// Nordic accounts and MDM-related mock data.
// Fictional companies; any resemblance to real ones is coincidental.
// In production, replace with CRM queries + data-provider APIs (see README handoff).

import type { Account, AgentBlock, Painpoint } from "./types";

export const ACCOUNTS: Account[] = [
  {
    id: "saga",
    name: "Saga Industri AB",
    country: "SE",
    flag: "🇸🇪",
    sector: "Industrial manufacturing",
    hq: "Göteborg, Sweden",
    revenue: "SEK 12.4B",
    employees: "8,420",
    fiscal: "FY25 ends Dec 31",
    relationship: "Customer — Compliance Cloud (since 2022)",
    health: 72,
    opportunity: 88,
    opportunityValue: "SEK 4.2M ARR",
    stage: "Discovery → Solutioning",
    owner: "You (Mikael Lindqvist)",
    parent: "Saga Holding AB",
    subsidiaries: 14,
    systems: [
      "SAP S/4HANA",
      "Salesforce Sales Cloud",
      "Workday",
      "Coupa",
      "Two legacy ERPs (post-M&A)",
    ],
    dataHealth: {
      score: 41,
      duplicates: 18.2,
      stewardshipHours: 1840,
      mdmCoverage: 23,
      lastAudit: "2026-03-14",
    },
    signals: [
      {
        tag: "M&A",
        text: "Closed acquisition of Hovden Verksted AS (Norway), Q4 2025",
        source: "Reuters · 4 days ago",
      },
      {
        tag: "Hire",
        text: "New Chief Data Officer joined from Telia — Linnea Hagström",
        source: "LinkedIn · 11 days ago",
      },
      {
        tag: "Filing",
        text: "Annual report flagged 'data quality and integration debt' as risk #3",
        source: "Saga AR 2025, p. 47",
      },
      {
        tag: "RFP",
        text: "Public tender for 'master data platform' surfaced via TED Europa",
        source: "TED · 22 days ago",
      },
    ],
    stakeholders: [
      {
        name: "Linnea Hagström",
        title: "Chief Data Officer",
        influence: 95,
        sentiment: "warm",
        note: "New hire, 90-day plan rumored to center on golden record",
        initials: "LH",
      },
      {
        name: "Anders Vik",
        title: "CIO",
        influence: 80,
        sentiment: "neutral",
        note: "Sponsored last ERP consolidation; budget owner",
        initials: "AV",
      },
      {
        name: "Petra Nilsson",
        title: "VP Sales Operations",
        influence: 70,
        sentiment: "warm",
        note: "Already champions cleaning up Salesforce duplicates",
        initials: "PN",
      },
      {
        name: "Johan Bergström",
        title: "Head of Data Governance",
        influence: 65,
        sentiment: "warm",
        note: "Met at Gartner Stockholm, asked for reference architecture",
        initials: "JB",
      },
      {
        name: "Maja Eriksson",
        title: "Procurement Director",
        influence: 55,
        sentiment: "cold",
        note: "Sole vendor consolidation mandate — known to push back hard on TCO",
        initials: "ME",
      },
    ],
  },
  {
    id: "fjord",
    name: "Fjordstrøm Energi",
    country: "NO",
    flag: "🇳🇴",
    sector: "Energy & utilities",
    hq: "Stavanger, Norway",
    health: 58,
    opportunity: 74,
    opportunityValue: "NOK 6.8M ARR",
    stage: "Qualification",
  },
  {
    id: "aurora",
    name: "Aurora Försäkring",
    country: "SE",
    flag: "🇸🇪",
    sector: "Insurance",
    hq: "Stockholm, Sweden",
    health: 81,
    opportunity: 62,
    opportunityValue: "SEK 2.1M ARR",
    stage: "Expansion",
  },
  {
    id: "kalmar",
    name: "Kalmar Maritime Group",
    country: "FI",
    flag: "🇫🇮",
    sector: "Logistics",
    hq: "Helsinki, Finland",
    health: 49,
    opportunity: 81,
    opportunityValue: "EUR 510K ARR",
    stage: "Discovery",
  },
  {
    id: "borg",
    name: "Borgmann Pharma A/S",
    country: "DK",
    flag: "🇩🇰",
    sector: "Life sciences",
    hq: "Aarhus, Denmark",
    health: 90,
    opportunity: 45,
    opportunityValue: "DKK 3.4M ARR",
    stage: "Renewal",
  },
  {
    id: "vatna",
    name: "Vatnajökull Banki hf.",
    country: "IS",
    flag: "🇮🇸",
    sector: "Banking",
    hq: "Reykjavík, Iceland",
    health: 36,
    opportunity: 69,
    opportunityValue: "EUR 240K ARR",
    stage: "Discovery",
  },
];

export const PAINPOINTS: Painpoint[] = [
  {
    id: "dup",
    severity: "critical",
    title: "Customer master fragmented across 5 ERPs post-M&A",
    impact:
      "Estimated 18.2% duplicate rate across legal entities. Revenue leakage from missed cross-sell ≈ SEK 80M/yr (internal benchmark, 0.6% of revenue).",
    evidence: [
      "Saga AR 2025 risk register, p. 47",
      "Job posting: 'Data Steward, Customer Domain' (×4 open reqs)",
      "Public tender via TED Europa, 22 days ago",
    ],
    fit: {
      sku: "MDM Customer 360 + Match & Merge",
      tier: "Enterprise",
      arr: "SEK 2.4M",
      timeToValue: "14 weeks",
    },
  },
  {
    id: "gdpr",
    severity: "high",
    title: "GDPR audit gap — data lineage on subject-access requests",
    impact:
      "Datainspektionen findings from peers in sector indicate avg. SEK 4.1M fine exposure. Saga's last DPIA was 2023.",
    evidence: [
      "Datainspektionen public enforcement log (industrial sector, 2024–25)",
      "Saga DPIA timestamp — Q1 2023",
      "Linnea Hagström's prior public talk on lineage (Telia, 2024)",
    ],
    fit: {
      sku: "Data Lineage & Stewardship Console",
      tier: "Standard",
      arr: "SEK 880K",
      timeToValue: "8 weeks",
    },
  },
  {
    id: "prod",
    severity: "medium",
    title: "Product taxonomy inconsistencies blocking cross-sell",
    impact:
      "3 overlapping product hierarchies (SAP MM, Salesforce CPQ, legacy ERP from Hovden acquisition). VP Sales Ops flagged at QBR.",
    evidence: [
      "Petra Nilsson, QBR Mar 18 (logged by SE)",
      "Hovden integration kickoff deck — slide 14",
      "Coupa supplier master diff report",
    ],
    fit: {
      sku: "Product Domain MDM",
      tier: "Standard",
      arr: "SEK 940K",
      timeToValue: "10 weeks",
    },
  },
];

// Scripted opening agent turn. The text blocks stream in char-by-char.
export const CONVERSATION: { user: string; agentBlocks: AgentBlock[] } = {
  user: "Brief me on Saga Industri before my 14:00 call with Linnea Hagström.",
  agentBlocks: [
    {
      kind: "text",
      text: "Here's what I have on Saga Industri AB, focused on what matters for a CDO conversation:",
    },
    {
      kind: "brief",
      rows: [
        [
          "Why now",
          "New CDO (11 days in), board-flagged data quality as risk #3, fresh Hovden acquisition adds a 5th ERP to integrate.",
        ],
        [
          "What hurts",
          "18.2% duplicate rate across customer master. ~1,840 steward-hours/yr. GDPR lineage gap from 2023 DPIA.",
        ],
        [
          "Who decides",
          "Linnea Hagström (CDO, new) is your champion. Anders Vik (CIO) holds budget. Maja Eriksson (Procurement) will push on TCO.",
        ],
        [
          "What to land",
          "MDM Customer 360 + Match & Merge — SEK 2.4M ARR, 14-week TTV. Anchor on M&A integration urgency.",
        ],
        [
          "ROI · TCO",
          "3-yr TCO SEK 16.2M, 3-yr benefit SEK 48.8M → 201% net ROI, payback in 11 months (FY26 Q3).",
        ],
      ],
    },
    {
      kind: "text",
      text: "Linnea spoke publicly at Telia about lineage in 2024 — leading with the GDPR angle gives you common ground. Want me to draft the opener?",
    },
    {
      kind: "actions",
      items: [
        { label: "Draft the opener", id: "draft" },
        { label: "Show duplicate analysis", id: "dupes" },
        { label: "Map the buying committee", id: "map" },
      ],
    },
  ],
};

export const FOLLOWUPS: Record<string, AgentBlock[]> = {
  draft: [
    {
      kind: "text",
      text: "Drafted — toned for a first 1:1 with a new CDO. Consultative, not pitchy:",
    },
    {
      kind: "email",
      subject: "Before Thursday — one thought on Saga's data lineage",
      body: [
        "Hej Linnea,",
        "Welcome to Saga. I caught your Telia talk on lineage from 2024 and the framing stuck with me — particularly the bit on subject-access traceability.",
        "Ahead of Thursday I'd like to share two things: how peers in industrial manufacturing have closed the lineage gap inside 8 weeks, and a back-of-envelope on what the Hovden integration could cost in stewardship hours if customer master stays fragmented.",
        "Happy to send the one-pager beforehand if useful, or save it for the call.",
        "Mikael",
      ],
    },
    {
      kind: "actions",
      items: [
        { label: "Make it shorter", id: "short" },
        { label: "Translate to Swedish", id: "sv" },
        { label: "Log to CRM", id: "log" },
      ],
    },
  ],
  dupes: [
    {
      kind: "text",
      text: "Duplicate analysis across Saga's customer master. I sampled the public ERP exports from the Hovden integration kickoff deck and cross-referenced Bolagsverket entity IDs:",
    },
    { kind: "dupes" },
    {
      kind: "text",
      text: "The 'same legal entity, different name' bucket is the easiest demo — every record there is provable via org-number match. Want me to put together a 12-record sample for the call?",
    },
  ],
  map: [
    {
      kind: "text",
      text: "Buying committee mapped. Influence × sentiment, with the 'unknown' boxes flagged so you can fill them in:",
    },
    { kind: "map" },
    {
      kind: "text",
      text: "Two gaps worth closing: nobody on the Finance side, and Procurement (Maja Eriksson) is cold — she killed the last vendor consolidation in 2023. I'd warm her via Anders before going wide.",
    },
  ],
};

export const FOLLOWUP_USER_TEXT: Record<string, string> = {
  draft: "Yes, draft it.",
  dupes: "Show the duplicate analysis.",
  map: "Map the committee.",
  short: "Make it shorter.",
  sv: "Translate to Swedish.",
  log: "Log to CRM.",
};

export const SUGGESTED_PROMPTS: string[] = [
  "Brief me before my 14:00 with Linnea",
  "Where's the dirty data hiding?",
  "Who else should I be talking to?",
  "Draft an outreach to the new CDO",
  "What's the realistic ARR ceiling here?",
  "Compare Saga to Aurora Försäkring",
];

export const DUPE_BREAKDOWN: { label: string; v: number; color: string }[] = [
  { label: "Same legal entity, different name", v: 9.4, color: "var(--bad)" },
  { label: "Subsidiary tagged as parent", v: 4.1, color: "var(--warn)" },
  { label: "Address/format-only variants", v: 3.2, color: "var(--warn)" },
  { label: "Confirmed deceased / dissolved", v: 1.5, color: "var(--ink-3)" },
];

// Business-case model. Values in SEK M, indexed [Y1, Y2, Y3].
export const BUSINESS_CASE = {
  investment: {
    label: "Investment",
    rows: [
      { label: "Platform license", years: [2.4, 2.4, 2.4] },
      { label: "Implementation & integration", years: [4.2, 0.8, 0.4] },
      { label: "Internal enablement", years: [1.2, 0.6, 0.3] },
      { label: "Stewardship tooling", years: [0.5, 0.5, 0.5] },
    ],
  },
  benefit: {
    label: "Benefit",
    rows: [
      { label: "Revenue recovery (cross-sell unlock)", years: [3.2, 8.4, 12.1] },
      { label: "Steward hours reduced (1,840 → 420)", years: [1.6, 2.1, 2.1] },
      { label: "GDPR fine exposure avoided", years: [1.0, 1.5, 1.6] },
      { label: "M&A integration acceleration (Hovden)", years: [4.8, 2.4, 0.8] },
      { label: "Cross-sell to Saga subsidiaries", years: [0.8, 2.6, 3.8] },
    ],
  },
};

export const PERSONA_SUB: Record<string, string> = {
  consultative: "Consultative · asks before assuming",
  analytical: "Analytical · numbers first",
  opinionated: "Opinionated · gives a recommendation",
};

export const ACCENTS: { value: string; name: string }[] = [
  { value: "#6a3df5", name: "Violet" },
  { value: "#3858d6", name: "Indigo" },
  { value: "#2f7a4d", name: "Forest" },
  { value: "#c2510a", name: "Ember" },
];
