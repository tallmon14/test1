"""MDM (Master Data Management) discovery knowledge base.

Everything a Salesforce AE needs to run a strong MDM discovery is encoded here:
- tailored discovery questions by stage / persona
- pain-signal detection that maps a customer's words to MDM value and the
  Salesforce products that deliver it
- the MEDDPICC qualification fields used to score a deal

This is intentionally self-contained (no external APIs) so the agent works
offline and gives consistent, repeatable output.
"""

# --- Discovery questions, grouped so you can pull the right set per meeting ---

QUESTION_BANK = {
    "landscape": {
        "title": "Data Landscape (where customer data lives today)",
        "questions": [
            "How many systems hold customer or account data today (CRM, ERP, marketing, support, billing, e-commerce)?",
            "Which system do people treat as the 'source of truth' for a customer? Does everyone agree?",
            "How does data move between those systems today batch, real-time, manual exports?",
            "Roughly how many customer/account records are we talking about, and how fast is that growing?",
            "Are you operating across multiple regions or business units with their own data stores?",
        ],
    },
    "pain": {
        "title": "Business Pain (the cost of bad master data)",
        "questions": [
            "Where do duplicate or conflicting records bite you today sales, marketing, service, finance?",
            "Has bad data ever caused a campaign to misfire or a customer to get the wrong message?",
            "How much time do reps or analysts spend reconciling or cleaning data manually each week?",
            "Can you produce a single, trustworthy view of a customer on demand today? What happens when you can't?",
            "Have data issues created compliance exposure (GDPR/CCPA), audit findings, or reporting you couldn't trust?",
        ],
    },
    "governance": {
        "title": "Data Governance & Stewardship",
        "questions": [
            "Who owns data quality today is there a data steward or governance team, or is it nobody's job?",
            "How do you decide which value 'wins' when two systems disagree about the same customer?",
            "Do you have existing MDM or data-quality tooling (Informatica, Reltio, Profisee, in-house)? How's it working?",
            "What rules or policies govern how a golden record gets created and maintained?",
        ],
    },
    "matching": {
        "title": "Matching, Survivorship & Identity",
        "questions": [
            "How do you dedupe and merge records today manual review, fuzzy matching, something custom?",
            "How do you resolve identity across channels (web visitor, support ticket, CRM contact = same person)?",
            "When records merge, how confident are you that you keep the right data and don't lose history?",
            "Do you need real-time identity resolution (e.g. at point of sale / service) or is overnight batch fine?",
        ],
    },
    "exec": {
        "title": "Executive / Economic Buyer (business outcomes & MEDDPICC)",
        "questions": [
            "What business metric does fixing this move pipeline accuracy, campaign ROI, service efficiency, churn?",
            "Who feels this pain at the executive level, and what's it worth to them to solve it this year?",
            "If we delivered a trusted single customer view, what does that unlock for the business?",
            "What's the cost of doing nothing for another year?",
            "Who needs to be involved to evaluate and approve a solution like this, and what's the process?",
        ],
    },
    "technical": {
        "title": "Technical / Integration",
        "questions": [
            "What integration approach do you use today across these systems? Any iPaaS / ETL in place?",
            "Do you need to harmonize data without ripping out source systems (leave them as systems of entry)?",
            "What are your data residency, security, and PII handling requirements?",
            "Are you exploring AI/analytics on this data? Clean master data is the prerequisite is that on the roadmap?",
        ],
    },
}

STAGE_TO_GROUPS = {
    "discovery": ["landscape", "pain", "governance"],
    "technical": ["matching", "technical", "landscape"],
    "exec": ["exec", "pain"],
    "all": list(QUESTION_BANK.keys()),
}


# --- Pain-signal detection: customer words -> MDM value + Salesforce product ---
# Each entry: keywords that signal a pain, the value statement, the mapped
# Salesforce product(s), and a sharpening follow-up question to ask next.

PAIN_SIGNALS = [
    {
        "label": "Duplicate / conflicting records",
        "keywords": ["duplicate", "dupe", "conflicting", "merge", "dedupe", "multiple records", "same customer"],
        "value": "A golden-record engine with configurable matching & survivorship rules collapses duplicates into one trusted profile.",
        "products": ["Salesforce Data Cloud (identity resolution)", "Duplicate Management rules"],
        "followup": "How many duplicates do you estimate exist, and what does each one cost you downstream?",
    },
    {
        "label": "No single customer view / Customer 360",
        "keywords": ["single view", "360", "single source of truth", "source of truth", "unified", "one view", "fragmented"],
        "value": "Unify fragmented data into one harmonized profile so every team sees the same customer.",
        "products": ["Salesforce Data Cloud", "Customer 360"],
        "followup": "Which teams most need that unified view first, and what decision are they making with it?",
    },
    {
        "label": "Integration / many disconnected systems",
        "keywords": ["integration", "systems don't talk", "silos", "silo", "etl", " erp", "disconnected", "sync"],
        "value": "Connect source systems and harmonize them without ripping anything out source systems stay as systems of entry.",
        "products": ["MuleSoft", "Salesforce Data Cloud"],
        "followup": "Which integrations are most painful or brittle today?",
    },
    {
        "label": "Compliance / privacy / governance risk",
        "keywords": ["gdpr", "ccpa", "compliance", "privacy", "audit", "regulation", "consent", "pii"],
        "value": "Centralized governance, consent, and lineage on a trusted profile reduces audit and regulatory exposure.",
        "products": ["Salesforce Data Cloud (governance & consent)", "Privacy Center"],
        "followup": "Which regulations apply, and have data issues ever surfaced in an audit?",
    },
    {
        "label": "Bad data hurting marketing / campaigns",
        "keywords": ["campaign", "marketing", "wrong message", "bounce", "segmentation", "targeting", "personaliz"],
        "value": "Clean, unified profiles drive accurate segmentation and personalization, lifting campaign ROI.",
        "products": ["Marketing Cloud", "Salesforce Data Cloud"],
        "followup": "What's a recent campaign that underperformed because of data quality?",
    },
    {
        "label": "Manual data cleanup wasting time",
        "keywords": ["manual", "spreadsheet", "clean up", "cleanup", "reconcile", "by hand", "time consuming"],
        "value": "Automated matching and stewardship workflows replace manual reconciliation, freeing skilled people.",
        "products": ["Salesforce Data Cloud", "Flow / automation"],
        "followup": "How many people-hours per week go into manual data cleanup today?",
    },
    {
        "label": "Untrustworthy reporting / forecasting",
        "keywords": ["report", "forecast", "analytics", "dashboard", "can't trust", "inaccurate", "kpi"],
        "value": "A reliable master data foundation makes reporting and forecasting trustworthy and AI-ready.",
        "products": ["CRM Analytics", "Salesforce Data Cloud"],
        "followup": "Which executive report is most undermined by data quality today?",
    },
    {
        "label": "Wants AI but data isn't ready",
        "keywords": ["ai", "einstein", "agentforce", "predictive", "machine learning", "genai", "llm"],
        "value": "AI is only as good as the data underneath it master data is the prerequisite for trustworthy AI/agents.",
        "products": ["Salesforce Data Cloud", "Agentforce", "Einstein"],
        "followup": "What AI use case are you targeting, and what data would it depend on?",
    },
]


# --- MEDDPICC qualification fields (used for scoring deal readiness) ---

MEDDPICC = [
    ("Metrics", "Quantified business impact of solving the data problem"),
    ("Economic Buyer", "Person with budget authority who feels the pain"),
    ("Decision Criteria", "What they'll evaluate solutions against"),
    ("Decision Process", "Steps & timeline to a decision"),
    ("Paper Process", "Procurement / legal / security steps to sign"),
    ("Identified Pain", "The concrete, owned business pain"),
    ("Champion", "Internal advocate selling on your behalf"),
    ("Competition", "Alternatives in play, including 'do nothing'"),
]


def detect_signals(text):
    """Return the list of PAIN_SIGNALS whose keywords appear in `text`."""
    lowered = (text or "").lower()
    hits = []
    for signal in PAIN_SIGNALS:
        if any(kw in lowered for kw in signal["keywords"]):
            hits.append(signal)
    return hits


def format_value_map(signals):
    """Render detected signals as the Markdown body of the value-map section."""
    if not signals:
        return ("_No pain signals detected yet. Add specifics to the Pain Points "
                "section (duplicates, single view, compliance, manual cleanup, etc.)._")
    blocks = []
    for s in signals:
        products = ", ".join(s["products"])
        blocks.append(
            f"### {s['label']}\n"
            f"- **Why it matters / MDM value:** {s['value']}\n"
            f"- **Salesforce fit:** {products}\n"
            f"- **Sharpen it next call:** {s['followup']}"
        )
    return "\n\n".join(blocks)
