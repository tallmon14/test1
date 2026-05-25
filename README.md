# MDM Discovery Agent

A lightweight repo + CLI for a Salesforce Cloud Account Executive to **run
account discovery and drive each account toward a closed Master Data
Management (MDM) deal.**

Each account's insights live in a shareable Markdown file under `accounts/`,
so you and your team can collaborate on the deal through normal git commits
and pull requests. The CLI helps you run great discovery, capture insights,
and map the customer's pain to MDM value and the right Salesforce products
(Data Cloud, MuleSoft, Marketing Cloud, Agentforce, etc.).

No dependencies, no API keys pure Python 3 standard library.

## Quick start

```bash
# 1. See tailored MDM discovery questions for your next call
python3 -m discovery_agent questions --stage discovery

# 2. Create an insight brief for an account
python3 -m discovery_agent new "Acme Corp" --owner you@salesforce.com

# 3. Open accounts/acme-corp.md and fill in the Pain Points section
#    (in your own words, one pain per line)

# 4. Map those pains to MDM value + Salesforce products (writes into the file)
python3 -m discovery_agent map "Acme Corp"

# 5. Log a quick insight after a call
python3 -m discovery_agent note "Acme Corp" "VP Data owns the initiative and has budget."

# 6. Check deal readiness (MEDDPICC scorecard + next move)
python3 -m discovery_agent brief "Acme Corp"

# See every account you're working
python3 -m discovery_agent list
```

## Commands

| Command | What it does |
|---|---|
| `questions [--stage discovery\|technical\|exec\|all]` | Prints a curated MDM discovery question bank for that meeting type. |
| `new "<Account>" [--owner ...] [--force]` | Scaffolds `accounts/<slug>.md` from the brief template. |
| `map "<Account>" [--dry-run]` | Reads the **Pain Points** section, detects MDM value drivers, and writes the **MDM Value Mapping** section. |
| `note "<Account>" "text"` | Appends a timestamped insight to **Discovery Notes**. |
| `brief "<Account>"` | Shows a MEDDPICC qualification scorecard, detected value drivers, and a suggested next move. |
| `list` | Lists all tracked accounts with stage and MEDDPICC score. |

## The account brief

Every account is one Markdown file in `accounts/` with these sections:

- **Snapshot** account, stage, owner, dates
- **Qualification (MEDDPICC)** the eight fields that gate a deal; `brief` scores how many are filled
- **Current Data Landscape** systems, source-of-truth, volumes
- **Pain Points** what you heard (the `map` command reads this)
- **MDM Value Mapping** auto-generated: pain -> MDM value -> Salesforce product -> follow-up question
- **Discovery Notes** timestamped log
- **Next Steps** owned actions with due dates

`accounts/acme-corp.md` is a filled-in **sample** delete it once you've seen the format.

## Suggested workflow with your team

1. `new` an account before your first discovery call.
2. During/after calls, capture raw pain in **Pain Points** and log `note`s.
3. Run `map` to turn pain into a value story you can pitch.
4. Commit and push branches per account; review insights with your SE / team via PR.
5. Use `brief` before forecast calls to see exactly which MEDDPICC gaps remain.

## Extending it

The discovery knowledge (questions, pain signals, value mapping, MEDDPICC)
lives in `discovery_agent/framework.py` edit it to match your messaging or
verticals. A natural next step is wiring the `map`/`brief` commands to the
Claude API for free-text summarization; the structured framework here is the
foundation for that.
