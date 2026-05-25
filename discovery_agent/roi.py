"""ROI / TCO model for an MDM deal.

The model is deliberately transparent and assumption-driven every figure is an
input the AE controls, so the output is defensible in an RFP. It quantifies the
same pain the discovery agent detects (manual effort, duplicates, compliance/AML
risk, revenue/marketing) as the benefit side, and compares the cost of the
current MDM estate against a Salesforce future state.

Four estate scenarios are supported:
  - none               : greenfield, no MDM today (benefit = pain elimination)
  - modernization      : replace legacy / on-prem MDM with cloud
  - competitive_takeout: displace an incumbent (Reltio / Profisee / other)
  - expansion          : existing Salesforce / IDMC customer adding Data Cloud,
                         MuleSoft, or Agentforce on top of their IDMC foundation

Note: Informatica IDMC is now part of the Salesforce portfolio. Accounts already
running IDMC are existing Salesforce customers; use the 'expansion' scenario.

Inputs live in the brief's "ROI & TCO" section as `- key: value` lines, so they
diff in git and can be edited by hand, in the CLI, or in the web UI.
"""

import re

SCENARIOS = {
    "none": {
        "label": "Greenfield (no MDM today)",
        "desc": "No MDM in place value is pain elimination vs the cost of a new platform.",
    },
    "modernization": {
        "label": "Modernization to cloud",
        "desc": "Replace legacy / on-prem MDM with cloud value = infra + maintenance savings plus pain reduction.",
    },
    "competitive_takeout": {
        "label": "Competitive take-out",
        "desc": "Displace an incumbent (Reltio / Profisee / other) value = licence delta plus pain reduction.",
    },
    "expansion": {
        "label": "Expand existing Salesforce / IDMC",
        "desc": "Existing Salesforce / IDMC customer adding Data Cloud, MuleSoft, or Agentforce. Value = incremental capability uplift on the existing foundation.",
    },
}

# key, label, kind, default. kind drives parsing & UI widget.
INPUT_SPECS = [
    ("scenario", "Estate scenario", "scenario", "none"),
    ("currency", "Currency", "str", "EUR"),
    ("horizon_years", "Horizon (years)", "int", 3),
    ("current_platform_annual", "Current MDM platform cost / year (legacy, incumbent, or existing IDMC; 0 if none)", "money", 0),
    ("manual_fte", "FTEs doing manual data work", "number", 0),
    ("fte_cost", "Loaded cost per FTE / year", "money", 90000),
    ("manual_reduction_pct", "Manual effort MDM removes", "pct", 0.5),
    ("duplicate_cost_annual", "Annual cost of duplicates (ops + waste)", "money", 0),
    ("duplicate_recovery_pct", "Duplicate cost recovered", "pct", 0.6),
    ("compliance_exposure_annual", "Annual compliance / AML risk exposure", "money", 0),
    ("compliance_reduction_pct", "Compliance risk mitigated", "pct", 0.3),
    ("revenue_uplift_annual", "Annual revenue / margin uplift from unified data", "money", 0),
    ("sf_subscription_annual", "Salesforce subscription / year (Data Cloud + MuleSoft)", "money", 0),
    ("sf_run_annual", "Salesforce run / admin cost / year", "money", 0),
    ("sf_implementation_onetime", "Salesforce implementation (one-time)", "money", 0),
]
INPUT_KEYS = [k for k, _, _, _ in INPUT_SPECS]
_SPEC_BY_KEY = {k: (label, kind, default) for k, label, kind, default in INPUT_SPECS}


def default_inputs():
    return {k: default for k, _, _, default in INPUT_SPECS}


def _to_number(val):
    s = str(val).strip().replace(",", "").replace("_", "")
    s = re.sub(r"[^0-9.\-]", "", s)
    if s in ("", "-", ".", "-."):
        return 0.0
    try:
        return float(s)
    except ValueError:
        return 0.0


def _to_pct(val):
    s = str(val).strip()
    pct = "%" in s
    n = _to_number(s)
    if pct:
        return n / 100.0
    return n / 100.0 if n > 1 else n   # accept 40 or 0.4


def coerce(key, raw):
    kind = _SPEC_BY_KEY.get(key, (None, "str", None))[1]
    if kind == "scenario":
        v = str(raw).strip().lower().replace(" ", "_")
        return v if v in SCENARIOS else "none"
    if kind == "str":
        return str(raw).strip() or _SPEC_BY_KEY[key][2]
    if kind == "int":
        return max(1, int(round(_to_number(raw)))) if key == "horizon_years" else int(round(_to_number(raw)))
    if kind == "pct":
        return max(0.0, min(1.0, _to_pct(raw)))
    return _to_number(raw)   # money / number


def parse_inputs(section_body):
    """Read `- key: value` lines from the ROI section into a full input dict."""
    out = default_inputs()
    for m in re.finditer(r"^-\s+([a-z_]+)\s*:\s*(.*)$", section_body or "", re.MULTILINE):
        key, raw = m.group(1), m.group(2).strip()
        # strip the trailing "    (label)" annotation that render_section adds
        raw = re.sub(r"\s{2,}\(.*\)\s*$", "", raw).strip()
        if key in INPUT_KEYS and raw and not raw.startswith("_"):
            out[key] = coerce(key, raw)
    return out


def compute(i):
    cur = i["currency"]
    h = i["horizon_years"]

    b_manual = i["manual_fte"] * i["fte_cost"] * i["manual_reduction_pct"]
    b_dupe = i["duplicate_cost_annual"] * i["duplicate_recovery_pct"]
    b_comp = i["compliance_exposure_annual"] * i["compliance_reduction_pct"]
    b_rev = i["revenue_uplift_annual"]
    annual_benefit = b_manual + b_dupe + b_comp + b_rev

    sf_annual = i["sf_subscription_annual"] + i["sf_run_annual"]
    platform_savings = i["current_platform_annual"] - sf_annual
    annual_net = annual_benefit + platform_savings

    # cost-avoidance baseline (excludes revenue upside)
    addressable_pain = (i["manual_fte"] * i["fte_cost"]
                        + i["duplicate_cost_annual"]
                        + i["compliance_exposure_annual"])
    residual_pain = addressable_pain - (b_manual + b_dupe + b_comp)

    tco_current = h * (i["current_platform_annual"] + addressable_pain)
    tco_future = i["sf_implementation_onetime"] + h * (sf_annual + residual_pain)
    tco_savings = tco_current - tco_future

    total_sf_investment = i["sf_implementation_onetime"] + h * sf_annual
    cumulative_net = h * annual_net - i["sf_implementation_onetime"]
    roi_pct = (cumulative_net / total_sf_investment * 100.0) if total_sf_investment else 0.0
    payback_months = (i["sf_implementation_onetime"] / (annual_net / 12.0)) if annual_net > 0 else None

    return {
        "currency": cur,
        "horizon_years": h,
        "benefit_breakdown": [
            ("Manual effort saved", b_manual),
            ("Duplicate / data-quality cost recovered", b_dupe),
            ("Compliance / risk mitigated", b_comp),
            ("Revenue / margin uplift", b_rev),
        ],
        "annual_benefit": annual_benefit,
        "sf_annual": sf_annual,
        "platform_savings": platform_savings,
        "annual_net": annual_net,
        "tco_current": tco_current,
        "tco_future": tco_future,
        "tco_savings": tco_savings,
        "total_sf_investment": total_sf_investment,
        "cumulative_net": cumulative_net,
        "roi_pct": roi_pct,
        "payback_months": payback_months,
    }


def money(cur, amount):
    return f"{cur} {amount:,.0f}"


def format_result(r):
    cur, h = r["currency"], r["horizon_years"]
    lines = ["### Result", ""]
    lines.append("**Annual benefit (quantified pain):**")
    for label, val in r["benefit_breakdown"]:
        if val:
            lines.append(f"- {label}: {money(cur, val)}")
    lines.append(f"- **Total annual benefit:** {money(cur, r['annual_benefit'])}")
    lines.append("")
    lines.append(f"- Salesforce cost / year: {money(cur, r['sf_annual'])}")
    lines.append(f"- Platform savings vs current estate / year: {money(cur, r['platform_savings'])}")
    lines.append(f"- **Net benefit / year: {money(cur, r['annual_net'])}**")
    lines.append("")
    lines.append(f"- {h}-yr TCO current estate: {money(cur, r['tco_current'])}")
    lines.append(f"- {h}-yr TCO with Salesforce: {money(cur, r['tco_future'])}")
    lines.append(f"- **{h}-yr TCO savings: {money(cur, r['tco_savings'])}**")
    lines.append("")
    payback = f"{r['payback_months']:.0f} months" if r["payback_months"] is not None else "n/a (no net benefit)"
    lines.append(f"- Payback period: {payback}")
    lines.append(f"- **{h}-yr ROI: {r['roi_pct']:.0f}%** "
                 f"(net {money(cur, r['cumulative_net'])} on {money(cur, r['total_sf_investment'])} invested)")
    return "\n".join(lines)


def render_section(inputs, results=None):
    """Full Markdown body for the ROI & TCO section: editable inputs + result."""
    sc = inputs.get("scenario", "none")
    lines = [f"_Scenario: **{SCENARIOS.get(sc, SCENARIOS['none'])['label']}** "
             f"{SCENARIOS.get(sc, SCENARIOS['none'])['desc']}_", "",
             "<!-- ROI inputs edit values, then run: python -m discovery_agent roi \"<Account>\" -->"]
    for key, label, kind, _ in INPUT_SPECS:
        val = inputs.get(key)
        if kind == "pct":
            shown = f"{val:.2f}"
        elif kind in ("money", "number"):
            shown = f"{val:,.0f}" if float(val).is_integer() else f"{val}"
        else:
            shown = val
        lines.append(f"- {key}: {shown}    ({label})")
    lines.append("")
    if results is None:
        lines.append("### Result")
        lines.append("_(Run `python -m discovery_agent roi \"<Account>\"` after editing the inputs above.)_")
    else:
        lines.append(format_result(results))
    return "\n".join(lines)
