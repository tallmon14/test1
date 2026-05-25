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
            "Do you have existing MDM or data-quality tooling (Salesforce IDMC, Reltio, Profisee, in-house)? How's it working?",
            "What rules or policies govern how a golden record gets created and maintained?",
            "Do data-residency or digital-sovereignty rules dictate where customer data can be stored (Schrems II, public-sector or sector requirements)?",
        ],
    },
    "matching": {
        "title": "Matching, Survivorship & Identity",
        "questions": [
            "How do you dedupe and merge records today manual review, fuzzy matching, something custom?",
            "How do you resolve identity across channels (web visitor, support ticket, CRM contact = same person)?",
            "When records merge, how confident are you that you keep the right data and don't lose history?",
            "Do you need real-time identity resolution (e.g. at point of sale / service) or is overnight batch fine?",
            "How do you match records across Nordic markets and languages (Danish/Swedish/Norwegian/Finnish names, å/ä/ö/ø characters)?",
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
        "keywords": ["gdpr", "ccpa", "compliance", "privacy", "audit", "regulation", "consent", "pii", "datatilsynet", "imy"],
        "value": "Centralized governance, consent, and lineage on a trusted profile reduces audit and regulatory exposure.",
        "products": ["Salesforce Data Cloud (governance & consent)", "Privacy Center"],
        "followup": "Which regulations apply, and have data issues ever surfaced in an audit?",
    },
    {
        "label": "Data residency / digital sovereignty (Nordic/EU)",
        "keywords": ["residency", "sovereignty", "schrems", "data localization", "data localisation",
                     "in-region", "on-shore", "onshore", "data leaves", "store data in", "eu data", "data sovereignty"],
        "value": "Keep regulated customer data in-region while still building one governed golden profile addresses EU/Nordic data-sovereignty and public-sector requirements.",
        "products": ["Salesforce Data Cloud on Hyperforce (EU data residency)", "Privacy Center"],
        "followup": "Which data must stay in-region, and is that a hard procurement/tender requirement?",
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


# --- Account research: what public info to gather before discovery, why it
#     matters for an MDM sale, and where to find it (all public sources) -------

RESEARCH_TOPICS = [
    {
        "key": "profile",
        "title": "Company profile & business model",
        "why": "Frames the customer-data problem B2C high-volume vs B2B account-based shapes the MDM scope.",
        "sources": ["Company website / About page", "LinkedIn company page", "Crunchbase",
                    "Nordic business register (Brønnøysund/NO, Bolagsverket/SE, CVR/DK, PRH/FI)"],
    },
    {
        "key": "industry",
        "title": "Industry & vertical",
        "why": "Data intensity and regulation vary widely; FSI, healthcare, retail and telco have the strongest MDM need.",
        "sources": ["Company site", "Industry/SIC classification", "Annual report / 10-K"],
    },
    {
        "key": "scale",
        "title": "Size & scale (employees, revenue, customers)",
        "why": "A proxy for data volume and system sprawl bigger and more fragmented means more MDM value.",
        "sources": ["LinkedIn", "Crunchbase", "Annual report / investor relations", "allabolag.se / proff.no / proff.dk"],
    },
    {
        "key": "footprint",
        "title": "Geographic & business-unit footprint",
        "why": "Multi-region / multi-BU operations fragment customer data and add residency rules (GDPR/CCPA).",
        "sources": ["Company 'Locations' page", "10-K segment reporting", "Press releases"],
    },
    {
        "key": "ma",
        "title": "M&A / acquisition history",
        "why": "Acquisitions bolt on duplicate systems and overlapping customer data the single biggest MDM trigger.",
        "sources": ["Press releases / newsroom", "Crunchbase", "Business news"],
    },
    {
        "key": "tech",
        "title": "Technology & systems signals (CRM/ERP/martech)",
        "why": "Reveals where master data lives today and the integration scope (MuleSoft) for harmonizing it.",
        "sources": ["Job postings (named tools)", "Customer case studies", "G2 / BuiltWith", "LinkedIn employee skills"],
    },
    {
        "key": "initiatives",
        "title": "Strategic initiatives & recent news",
        "why": "Digital-transformation, AI and data programs create timing and urgency AI especially needs clean master data.",
        "sources": ["Newsroom / press", "Earnings calls & investor decks", "Executive interviews / blog"],
    },
    {
        "key": "regulatory",
        "title": "Regulatory, compliance & data residency",
        "why": "GDPR plus each Nordic DPA (Datatilsynet DK/NO, IMY SE, Data Protection Ombudsman FI) and Schrems II make governance, consent and EU data residency a board-level and procurement-level MDM driver.",
        "sources": ["Privacy policy", "National DPA (Datatilsynet / IMY / Tietosuoja)",
                    "Schrems II / EU data-residency guidance", "Industry regulator (e.g. Finanstilsynet)"],
    },
    {
        "key": "people",
        "title": "Key people / buying committee",
        "why": "Identifies the likely economic buyer and champion CDO, CIO, CTO, VP Data, Head of CRM/Marketing Ops.",
        "sources": ["LinkedIn", "Company leadership page", "Conference talks / panels"],
    },
    {
        "key": "posture",
        "title": "Existing data / MDM posture",
        "why": "Shows whether it's greenfield, competitive displacement (Reltio/Profisee/other), or an existing Salesforce/IDMC customer (expansion play). Note: Informatica IDMC is now Salesforce — accounts running IDMC are existing Salesforce customers.",
        "sources": ["Job postings (named MDM tools: Salesforce IDMC, Reltio, Profisee)", "G2 reviews", "Glassdoor", "LinkedIn employee skills"],
    },
]


def format_research_checklist():
    """Printable checklist of what public info to gather and where to find it."""
    lines = []
    for i, t in enumerate(RESEARCH_TOPICS, 1):
        lines.append(f"{i}. {t['title']}")
        lines.append(f"   Why it matters: {t['why']}")
        lines.append(f"   Where to look: {', '.join(t['sources'])}")
        lines.append("")
    return "\n".join(lines).rstrip()


def research_placeholder():
    """Default body for the Account Research section of a new brief."""
    return ("_(Public-info research gathered before discovery. Run "
            "`python -m discovery_agent research \"<Account>\"` for the checklist of "
            "what to gather and where to find it.)_")


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
