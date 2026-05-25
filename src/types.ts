export type Sentiment = "warm" | "neutral" | "cold";
export type Severity = "critical" | "high" | "medium";

export interface Signal {
  tag: string;
  text: string;
  source: string;
}

export interface Stakeholder {
  name: string;
  title: string;
  influence: number;
  sentiment: Sentiment;
  note: string;
  initials: string;
}

export interface DataHealth {
  score: number;
  duplicates: number;
  stewardshipHours: number;
  mdmCoverage: number;
  lastAudit: string;
}

export interface Account {
  id: string;
  name: string;
  country: string;
  flag: string;
  sector: string;
  hq?: string;
  revenue?: string;
  employees?: string;
  fiscal?: string;
  relationship?: string;
  health: number;
  opportunity: number;
  opportunityValue: string;
  stage: string;
  owner?: string;
  parent?: string;
  subsidiaries?: number;
  systems?: string[];
  dataHealth?: DataHealth;
  signals?: Signal[];
  stakeholders?: Stakeholder[];
}

export interface PainpointFit {
  sku: string;
  tier: string;
  arr: string;
  timeToValue: string;
}

export interface Painpoint {
  id: string;
  severity: Severity;
  title: string;
  impact: string;
  evidence: string[];
  fit: PainpointFit;
}

export type AgentBlock =
  | { kind: "text"; text: string }
  | { kind: "brief"; rows: [string, string][] }
  | { kind: "actions"; items: { label: string; id: string }[] }
  | { kind: "dupes" }
  | { kind: "map" }
  | { kind: "email"; subject: string; body: string[] };

export interface UserTurn {
  id: string;
  role: "user";
  text: string;
}

export interface AgentTurnData {
  id: string;
  role: "agent";
  blocks: AgentBlock[];
  fresh?: boolean;
}

export type Turn = UserTurn | AgentTurnData;

export type Persona = "consultative" | "analytical" | "opinionated";
export type Theme = "light" | "dark";
export type Density = "comfortable" | "compact";

export interface Preferences {
  persona: Persona;
  theme: Theme;
  density: Density;
  accent: string;
}
