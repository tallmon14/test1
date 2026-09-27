# MDM Agent — Nordic Sales Desk

A prototype **MDM (Master Data Management) Sales Specialist** agent UI for Nordic
enterprise accounts. Left rail of accounts, a data-rich account record in the
centre, and an AI agent panel on the right that briefs the rep, surfaces
painpoints, and models ROI.

## Files

| File | Role |
|------|------|
| `MDM_Agent.html` | **Built, self-contained app.** Production React + ReactDOM and the transpiled app are inlined — no CDN, no build step to run it. Open directly in any browser; works fully offline. |
| `tweaks-panel.jsx` | Edit-mode tweaks panel (persona, theme, density, accent). |
| `data.jsx` | Accounts, ROI model, `getConversation`, the **`synthesizeAccount`** engine, and the optional **Claude API** helper (`askClaude`, `getAgentSettings`). |
| `record.jsx` | Centre account record — hero, KPIs, signals, committee, data health, business case, painpoints. |
| `agent.jsx` | Right-hand agent panel — brief, action blocks, settings popover, live/offline routing. |
| `app.jsx` | Shell, side rail, search + add-account form, localStorage persistence. |

## Features

- **6 built-in Nordic accounts**, each fully data-driven (signals, committee, data health, ROI/TCO).
- **Dynamic — works on any account.** Search the rail; if a company isn't listed, "Add" it via a
  short form (country, sector, revenue, systems, duplicate rate). `synthesizeAccount()` deterministically
  generates signals, a buying committee, painpoints mapped to the sector's master-data domain, and a
  full ROI model in the right currency. Custom accounts persist in `localStorage`.
- **Hybrid agent.** With no key it answers from the account dossier (offline synthesis). Add a Claude
  API key via the ⚙ in the agent header for live, free-form answers grounded on the account. The key is
  stored only in the browser (`localStorage`) — never written into the file.

## Rebuilding the self-contained file

The build inlines **production** React + ReactDOM and transpiles the JSX with Babel (so the browser
needs neither a CDN nor the Babel runtime). Concatenation order matters:

```
tweaks-panel.jsx → data.jsx → record.jsx → agent.jsx → app.jsx → mount
```

Recipe:
1. Transpile each `.jsx` with `@babel/standalone` using the `react` preset (`runtime: 'classic'`).
2. Inline `react.production.min.js` and `react-dom.production.min.js` as `<script>` tags.
3. Append the concatenated transpiled JS in a plain `<script>`, then the mount call
   (`ReactDOM.createRoot(...).render(<App/>)`).
4. Keep the `<style>` block and the `#stage` / `fitStage` scaling harness from the head.

Only the Google Fonts `<link>` remains external; it degrades gracefully to system fonts offline.
