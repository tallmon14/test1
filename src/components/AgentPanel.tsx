import { useEffect, useRef, useState } from "react";
import type { AgentBlock as Block, Persona, Turn } from "../types";
import {
  ACCOUNTS,
  CONVERSATION,
  DUPE_BREAKDOWN,
  FOLLOWUPS,
  FOLLOWUP_USER_TEXT,
  PERSONA_SUB,
  SUGGESTED_PROMPTS,
} from "../data";

/* Streaming text — appears ~3 chars / 12ms with a blinking caret. */
function StreamText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    let cancelled = false;
    setShown("");
    const tick = () => {
      if (cancelled) return;
      i = Math.min(text.length, i + 3);
      setShown(text.slice(0, i));
      if (i < text.length) window.setTimeout(tick, speed);
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, [text, speed]);
  const done = shown.length >= text.length;
  return (
    <span>
      {shown}
      {!done && <span className="caret" />}
    </span>
  );
}

function DupeBars() {
  return (
    <div className="agent-brief">
      <div className="dupes__head">DUPLICATE BREAKDOWN · n=42,108 records</div>
      {DUPE_BREAKDOWN.map((d) => (
        <div key={d.label} className="dupes__row">
          <div className="dupes__row-head">
            <span>{d.label}</span>
            <span className="mono dupes__pct">{d.v}%</span>
          </div>
          <div className="dupes__bar">
            <div style={{ height: "100%", width: `${(d.v / 10) * 100}%`, background: d.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommitteeMap() {
  const people = ACCOUNTS[0].stakeholders ?? [];
  const quad = (warm: boolean, high: boolean) =>
    people.filter(
      (p) =>
        (high ? p.influence >= 70 : p.influence < 70) &&
        (warm ? p.sentiment === "warm" : p.sentiment !== "warm"),
    );

  const Cell = ({ warm, high, label }: { warm: boolean; high: boolean; label: string }) => {
    const members = quad(warm, high);
    return (
      <div className={`cmap__cell${warm && high ? " cmap__cell--hot" : ""}`}>
        <div className="cmap__label">{label}</div>
        {members.map((p) => (
          <div key={p.name} className="cmap__person">
            <span style={{ color: warm ? "#7fc998" : "#d28686" }}>●</span>{" "}
            <span style={{ fontWeight: 500 }}>{p.name}</span>
            <div className="cmap__person-title">{p.title}</div>
          </div>
        ))}
        {members.length === 0 && <div className="cmap__gap">— gap —</div>}
      </div>
    );
  };

  return (
    <div className="cmap">
      <Cell warm high label="↑ Influence · Warm" />
      <Cell warm={false} high label="↑ Influence · Cold" />
      <Cell warm high={false} label="↓ Influence · Warm" />
      <Cell warm={false} high={false} label="↓ Influence · Cold" />
    </div>
  );
}

function EmailDraft({ subject, body }: { subject: string; body: string[] }) {
  return (
    <div className="agent-brief">
      <div className="email__head">
        <div className="email__subject-label">SUBJECT</div>
        <div className="email__subject">{subject}</div>
      </div>
      <div className="email__body">
        {body.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}

const THINKING_STEPS = [
  "Reading account record · saga",
  "Querying signals · 4 hits",
  "Cross-referencing Bisnode + Bolagsverket",
  "Scoring fit against MDM SKU catalog",
  "Composing brief",
];

function ThinkingTrace() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= THINKING_STEPS.length) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), 280);
    return () => window.clearTimeout(t);
  }, [step]);
  return (
    <div className="agent-brief thinking">
      {THINKING_STEPS.map((s, i) => (
        <div
          key={s}
          className="thinking__step"
          style={{ opacity: i < step ? 0.55 : i === step ? 1 : 0.25 }}
        >
          <span
            className="thinking__dot"
            style={{
              background:
                i < step ? "var(--ok)" : i === step ? "var(--agent-accent)" : "var(--agent-line)",
            }}
          />
          <span className="thinking__text">{s}</span>
          {i === step && (
            <span className="thinking__status" style={{ color: "var(--agent-ink-2)" }}>
              …
            </span>
          )}
          {i < step && (
            <span className="thinking__status" style={{ color: "var(--ok)" }}>
              done
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function AgentBlockView({ block, onAction }: { block: Block; onAction: (id: string) => void }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="agent-line">
          <StreamText text={block.text} />
        </div>
      );
    case "brief":
      return (
        <div className="agent-brief">
          {block.rows.map(([label, val]) => (
            <div key={label} className="agent-brief__row">
              <div className="agent-brief__label">{label}</div>
              <div className="agent-brief__val">{val}</div>
            </div>
          ))}
        </div>
      );
    case "actions":
      return (
        <div className="agent-actions">
          {block.items.map((a, i) => (
            <button
              key={a.id}
              type="button"
              className={`agent-action${i === 0 ? " agent-action--primary" : ""}`}
              onClick={() => onAction(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>
      );
    case "dupes":
      return <DupeBars />;
    case "map":
      return <CommitteeMap />;
    case "email":
      return <EmailDraft subject={block.subject} body={block.body} />;
    default:
      return null;
  }
}

function AgentTurn({
  blocks,
  fresh,
  onAction,
}: {
  blocks: Block[];
  fresh: boolean;
  onAction: (id: string) => void;
}) {
  const [revealed, setRevealed] = useState(fresh ? 0 : blocks.length);
  const [thinking, setThinking] = useState(fresh);

  useEffect(() => {
    if (!fresh) return;
    const t = window.setTimeout(() => {
      setThinking(false);
      setRevealed(1);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [fresh]);

  useEffect(() => {
    if (revealed === 0 || revealed >= blocks.length) return;
    const t = window.setTimeout(() => setRevealed((r) => r + 1), 800);
    return () => window.clearTimeout(t);
  }, [revealed, blocks.length]);

  if (thinking) {
    return (
      <div className="msg-agent fade-up">
        <ThinkingTrace />
      </div>
    );
  }

  return (
    <div className="msg-agent">
      {blocks.slice(0, revealed).map((b, i) => (
        <div key={i} className="fade-up">
          <AgentBlockView block={b} onAction={onAction} />
        </div>
      ))}
    </div>
  );
}

interface Props {
  persona: Persona;
  accountName: string;
  onClose?: () => void;
  isOverlay?: boolean;
  isOpen?: boolean;
}

export function AgentPanel({ persona, accountName, onClose, isOverlay, isOpen }: Props) {
  const [turns, setTurns] = useState<Turn[]>(() => [
    { id: "u0", role: "user", text: CONVERSATION.user },
    { id: "a0", role: "agent", blocks: CONVERSATION.agentBlocks, fresh: false },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [turns]);

  const handleAction = (id: string) => {
    const followup = FOLLOWUPS[id];
    if (!followup) return;
    const userText = FOLLOWUP_USER_TEXT[id] ?? "Continue";
    setTurns((t) => [
      ...t,
      { id: `u${t.length}`, role: "user", text: userText },
      { id: `a${t.length + 1}`, role: "agent", blocks: followup, fresh: true },
    ]);
  };

  const handleSubmit = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setTurns((t) => [
      ...t,
      { id: `u${t.length}`, role: "user", text },
      {
        id: `a${t.length + 1}`,
        role: "agent",
        fresh: true,
        blocks: [
          {
            kind: "text",
            text: `Looking into "${text}" — I'd pull from Saga's CRM record, last 30 days of signals, and the MDM diagnostic. This is a prototype; wiring a live response is the next step.`,
          },
          {
            kind: "actions",
            items: [
              { label: "Brief me before the call", id: "draft" },
              { label: "Show dirty data", id: "dupes" },
            ],
          },
        ],
      },
    ]);
  };

  const personaSub = PERSONA_SUB[persona] ?? PERSONA_SUB.consultative;

  return (
    <aside
      className={`agent${isOverlay ? (isOpen ? " is-open" : "") : ""}`}
      aria-label="MDM Sales Specialist agent"
    >
      <div className="agent__header">
        <div className="agent__badge" aria-hidden="true">
          M
        </div>
        <div style={{ flex: 1 }}>
          <div className="agent__title">MDM Sales Specialist</div>
          <div className="agent__sub">agent · {personaSub}</div>
        </div>
        <button
          type="button"
          className="agent-overflow"
          onClick={onClose}
          aria-label={isOverlay ? "Close agent panel" : "Agent options"}
        >
          {isOverlay ? "✕" : "⋯"}
        </button>
      </div>

      <div className="agent__context">
        <span className="dot" style={{ background: "var(--ok)", width: 6, height: 6 }} />
        <span>
          Context: <b>{accountName}</b> · last refreshed 4m ago
        </span>
      </div>

      <div className="agent__scroll" ref={scrollRef}>
        {turns.map((t) =>
          t.role === "user" ? (
            <div key={t.id} className="msg-user fade-up">
              {t.text}
            </div>
          ) : (
            <AgentTurn key={t.id} blocks={t.blocks} fresh={!!t.fresh} onAction={handleAction} />
          ),
        )}
      </div>

      <div className="agent__composer">
        <div className="agent__prompts">
          {SUGGESTED_PROMPTS.map((p) => (
            <button key={p} type="button" className="prompt-chip" onClick={() => setInput(p)}>
              {p}
            </button>
          ))}
        </div>
        <div className="agent__input">
          <textarea
            className="agent__textarea"
            placeholder="Ask the agent…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
          />
          <button type="button" className="agent__send" onClick={handleSubmit} aria-label="Send">
            ↑
          </button>
        </div>
        <div className="agent__meta">
          <span>haiku-4-5 · grounded on CRM + Bisnode + Bolagsverket</span>
          <span>shift+↵ newline</span>
        </div>
      </div>
    </aside>
  );
}
