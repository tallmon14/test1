"""Live web research via the Anthropic API with built-in web search.

Requires:
  pip install anthropic
  export ANTHROPIC_API_KEY=sk-ant-...

Usage (CLI):
  python -m discovery_agent research "Volvo Group" --auto
  python -m discovery_agent research "Ørsted" --auto --map

The module calls claude-haiku-4-5 with the web_search tool enabled. Claude
searches the web across all 10 MDM research topics and writes structured
findings into the brief's Account Research section.

No other dependencies are required — the anthropic package is only imported
when --auto is passed, so the rest of the CLI stays dependency-free.
"""

import os

from . import framework, store

MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 8192
WEB_SEARCH_TOOL = {"type": "web_search_20250305", "name": "web_search"}
MAX_LOOPS = 20  # safety cap on the tool-use loop


def _require_client():
    try:
        import anthropic  # noqa: F401 — existence check
    except ImportError:
        raise SystemExit(
            "\nThe Anthropic SDK is not installed. Run:\n"
            "  pip install anthropic\n"
            "then retry."
        )
    key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not key:
        raise SystemExit(
            "\nANTHROPIC_API_KEY is not set.\n"
            "Export it before running --auto:\n"
            "  export ANTHROPIC_API_KEY=sk-ant-...\n"
        )
    import anthropic
    return anthropic.Anthropic(api_key=key)


def _build_prompt(name):
    topic_lines = []
    for i, t in enumerate(framework.RESEARCH_TOPICS, 1):
        topic_lines.append(
            f"{i}. **{t['title']}**\n"
            f"   Why: {t['why']}\n"
            f"   Look at: {', '.join(t['sources'])}"
        )
    topics = "\n\n".join(topic_lines)

    return f"""You are a Salesforce MDM specialist preparing for an account discovery call with **{name}**.

Search the web thoroughly and write a structured research brief covering these 10 topics:

{topics}

CONTEXT FOR SEARCH STRATEGY:
- Nordic territory (HQ: Norway, Sweden, Denmark, Finland, Iceland) — weight Nordic sources and regulatory context.
- Salesforce acquired Informatica. Informatica IDMC is now a Salesforce product. If {name} already uses IDMC, they are an existing Salesforce customer: the play is land-and-expand (add Data Cloud, MuleSoft, Agentforce), not competitive displacement.
- For tech stack, search job postings by tool name ("{name} Informatica", "{name} Reltio", "{name} Salesforce Data Cloud", "{name} SAP S/4HANA", "{name} MuleSoft", "{name} data steward MDM"). Hiring signals reveal the real stack better than press releases.
- M&A activity in the past 5 years is the single biggest MDM trigger — always search for it.
- Nordic DPAs: IMY (Sweden), Datatilsynet (Norway/Denmark), Tietosuoja (Finland). Schrems II / EU data-residency is board-level risk.
- Cite every finding with a source URL. Label facts vs inferences/hypotheses explicitly.

OUTPUT FORMAT — write structured markdown with these exact ### subsections (only include ones where you found something concrete):

### Company profile & business model
### Industry & vertical
### Size & scale
### Geographic & business-unit footprint
### M&A / acquisition history
### Technology & systems signals
### Strategic initiatives & recent news
### Regulatory, compliance & data residency
### Key people / buying committee
### Existing data / MDM posture

Then end with:

### Pain hypotheses (to validate in discovery)
2–4 concrete, evidence-backed MDM pain triggers labelled H1, H2, etc. Each should reference the evidence behind it.

### Research date & confidence
Date and overall confidence level (high/medium/low) with a note on gaps."""


def _extract_text(response):
    """Pull all text content out of a Messages response object."""
    parts = []
    for block in response.content:
        block_type = getattr(block, "type", "")
        if block_type == "text":
            parts.append(block.text)
        elif block_type == "tool_result":
            for inner in getattr(block, "content", []):
                if getattr(inner, "type", "") == "text":
                    parts.append(inner.text)
    return "\n".join(parts).strip()


def _run_with_search(client, prompt, verbose):
    """Drive the Claude API tool-use loop until end_turn or MAX_LOOPS."""
    messages = [{"role": "user", "content": prompt}]
    search_count = 0

    for _ in range(MAX_LOOPS):
        response = client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            tools=[WEB_SEARCH_TOOL],
            messages=messages,
        )

        # Track and print search calls
        for block in response.content:
            if getattr(block, "type", "") == "tool_use":
                search_count += 1
                if verbose:
                    inp = getattr(block, "input", {})
                    q = (inp.get("query", "") if isinstance(inp, dict) else "")[:70]
                    print(f"  [{search_count}] Searching: {q}...")

        if response.stop_reason == "end_turn":
            if verbose and search_count:
                print(f"  Done — {search_count} web search(es) performed.")
            return _extract_text(response)

        if response.stop_reason == "tool_use":
            # Append assistant turn and send empty tool_results to continue.
            # web_search_20250305 is a server-side tool: Anthropic executes the
            # actual search and injects results automatically in the next turn.
            messages.append({"role": "assistant", "content": response.content})
            tool_results = [
                {"type": "tool_result", "tool_use_id": block.id, "content": []}
                for block in response.content
                if getattr(block, "type", "") == "tool_use"
            ]
            if tool_results:
                messages.append({"role": "user", "content": tool_results})
            else:
                return _extract_text(response)
        else:
            # Unexpected stop reason — return what we have
            return _extract_text(response)

    if verbose:
        print(f"  Warning: hit {MAX_LOOPS}-loop cap; returning partial results.")
    return _extract_text(response)


def research(name, verbose=True, run_map=False):
    """Research `name` via live web search and populate Account Research.

    Args:
        name:     Account name matching the brief (or new account to scaffold).
        verbose:  Print progress to stdout.
        run_map:  Also regenerate the MDM Value Mapping after writing research.

    Returns:
        Path of the written brief file.
    """
    client = _require_client()

    # Scaffold brief if it doesn't exist yet
    path = store.account_path(name)
    if not path.exists():
        store.write(name, store.new_brief(name, ""))
        if verbose:
            print(f"Created {path}")

    if verbose:
        print(f"Researching {name!r} via web (model: {MODEL})...")

    prompt = _build_prompt(name)
    findings = _run_with_search(client, prompt, verbose)

    if not findings:
        raise RuntimeError("The API returned no findings text.")

    store.save_brief(name, sections={"Account Research": findings})

    if verbose:
        print(f"Written to {path}")

    if run_map:
        _, signals = store.apply_map(name)
        if verbose:
            print(f"MDM Value Mapping updated ({len(signals)} signal(s) detected).")

    if verbose and not run_map:
        print(f'Next: python -m discovery_agent map "{name}"')

    return path
