# Discovery Brief: Marriott International

## Snapshot
- **Account:** Marriott International
- **Stage:** Discovery
- **Owner:** tallmon14@gmail.com
- **Created:** 2026-05-25
- **Last updated:** 2026-05-25

## Account Research
- **Company profile:** World's largest hotel company; ~30 brands, 5,700+ properties / 1.1M+ rooms. Asset-light franchise & management model — guest data spans owned, managed and franchised properties.
- **Industry / vertical:** Hospitality / travel — high-volume B2C guest data, loyalty-driven.
- **Size & scale:** Global workforce (Starwood alone had ~188k staff at managed properties pre-merger); Marriott Bonvoy loyalty had 125M+ members at YE2018, growing ~50k/day.
- **Footprint:** Global, multi-region operations → GDPR / CCPA data-residency obligations.
- **M&A:** Acquired Starwood for ~$13.6B (closed Sept 2016); merged 3 loyalty programs (Marriott Rewards, Ritz-Carlton Rewards, Starwood Preferred Guest) into Marriott Bonvoy in Feb 2019 — classic post-merger data fragmentation.
- **Tech / systems signals:** Legacy Starwood reservation database persisted un-integrated after the merger (the root cause of the breach below).
- **Recent initiatives / news:** Loyalty unification (Bonvoy); sustained investment in data security and governance after the breach.
- **Regulatory exposure:** ICO announced intent to fine £99.2M under GDPR, later reduced to £18.4M; ~339M guest records exposed (2014 attack on Starwood, undetected until Sept 2018) including names and unencrypted passport numbers. ICO found insufficient M&A due diligence and system security.
- **Key people (targets):** Confirm on LinkedIn — CIO, CISO, Chief Data/Analytics Officer, and loyalty/Bonvoy leadership are the likely buying committee.
- **MDM hypothesis:** A unified, governed golden guest profile across acquired brands and legacy systems would have reduced breach exposure and powers Bonvoy personalization. Lead with identity resolution + governance/consent + integration of legacy systems.
- **Sources:** Marriott IR / press releases, SEC filings, Wikipedia, ICO/EDPB statements (see chat for links).

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
Marriott + acquired Starwood reservation systems across 30 brands and owned/managed/franchised properties; loyalty data consolidated into Bonvoy. Source of truth for a guest is unclear across legacy stacks.

## Pain Points
- After the Starwood acquisition, guest records are fragmented across legacy systems — no single source of truth for a guest.
- GDPR compliance exposure: the 2018 breach traced to an un-integrated legacy Starwood reservation database.
- Bonvoy loyalty personalization depends on a unified guest profile across ~30 brands.
- Ongoing manual reconciliation and integration between acquired-brand systems.

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

### Bad data hurting marketing / campaigns
- **Why it matters / MDM value:** Clean, unified profiles drive accurate segmentation and personalization, lifting campaign ROI.
- **Salesforce fit:** Marketing Cloud, Salesforce Data Cloud
- **Sharpen it next call:** What's a recent campaign that underperformed because of data quality?

### Manual data cleanup wasting time
- **Why it matters / MDM value:** Automated matching and stewardship workflows replace manual reconciliation, freeing skilled people.
- **Salesforce fit:** Salesforce Data Cloud, Flow / automation
- **Sharpen it next call:** How many people-hours per week go into manual data cleanup today?

## Discovery Notes
_(Timestamped notes appended by `python -m discovery_agent note`.)_

## Next Steps
_(Owner + due date for each.)_
