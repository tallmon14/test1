import type { Account } from "../types";
import { PAINPOINTS } from "../data";
import { HealthBar, Pill, SentimentDot } from "./primitives";
import { BusinessCase } from "./BusinessCase";

const TABS = ["Overview", "Activity", "Opportunities", "Files", "Settings"] as const;
type Tab = (typeof TABS)[number];

function Topbar({ account }: { account: Account }) {
  return (
    <div className="record__topbar">
      <span className="crumb">Sales · Nordic Region</span>
      <span style={{ color: "var(--ink-3)" }}>›</span>
      <span className="crumb">Accounts</span>
      <span style={{ color: "var(--ink-3)" }}>›</span>
      <span className="crumb crumb--active">{account.name}</span>
      <div className="record__topbar-right">
        <span className="mono" style={{ fontSize: 11 }}>
          Acct #SE-0048221
        </span>
        <span style={{ width: 1, height: 14, background: "var(--line)" }} />
        <span>ML</span>
      </div>
    </div>
  );
}

function Hero({ account }: { account: Account }) {
  const monogram = account.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .replace(/(.)(.)/, (_m, a: string, b: string) => a + b.toLowerCase());
  return (
    <div className="record__hero">
      <div className="record__monogram">{monogram}</div>
      <div style={{ flex: 1 }}>
        <h1 className="record__title">
          <span className="record__flag" aria-hidden="true">
            {account.flag}
          </span>
          {account.name}
          <Pill tone="accent">{account.stage}</Pill>
        </h1>
        <div className="record__sub">
          <span>{account.sector}</span>
          <span className="record__sub-dot">·</span>
          <span>{account.hq}</span>
          <span className="record__sub-dot">·</span>
          <span>{account.relationship}</span>
        </div>
        <div className="record__sub" style={{ marginTop: 6 }}>
          <span className="mono" style={{ color: "var(--ink-3)" }}>
            parent
          </span>
          <span>{account.parent}</span>
          <span className="record__sub-dot">·</span>
          <span className="mono" style={{ color: "var(--ink-3)" }}>
            subs
          </span>
          <span>{account.subsidiaries}</span>
          <span className="record__sub-dot">·</span>
          <span className="mono" style={{ color: "var(--ink-3)" }}>
            owner
          </span>
          <span>{account.owner}</span>
        </div>
      </div>
      <div className="record__hero-cta">
        <button type="button" className="btn btn--primary">
          + Log activity
        </button>
        <button type="button" className="btn btn--outline">
          Edit record
        </button>
      </div>
    </div>
  );
}

function KPIs({ account }: { account: Account }) {
  const dh = account.dataHealth;
  return (
    <div className="record__kpis">
      <div className="kpi">
        <div className="kpi__label">Revenue (FY24)</div>
        <div className="kpi__value">{account.revenue}</div>
        <div className="kpi__sub">{account.employees} employees</div>
      </div>
      <div className="kpi">
        <div className="kpi__label">Opportunity score</div>
        <div className="kpi__value">
          {account.opportunity}
          <span className="kpi__unit">/100</span>
        </div>
        <div className="kpi__sub">{account.opportunityValue} · upside</div>
      </div>
      <div className="kpi">
        <div className="kpi__label">Relationship health</div>
        <div className="kpi__value" style={{ color: "var(--ok)" }}>
          {account.health}
          <span className="kpi__unit">/100</span>
        </div>
        <div className="kpi__sub">Last touch · 8 days ago</div>
      </div>
      <div className="kpi">
        <div className="kpi__label">Data quality (MDM)</div>
        <div className="kpi__value" style={{ color: "var(--bad)" }}>
          {dh?.score}
          <span className="kpi__unit">/100</span>
        </div>
        <div className="kpi__sub">{dh?.duplicates}% duplicates detected</div>
      </div>
    </div>
  );
}

function OverviewTab({ account }: { account: Account }) {
  const dh = account.dataHealth!;
  const signals = account.signals ?? [];
  const stakeholders = account.stakeholders ?? [];
  return (
    <>
      <div className="ribbon">
        <span aria-hidden="true" style={{ fontSize: 14 }}>
          ◆
        </span>
        <span>
          <b>Agent suggests:</b> Brief Mikael before his 14:00 with Linnea Hagström. Three painpoints
          surfaced.
        </span>
        <span className="ribbon__time">updated 4m ago</span>
      </div>

      {/* Company details */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Company details</h2>
          <div className="section__aside">via Bisnode + Bolagsverket</div>
        </div>
        <div className="card">
          <div className="detail-row">
            <div className="detail-row__label">Org. number</div>
            <div className="mono">556789-1240</div>
          </div>
          <div className="detail-row">
            <div className="detail-row__label">Headquarters</div>
            <div>{account.hq}</div>
          </div>
          <div className="detail-row">
            <div className="detail-row__label">Sector</div>
            <div>{account.sector} · NACE 28.99</div>
          </div>
          <div className="detail-row">
            <div className="detail-row__label">Fiscal year</div>
            <div>{account.fiscal}</div>
          </div>
          <div className="detail-row">
            <div className="detail-row__label">Systems of record</div>
            <div className="pills">
              {(account.systems ?? []).map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signals */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Signals · last 30 days</h2>
          <div className="section__aside">4 new · agent-monitored</div>
        </div>
        <div className="card">
          {signals.map((s, i) => (
            <div key={i} className="signal">
              <div className="signal__tag">{s.tag}</div>
              <div>{s.text}</div>
              <div className="signal__source">{s.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Buying committee */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Buying committee</h2>
          <div className="section__aside">5 mapped · 2 gaps (Finance, IT Sec)</div>
        </div>
        <div className="card">
          {stakeholders.map((p) => (
            <div key={p.name} className="stake-row">
              <div className="avatar">{p.initials}</div>
              <div>
                <div className="stake-row__name">{p.name}</div>
                <div className="stake-row__title">{p.title}</div>
                <div className="stake-row__note">{p.note}</div>
              </div>
              <div>
                <div className="stake-row__inf-label">Influence {p.influence}</div>
                <HealthBar value={p.influence} />
              </div>
              <div className="stake-row__sentiment">
                <SentimentDot sentiment={p.sentiment} />
                {p.sentiment}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data health */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Data health · MDM diagnostic</h2>
          <div className="section__aside">last run {dh.lastAudit}</div>
        </div>
        <div className="health">
          <div className="health-card">
            <div className="kpi__label">Duplicate rate</div>
            <div className="big-num" style={{ color: "var(--bad)" }}>
              {dh.duplicates}
              <span className="big-num__unit">%</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <HealthBar value={dh.duplicates} max={25} color="var(--bad)" />
            </div>
            <div className="health-card__foot">sector benchmark 6%</div>
          </div>
          <div className="health-card">
            <div className="kpi__label">Steward hours / yr</div>
            <div className="big-num">
              {(dh.stewardshipHours / 1000).toFixed(1)}
              <span className="big-num__unit">k</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <HealthBar value={92} color="var(--warn)" />
            </div>
            <div className="health-card__foot">≈ SEK 2.4M loaded cost</div>
          </div>
          <div className="health-card">
            <div className="kpi__label">MDM coverage</div>
            <div className="big-num" style={{ color: "var(--warn)" }}>
              {dh.mdmCoverage}
              <span className="big-num__unit">%</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <HealthBar value={dh.mdmCoverage} color="var(--warn)" />
            </div>
            <div className="health-card__foot">customer + product domains</div>
          </div>
          <div className="health-card">
            <div className="kpi__label">GDPR readiness</div>
            <div className="big-num" style={{ color: "var(--bad)" }}>
              C<span className="big-num__unit">−</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <HealthBar value={38} color="var(--bad)" />
            </div>
            <div className="health-card__foot">DPIA stale since 2023</div>
          </div>
        </div>
      </section>

      {/* Business case */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Business case · ROI &amp; TCO</h2>
          <div className="section__aside">3-year · agent-modeled</div>
        </div>
        <BusinessCase />
      </section>

      {/* Painpoints */}
      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Painpoints surfaced · agent</h2>
          <div className="section__aside">3 active</div>
        </div>
        {PAINPOINTS.map((p) => (
          <div key={p.id} className="card painpoint">
            <div className="painpoint__head">
              <Pill tone={p.severity === "critical" ? "bad" : p.severity === "high" ? "warn" : "neutral"}>
                {p.severity}
              </Pill>
              <div className="painpoint__title">{p.title}</div>
            </div>
            <div className="painpoint__impact">{p.impact}</div>
            <div className="painpoint__foot">
              <div>
                <div className="kpi__label" style={{ marginBottom: 6 }}>
                  Evidence
                </div>
                <ul className="evidence-list">
                  {p.evidence.map((e, i) => (
                    <li key={i}>
                      <span className="mono evidence-list__n">{String(i + 1).padStart(2, "0")}</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="kpi__label" style={{ marginBottom: 6 }}>
                  Recommended fit
                </div>
                <div className="fit__sku">{p.fit.sku}</div>
                <div className="fit__meta">
                  {p.fit.tier} tier · {p.fit.arr} · TTV {p.fit.timeToValue}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

interface Props {
  account: Account;
  tab: Tab;
  setTab: (t: Tab) => void;
  onOpenAgent?: () => void;
  showAgentToggle?: boolean;
}

export function Record({ account, tab, setTab, onOpenAgent, showAgentToggle }: Props) {
  return (
    <main className="record">
      <Topbar account={account} />
      <Hero account={account} />
      <KPIs account={account} />
      <div className="record__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`tab${tab === t ? " is-active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
        {showAgentToggle && (
          <button
            type="button"
            className="icon-btn show-agent-toggle"
            style={{ marginLeft: "auto", alignSelf: "center" }}
            onClick={onOpenAgent}
          >
            ◆ Agent
          </button>
        )}
      </div>
      <div className="record__body">
        {tab === "Overview" ? (
          <OverviewTab account={account} />
        ) : (
          <div className="placeholder">{tab} view — out of scope for this prototype.</div>
        )}
      </div>
    </main>
  );
}

export type { Tab };
