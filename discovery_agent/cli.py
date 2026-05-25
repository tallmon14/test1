"""Command-line interface for the MDM Discovery Agent."""

import argparse
import sys

from . import framework, store


def _print_questions(groups):
    for key in groups:
        group = framework.QUESTION_BANK[key]
        print(f"\n## {group['title']}")
        for i, q in enumerate(group["questions"], 1):
            print(f"  {i}. {q}")
    print()


def cmd_questions(args):
    stage = args.stage
    groups = framework.STAGE_TO_GROUPS.get(stage)
    if not groups:
        print(f"Unknown stage '{stage}'. Choose from: {', '.join(framework.STAGE_TO_GROUPS)}")
        return 1
    print(f"MDM discovery questions  stage: {stage}")
    _print_questions(groups)
    return 0


def cmd_new(args):
    name = args.name
    path = store.account_path(name)
    if path.exists() and not args.force:
        print(f"Brief already exists: {path}. Use --force to overwrite.")
        return 1
    store.write(name, store.new_brief(name, args.owner))
    print(f"Created {path}")
    print(f"Next: fill in the Pain Points section, then run:")
    print(f'  python -m discovery_agent map "{name}"')
    return 0


def cmd_list(args):
    rows = store.list_accounts()
    if not rows:
        print("No accounts yet. Create one with: python -m discovery_agent new \"Acme Corp\"")
        return 0
    name_w = max(len(r["name"]) for r in rows + [{"name": "ACCOUNT"}])
    print(f"{'ACCOUNT':<{name_w}}  {'STAGE':<12}  {'MEDDPICC':<10}  FILE")
    for r in rows:
        score = f"{r['meddpicc_filled']}/{r['meddpicc_total']}"
        print(f"{r['name']:<{name_w}}  {r['stage']:<12}  {score:<10}  {r['file']}")
    return 0


def cmd_note(args):
    text = store.read(args.name)
    if text is None:
        print(f"No brief for '{args.name}'. Create it with: python -m discovery_agent new \"{args.name}\"")
        return 1
    note = args.text or sys.stdin.read()
    note = note.strip()
    if not note:
        print("Nothing to add (empty note).")
        return 1
    sections = store.parse_sections(text)
    display = store.display_name(text, args.name)
    entry = f"- **{store.today()}** {note}"
    existing = sections.get("Discovery Notes", "").strip()
    if existing.startswith("_(") or not existing:
        sections["Discovery Notes"] = entry
    else:
        sections["Discovery Notes"] = existing + "\n" + entry
    new_text = store.set_field(store.render(display, sections), "Last updated", store.today())
    store.write(args.name, new_text)
    print(f"Added note to {store.account_path(args.name)}")
    return 0


def _format_value_map(signals):
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


def cmd_map(args):
    text = store.read(args.name)
    if text is None:
        print(f"No brief for '{args.name}'. Create it with: python -m discovery_agent new \"{args.name}\"")
        return 1
    sections = store.parse_sections(text)
    display = store.display_name(text, args.name)
    pain = sections.get("Pain Points", "")
    signals = framework.detect_signals(pain)
    value_map = _format_value_map(signals)

    if args.dry_run:
        print(f"Value mapping for {display}:\n")
        print(value_map)
        return 0

    sections["MDM Value Mapping"] = value_map
    new_text = store.set_field(store.render(display, sections), "Last updated", store.today())
    store.write(args.name, new_text)
    hits = len(signals)
    print(f"Updated MDM Value Mapping in {store.account_path(args.name)} ({hits} signal(s) mapped).")
    return 0


def cmd_brief(args):
    text = store.read(args.name)
    if text is None:
        print(f"No brief for '{args.name}'. Create it with: python -m discovery_agent new \"{args.name}\"")
        return 1
    display = store.display_name(text, args.name)
    print(f"=== Deal readiness: {display} ===\n")

    # MEDDPICC scorecard
    print("MEDDPICC:")
    filled = 0
    for field, _ in framework.MEDDPICC:
        val = store.get_field(text, field)
        mark = "[x]" if val else "[ ]"
        if val:
            filled += 1
        print(f"  {mark} {field}: {val or '(missing)'}")
    print(f"\n  Score: {filled}/{len(framework.MEDDPICC)} qualified")

    # Detected value drivers
    sections = store.parse_sections(text)
    signals = framework.detect_signals(sections.get("Pain Points", ""))
    print("\nMDM value drivers detected:")
    if signals:
        for s in signals:
            print(f"  - {s['label']}  -> {', '.join(s['products'])}")
    else:
        print("  - none yet (fill Pain Points, then run `map`)")

    # Suggested next move
    print("\nSuggested next move:")
    if filled < 4:
        print("  Early stage: focus discovery on pain + economic buyer. Run:")
        print("    python -m discovery_agent questions --stage discovery")
    elif filled < len(framework.MEDDPICC):
        missing = [f for f, _ in framework.MEDDPICC if not store.get_field(text, f)]
        print(f"  Mid stage: close qualification gaps -> {', '.join(missing)}")
    else:
        print("  Fully qualified: align on decision/paper process and drive to proposal.")
    print()
    return 0


def build_parser():
    p = argparse.ArgumentParser(
        prog="discovery_agent",
        description="MDM Discovery Agent  capture account insights and drive to a closed Master Data Management deal.",
    )
    sub = p.add_subparsers(dest="command", required=True)

    q = sub.add_parser("questions", help="Print tailored MDM discovery questions")
    q.add_argument("--stage", default="discovery",
                   choices=list(framework.STAGE_TO_GROUPS.keys()),
                   help="Which question set to show (default: discovery)")
    q.set_defaults(func=cmd_questions)

    n = sub.add_parser("new", help="Create a new account discovery brief")
    n.add_argument("name", help="Account name, e.g. \"Acme Corp\"")
    n.add_argument("--owner", default="", help="Owning AE (email/name)")
    n.add_argument("--force", action="store_true", help="Overwrite if it exists")
    n.set_defaults(func=cmd_new)

    ls = sub.add_parser("list", help="List all tracked accounts and qualification score")
    ls.set_defaults(func=cmd_list)

    nt = sub.add_parser("note", help="Append a timestamped discovery note to an account")
    nt.add_argument("name", help="Account name")
    nt.add_argument("text", nargs="?", help="Note text (or pipe via stdin)")
    nt.set_defaults(func=cmd_note)

    mp = sub.add_parser("map", help="Map an account's Pain Points to MDM value & Salesforce products")
    mp.add_argument("name", help="Account name")
    mp.add_argument("--dry-run", action="store_true", help="Print without writing to the file")
    mp.set_defaults(func=cmd_map)

    br = sub.add_parser("brief", help="Show deal-readiness scorecard for an account")
    br.add_argument("name", help="Account name")
    br.set_defaults(func=cmd_brief)

    return p


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)
