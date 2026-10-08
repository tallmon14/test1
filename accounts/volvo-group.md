# Discovery Brief: Volvo Group

## Snapshot
- **Account:** Volvo Group
- **Stage:** Expansion
- **Owner:** tallmon14@gmail.com
- **Created:** 2026-05-25
- **Last updated:** 2026-05-25

## Account Research
### Company profile & business model
Volvo Group (AB Volvo, NASDAQ: VOLV) is a B2B industrial group headquartered in Gothenburg, Sweden. It sells trucks, buses, construction equipment, power solutions (Volvo Penta — marine and industrial engines), and financial services (Volvo Financial Services). All sales are effectively B2B: fleet operators, construction contractors, municipalities, dealers, and distributors. There is no meaningful B2C direct channel.

2024 financials: Net sales SEK 526.8 billion (down ~3% adjusted for currency vs 2023). Adjusted operating income SEK 65.7 billion; adjusted operating margin 12.5%. CEO is Martin Lundstedt.

Sources: [AB Volvo publishes Annual Report 2024](https://www.volvogroup.com/en/news-and-media/news/2025/feb/ab-volvo-publishes-annual-report-2024.html); [Volvo Group Annual Report 2024 PDF](https://www.volvogroup.com/content/dam/volvo-group/markets/master/events/2025/annual-reports/volvo-group-annual-report-2024.pdf)

---

### Industry & vertical
Heavy commercial vehicles (Class 7/8 trucks), buses and coaches, construction/earthmoving equipment, marine and industrial power. Volvo Group operates in the transport & logistics infrastructure sector globally.

Key regulatory pressures: EU CO₂ emission performance standards for heavy-duty vehicles (HDV regulation), Euro VII emissions standard for trucks and buses; EU AI Act (autonomous vehicle / high-risk AI classification applies to Volvo Autonomous Solutions' virtual driver). Volvo CE and Volvo Trucks are both actively managing fleet electrification timelines under regulatory pressure. CEO Martin Lundstedt is a vocal advocate for government policy to accelerate decarbonisation of heavy-duty transport.

Sources: [EU AI Act and autonomous transport — Volvo Autonomous Solutions](https://www.volvoautonomoussolutions.com/en-en/news-and-insights/stories/2025/nov/eu-ai-act-explained-how-europe-s-new-ai-regulations-will-affect-autonomous-transport.html)

---

### Size & scale
- **Employees:** ~104,000 worldwide (2024)
- **Revenue:** SEK 526.8 billion (~EUR 46–47 billion at prevailing rates)
- **Markets served:** 190+ markets globally
- **Manufacturing:** 18 countries, with primary plants in Sweden, USA, Brazil, France, India, China
- **Connected assets:** Over 1 million trucks, buses, and construction machines now digitally connected (milestone reached 2025), including 218,000 in North America
- **Dealer/service network:** ~2,200 service points in ~130 countries; North America ~400 authorized dealer locations
- **Brands managed:** 14 brands (see Geographic & business-unit footprint below)

The dealer count (2,200+ service points), combined with 14 brands, signals very high master data volume: each service point is a separate legal entity with its own customer/asset records spread across brand-siloed systems.

Sources: [Volvo surpasses one million connected assets](https://www.volvogroup.com/en/news-and-media/news/2025/sep/volvo-trucks-surpasses-1-million-connected-trucks-worldwide--including-218000-in-north-america.html); [Volvo Group global presence](https://www.opportimes.com/en/volvo-group-manufacturing-plants-in-18-countries/)

---

### Geographic & business-unit footprint
**Business areas / brands (14 total):**
- **Volvo Trucks** — largest brand, global
- **Renault Trucks** — primarily Europe (1,400+ dealers in Europe alone)
- **Mack Trucks** — North America (sold in ~30 countries)
- **UD Trucks** — sold to Isuzu in April 2021 (no longer in portfolio — IMPORTANT: confirm this in discovery as it affects active DB count)
- **Volvo Buses / Prevost / Nova Bus** — buses and coaches
- **Volvo Construction Equipment (CE)** — global; includes SDLG (Chinese-market brand)
- **Volvo Penta** — marine and industrial engines
- **Volvo Financial Services** — captive finance, operates in all major markets
- **Coretura** — new 50/50 JV with Daimler Truck (June 2025), building a shared software-defined vehicle OS platform; HQ Gothenburg

**Multi-brand = fragmented data:** Each truck brand (Volvo, Renault, Mack) runs its own dealer management system, CRM layer, and warranty/aftersales records. A single fleet customer operating Volvo Trucks in Europe and Mack Trucks in North America will have separate customer master records in each brand's system — a classic MDM duplicate / golden-record problem.

Sources: [Volvo Group brands page](https://www.volvogroup.com/en/about-us/brands.html); [Volvo Group our global presence](https://www.volvogroup.com/en/about-us/organization/our-global-presence.html); [Coretura launch](https://www.volvogroup.com/en/news-and-media/news/2025/jun/volvo-group-and-daimler-truck-launch-coretura---a-joint-venture-to-unlock-the-digital-future-of-commercial-vehicles.html)

---

### M&A / acquisition history (past 5 years)
| Date | Target | Value | MDM Implication |
|------|--------|-------|-----------------|
| Nov 2023 / closed Feb 2024 | **Proterra Battery Business** (California + South Carolina assets) | ~USD 210M | New US manufacturing entity, separate employee/supplier master data to onboard |
| Jun 2025 (announced) / Jan 2026 (closed) | **Swecon** (construction equipment dealer; Sweden, Germany, Estonia, Latvia, Lithuania + Entrack) | ~USD 724M | ~1,400 employees transferred; Swecon was an independent Volvo CE dealer — brings its own dealer CRM, customer, and asset records that must be merged into Volvo CE's systems. **Strong MDM trigger:** Volvo CE explicitly cited direct customer data access and digital service rollout as rationale. |
| 2024 (binding) / Jun 2025 (operational) | **Coretura JV** with Daimler Truck | ~USD 100M+ over 5 years | Shared platform entity; will require shared vehicle/asset master data governance across two competitors |

Swecon is the most MDM-relevant acquisition: turning an external dealer into an internal operation means reconciling ~1,400-employee HR master, thousands of customer asset records, and equipment service history from a separate system into Volvo CE's data estate.

Sources: [Swecon acquisition completed](https://www.volvogroup.com/en/news-and-media/news/2026/feb/volvo-construction-equipments-acquisition-of-swecon-is-completed.html); [Proterra acquisition](https://mercomcapital.com/volvo-group-acquires-proterras-battery-business/); [Coretura JV launch](https://www.volvogroup.com/en/news-and-media/news/2025/jun/volvo-group-and-daimler-truck-launch-coretura---a-joint-venture-to-unlock-the-digital-future-of-commercial-vehicles.html)

---

### Technology & systems signals
**ERP — SAP (heavy commitment):**
- Volvo Group runs **40+ SAP productive instances** (some dating to the late 1990s on ECC). Has a greenfield S/4HANA migration programme underway to consolidate these.
- Is a **SAP MaxAttention customer** for 10+ years and ACCOE-certified.
- **Capgemini** is the primary SAP delivery partner (global delivery centres in Sweden, Belgium, USA, China, Poland, India).

**CRM — SAP CRM (not Salesforce):**
- Active job posting for an **SAP CRM Solution Consultant** confirms SAP CRM is in use at the Group level. No evidence of a Salesforce CRM deployment at Volvo Group level (Volvo Cars is a separate company).

**Cloud & Data Platform:**
- **Microsoft Azure** is the cloud platform of record. Volvo Group has used Azure AI Services and Azure AI Document Intelligence in production (10,000+ manual hours saved in a document processing pilot).
- **Microsoft Power BI** for analytics.

**MDM — Salesforce IDMC / formerly Informatica IDMC (confirmed, active — existing Salesforce customer):**
- Volvo Group uses **Salesforce IDMC** (Intelligent Data Management Cloud, formerly Informatica) on Azure as its enterprise MDM/data governance platform. IDMC was sold to Volvo Group and is now a Salesforce product — Volvo is an existing Salesforce customer.
- Active job postings confirm: MDM, Data Quality, Data Governance & Catalog, and Data Marketplace modules are all in active use or being built out.
- Roles being hired: **Data Management Tool (DMT) SME** (Gothenburg) and **IDMC SME for MDM** (Bangalore). The Bangalore role explicitly covers "IDMC 360 modules" and is the single point of contact for functional MDM.
- Separately, an **MDM Architect** posting (124822BR) describes building "the MDM environment from initial RFX to full setup" — implying the MDM programme is still maturing/expanding, not fully built.

**Integration / middleware:** No MuleSoft evidence found. SAP integration suite likely given the SAP-heavy stack.

Sources: [Volvo Group SAP CCOE ASUG](https://www.asug.com/insights/volvo-group-leverages-sap-ccoe-asug-resources-in-digitalization-drive); [AppsRunTheWorld Volvo Group software](https://www.appsruntheworld.com/customers-database/customers/view/volvo-group-sweden); [SAP CRM Consultant job](https://www.volvogroup.com/en/careers/job-openings/124825BR.html); [DMT SME job (Gothenburg)](https://jobs.volvogroup.com/job/G%C3%B6teborg-Data-Management-Tool-(DMT)-SME-417-55/1158918755/); [Informatica IDMC SME MDM job (Bangalore)](https://jobs.volvogroup.com/job/Bangalore-Data-Management-Tool-(Informatica-IDMC)-SME-for-MDM-562122/1150651755/); [MDM Architect job](https://www.volvogroup.com/en/careers/job-openings/124822BR.html); [Microsoft Azure AI case study](https://www.microsoft.com/en/customers/story/1703814256939529124-volvo-group-automotive-azure-ai-services)

---

### Strategic initiatives & recent news
1. **Connected vehicles / IoT data at scale:** 1 million+ connected trucks milestone (2025). Each truck generates ~20 GB/minute of sensor data. AI-powered adaptive maintenance launched (Blue Service Contract). This creates enormous demand for clean, unified asset and customer master data to associate telematics with the right owner/operator record.
2. **EV & electrification transition:** Heavy investment in battery electric trucks/buses/CE. The Proterra battery acquisition (2024) and NOVO Energy stake (Volvo Cars, 2025) reflect this. EV transition creates new product/part master data complexity.
3. **Coretura SDV JV (2025):** Building a shared software-defined vehicle platform with Daimler Truck. Cross-company vehicle and component master data will need governance standards.
4. **SAP S/4HANA greenfield migration:** Consolidating 40+ ECC instances is a multi-year programme. S/4HANA migrations universally require master data cleansing and harmonisation upfront — this is a structural MDM trigger.
5. **Volvo Group Digital & IT** (renamed from Group IT in 2022, led by CDO Scott Rafkin): Signals commitment to digital transformation as a board-level priority.
6. **Azure AI Document Intelligence deployment:** Volvo Group is actively deploying AI on Azure for operational efficiency, using document extraction and translation — data quality and lineage become critical.

Sources: [One million connected Volvo trucks](https://www.volvotrucks.com/en-en/news-stories/press-releases/2025/sep/one-million-connected-volvo-trucks-on-the-road.html); [AI adaptive maintenance](https://www.volvotrucks.us/news-and-stories/press-releases/2024/october/volvo-trucks-taps-ai-for-adaptive-maintenance-uptime-enhancements-as-part-of-blue-service-contract/); [Coretura JV](https://www.volvogroup.com/en/news-and-media/news/2025/jun/volvo-group-and-daimler-truck-launch-coretura---a-joint-venture-to-unlock-the-digital-future-of-commercial-vehicles.html); [Scott Rafkin CDO appointment](https://www.volvogroup.com/en/news-and-media/news/2019/dec/news-3515288.html)

---

### Regulatory, compliance & data residency
- **GDPR / Swedish supervisory authority:** Volvo Group is a Swedish legal entity (AB Volvo, reg. 556012-5790, Gothenburg). The lead supervisory authority is **IMY (Integritetsskyddsmyndigheten)**, the Swedish Data Protection Authority — formerly Datainspektionen. Customer and employee personal data processed across 190 markets must comply with GDPR, with IMY as the primary regulator for cross-border cases.
- **Data transfers:** Volvo Group processes personal data in jurisdictions outside the EU/EEA (US, India operations, etc.). Standard contractual clauses and adequacy decisions apply. Schrems II / data residency implications exist for any cloud MDM deployment — Salesforce Data Cloud and Informatica IDMC must both demonstrate EU data residency options for Swedish/EU personal data.
- **EU AI Act:** Volvo Autonomous Solutions has identified that its virtual driver AI may qualify as a **high-risk AI system** under the Act (safety component in autonomous vehicles). Compliance deadline: August 2, 2026. This makes data lineage, auditability, and quality of training/operational data a compliance requirement — not just a business nice-to-have.
- **Transport sector:** Euro VII, EU HDV CO₂ standards, and national transport regulations create compliance reporting obligations that depend on accurate vehicle and operator master data.
- **Data subject rights:** Volvo Group publishes a data subject rights portal, indicating active GDPR operational compliance programmes.

Sources: [Volvo Group privacy / data subject rights](https://www.volvogroup.com/en/tools/privacy/data-subject-rights.html); [EU AI Act autonomous transport](https://www.volvoautonomoussolutions.com/en-en/news-and-insights/stories/2025/nov/eu-ai-act-explained-how-europe-s-new-ai-regulations-will-affect-autonomous-transport.html)

---

### Key people / buying committee
| Name | Title | Relevance |
|------|-------|-----------|
| **Scott Rafkin** | EVP & Chief Digital Officer | Owns Volvo Group Digital & IT; leads digital transformation strategy. Appointed CDO January 2020, previously President of Volvo Financial Services. **Most likely economic buyer or executive sponsor for an MDM/Data platform deal.** |
| **Kenneth Gonzalez** | Chief Information Officer (CIO) | Group CIO; LinkedIn-confirmed. Based in Gothenburg. Likely owns technology stack decisions including MDM tooling. |
| **Lars Stenqvist → Jens Holtinger** | EVP & CTO (Stenqvist stepping down Sep 2025; Holtinger succeeds) | Technology strategy, product innovation. Relevant for connected vehicle/AI data platform linkage. |
| **Martin Lundstedt** | President & CEO | Sets overall strategy including digital and sustainability. Not a likely day-to-day MDM buyer but sets the mandate. |
| **Mikael Larsson** | Chief Digital Officer, Volvo Group Trucks Operations | Business-unit level CDO; relevant for truck-domain MDM conversations. (Source: RocketReach/LinkedIn signals) |
| **Satish Rajkumar** | CDO, Volvo Energy | Business-unit level CDO for the energy/EV charging division. |
| _(Unknown)_ | Head of Data Governance / VP Data | Not publicly identified — likely exists below CDO level. Job postings for DMT SME and MDM Architect suggest a data governance lead exists. To be discovered in live call. |

Sources: [Scott Rafkin EVP CDO](https://www.volvogroup.com/en/investors/corporate-governance/ceo-and-group-executive-board/scott-rafkin.html); [Kenneth Gonzalez CIO LinkedIn](https://www.linkedin.com/in/kenneth-gonzalez-6a8a48301/); [CTO transition](https://www.marketscreener.com/quote/stock/AB-VOLVO-6492152/news/Volvo-Group-Chief-Technology-Officer-to-Step-Down-in-September-Successor-Named-50351138/); [Volvo Group Executive Board changes Jun 2025](https://www.volvogroup.com/en/news-and-media/news/2025/jun/changes-to-the-volvo-group-executive-board.html)

---

### Existing data / MDM posture
**Current state — existing Salesforce customer (IDMC already sold):**
- **Salesforce IDMC (formerly Informatica IDMC)** is the deployed MDM platform — Volvo Group is an existing Salesforce customer. This is a land-and-expand play, not a competitive displacement.
- IDMC is in active use for: MDM (IDMC 360 modules), Data Quality, Data Governance & Catalog, and Data Marketplace — all on Microsoft Azure.
- Group-level Salesforce/IDMC CoE is established in Gothenburg; offshore MDM delivery centre in Bangalore is scaling the programme.
- MDM Architect role (124822BR) is actively building out the Customer domain MDM environment — the programme is maturing but not complete.
- A formal "Volvo Group Master Data vision & strategy" document exists (referenced in JD).

**Expansion opportunity — what Salesforce sells next:**
The IDMC foundation is in place. The expansion pitch is to deepen and broaden the Salesforce footprint:
- **Salesforce Data Cloud** on top of IDMC: activates the unified customer/asset master for real-time analytics, segmentation, and the connected-vehicle aftersales use case (1M+ assets needing correct customer-to-asset matching).
- **MuleSoft**: harmonise data flows across SAP ECC/S/4HANA, brand-siloed dealer systems, and connected-vehicle telemetry — complements IDMC as the integration layer.
- **Agentforce / Einstein**: AI use cases (adaptive maintenance, fleet uptime predictions) depend on the clean master data that IDMC provides — Agentforce is the natural next layer.
- **S/4HANA migration workstream**: consolidating 40+ ECC instances requires pre-migration master data harmonisation; position IDMC + Data Cloud as the migration-readiness data services layer.

Sources: [DMT SME Gothenburg job](https://jobs.volvogroup.com/job/G%C3%B6teborg-Data-Management-Tool-(DMT)-SME-417-55/1158918755/); [Informatica IDMC SME MDM Bangalore job](https://jobs.volvogroup.com/job/Bangalore-Data-Management-Tool-(Informatica-IDMC)-SME-for-MDM-562122/1150651755/); [MDM Architect job](https://www.volvogroup.com/en/careers/job-openings/124822BR.html); [SAP CCOE/ASUG Volvo](https://www.asug.com/insights/volvo-group-leverages-sap-ccoe-asug-resources-in-digitalization-drive)

---

### Research date & confidence
Researched: 2026-05-25. Confidence: **medium-high** — Core financials, technology stack, and MDM posture are well-evidenced from job postings and published sources. Gaps: (1) No confirmed identity of Head of Data Governance / data platform product owner below CDO level — must surface in discovery. (2) CRM situation needs validation: SAP CRM is evidenced but scope (dealer-facing vs. internal only) unknown. (3) Extent of Informatica IDMC deployment maturity (pilot vs. enterprise-wide rollout) not confirmed. (4) Whether Volvo Group has evaluated or is evaluating Salesforce CRM / Data Cloud is unknown — no public signal found.

## Qualification (MEDDPICC)
- **Metrics:** _(tbd  Quantified business impact of solving the data problem)_
- **Economic Buyer:** Scott Rafkin, EVP & Chief Digital Officer (owns Volvo Group Digital & IT; leads digital transformation; likely budget holder for data platform spend)
- **Decision Criteria:** _(tbd  What they'll evaluate solutions against)_
- **Decision Process:** _(tbd  Steps & timeline to a decision)_
- **Paper Process:** _(tbd  Procurement / legal / security steps to sign)_
- **Identified Pain:** Multi-brand dealer duplicate records (Volvo/Renault/Mack siloed); SAP S/4HANA migration data readiness (40+ ECC instances to consolidate); Swecon acquisition customer/asset record integration (active now)
- **Champion:** _(tbd  Internal advocate selling on your behalf — likely Head of Data Governance, not yet publicly identified)_
- **Competition:** No external MDM competitor — Salesforce IDMC (formerly Informatica) is already deployed. Internal competition: SAP-native data tools within S/4HANA migration programme; 'do nothing / stay on IDMC alone' without adding Data Cloud / MuleSoft / Agentforce

## Current Data Landscape
- **MDM:** Informatica IDMC on Microsoft Azure (MDM, Data Quality, Data Governance & Catalog, Data Marketplace) — incumbent, actively being built out
- **ERP:** SAP ECC (40+ productive instances, some from late 1990s); greenfield S/4HANA migration in progress with Capgemini as SI
- **CRM:** SAP CRM (Group level — confirmed via job postings); no Salesforce CRM footprint at Volvo Group (Volvo Cars is a separate company)
- **Cloud:** Microsoft Azure (platform of record); Power BI for analytics; Azure AI Services in production use
- **Integration:** SAP integration suite likely; no MuleSoft evidence found
- **Connected assets:** 1M+ trucks/buses/CE machines digitally connected; ~20 GB/min sensor data per vehicle — telematics tied to customer master records
- **Dealer systems:** Each brand (Volvo Trucks, Renault Trucks, Mack Trucks) operates siloed dealer management systems across ~2,200 service points — no unified dealer/customer master across brands

## Pain Points
_(Hypotheses grounded in research. Validate in live discovery. Run `python -m discovery_agent map "Volvo Group"` to generate MDM Value Mapping.)_

**H1 — Multi-brand dealer duplicate records:** Volvo Group operates Volvo Trucks, Renault Trucks, and Mack Trucks under separate dealer networks (1,400 Renault dealers in Europe alone; ~400 Mack/Volvo dealers in NA). A fleet customer buying across brands will have separate customer master records in each brand's system with no golden record. Estimated duplicate rate for large fleets: high. Pain owner: Chief Digital Officer / Head of CRM / VP Aftersales.

**H2 — SAP S/4HANA migration data readiness:** Consolidating 40+ SAP ECC productive instances into a greenfield S/4HANA requires master data harmonisation across all instances before cutover. Dirty material, vendor, and customer master data is the #1 cause of S/4HANA migration delay and post-go-live quality incidents. Capgemini is the SI — confirm if they are scoping a pre-migration MDM remediation workstream. Pain owner: CIO (Kenneth Gonzalez) / SAP CoE lead.

**H3 — Swecon acquisition customer/asset record integration:** Volvo CE acquired Swecon (Jan 2026), its own dealer in Sweden/Germany/Baltics (~1,400 staff). Swecon operated its own dealer management system with customer, equipment, and service records. These must now be reconciled with Volvo CE's internal records — creating immediate duplicate customer and asset master data. Pain owner: Volvo CE CDO / Head of Integration.

**H4 — Connected vehicle customer data quality:** 1M+ trucks are generating telematics data, but the value of AI-driven adaptive maintenance (Blue Service Contract) depends entirely on associating telemetry with the correct customer/operator master record. If the customer master is fragmented across brands, fleet operators with mixed fleets cannot receive unified uptime analytics. Pain owner: Volvo Group Connected Solutions leadership / VP Digital Services.

**H5 — EU AI Act data quality compliance for autonomous AI:** Volvo Autonomous Solutions' virtual driver is potentially high-risk under EU AI Act (deadline Aug 2026). High-risk AI systems require documented data quality, lineage, and auditability. The MDM layer is foundational to proving data quality for AI training and inference. Pain owner: CTO (Jens Holtinger) / Volvo Autonomous Solutions leadership / Chief Compliance Officer.

**H6 — GDPR / IMY data subject rights at scale:** With 2,200 service points in 130 countries and 1M+ connected customer assets, servicing GDPR data subject access/erasure requests requires knowing where every piece of customer personal data lives — impossible without a unified customer master. Pain owner: DPO (Data Protection Officer) / Legal / CDO.

## MDM Value Mapping
### Duplicate / conflicting records
- **Why it matters / MDM value:** A golden-record engine with configurable matching & survivorship rules collapses duplicates into one trusted profile.
- **Salesforce fit:** Salesforce Data Cloud (identity resolution), Duplicate Management rules
- **Sharpen it next call:** How many duplicates do you estimate exist, and what does each one cost you downstream?

### No single customer view / Customer 360
- **Why it matters / MDM value:** Unify fragmented data into one harmonized profile so every team sees the same customer.
- **Salesforce fit:** Salesforce Data Cloud, Customer 360
- **Sharpen it next call:** Which teams most need that unified view first, and what decision are they making with it?

### Integration / many disconnected systems
- **Why it matters / MDM value:** Connect source systems and harmonize them without ripping anything out source systems stay as systems of entry.
- **Salesforce fit:** MuleSoft, Salesforce Data Cloud
- **Sharpen it next call:** Which integrations are most painful or brittle today?

### Compliance / privacy / governance risk
- **Why it matters / MDM value:** Centralized governance, consent, and lineage on a trusted profile reduces audit and regulatory exposure.
- **Salesforce fit:** Salesforce Data Cloud (governance & consent), Privacy Center
- **Sharpen it next call:** Which regulations apply, and have data issues ever surfaced in an audit?

### Manual data cleanup wasting time
- **Why it matters / MDM value:** Automated matching and stewardship workflows replace manual reconciliation, freeing skilled people.
- **Salesforce fit:** Salesforce Data Cloud, Flow / automation
- **Sharpen it next call:** How many people-hours per week go into manual data cleanup today?

### Untrustworthy reporting / forecasting
- **Why it matters / MDM value:** A reliable master data foundation makes reporting and forecasting trustworthy and AI-ready.
- **Salesforce fit:** CRM Analytics, Salesforce Data Cloud
- **Sharpen it next call:** Which executive report is most undermined by data quality today?

### Wants AI but data isn't ready
- **Why it matters / MDM value:** AI is only as good as the data underneath it master data is the prerequisite for trustworthy AI/agents.
- **Salesforce fit:** Salesforce Data Cloud, Agentforce, Einstein
- **Sharpen it next call:** What AI use case are you targeting, and what data would it depend on?

## ROI & TCO
_Scenario: **Expand existing Salesforce / IDMC** Existing Salesforce / IDMC customer adding Data Cloud, MuleSoft, or Agentforce. Value = incremental capability uplift on the existing foundation._

<!-- ROI inputs edit values, then run: python -m discovery_agent roi "<Account>" -->
- scenario: expansion    (Estate scenario)
- currency: EUR    (Currency)
- horizon_years: 3    (Horizon (years))
- current_platform_annual: 0    (Current MDM platform cost / year (legacy, incumbent, or existing IDMC; 0 if none))
- manual_fte: 0    (FTEs doing manual data work)
- fte_cost: 90,000    (Loaded cost per FTE / year)
- manual_reduction_pct: 0.50    (Manual effort MDM removes)
- duplicate_cost_annual: 0    (Annual cost of duplicates (ops + waste))
- duplicate_recovery_pct: 0.60    (Duplicate cost recovered)
- compliance_exposure_annual: 0    (Annual compliance / AML risk exposure)
- compliance_reduction_pct: 0.30    (Compliance risk mitigated)
- revenue_uplift_annual: 0    (Annual revenue / margin uplift from unified data)
- sf_subscription_annual: 0    (Salesforce subscription / year (Data Cloud + MuleSoft))
- sf_run_annual: 0    (Salesforce run / admin cost / year)
- sf_implementation_onetime: 0    (Salesforce implementation (one-time))

### Result

**Annual benefit (quantified pain):**
- **Total annual benefit:** EUR 0

- Salesforce cost / year: EUR 0
- Platform savings vs current estate / year: EUR 0
- **Net benefit / year: EUR 0**

- 3-yr TCO current estate: EUR 0
- 3-yr TCO with Salesforce: EUR 0
- **3-yr TCO savings: EUR 0**

- Payback period: n/a (no net benefit)
- **3-yr ROI: 0%** (net EUR 0 on EUR 0 invested)

## Discovery Notes
_(Timestamped notes appended by `python -m discovery_agent note`.)_

## Next Steps
_(Owner + due date for each.)_
