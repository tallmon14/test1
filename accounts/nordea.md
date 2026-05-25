# Discovery Brief: Nordea

## Snapshot
- **Account:** Nordea
- **Stage:** Discovery
- **Owner:** tallmon14@gmail.com
- **Created:** 2026-05-25
- **Last updated:** 2026-05-25

## Account Research
- **Company profile:** Largest Nordic bank / financial-services group — retail, corporate, private banking and asset management across Denmark, Finland, Norway and Sweden. HQ Helsinki, Finland (moved Oct 2018).
- **Industry / vertical:** Financial services — heavily regulated (KYC/AML, GDPR, EBA); among the highest MDM need.
- **Size & scale:** ~9.3M private customers + 530k active corporate customers (incl. ~2,650 large corporates/institutions); ~30,000 employees.
- **Footprint:** Pan-Nordic (DK/FI/NO/SE) plus operations beyond — multi-country customer data with EU/Nordic residency obligations.
- **M&A:** Formed ~2000 from the merger of Merita (FI), Nordbanken (SE), Unibank (DK) and Christiania Bank (NO). Each founding bank brought its own core-banking platform — classic fragmented customer master data.
- **Tech / systems signals:** Multiple legacy core-banking systems inherited from the four founding banks; long-running core-banking and data modernization.
- **Regulatory exposure:** AML is the dominant theme — NYDFS $35M settlement (Aug 2024) over 2008–2019 AML programme; charged by Denmark's NSK over ~€3.5bn of Russian-client transactions (2012–2015); named in the 2017 Nordic AML / Panama Papers scandal. Plus GDPR, each Nordic DPA, and EU data residency.
- **Key people (targets):** Confirm on LinkedIn — Chief Data Officer, CIO, Chief Compliance / Financial Crime Officer, Head of Customer/CRM.
- **MDM hypothesis:** A single governed customer golden record across the four legacy banks underpins KYC/AML (one trusted view of the customer), regulatory reporting and personalization — with EU data residency. Lead with identity resolution + governance/consent + a single customer view for financial crime.
- **Sources:** Nordea IR/history, Wikipedia, NYDFS/Compliance Week, Bloomberg/GRIP (see chat links).

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
Four legacy core-banking platforms from the founding banks (FI/SE/DK/NO), plus CRM and compliance systems. No single customer source of truth across countries.

## Pain Points
- Customer data is fragmented across legacy core-banking systems from the four founding banks — no single source of truth per customer.
- AML/KYC depends on a trusted single view of the customer; gaps drove regulatory fines and investigations (compliance exposure).
- Multi-country operations require data residency and governance across DK/FI/NO/SE.
- Manual reconciliation of customer and beneficial-ownership data for compliance.
- Integration across legacy core-banking systems is slow and brittle.

## MDM Value Mapping
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
