import { ACCOUNTS } from "../data";

const NAV = [
  { icon: "◧", label: "Dashboard" },
  { icon: "◉", label: "Accounts", active: true },
  { icon: "◇", label: "Opportunities" },
  { icon: "◐", label: "Agent runs" },
  { icon: "☰", label: "Playbooks" },
];

function scoreColor(score: number): string {
  if (score > 80) return "var(--ok)";
  if (score > 60) return "var(--warn)";
  return "var(--ink-2)";
}

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  open?: boolean;
}

export function SideRail({ selectedId, onSelect, open }: Props) {
  return (
    <nav className={`rail${open ? " is-open" : ""}`} aria-label="Global navigation and accounts">
      <div className="rail__brand">
        <div className="rail__mark">N</div>
        <div>
          <div className="rail__brand-text">Nordic Sales Desk</div>
          <div className="rail__brand-sub">MDM · region SE/NO/DK/FI/IS</div>
        </div>
      </div>

      <div className="rail__nav">
        {NAV.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`rail__nav-item${item.active ? " is-active" : ""}`}
            aria-current={item.active ? "page" : undefined}
          >
            <span className="rail__nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="rail__list-head">
        <div className="rail__list-label">Nordic accounts</div>
        <div className="rail__list-aside">6 · sorted by opp</div>
      </div>

      <div className="rail__list" role="list">
        {ACCOUNTS.map((a) => {
          const active = a.id === selectedId;
          return (
            <button
              key={a.id}
              type="button"
              role="listitem"
              className={`rail__acct${active ? " is-active" : ""}`}
              aria-current={active ? "true" : undefined}
              onClick={() => onSelect(a.id)}
            >
              <span className="rail__acct-flag" aria-hidden="true">
                {a.flag}
              </span>
              <span className="rail__acct-body">
                <span className="rail__acct-name">{a.name}</span>
                <span className="rail__acct-meta">{a.opportunityValue || a.sector}</span>
              </span>
              <span className="rail__acct-score" style={{ color: scoreColor(a.opportunity) }}>
                {a.opportunity}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rail__foot">
        <span>Mikael Lindqvist</span>
        <span className="mono">SE · Stockholm</span>
      </div>
    </nav>
  );
}
