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
    store.append_note(args.name, note)
    print(f"Added note to {store.account_path(args.name)}")
    return 0


def cmd_map(args):
    text = store.read(args.name)
    if text is None:
        print(f"No brief for '{args.name}'. Create it with: python -m discovery_agent new \"{args.name}\"")
        return 1
    if args.dry_run:
        sections = store.parse_sections(text)
        signals = framework.detect_signals(sections.get("Pain Points", ""))
        print(f"Value mapping for {store.display_name(text, args.name)}:\n")
        print(framework.format_value_map(signals))
        return 0

    _, signals = store.apply_map(args.name)
    print(f"Updated MDM Value Mapping in {store.account_path(args.name)} ({len(signals)} signal(s) mapped).")
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


def cmd_research(args):
    print("Account research checklist  public info to gather before discovery")
    print("(MDM-focused: each item ties to where master data lives and why it hurts)\n")
    print(framework.format_research_checklist())
    if args.name:
        text = store.read(args.name)
        if text is None:
            print(f"\n(No brief for '{args.name}' yet  create it with: "
                  f"python -m discovery_agent new \"{args.name}\")")
        else:
            print(f"\nRecord findings in the 'Account Research' section of "
                  f"{store.account_path(args.name)}")
    return 0


def cmd_roi(args):
    from . import roi
    text = store.read(args.name)
    if text is None:
        print(f"No brief for '{args.name}'. Create it with: python -m discovery_agent new \"{args.name}\"")
        return 1
    sets = {}
    for item in args.set or []:
        if "=" not in item:
            print(f"Ignoring malformed --set '{item}' (expected key=value)")
            continue
        k, v = item.split("=", 1)
        sets[k.strip()] = v.strip()
    inputs, results = store.apply_roi(args.name, scenario=args.scenario, sets=sets or None)
    sc = inputs["scenario"]
    print(f"ROI / TCO  {store.display_name(text, args.name)}  [{roi.SCENARIOS[sc]['label']}]\n")
    body = roi.format_result(results).replace("### Result\n\n", "").replace("**", "")
    print(body)
    print(f"\nWritten to the 'ROI & TCO' section of {store.account_path(args.name)}")
    return 0


def cmd_web(args):
    from . import web
    web.serve(args.host, args.port)
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

    rs = sub.add_parser("research", help="Show the public-info research checklist for an account")
    rs.add_argument("name", nargs="?", help="Optional account name to point findings at")
    rs.set_defaults(func=cmd_research)

    ro = sub.add_parser("roi", help="Compute ROI / TCO for an account from its ROI & TCO inputs")
    ro.add_argument("name", help="Account name")
    ro.add_argument("--scenario", choices=["none", "modernization", "competitive_takeout"],
                    help="Set the estate scenario")
    ro.add_argument("--set", action="append", metavar="key=value",
                    help="Override an ROI input (repeatable), e.g. --set manual_fte=8")
    ro.set_defaults(func=cmd_roi)

    w = sub.add_parser("web", help="Launch the visual web interface in a browser")
    w.add_argument("--host", default="127.0.0.1", help="Bind host (default: 127.0.0.1)")
    w.add_argument("--port", type=int, default=8765, help="Port (default: 8765)")
    w.set_defaults(func=cmd_web)

    return p


def main(argv=None):
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)
