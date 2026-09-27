/* ── DATA ── */
const ACCOUNTS = [
  {
    id: "saga", name: "Saga Industri AB", country: "SE", flag: "🇸🇪",
    sector: "Industrial manufacturing", hq: "Göteborg, Sweden",
    revenue: "SEK 12.4B", employees: "8,420", fiscal: "FY25 ends Dec 31",
    relationship: "Customer — Compliance Cloud (since 2022)",
    health: 72, opportunity: 88, opportunityValue: "SEK 4.2M ARR",
    stage: "Discovery → Solutioning", owner: "You (Mikael Lindqvist)",
    parent: "Saga Holding AB", subsidiaries: 14,
    systems: ["SAP S/4HANA", "Salesforce Sales Cloud", "Workday", "Coupa", "Two legacy ERPs (post-M&A)"],
    dataHealth: { score: 41, duplicates: 18.2, stewardshipHours: 1840, mdmCoverage: 23, lastAudit: "2026-03-14" },
    signals: [
      { tag: "M&A", text: "Closed acquisition of Hovden Verksted AS (Norway), Q4 2025", source: "Reuters · 4 days ago" },
      { tag: "Hire", text: "New Chief Data Officer joined from Telia — Linnea Hagström", source: "LinkedIn · 11 days ago" },
      { tag: "Filing", text: "Annual report flagged 'data quality and integration debt' as risk #3", source: "Saga AR 2025, p. 47" },
      { tag: "RFP", text: "Public tender for 'master data platform' surfaced via TED Europa", source: "TED · 22 days ago" }
    ],
    stakeholders: [
      { name: "Linnea Hagström", title: "Chief Data Officer", influence: 95, sentiment: "warm", note: "New hire, 90-day plan rumored to center on golden record", initials: "LH" },
      { name: "Anders Vik", title: "CIO", influence: 80, sentiment: "neutral", note: "Sponsored last ERP consolidation; budget owner", initials: "AV" },
      { name: "Petra Nilsson", title: "VP Sales Operations", influence: 70, sentiment: "warm", note: "Already champions cleaning up Salesforce duplicates", initials: "PN" },
      { name: "Johan Bergström", title: "Head of Data Governance", influence: 65, sentiment: "warm", note: "Met at Gartner Stockholm, asked for reference architecture", initials: "JB" },
      { name: "Maja Eriksson", title: "Procurement Director", influence: 55, sentiment: "cold", note: "Sole vendor consolidation mandate — known to push back hard on TCO", initials: "ME" }
    ],
    painpoints: [
      { id: "dup", severity: "critical", title: "Customer master fragmented across 5 ERPs post-M&A",
        impact: "Estimated 18.2% duplicate rate across legal entities. Revenue leakage from missed cross-sell ≈ SEK 80M/yr (internal benchmark, 0.6% of revenue).",
        evidence: ["Saga AR 2025 risk register, p. 47", "Job posting: 'Data Steward, Customer Domain' (×4 open reqs)", "Public tender via TED Europa, 22 days ago"],
        fit: { sku: "MDM Customer 360 + Match & Merge", tier: "Enterprise", arr: "SEK 2.4M", timeToValue: "14 weeks" } },
      { id: "gdpr", severity: "high", title: "GDPR audit gap — data lineage on subject-access requests",
        impact: "Datainspektionen findings from peers in sector indicate avg. SEK 4.1M fine exposure. Saga's last DPIA was 2023.",
        evidence: ["Datainspektionen public enforcement log (industrial sector, 2024–25)", "Saga DPIA timestamp — Q1 2023", "Linnea Hagström's prior public talk on lineage (Telia, 2024)"],
        fit: { sku: "Data Lineage & Stewardship Console", tier: "Standard", arr: "SEK 880K", timeToValue: "8 weeks" } },
      { id: "prod", severity: "medium", title: "Product taxonomy inconsistencies blocking cross-sell",
        impact: "3 overlapping product hierarchies (SAP MM, Salesforce CPQ, legacy ERP from Hovden acquisition). VP Sales Ops flagged at QBR.",
        evidence: ["Petra Nilsson, QBR Mar 18 (logged by SE)", "Hovden integration kickoff deck — slide 14", "Coupa supplier master diff report"],
        fit: { sku: "Product Domain MDM", tier: "Standard", arr: "SEK 940K", timeToValue: "10 weeks" } }
    ],
    roi: {
      currency: "SEK",
      investment: [["Platform license",2.4,2.4,2.4],["Implementation & integration",4.2,0.8,0.4],["Internal enablement",1.2,0.6,0.3],["Stewardship tooling",0.5,0.5,0.5]],
      benefits: [["Revenue recovery (cross-sell unlock)",3.2,8.4,12.1],["Steward hours reduced (1,840→420)",1.6,2.1,2.1],["GDPR fine exposure avoided",1.0,1.5,1.6],["M&A integration acceleration (Hovden)",4.8,2.4,0.8],["Cross-sell to subsidiaries",0.8,2.6,3.8]],
      paybackMonths: 11
    }
  },
  {
    id: "fjord", name: "Fjordstrøm Energi", country: "NO", flag: "🇳🇴",
    sector: "Energy & utilities", hq: "Stavanger, Norway",
    revenue: "NOK 28.1B", employees: "12,500", fiscal: "FY25 ends Dec 31",
    relationship: "Prospect — partner referral",
    health: 58, opportunity: 74, opportunityValue: "NOK 6.8M ARR",
    stage: "Qualification", owner: "You (Mikael Lindqvist)",
    parent: "Fjordstrøm Holding ASA", subsidiaries: 8,
    systems: ["SAP ECC 6.0", "Oracle Utilities", "IBM Maximo", "Legacy billing (pre-2018)"],
    dataHealth: { score: 54, duplicates: 12.8, stewardshipHours: 2100, mdmCoverage: 38, lastAudit: "2025-11-20" },
    signals: [
      { tag: "Tender", text: "EU grid modernisation tender (NOK 4.2B) — requires data governance proof-point", source: "Doffin · 3 days ago" },
      { tag: "Hire", text: "New Head of Digital Transformation — Sindre Bakke, ex-Equinor", source: "LinkedIn · 9 days ago" },
      { tag: "Reg", text: "NVE regulatory review flagged metering master data governance gaps", source: "NVE Report 2025:4 · 15 days ago" },
      { tag: "Filing", text: "Q3 earnings cited 'customer data fragmentation' as operational risk factor", source: "Fjordstrøm Q3 2025, p. 31" }
    ],
    stakeholders: [
      { name: "Sindre Bakke", title: "Head of Digital Transformation", influence: 85, sentiment: "warm", note: "90-day plan includes master data platform eval; ex-Equinor — familiar with MDM", initials: "SB" },
      { name: "Kari Andersen", title: "CFO", influence: 78, sentiment: "neutral", note: "Cost-focused; will scrutinize TCO vs. internal dev cost", initials: "KA" },
      { name: "Lars Solberg", title: "CTO", influence: 72, sentiment: "warm", note: "Evaluated MDM vendors at Equinor in 2022; positive reference point", initials: "LS" },
      { name: "Ingrid Holm", title: "Head of Regulatory Affairs", influence: 65, sentiment: "warm", note: "NVE compliance pressure creating urgency this quarter", initials: "IH" },
      { name: "Erik Thorsen", title: "Procurement Manager", influence: 50, sentiment: "cold", note: "Prefers existing vendor panel; framework agreement with legacy SI", initials: "ET" }
    ],
    painpoints: [
      { id: "meter", severity: "critical", title: "Metering master fragmented across 4 legacy systems",
        impact: "12.8% duplicate metering points causing NVE regulatory filing errors (NOK 8.4M rework in 2024). Smart meter rollout of 480k units stalled.",
        evidence: ["NVE Report 2025:4 — data quality findings, section 3.2", "Fjordstrøm Q3 2025 — 'operational risk factor #2'", "Smart meter project kickoff deck — slide 31"],
        fit: { sku: "MDM Location & Asset 360", tier: "Enterprise", arr: "NOK 3.2M", timeToValue: "16 weeks" } },
      { id: "nve", severity: "high", title: "NVE regulatory reporting gaps — location master inconsistency",
        impact: "17 reporting fields rely on address master. Current error rate 9.1% triggers automatic NVE review. Fine exposure NOK 12M per incident.",
        evidence: ["NVE Report 2025:4 (public enforcement document)", "Internal audit Q3 2025 — 'address data, severity HIGH'", "Doffin tender requirement: ISO 22745-compliant location master"],
        fit: { sku: "Data Lineage & Stewardship Console", tier: "Standard", arr: "NOK 1.8M", timeToValue: "8 weeks" } },
      { id: "cust", severity: "medium", title: "Customer master duplication blocking B2B pricing optimisation",
        impact: "B2B segment (18% of revenue) has 22% duplicate rate across ECC and legacy billing. Pricing desk manually reconciling 340 accounts/month.",
        evidence: ["Sindre Bakke kickoff call notes — 22 Apr 2026", "Pricing team escalation email (forwarded via Lars Solberg)", "SAP ECC ABAP report 'ZDUPLCHECK' flagged 4,812 customer pairs"],
        fit: { sku: "MDM Customer 360 + Match & Merge", tier: "Standard", arr: "NOK 1.8M", timeToValue: "12 weeks" } }
    ],
    roi: {
      currency: "NOK",
      investment: [["Platform license",3.2,3.2,3.2],["Implementation & integration",5.4,1.2,0.6],["Internal enablement",1.8,0.8,0.4],["Stewardship tooling",0.6,0.6,0.6]],
      benefits: [["Smart meter rollout acceleration",4.8,6.2,6.2],["NVE fine avoidance",4.0,6.0,6.0],["Steward hours reduced (2,100→480)",2.1,2.8,2.8],["B2B pricing optimisation",1.8,3.4,4.8],["EU tender eligibility",8.0,4.0,2.0]],
      paybackMonths: 9
    }
  },
  {
    id: "aurora", name: "Aurora Försäkring", country: "SE", flag: "🇸🇪",
    sector: "Insurance", hq: "Stockholm, Sweden",
    revenue: "SEK 8.7B", employees: "3,200", fiscal: "FY25 ends Dec 31",
    relationship: "Customer — Policy Admin Module (since 2021)",
    health: 81, opportunity: 62, opportunityValue: "SEK 2.1M ARR",
    stage: "Expansion", owner: "You (Mikael Lindqvist)",
    parent: "Aurora Group AB", subsidiaries: 5,
    systems: ["Guidewire PolicyCenter", "Salesforce Financial Services Cloud", "SAS Analytics", "Legacy claims system"],
    dataHealth: { score: 68, duplicates: 7.4, stewardshipHours: 840, mdmCoverage: 61, lastAudit: "2026-01-08" },
    signals: [
      { tag: "M&A", text: "Acquiring Nordicguard AS (Norway), closing Q2 2026 — will add 180k policyholders", source: "Affärsvärlden · 6 days ago" },
      { tag: "Hire", text: "New Chief Analytics Officer from IF Försäkring — Maria Söderberg", source: "LinkedIn · 18 days ago" },
      { tag: "Reg", text: "Finansinspektionen DORA compliance deadline approaching Q4 2026", source: "FI Circular 2025:14" },
      { tag: "Filing", text: "Q4 earnings flagged policyholder data fragmentation as integration risk", source: "Aurora Q4 2025, p. 19" }
    ],
    stakeholders: [
      { name: "Maria Söderberg", title: "Chief Analytics Officer", influence: 88, sentiment: "warm", note: "New hire, data-first mandate; previously led MDM evaluation at IF", initials: "MS" },
      { name: "Fredrik Lund", title: "CIO", influence: 75, sentiment: "neutral", note: "Platform skeptic — prefers existing vendors over new entrants", initials: "FL" },
      { name: "Anna Berg", title: "Head of Data & AI", influence: 70, sentiment: "warm", note: "Internal champion; built early proof-of-concept with MDM tooling", initials: "AB" },
      { name: "Thomas Karlsson", title: "CFO", influence: 65, sentiment: "neutral", note: "ROI-focused; benchmarks against build vs. buy", initials: "TK" },
      { name: "Eva Nilsson", title: "Head of Procurement", influence: 52, sentiment: "neutral", note: "Follows standard RFP process; no strong MDM vendor preference", initials: "EN" }
    ],
    painpoints: [
      { id: "policy", severity: "critical", title: "Policyholder master fragmented across PolicyCenter and legacy claims",
        impact: "7.4% duplicate policyholder rate with 180k Nordicguard records incoming. Risk of mis-pricing and duplicate policy issuance at acquisition close.",
        evidence: ["Aurora Q4 2025 integration risk register, p. 19", "Nordicguard data room — customer master export (2 schemas, zero overlap)", "Maria Söderberg onboarding brief (shared by Anna Berg)"],
        fit: { sku: "MDM Customer 360 + Match & Merge", tier: "Standard", arr: "SEK 800K", timeToValue: "10 weeks" } },
      { id: "dora", severity: "high", title: "DORA compliance — data lineage gap in critical function mapping",
        impact: "Finansinspektionen expects full data lineage for critical ICT functions by Q4 2026. Current lineage coverage is 34% across policyholder and claims domains.",
        evidence: ["FI Circular 2025:14 — article 8 lineage requirements", "Internal DORA readiness audit (Mar 2026) — lineage gap flagged HIGH", "Peer enforcement: Folksam fined SEK 2.2M for equivalent gap in 2025"],
        fit: { sku: "Data Lineage & Stewardship Console", tier: "Standard", arr: "SEK 720K", timeToValue: "8 weeks" } },
      { id: "merge", severity: "medium", title: "Nordicguard integration data debt — no golden record baseline",
        impact: "Nordicguard uses 3 different product codes for the same coverage type. Cross-sell window post-close is typically 6 months — integration lag costs SEK 28M in upsell.",
        evidence: ["Nordicguard product master export — 3 schema variants (shared by Anna Berg)", "Aurora post-M&A playbook — slide 8: 'data harmonisation required at close'", "IF Försäkring reference case: 9-month dedup lag post-acquisition"],
        fit: { sku: "MDM Match & Merge — M&A Pack", tier: "Standard", arr: "SEK 580K", timeToValue: "6 weeks" } }
    ],
    roi: {
      currency: "SEK",
      investment: [["Platform license",0.8,0.8,0.8],["Implementation & integration",2.1,0.4,0.2],["Internal enablement",0.6,0.3,0.1],["Stewardship tooling",0.2,0.2,0.2]],
      benefits: [["Nordicguard integration acceleration",3.2,1.6,0.8],["DORA compliance cost avoidance",1.8,2.4,2.4],["Policy holder deduplication",1.4,2.2,2.8],["Cross-sell from unified view",0.6,1.8,3.2],["Reduced manual reconciliation",0.4,0.8,0.8]],
      paybackMonths: 13
    }
  },
  {
    id: "kalmar", name: "Kalmar Maritime Group", country: "FI", flag: "🇫🇮",
    sector: "Logistics", hq: "Helsinki, Finland",
    revenue: "EUR 3.4B", employees: "6,100", fiscal: "FY25 ends Dec 31",
    relationship: "Prospect — Gartner recommendation",
    health: 49, opportunity: 81, opportunityValue: "EUR 510K ARR",
    stage: "Discovery", owner: "You (Mikael Lindqvist)",
    parent: "Nasdaq Helsinki (listed)", subsidiaries: 11,
    systems: ["SAP TM", "Oracle NetSuite (subsidiaries)", "Custom WMS", "Two legacy freight systems"],
    dataHealth: { score: 37, duplicates: 22.6, stewardshipHours: 3200, mdmCoverage: 19, lastAudit: "2025-09-05" },
    signals: [
      { tag: "M&A", text: "Acquired Baltic Freight Services OÜ (Estonia), Jan 2026 — adds 3rd ERP to stack", source: "Kauppalehti · 2 days ago" },
      { tag: "Reg", text: "EU CSDDD compliance gap identified in internal audit — supplier master incomplete", source: "Internal audit · 7 days ago" },
      { tag: "Hire", text: "Head of IT Systems vacancy posted — third in 18 months; team in flux", source: "LinkedIn · 14 days ago" },
      { tag: "Filing", text: "Annual report cited cross-system visibility as top digital priority", source: "Kalmar AR 2025, p. 22" }
    ],
    stakeholders: [
      { name: "Jukka Mäkinen", title: "Chief Digital Officer", influence: 90, sentiment: "warm", note: "Drives digital agenda; attended our Nordic MDM roundtable in March", initials: "JM" },
      { name: "Hanna Virtanen", title: "CFO", influence: 80, sentiment: "neutral", note: "ROI-focused; wants payback inside 12 months", initials: "HV" },
      { name: "Mika Laine", title: "Head of Operations", influence: 70, sentiment: "warm", note: "Daily pain from system fragmentation; strong internal sponsor potential", initials: "ML" },
      { name: "Tiina Korhonen", title: "Head of Compliance", influence: 68, sentiment: "warm", note: "CSDDD deadline is Q1 2027 — urgency is real", initials: "TK" },
      { name: "Petri Salo", title: "IT Director", influence: 45, sentiment: "cold", note: "Resource-constrained; wary of new implementation projects", initials: "PS" }
    ],
    painpoints: [
      { id: "ship", severity: "critical", title: "Shipment master fragmented across 5 source systems post-M&A",
        impact: "22.6% duplicate shipment records. Demurrage charges from mis-matched location codes cost EUR 4.1M in 2025. Baltic acquisition adds a 6th system.",
        evidence: ["Kalmar AR 2025 — 'data fragmentation' cited as operational risk, p. 22", "Baltic Freight integration kickoff (Jukka Mäkinen, 14 Jan 2026) — 3 schema variants", "Kauppalehti M&A announcement — 'ERP consolidation expected H2 2026'"],
        fit: { sku: "MDM Location & Asset 360", tier: "Enterprise", arr: "EUR 320K", timeToValue: "16 weeks" } },
      { id: "csddd", severity: "high", title: "EU CSDDD compliance blocked by incomplete supplier master",
        impact: "Q1 2027 CSDDD deadline requires full supplier traceability to Tier 2. Current supplier master coverage is 19%. Non-compliance fine exposure EUR 3.4M (1% of revenue cap).",
        evidence: ["Internal compliance audit — 7 Apr 2026 (flagged HIGH)", "EU CSDDD Article 10 — 'appropriate due diligence' requires traceable supply chain data", "Peer case: DSV fined EUR 1.8M for equivalent supplier master gap (2025)"],
        fit: { sku: "Data Lineage & Stewardship Console", tier: "Standard", arr: "EUR 160K", timeToValue: "10 weeks" } },
      { id: "cust", severity: "medium", title: "Customer deduplication blocking cross-sell in Baltic market",
        impact: "Baltic Freight customer list overlaps 34% with Kalmar's existing base. Without dedup, Baltic sales team will cannibalize Nordic accounts and miss SEK 2.8M cross-sell window.",
        evidence: ["Baltic Freight customer export — overlap analysis (Mika Laine, 18 Feb 2026)", "Kalmar sales kickoff deck — Baltic go-to-market, slide 9", "Nordic MDM benchmark: 9-month avg dedup lag post-acquisition"],
        fit: { sku: "MDM Customer 360 + Match & Merge", tier: "Standard", arr: "EUR 30K", timeToValue: "8 weeks" } }
    ],
    roi: {
      currency: "EUR",
      investment: [["Platform license",0.4,0.4,0.4],["Implementation & integration",1.8,0.6,0.3],["Internal enablement",0.5,0.2,0.1],["Stewardship tooling",0.15,0.15,0.15]],
      benefits: [["Baltic Freight integration acceleration",2.8,1.4,0.6],["CSDDD compliance fine avoidance",1.2,1.8,1.8],["Shipment accuracy (demurrage reduction)",0.8,1.6,2.2],["Customer dedup — Baltic cross-sell",0.4,1.2,2.0],["IT steward hours (3,200→680)",1.8,2.4,2.4]],
      paybackMonths: 11
    }
  },
  {
    id: "borg", name: "Borgmann Pharma A/S", country: "DK", flag: "🇩🇰",
    sector: "Life sciences", hq: "Aarhus, Denmark",
    revenue: "DKK 19.2B", employees: "7,800", fiscal: "FY25 ends Dec 31",
    relationship: "Customer — Product MDM (since 2020)",
    health: 90, opportunity: 45, opportunityValue: "DKK 3.4M ARR",
    stage: "Renewal", owner: "You (Mikael Lindqvist)",
    parent: "Borgmann Holding A/S", subsidiaries: 18,
    systems: ["SAP S/4HANA", "Veeva Vault", "LIMS", "Global regulatory dossier system"],
    dataHealth: { score: 84, duplicates: 3.1, stewardshipHours: 380, mdmCoverage: 78, lastAudit: "2026-04-02" },
    signals: [
      { tag: "Renewal", text: "Contract renewal window opens Sept 2026 — DKK 3.4M ARR at stake", source: "CRM · Contract record" },
      { tag: "Expansion", text: "EU MDR compliance project mandates material master extension into new device categories", source: "Internal · 21 days ago" },
      { tag: "Hire", text: "New VP Data Management from Novo Nordisk — Signe Christoffersen", source: "LinkedIn · 28 days ago" },
      { tag: "Filing", text: "EMA regulatory submission turnaround improved 34% since MDM go-live in 2020", source: "Borgmann internal benchmark 2025" }
    ],
    stakeholders: [
      { name: "Signe Christoffersen", title: "VP Data Management", influence: 82, sentiment: "warm", note: "Advocates expansion into customer and supplier domain; ex-Novo Nordisk", initials: "SC" },
      { name: "Anders Holm", title: "CIO", influence: 76, sentiment: "warm", note: "Existing positive relationship; co-authored go-live case study", initials: "AH" },
      { name: "Maja Jensen", title: "Head of Regulatory Affairs", influence: 70, sentiment: "neutral", note: "Focused on EU MDR compliance — MDM is an enabler but not her top priority", initials: "MJ" },
      { name: "Klaus Nielsen", title: "CFO", influence: 65, sentiment: "neutral", note: "Benchmarks renewal cost against alternatives every cycle", initials: "KN" },
      { name: "Lars Bach", title: "Procurement Director", influence: 55, sentiment: "warm", note: "Smooth renewal expected; familiar with value delivered", initials: "LB" }
    ],
    painpoints: [
      { id: "mdr", severity: "critical", title: "EU MDR compliance requires material master extension to new device categories",
        impact: "19 new device categories must be MDR-compliant by Q3 2026. Current Product MDM covers 78% — the remaining 22% are the highest-risk categories for recall liability.",
        evidence: ["EU MDR Article 14 — UDI data quality requirements (effective Mar 2026)", "Borgmann internal EU MDR gap assessment — Apr 2026", "EMA warning letters to 3 Nordic pharma peers for UDI master gaps (2025)"],
        fit: { sku: "MDM Product — EU MDR Extension Pack", tier: "Enterprise", arr: "DKK 2.2M", timeToValue: "12 weeks" } },
      { id: "cust", severity: "high", title: "Customer domain still fully manual — no MDM governance",
        impact: "14,000 HCP and hospital records managed in spreadsheets. 18% estimated duplicate rate. Blocks compliant promotional data reporting (EFPIA Sunshine Act).",
        evidence: ["Signe Christoffersen onboarding note (Signe to Mikael, 2 May 2026)", "EFPIA disclosure audit — 2024 Borgmann filing had 340 duplicate HCP records", "Comparable: Novo Nordisk HCP MDM cut reporting errors by 74% in 18 months"],
        fit: { sku: "MDM Customer 360 (HCP Edition)", tier: "Standard", arr: "DKK 1.8M", timeToValue: "14 weeks" } },
      { id: "supp", severity: "medium", title: "Supplier master ungoverned — risk for CSDDD and procurement savings",
        impact: "6,200 active suppliers across 18 subsidiaries. No golden supplier record. Procurement estimates 12% spend on duplicate suppliers — DKK 48M/yr opportunity.",
        evidence: ["Procurement spend cube — supplier dedup analysis (Lars Bach, Jan 2026)", "EU CSDDD Article 10 — Tier 2 supplier traceability required by Q1 2027", "Borgmann Coupa export — 1,840 supplier duplicates flagged (Mar 2026)"],
        fit: { sku: "MDM Supplier Domain", tier: "Standard", arr: "DKK 1.4M", timeToValue: "10 weeks" } }
    ],
    roi: {
      currency: "DKK",
      investment: [["Platform license renewal",3.4,3.4,3.4],["Customer domain expansion",4.8,0.8,0.4],["EU MDR compliance module",2.2,0.4,0.2],["Stewardship tooling",0.3,0.3,0.3]],
      benefits: [["EU MDR recall risk avoidance",8.0,12.0,12.0],["Customer domain MDM (new ARR)",2.0,4.8,6.4],["Supplier MDM (procurement savings)",1.2,3.6,4.8],["Regulatory submission cycle reduction",0.8,2.4,3.2],["Stewardship efficiency",0.2,0.6,0.8]],
      paybackMonths: 8
    }
  },
  {
    id: "vatna", name: "Vatnajökull Banki hf.", country: "IS", flag: "🇮🇸",
    sector: "Banking", hq: "Reykjavík, Iceland",
    revenue: "EUR 820M", employees: "1,240", fiscal: "FY25 ends Dec 31",
    relationship: "Prospect — cold outbound",
    health: 36, opportunity: 69, opportunityValue: "EUR 240K ARR",
    stage: "Discovery", owner: "You (Mikael Lindqvist)",
    parent: "Nasdaq Iceland (listed)", subsidiaries: 3,
    systems: ["Temenos T24", "Salesforce", "Legacy reporting system", "MS Dynamics (asset mgmt)"],
    dataHealth: { score: 28, duplicates: 31.4, stewardshipHours: 1620, mdmCoverage: 12, lastAudit: "2024-08-12" },
    signals: [
      { tag: "Reg", text: "Seðlabanki Íslands issued formal data quality remediation notice — 90-day deadline", source: "FME Iceland · 1 day ago" },
      { tag: "News", text: "CEO publicly committed to digital transformation roadmap at AGM", source: "Morgunblaðið · 12 days ago" },
      { tag: "Hire", text: "Head of Data Analytics posted — first dedicated data hire in company history", source: "LinkedIn · 20 days ago" },
      { tag: "Filing", text: "Annual report flagged customer master quality as a material control weakness", source: "Vatnajökull AR 2025, p. 58" }
    ],
    stakeholders: [
      { name: "Sigríður Magnúsdóttir", title: "CEO", influence: 95, sentiment: "neutral", note: "Publicly committed to transformation but delegates technology decisions to CTO", initials: "SM" },
      { name: "Björn Pálsson", title: "CFO", influence: 80, sentiment: "cold", note: "Skeptical of vendor solutions; prefers internal build; scrutinizes every cost", initials: "BP" },
      { name: "Kristinn Sigurðsson", title: "CTO", influence: 75, sentiment: "warm", note: "Recognizes technical debt; pragmatic about buy vs. build given team size", initials: "KS" },
      { name: "Arna Björnsdóttir", title: "Head of Compliance", influence: 70, sentiment: "warm", note: "Central Bank notice is her top priority — urgency is immediate", initials: "AB" },
      { name: "Gunnar Thorvaldsen", title: "Head of IT", influence: 60, sentiment: "neutral", note: "Stretched team; open to external help but needs fast implementation", initials: "GT" }
    ],
    painpoints: [
      { id: "kyc", severity: "critical", title: "Customer master 31.4% duplicate rate — Central Bank remediation notice",
        impact: "Seðlabanki issued 90-day notice. KYC/AML screening running against duplicate records creates regulatory blind spots. Fine exposure EUR 4.1M (0.5% of assets).",
        evidence: ["Seðlabanki Íslands formal notice — 24 Apr 2026 (public document)", "Vatnajökull AR 2025 — 'material control weakness, customer master', p. 58", "FME Iceland peer enforcement: Íslandsbanki fined EUR 1.2M for equivalent gap (2024)"],
        fit: { sku: "MDM Customer 360 + Match & Merge", tier: "Standard", arr: "EUR 120K", timeToValue: "10 weeks" } },
      { id: "aml", severity: "high", title: "KYC/AML reporting blocked by fragmented party master",
        impact: "T24 and Salesforce hold separate party records with no reconciliation. 1-in-5 SAR filings require manual cross-check. Compliance team spending 620 hrs/yr on dedup.",
        evidence: ["Internal AML process audit — Mar 2026 (shared by Arna Björnsdóttir)", "T24 party export vs. Salesforce — 8,140 unresolved duplicates", "FATF guidance: party master fragmentation is a Tier 1 AML control deficiency"],
        fit: { sku: "Data Lineage & Stewardship Console", tier: "Standard", arr: "EUR 60K", timeToValue: "8 weeks" } },
      { id: "found", severity: "medium", title: "Zero MDM coverage across any domain — foundational gap",
        impact: "No golden record across customer, product, or location domains. 12% MDM coverage is lowest in Nordic banking peer group. Digital transformation roadmap stalls without a foundation.",
        evidence: ["Vatnajökull AR 2025 — digital transformation roadmap, p. 12", "Nordic banking MDM benchmark (2025) — Vatnajökull ranks 18th of 18", "CEO AGM presentation — 'data quality as prerequisite for all digital initiatives'"],
        fit: { sku: "MDM Foundation — Banking Edition", tier: "Standard", arr: "EUR 60K", timeToValue: "12 weeks" } }
    ],
    roi: {
      currency: "EUR",
      investment: [["Platform license",0.18,0.18,0.18],["Implementation & integration",0.48,0.12,0.06],["Internal enablement",0.12,0.06,0.03],["Stewardship tooling",0.06,0.06,0.06]],
      benefits: [["Central Bank remediation avoidance",0.80,1.20,1.20],["KYC/AML process automation",0.40,0.88,1.20],["Customer dedup (31.4%→4%)",0.32,0.72,0.96],["IT steward hours (1,620→280)",0.24,0.32,0.32],["Cross-sell from single party view",0.12,0.40,0.72]],
      paybackMonths: 14
    }
  }
];

function getConversation(account) {
  const { currency = 'SEK', investment: invRows, benefits: benRows, paybackMonths } = account.roi;
  const s3 = rows => rows.reduce((t, r) => t + r[1] + r[2] + r[3], 0);
  const cumInvest = s3(invRows), cumBenefit = s3(benRows);
  const roi = Math.round(((cumBenefit - cumInvest) / cumInvest) * 100);
  const champ = account.stakeholders[0], budget = account.stakeholders[1];
  const pain = account.painpoints[0];
  return [
    { role: 'user', text: `Brief me on ${account.name} before my next call with ${champ.name}.` },
    { role: 'agent', blocks: [
      { kind: 'text', text: `Here's what I have on ${account.name}, focused on what matters for a ${champ.title} conversation:` },
      { kind: 'brief', rows: [
        ['Why now', account.signals[0].text],
        ['What hurts', `${account.dataHealth.duplicates}% duplicate rate across ${account.systems.length} source systems. ~${account.dataHealth.stewardshipHours.toLocaleString()} steward-hrs/yr. MDM coverage only ${account.dataHealth.mdmCoverage}%.`],
        ['Who decides', `${champ.name} (${champ.title}) is your ${champ.sentiment === 'warm' ? 'champion' : 'main contact'}. ${budget.name} (${budget.title}) holds budget.`],
        ['What to land', `${pain.fit.sku} — ${pain.fit.arr} ARR · ${pain.fit.timeToValue} TTV. Anchor on ${account.signals[0].tag} urgency.`],
        ['ROI · TCO', `3-yr TCO ${currency} ${cumInvest.toFixed(1)}M, benefit ${currency} ${cumBenefit.toFixed(1)}M → ${roi}% net ROI, payback in ${paybackMonths} months.`]
      ]},
      { kind: 'text', text: `${champ.note}. Want me to draft the opener?` },
      { kind: 'actions', items: [{ label: 'Draft the opener', id: 'draft' }, { label: 'Show duplicate analysis', id: 'dupes' }, { label: 'Map the buying committee', id: 'map' }] }
    ]}
  ];
}

const FOLLOWUPS = {
  draft: { role: 'agent', blocks: [
    { kind: 'text', text: 'Drafted — toned for a consultative first outreach. Not pitchy:' },
    { kind: 'email', subject: 'Before our next call — one thought on your data foundation',
      body: ['Hej,', 'I\'ve been looking at what\'s publicly visible on your data landscape ahead of our call. A few things stood out that I\'d like to share — particularly around the regulatory angle and what peers in your sector have done to close similar gaps inside 8–12 weeks.', 'Happy to send a one-pager beforehand, or save it for the call.', 'Mikael'] },
    { kind: 'actions', items: [{ label: 'Make it shorter', id: 'short' }, { label: 'Translate to Swedish', id: 'sv' }, { label: 'Log to CRM', id: 'log' }] }
  ]},
  dupes: { role: 'agent', blocks: [
    { kind: 'text', text: 'Duplicate analysis across the customer master. Breakdown by root cause:' },
    { kind: 'dupes' },
    { kind: 'text', text: 'The \'same legal entity, different name\' bucket is the easiest demo — every record there is provable via org-number match. Want me to put together a sample set for the call?' }
  ]},
  map: { role: 'agent', blocks: [
    { kind: 'text', text: 'Buying committee mapped. Influence × sentiment, gaps flagged:' },
    { kind: 'map' },
    { kind: 'text', text: 'Two gaps worth closing: Finance side is unrepresented. Warm up the budget holder via the champion before going wide on an RFP.' }
  ]}
};

const SUGGESTED_PROMPTS = [
  "Brief me before my next call",
  "Where's the dirty data hiding?",
  "Who else should I be talking to?",
  "Draft an outreach email",
  "What's the realistic ARR ceiling here?",
  "Compare to another Nordic account"
];

/* ──────────────────────────────────────────────────────────────────────────
   DYNAMIC SYNTHESIS ENGINE — build a schema-complete account from a few inputs.
   Deterministic (seeded by name) so the same company always synthesizes the same.
   ────────────────────────────────────────────────────────────────────────── */
const COUNTRY = {
  SE: { flag:'🇸🇪', capital:'Stockholm', currency:'SEK', mult:10 },
  NO: { flag:'🇳🇴', capital:'Oslo', currency:'NOK', mult:10 },
  DK: { flag:'🇩🇰', capital:'Copenhagen', currency:'DKK', mult:7 },
  FI: { flag:'🇫🇮', capital:'Helsinki', currency:'EUR', mult:1 },
  IS: { flag:'🇮🇸', capital:'Reykjavík', currency:'EUR', mult:1 },
  DE: { flag:'🇩🇪', capital:'Berlin', currency:'EUR', mult:1 },
  GB: { flag:'🇬🇧', capital:'London', currency:'GBP', mult:1 },
  US: { flag:'🇺🇸', capital:'New York', currency:'USD', mult:1 },
  NL: { flag:'🇳🇱', capital:'Amsterdam', currency:'EUR', mult:1 },
  XX: { flag:'🏳️', capital:'—', currency:'EUR', mult:1 }
};

// Sector → primary master-data domain, regulator, and SKU fit.
const SECTOR_PROFILE = {
  insurance:   { reg:'DORA', regBody:'Finansinspektionen', domain:'policyholder master', sku:'MDM Customer 360 + Match & Merge', asset:false },
  banking:     { reg:'AML/KYC', regBody:'the central bank', domain:'party master', sku:'MDM Customer 360 + Match & Merge', asset:false },
  energy:      { reg:'NVE metering rules', regBody:'the energy regulator', domain:'metering & asset master', sku:'MDM Location & Asset 360', asset:true },
  utilities:   { reg:'NVE metering rules', regBody:'the energy regulator', domain:'metering & asset master', sku:'MDM Location & Asset 360', asset:true },
  logistics:   { reg:'EU CSDDD', regBody:'EU supply-chain audit', domain:'shipment & location master', sku:'MDM Location & Asset 360', asset:true },
  transport:   { reg:'EU CSDDD', regBody:'EU supply-chain audit', domain:'shipment & location master', sku:'MDM Location & Asset 360', asset:true },
  pharma:      { reg:'EU MDR', regBody:'EMA', domain:'material & product master', sku:'MDM Product Enterprise', asset:false },
  'life sciences': { reg:'EU MDR', regBody:'EMA', domain:'material & product master', sku:'MDM Product Enterprise', asset:false },
  manufacturing:{ reg:'GDPR', regBody:'the data protection authority', domain:'customer & product master', sku:'MDM Customer 360 + Match & Merge', asset:false },
  industrial:  { reg:'GDPR', regBody:'the data protection authority', domain:'customer & product master', sku:'MDM Customer 360 + Match & Merge', asset:false },
  retail:      { reg:'GDPR', regBody:'the data protection authority', domain:'product & customer master', sku:'MDM Product Enterprise', asset:false },
  telecom:     { reg:'GDPR', regBody:'the telecom regulator', domain:'subscriber master', sku:'MDM Customer 360 + Match & Merge', asset:false },
  public:      { reg:'GDPR', regBody:'the data protection authority', domain:'citizen master', sku:'MDM Customer 360', asset:false },
  default:     { reg:'GDPR', regBody:'the data protection authority', domain:'customer master', sku:'MDM Customer 360 + Match & Merge', asset:false }
};

const NAME_POOL = {
  SE:[['Erik','Lindberg'],['Anna','Sundqvist'],['Johan','Ek'],['Sara','Holm'],['Karl','Berg'],['Eva','Lund']],
  NO:[['Lars','Haugen'],['Ingrid','Dahl'],['Sindre','Moen'],['Kari','Berg'],['Ole','Strand'],['Nina','Lie']],
  DK:[['Anders','Sørensen'],['Mette','Jensen'],['Klaus','Holm'],['Signe','Bach'],['Lars','Møller'],['Maja','Poulsen']],
  FI:[['Jukka','Mäkinen'],['Hanna','Virtanen'],['Mika','Laine'],['Tiina','Korhonen'],['Petri','Salo'],['Liisa','Niemi']],
  IS:[['Björn','Pálsson'],['Sigríður','Magnúsdóttir'],['Kristinn','Sigurðsson'],['Arna','Jónsdóttir'],['Gunnar','Thor'],['Helga','Ólafsdóttir']],
  XX:[['Alex','Moor'],['Sam','Ericsson'],['Jo','Berg'],['Robin','Hart'],['Casey','Lund'],['Drew','Stein']]
};

function _seed(str) { let h = 2166136261; for (let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h,16777619); } return (h>>>0); }
function _rng(seed){ let s = seed||1; return () => { s = (s*1664525 + 1013904223) >>> 0; return s/4294967296; }; }
function _slug(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'').slice(0,40) || ('acct-'+Date.now()); }
function _profile(sector){ const k = (sector||'').toLowerCase(); for (const key of Object.keys(SECTOR_PROFILE)){ if (k.includes(key)) return SECTOR_PROFILE[key]; } return SECTOR_PROFILE.default; }

function synthesizeAccount(attrs) {
  const name = (attrs.name || 'New Account').trim();
  const cc = (attrs.country || 'XX').toUpperCase();
  const C = COUNTRY[cc] || COUNTRY.XX;
  const sector = attrs.sector || 'Industrial';
  const P = _profile(sector);
  const rng = _rng(_seed(name + cc + sector));
  const pick = arr => arr[Math.floor(rng()*arr.length)];

  // Duplicate rate drives the whole health story.
  let dup = parseFloat(attrs.duplicates);
  if (!isFinite(dup) || dup <= 0) dup = Math.round((6 + rng()*22) * 10) / 10;
  dup = Math.min(40, Math.max(2, Math.round(dup*10)/10));
  const score = Math.max(18, Math.min(92, Math.round(92 - dup*1.9 - rng()*6)));
  const mdmCoverage = Math.max(8, Math.min(85, Math.round(80 - dup*1.6 + rng()*8)));
  const stewardshipHours = Math.round((dup * 95 + rng()*400) / 10) * 10;
  const today = new Date().toISOString().slice(0,10);

  // Revenue / currency
  const cur = C.currency;
  const revRaw = (attrs.revenue || '').trim();
  let revText = revRaw, revNum;
  const m = revRaw.match(/([\d.,]+)\s*(b|bn|billion|m|mn|million)?/i);
  if (m) {
    let v = parseFloat(m[1].replace(/,/g,'')); const unit = (m[2]||'b').toLowerCase();
    revNum = unit.startsWith('m') ? v/1000 : v; // in billions
  } else { revNum = 1 + rng()*20; }
  if (!revRaw) revText = `${cur} ${revNum.toFixed(1)}B`;
  else if (!/[a-z]{3}/i.test(revRaw)) revText = `${cur} ${revRaw}`;

  const employees = attrs.employees || `${(Math.round(revNum*420)).toLocaleString()}`;
  const systems = (Array.isArray(attrs.systems) ? attrs.systems
    : String(attrs.systems||'').split(',')).map(s=>s.trim()).filter(Boolean);
  const sysList = systems.length ? systems : ['SAP ECC', 'Salesforce', 'Legacy ERP (post-M&A)', 'Data warehouse'];

  // ROI scaled to revenue magnitude and currency multiplier; in millions of local currency.
  const scale = Math.max(0.04, revNum * C.mult * 0.02);
  const r1 = () => Math.round(scale * (0.8 + rng()*0.6) * 10) / 10;
  const investment = [
    ['Platform license', r1(), null, null],
    ['Implementation & integration', null, null, null],
    ['Internal enablement', null, null, null],
    ['Stewardship tooling', null, null, null]
  ];
  // fill deterministic triplets
  const lic = Math.max(0.1, Math.round(scale*1.0*10)/10);
  investment[0] = ['Platform license', lic, lic, lic];
  investment[1] = ['Implementation & integration', Math.round(scale*1.8*10)/10, Math.round(scale*0.4*10)/10, Math.round(scale*0.2*10)/10];
  investment[2] = ['Internal enablement', Math.round(scale*0.5*10)/10, Math.round(scale*0.25*10)/10, Math.round(scale*0.12*10)/10];
  investment[3] = ['Stewardship tooling', Math.round(scale*0.18*10)/10, Math.round(scale*0.18*10)/10, Math.round(scale*0.18*10)/10];
  const benefits = [
    [`${P.asset?'Asset':'Master'} data integration acceleration`, Math.round(scale*2.6*10)/10, Math.round(scale*1.4*10)/10, Math.round(scale*0.7*10)/10],
    [`${P.reg} compliance fine avoidance`, Math.round(scale*1.4*10)/10, Math.round(scale*2.0*10)/10, Math.round(scale*2.0*10)/10],
    [`Duplicate reduction (${dup}%→${Math.max(2,Math.round(dup*0.15))}%)`, Math.round(scale*0.9*10)/10, Math.round(scale*1.7*10)/10, Math.round(scale*2.3*10)/10],
    ['Cross-sell from unified view', Math.round(scale*0.5*10)/10, Math.round(scale*1.5*10)/10, Math.round(scale*2.6*10)/10],
    [`Steward hours reduced (${stewardshipHours.toLocaleString()}→${Math.round(stewardshipHours*0.25).toLocaleString()})`, Math.round(scale*0.6*10)/10, Math.round(scale*0.9*10)/10, Math.round(scale*0.9*10)/10]
  ];
  const paybackMonths = Math.max(6, Math.min(18, Math.round(14 - (40-dup)*0.12)));

  const arr = `${cur} ${(scale*1.0).toFixed(scale<1?2:1)}M`;
  const arr2 = `${cur} ${(scale*0.6).toFixed(scale<1?2:1)}M`;
  const arr3 = `${cur} ${(scale*0.45).toFixed(scale<1?2:1)}M`;

  // Stakeholders
  const titles = [
    ['Chief Data Officer', 88, 'warm'],
    [P.asset?'COO':'CIO', 78, 'neutral'],
    ['Head of Data Governance', 70, 'warm'],
    ['CFO', 66, 'neutral'],
    ['Procurement Director', 52, 'cold']
  ];
  const pool = (NAME_POOL[cc] || NAME_POOL.XX).slice();
  const stakeholders = titles.map((t,i) => {
    const nm = pool.splice(Math.floor(rng()*pool.length),1)[0] || ['A','B'];
    const full = `${nm[0]} ${nm[1]}`;
    return { name:full, title:t[0], influence:t[1]+Math.round((rng()-0.5)*8), sentiment:t[2],
      note: i===0 ? `New mandate around the ${P.domain}; most likely champion.` :
            i===3 ? 'Budget owner — will scrutinise TCO and payback.' :
            i===4 ? 'Runs the RFP; prefers the existing vendor panel.' :
            `Owns ${P.domain} operationally; daily pain from fragmentation.`,
      initials: nm[0][0]+nm[1][0] };
  });

  // Signals
  const signals = [
    { tag:'M&A', text:`Recent acquisition adds a parallel ${sysList.length>2?sysList[2]:'ERP'} to the stack — ${P.domain} now spans ${sysList.length} systems.`, source:'News · this month' },
    { tag:'Hire', text:`New ${stakeholders[0].title} ${stakeholders[0].name} joined with a data-first 90-day plan.`, source:'LinkedIn · recent' },
    { tag:'Reg', text:`${P.reg} pressure from ${P.regBody} is creating a compliance deadline this year.`, source:'Regulatory filing' },
    { tag:'Filing', text:`Annual report flags ${P.domain} fragmentation as an operational risk.`, source:'Annual report' }
  ];

  // Painpoints
  const painpoints = [
    { id:'p1', severity:'critical', title:`${P.domain.charAt(0).toUpperCase()+P.domain.slice(1)} fragmented across ${sysList.length} systems`,
      impact:`${dup}% duplicate rate detected. At this revenue, leakage and rework from a fragmented ${P.domain} is material, and an active integration makes it worse.`,
      evidence:[`Annual report — ${P.domain} cited as risk`, `${stakeholders[0].name} onboarding mandate`, `System inventory: ${sysList.length} sources, no golden record`],
      fit:{ sku:P.sku, tier:'Enterprise', arr, timeToValue:'14 weeks' } },
    { id:'p2', severity:'high', title:`${P.reg} compliance gap — data lineage incomplete`,
      impact:`${P.regBody} expects traceable lineage. Current MDM coverage is ${mdmCoverage}%, leaving the highest-risk records ungoverned.`,
      evidence:[`${P.reg} requirement (sector-wide deadline)`, 'Internal audit — lineage flagged HIGH', 'Peer enforcement precedent in sector'],
      fit:{ sku:'Data Lineage & Stewardship Console', tier:'Standard', arr:arr2, timeToValue:'8 weeks' } },
    { id:'p3', severity:'medium', title:'Cross-sell blocked by duplicate customer records',
      impact:`Sales operate against duplicate records, cannibalising accounts and missing cross-sell. ${stewardshipHours.toLocaleString()} steward-hrs/yr spent reconciling by hand.`,
      evidence:['Sales ops escalation', 'Duplicate-pair report from source systems', 'Benchmark: ~9-month dedup lag without MDM'],
      fit:{ sku:'MDM Customer 360', tier:'Standard', arr:arr3, timeToValue:'10 weeks' } }
  ];

  return {
    id:_slug(name), name, country:cc, flag:C.flag, sector, hq: attrs.hq || `${C.capital}, ${cc}`,
    revenue:revText, employees, fiscal:'FY25 ends Dec 31',
    relationship: attrs.relationship || 'Prospect — added by rep',
    health: Math.max(20, Math.min(95, 100-Math.round(dup*1.6))),
    opportunity: Math.max(40, Math.min(95, Math.round(50 + dup*1.2 + rng()*8))),
    opportunityValue: arr + ' ARR',
    stage:'Discovery', owner:'You (Mikael Lindqvist)',
    parent: attrs.parent || `${name.split(' ')[0]} Holding`, subsidiaries: 3 + Math.floor(rng()*14),
    systems: sysList,
    dataHealth:{ score, duplicates:dup, stewardshipHours, mdmCoverage, lastAudit:today },
    signals, stakeholders, painpoints,
    roi:{ currency:cur, investment, benefits, paybackMonths },
    synthetic: true
  };
}

/* ──────────────────────────────────────────────────────────────────────────
   CLAUDE API (optional, hybrid) — live free-form answers grounded on the account.
   Key + model live in localStorage only; never written into the file.
   ────────────────────────────────────────────────────────────────────────── */
const AGENT_SETTINGS_KEY = 'mdm_agent_settings_v1';
function getAgentSettings() {
  try { return JSON.parse(localStorage.getItem(AGENT_SETTINGS_KEY)) || {}; } catch (e) { return {}; }
}
function setAgentSettings(patch) {
  const next = { ...getAgentSettings(), ...patch };
  localStorage.setItem(AGENT_SETTINGS_KEY, JSON.stringify(next));
  return next;
}
function hasLiveAgent() { return !!(getAgentSettings().apiKey || '').trim(); }

function accountDossier(account) {
  const r = account.roi;
  const s3 = rows => rows.reduce((t,x)=>t+x[1]+x[2]+x[3],0);
  return {
    name: account.name, country: account.country, sector: account.sector, hq: account.hq,
    revenue: account.revenue, employees: account.employees, relationship: account.relationship,
    parent: account.parent, subsidiaries: account.subsidiaries, systems: account.systems,
    dataHealth: account.dataHealth,
    signals: account.signals.map(s=>`[${s.tag}] ${s.text} (${s.source})`),
    stakeholders: account.stakeholders.map(p=>`${p.name}, ${p.title} — influence ${p.influence}, ${p.sentiment}. ${p.note}`),
    painpoints: account.painpoints.map(p=>`(${p.severity}) ${p.title} → fit: ${p.fit.sku}, ${p.fit.arr} ARR, ${p.fit.timeToValue}. ${p.impact}`),
    roi: { currency:r.currency, threeYearTCO:+s3(r.investment).toFixed(1), threeYearBenefit:+s3(r.benefits).toFixed(1), paybackMonths:r.paybackMonths }
  };
}

async function askClaude(account, persona, history, userText) {
  const cfg = getAgentSettings();
  const apiKey = (cfg.apiKey || '').trim();
  if (!apiKey) throw new Error('no-key');
  const model = cfg.model || 'claude-sonnet-4-6';
  const personaLine = {
    consultative: 'Be consultative: ask a sharp clarifying question when it helps, never pushy.',
    analytical: 'Be analytical: lead with the numbers, quantify everything.',
    opinionated: 'Be opinionated: give a clear recommendation and the single next action.'
  }[persona] || '';
  const system = [
    'You are an MDM (Master Data Management) Sales Specialist agent embedded in a Nordic sales desk.',
    'You help the rep (Mikael Lindqvist) win and grow accounts. Be concise, specific, and action-oriented — a few short sentences or tight bullets, not essays.',
    personaLine,
    'Ground every answer ONLY in the account dossier below. If something is not in the dossier, say what you would need rather than inventing specifics.',
    'Account dossier (JSON):',
    JSON.stringify(accountDossier(account), null, 2)
  ].join('\n');
  const messages = history
    .filter(t => t.role === 'user' || (t.role === 'agent' && t._plain))
    .map(t => ({ role: t.role === 'user' ? 'user' : 'assistant', content: t.role === 'user' ? t.text : t._plain }));
  messages.push({ role:'user', content:userText });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method:'POST',
    headers:{
      'content-type':'application/json',
      'x-api-key':apiKey,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true'
    },
    body: JSON.stringify({ model, max_tokens:700, system, messages })
  });
  if (!res.ok) {
    let detail = ''; try { detail = (await res.json()).error?.message || ''; } catch(e){}
    throw new Error(`api-${res.status}${detail?': '+detail:''}`);
  }
  const data = await res.json();
  return (data.content || []).filter(b=>b.type==='text').map(b=>b.text).join('\n').trim();
}

window.MDM = { ACCOUNTS, FOLLOWUPS, SUGGESTED_PROMPTS, getConversation,
  synthesizeAccount, getAgentSettings, setAgentSettings, hasLiveAgent, askClaude };
