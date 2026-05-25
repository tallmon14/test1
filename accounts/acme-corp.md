# Discovery Brief: Acme Corp

## Snapshot
- **Account:** Acme Corp
- **Stage:** Discovery
- **Owner:** tallmon14@gmail.com
- **Created:** 2026-05-25
- **Last updated:** 2026-05-25

## Qualification (MEDDPICC)
- **Metrics:** _(tbd  Quantified business impact of solving the data problem)_
- **Economic Buyer:** Dana Lee, VP Data (owns initiative, has budget)
- **Decision Criteria:** _(tbd  What they'll evaluate solutions against)_
- **Decision Process:** _(tbd  Steps & timeline to a decision)_
- **Paper Process:** _(tbd  Procurement / legal / security steps to sign)_
- **Identified Pain:** Duplicate records across 3 systems; 20 hrs/wk wasted
- **Champion:** _(tbd  Internal advocate selling on your behalf)_
- **Competition:** _(tbd  Alternatives in play, including 'do nothing')_

## Current Data Landscape
_(Systems holding customer data, source-of-truth, volumes, integration style.)_

## Pain Points
- Customer records are duplicated across Salesforce, their ERP, and a marketing tool no single source of truth.
- Marketing campaigns misfire because of bad segmentation data.
- Analysts spend ~20 hours/week on manual cleanup in spreadsheets.
- They want to roll out AI/agents but admit the underlying data isn't ready.

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

### Bad data hurting marketing / campaigns
- **Why it matters / MDM value:** Clean, unified profiles drive accurate segmentation and personalization, lifting campaign ROI.
- **Salesforce fit:** Marketing Cloud, Salesforce Data Cloud
- **Sharpen it next call:** What's a recent campaign that underperformed because of data quality?

### Manual data cleanup wasting time
- **Why it matters / MDM value:** Automated matching and stewardship workflows replace manual reconciliation, freeing skilled people.
- **Salesforce fit:** Salesforce Data Cloud, Flow / automation
- **Sharpen it next call:** How many people-hours per week go into manual data cleanup today?

### Wants AI but data isn't ready
- **Why it matters / MDM value:** AI is only as good as the data underneath it master data is the prerequisite for trustworthy AI/agents.
- **Salesforce fit:** Salesforce Data Cloud, Agentforce, Einstein
- **Sharpen it next call:** What AI use case are you targeting, and what data would it depend on?

## Discovery Notes
- **2026-05-25** Met w/ VP Data; she owns the data-quality initiative and has budget.

## Next Steps
_(Owner + due date for each.)_
