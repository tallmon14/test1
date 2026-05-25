import type { ReactNode } from "react";
import type { Sentiment } from "../types";

type Tone = "neutral" | "ok" | "warn" | "bad" | "accent";

export function Pill({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function HealthBar({
  value,
  max = 100,
  color = "var(--ink)",
}: {
  value: number;
  max?: number;
  color?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="bar">
      <div className="bar__fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function SentimentDot({ sentiment }: { sentiment: Sentiment }) {
  const color =
    sentiment === "warm" ? "var(--ok)" : sentiment === "cold" ? "var(--bad)" : "var(--ink-3)";
  return <span className="dot" style={{ background: color }} />;
}
