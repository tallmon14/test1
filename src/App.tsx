import { useEffect, useState } from "react";
import "./app.css";
import { ACCOUNTS } from "./data";
import type { Account } from "./types";
import { usePreferences } from "./usePreferences";
import { SideRail } from "./components/SideRail";
import { Record, type Tab } from "./components/Record";
import { AgentPanel } from "./components/AgentPanel";
import { SettingsSheet } from "./components/SettingsSheet";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export default function App() {
  const { prefs, setPref } = usePreferences();
  const [selectedId, setSelectedId] = useState("saga");
  const [tab, setTab] = useState<Tab>("Overview");
  const [agentOpen, setAgentOpen] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const agentIsOverlay = useMediaQuery("(max-width: 1279px)");
  const railIsOverlay = useMediaQuery("(max-width: 1023px)");

  const account = ACCOUNTS.find((a) => a.id === selectedId)!;
  // The rich Overview data only exists on the lead account; other accounts
  // fall back to it so the record still renders (mirrors the prototype).
  const full: Account = selectedId === "saga" ? account : { ...ACCOUNTS[0], ...account };

  const selectAccount = (id: string) => {
    setSelectedId(id);
    setTab("Overview");
    setRailOpen(false);
  };

  return (
    <div className="shell">
      {/* Mobile top bar (<1024px) */}
      <div className="topbar-mobile">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setRailOpen(true)}
          aria-label="Open navigation"
        >
          ☰
        </button>
        <span className="topbar-mobile__brand">Nordic Sales Desk</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button type="button" className="icon-btn" onClick={() => setSettingsOpen(true)}>
            ⚙
          </button>
          <button type="button" className="icon-btn" onClick={() => setAgentOpen(true)}>
            ◆ Agent
          </button>
        </div>
      </div>

      {railIsOverlay && railOpen && (
        <div className="rail-overlay-backdrop is-open" onClick={() => setRailOpen(false)} />
      )}
      <SideRail selectedId={selectedId} onSelect={selectAccount} open={railIsOverlay && railOpen} />

      <Record
        account={full}
        tab={tab}
        setTab={setTab}
        showAgentToggle={agentIsOverlay}
        onOpenAgent={() => setAgentOpen(true)}
      />

      {agentIsOverlay && agentOpen && (
        <div className="agent-backdrop" onClick={() => setAgentOpen(false)} />
      )}
      <AgentPanel
        key={selectedId + prefs.persona}
        persona={prefs.persona}
        accountName={full.name}
        isOverlay={agentIsOverlay}
        isOpen={agentOpen}
        onClose={agentIsOverlay ? () => setAgentOpen(false) : () => setSettingsOpen(true)}
      />

      {settingsOpen && (
        <SettingsSheet prefs={prefs} setPref={setPref} onClose={() => setSettingsOpen(false)} />
      )}
    </div>
  );
}
