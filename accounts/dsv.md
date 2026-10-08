# Discovery Brief: DSV

## Snapshot
- **Account:** DSV
- **Stage:** Discovery
- **Owner:** tallmon14@gmail.com
- **Created:** 2026-05-25
- **Last updated:** 2026-05-25

## Account Research
- **Company profile:** World's largest freight forwarder and global transport & logistics group (post-DB Schenker). HQ Hedehusene, Denmark.
- **Industry / vertical:** Logistics — very large B2B customer/account base spread across acquired entities.
- **Size & scale:** ~DKK 310bn pro-forma revenue; ~160,000 employees; operations in 90+ countries.
- **Footprint:** 90+ countries — multi-country customer & account data with residency considerations.
- **M&A:** Serial acquirer — Panalpina (2019), Global Integration Services (2021) and DB Schenker (~$15.9bn / €14.3bn; consolidated from 1 May 2025). Every deal bolts on overlapping customer/account systems.
- **Tech / systems signals:** Stated DB Schenker synergies (~DKK 9bn by end-2028) explicitly include consolidating IT infrastructure and back-office; repeated large-scale system migrations.
- **Recent initiatives / news:** Active DB Schenker integration program now under way — peak timing for master-data consolidation.
- **Regulatory exposure:** GDPR + Nordic DPAs; customs/trade data; EU data residency.
- **Key people (targets):** Confirm on LinkedIn — CIO, Chief Transformation/Integration Officer, Head of Data, Commercial/CRM leadership.
- **MDM hypothesis:** Each acquisition duplicates customer & account master data; a golden customer/account record accelerates post-merger integration, cross-sell and the DB Schenker synergy targets. Lead with M&A-driven duplication, integration (MuleSoft) and a golden account record.
- **Sources:** DSV investor releases, Deutsche Bahn press, TLI/Stat Times (see chat links).

## Qualification (MEDDPICC)
- **Metrics:** _(tbd  Quantified business impact of solving the data problem)_
- **Economic Buyer:** _(tbd  Person with budget authority who feels the pain)_
- **Decision Criteria:** _(tbd  What they'll evaluate solutions against)_
- **Decision Process:** _(tbd  Steps & timeline to a decision)_
- **Paper Process:** _(tbd  Procurement / legal / security steps to sign)_
- **Identified Pain:** _(tbd  The concrete, owned business pain)_
- **Champion:** _(tbd  Internal advocate selling on your behalf)_
- **Competition:** _(tbd  Alternatives in play, including 'do nothing')_

## Current Data Landscape
Overlapping forwarding/CRM/ERP systems inherited from Panalpina, GIL and DB Schenker across 90+ countries. Customer and account master data duplicated per acquisition.

## Pain Points
- Every acquisition (Panalpina, GIL, DB Schenker) bolts on duplicate customer and account records across overlapping systems — no single source of truth.
- Post-merger integration requires consolidating IT systems and reconciling customer/account data fast to hit synergy targets.
- Operations in 90+ countries fragment data and add residency requirements.
- Manual reconciliation of duplicate accounts slows cross-sell and onboarding.

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

### Data residency / digital sovereignty (Nordic/EU)
- **Why it matters / MDM value:** Keep regulated customer data in-region while still building one governed golden profile addresses EU/Nordic data-sovereignty and public-sector requirements.
- **Salesforce fit:** Salesforce Data Cloud on Hyperforce (EU data residency), Privacy Center
- **Sharpen it next call:** Which data must stay in-region, and is that a hard procurement/tender requirement?

### Manual data cleanup wasting time
- **Why it matters / MDM value:** Automated matching and stewardship workflows replace manual reconciliation, freeing skilled people.
- **Salesforce fit:** Salesforce Data Cloud, Flow / automation
- **Sharpen it next call:** How many people-hours per week go into manual data cleanup today?

## Discovery Notes
_(Timestamped notes appended by `python -m discovery_agent note`.)_

## Next Steps
_(Owner + due date for each.)_
