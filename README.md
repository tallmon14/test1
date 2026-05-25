# Nordic Sales Desk — MDM Sales Agent

An AI-augmented CRM workspace for an MDM (Master Data Management) sales specialist
working Nordic accounts (SE / NO / DK / FI / IS). It pairs an account-record page
with a docked MDM Sales Agent that briefs the seller, surfaces data-quality
painpoints, maps the buying committee, drafts outreach, and models the business case.

This is a faithful React recreation of the design handoff (`design_handoff_mdm_agent`),
built as a standalone Vite + React + TypeScript single-page app.

## Stack

- **Vite** + **React 18** + **TypeScript**
- Plain CSS with design-token CSS variables (light/dark themes, density, accent)
- No UI framework — components mirror the handoff's structure

## Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + production build
npm run preview    # preview the production build
npm run typecheck  # type-check only
```

## Layout

Three panes with the handoff's responsive collapse rules:

- **≥ 1280px** — full three-pane layout (rail · record · agent)
- **1024–1279px** — agent panel collapses to a slide-over (toggle from the tab bar)
- **< 1024px** — rail becomes a top-bar menu; record + agent stack

## Structure

| Path | Role |
|---|---|
| `src/App.tsx` | Shell, responsive overlay state, account selection |
| `src/components/SideRail.tsx` | Nav + Nordic account switcher |
| `src/components/Record.tsx` | Topbar, hero, KPIs, tabs, Overview body, painpoints |
| `src/components/BusinessCase.tsx` | ROI / TCO card with derived totals |
| `src/components/AgentPanel.tsx` | Agent chat: streaming, thinking trace, typed blocks |
| `src/components/SettingsSheet.tsx` | User preferences (persona, theme, density, accent) |
| `src/components/primitives.tsx` | Pill, HealthBar, SentimentDot |
| `src/data.ts` | Mock accounts, painpoints, conversation, business case |
| `src/types.ts` | Shared types |
| `src/usePreferences.ts` | Persisted preferences applied to `:root` |
| `src/index.css` | Design tokens + animations |
| `src/app.css` | Layout + component styles + responsive rules |

## Preferences

Theme (light/dark), density (comfortable/compact), accent (violet/indigo/forest/ember),
and agent persona are exposed in a Settings sheet and persisted to `localStorage`.

## Production notes

The data layer is mocked in `src/data.ts`. To productionize, wire it to:
CRM (Account + Contacts + Opportunities), a news/intent signals provider, the Nordic
registries (Bolagsverket / Brønnøysund / Virk / PRH / RSK), an MDM scoring service,
a product/SKU catalog, and an ROI modeler. The agent's scripted turns should be
replaced with a persona-aware backend with tool calls and per-claim citations.
