/* ── AGENT PANEL ── */
const aS = {
  wrap: { width:460, flexShrink:0, background:'var(--agent-bg)', color:'var(--agent-ink)', display:'flex', flexDirection:'column', fontSize:13, borderLeft:'1px solid var(--agent-line)' },
  header: { padding:'14px 18px', borderBottom:'1px solid var(--agent-line)', display:'flex', alignItems:'center', gap:12 },
  badge: { width:30, height:30, background:'var(--agent-accent)', color:'#161311', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, letterSpacing:'-0.3px', fontFamily:'Fraunces, serif' },
  title: { fontSize:13.5, fontWeight:600, letterSpacing:'-0.1px' },
  sub: { fontSize:10.5, color:'var(--agent-ink-2)', fontFamily:'JetBrains Mono, monospace', marginTop:1 },
  context: { padding:'10px 18px', fontSize:11.5, color:'var(--agent-ink-2)', background:'rgba(255,255,255,0.02)', borderBottom:'1px solid var(--agent-line)', display:'flex', alignItems:'center', gap:8 },
  dot: { width:6, height:6, borderRadius:'50%', background:'var(--ok)' },
  scroll: { flex:1, overflowY:'auto', padding:'20px 18px 20px', display:'flex', flexDirection:'column', gap:18 },
  msgUser: { alignSelf:'flex-end', maxWidth:'85%', padding:'10px 14px', background:'rgba(201,184,255,0.12)', color:'var(--agent-ink)', borderRadius:'14px 14px 4px 14px', fontSize:13, border:'1px solid rgba(201,184,255,0.18)' },
  msgAgent: { display:'flex', flexDirection:'column', gap:12 },
  agentLine: { fontSize:13, lineHeight:1.55, color:'var(--agent-ink)', whiteSpace:'pre-wrap' },
  brief: { border:'1px solid var(--agent-line)', borderRadius:10, overflow:'hidden' },
  briefRow: { display:'grid', gridTemplateColumns:'90px 1fr', padding:'10px 12px', fontSize:12, borderBottom:'1px solid var(--agent-line)', gap:12 },
  briefLabel: { color:'var(--agent-accent)', textTransform:'uppercase', fontSize:10, letterSpacing:'0.08em', fontWeight:600, fontFamily:'JetBrains Mono, monospace' },
  briefVal: { color:'var(--agent-ink)', lineHeight:1.55 },
  actions: { display:'flex', flexWrap:'wrap', gap:6 },
  action: { padding:'7px 11px', background:'transparent', color:'var(--agent-ink)', border:'1px solid var(--agent-line)', borderRadius:6, fontSize:11.5, fontWeight:500 },
  actionPrimary: { background:'var(--agent-accent)', color:'#161311', borderColor:'var(--agent-accent)' },
  composer: { padding:14, borderTop:'1px solid var(--agent-line)', background:'rgba(0,0,0,0.2)' },
  prompts: { display:'flex', gap:6, overflowX:'auto', marginBottom:10, paddingBottom:4 },
  promptChip: { padding:'6px 11px', background:'transparent', color:'var(--agent-ink-2)', border:'1px solid var(--agent-line)', borderRadius:999, fontSize:11, whiteSpace:'nowrap', flexShrink:0 },
  input: { display:'flex', gap:8, alignItems:'flex-end', padding:10, background:'#0d0b09', border:'1px solid var(--agent-line)', borderRadius:10 },
  textarea: { flex:1, background:'transparent', border:'none', outline:'none', color:'var(--agent-ink)', fontFamily:'inherit', fontSize:13, resize:'none', minHeight:20, maxHeight:100, lineHeight:1.45 },
  send: { width:28, height:28, borderRadius:6, border:'none', background:'var(--agent-accent)', color:'#161311', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' },
  meta: { fontSize:10, color:'var(--agent-ink-2)', marginTop:8, display:'flex', justifyContent:'space-between', fontFamily:'JetBrains Mono, monospace' },
  thinking: { display:'flex', gap:8, alignItems:'center', fontSize:11.5, color:'var(--agent-ink-2)', fontFamily:'JetBrains Mono, monospace' }
};

function StreamText({ text, speed = 12, onDone }) {
  const [shown, setShown] = React.useState('');
  React.useEffect(() => {
    let i = 0, cancelled = false;
    const tick = () => { if (cancelled) return; i = Math.min(text.length, i + 3); setShown(text.slice(0, i)); if (i < text.length) setTimeout(tick, speed); else if (onDone) onDone(); };
    tick();
    return () => { cancelled = true; };
  }, [text]);
  const done = shown.length >= text.length;
  return <span>{shown}{!done && <span className="caret" />}</span>;
}

function DupeBars({ account }) {
  const dup = account.dataHealth.duplicates;
  const data = [
    { label: "Same legal entity, different name", v: Math.round(dup * 0.516 * 10) / 10, color: 'var(--bad)' },
    { label: "Subsidiary tagged as parent", v: Math.round(dup * 0.225 * 10) / 10, color: 'var(--warn)' },
    { label: "Address / format-only variants", v: Math.round(dup * 0.176 * 10) / 10, color: 'var(--warn)' },
    { label: "Confirmed deceased / dissolved", v: Math.round(dup * 0.083 * 10) / 10, color: 'var(--ink-3)' }
  ];
  return (
    <div style={aS.brief}>
      <div style={{ padding:'12px 12px 8px', fontSize:11, color:'var(--agent-ink-2)', fontFamily:'JetBrains Mono, monospace' }}>
        DUPLICATE BREAKDOWN · {dup}% total rate
      </div>
      {data.map((d, i) => (
        <div key={i} style={{ padding:'8px 12px', borderTop:'1px solid var(--agent-line)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, marginBottom:4 }}>
            <span>{d.label}</span>
            <span className="mono" style={{ color:'var(--agent-accent)' }}>{d.v}%</span>
          </div>
          <div style={{ height:4, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${Math.min(100,(d.v/Math.max(dup,1))*100)}%`, background:d.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommitteeMap({ account }) {
  const people = account.stakeholders;
  const quad = (warm, high) => people.filter(p => (high ? p.influence >= 70 : p.influence < 70) && (warm ? p.sentiment === 'warm' : p.sentiment !== 'warm'));
  const cell = (warm, high, label) => (
    <div style={{ border:'1px solid var(--agent-line)', borderRadius:8, padding:10, background:warm&&high?'rgba(47,122,77,0.12)':'transparent', minHeight:90 }}>
      <div style={{ fontSize:10, color:'var(--agent-ink-2)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6, fontFamily:'JetBrains Mono, monospace' }}>{label}</div>
      {quad(warm, high).map(p => (
        <div key={p.name} style={{ fontSize:11.5, marginBottom:3 }}>
          <span style={{ color:warm?'#7fc998':'#d28686' }}>●</span> <span style={{ fontWeight:500 }}>{p.name}</span>
          <div style={{ fontSize:10.5, color:'var(--agent-ink-2)', marginLeft:14 }}>{p.title}</div>
        </div>
      ))}
      {quad(warm, high).length === 0 && <div style={{ fontSize:11, color:'var(--agent-ink-2)', fontStyle:'italic' }}>— gap —</div>}
    </div>
  );
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
      {cell(true, true, '↑ Influence · Warm')}
      {cell(false, true, '↑ Influence · Cold')}
      {cell(true, false, '↓ Influence · Warm')}
      {cell(false, false, '↓ Influence · Cold')}
    </div>
  );
}

function EmailDraft({ subject, body }) {
  return (
    <div style={aS.brief}>
      <div style={{ padding:'10px 12px', borderBottom:'1px solid var(--agent-line)', fontSize:11.5 }}>
        <div style={{ color:'var(--agent-ink-2)', fontSize:10.5, fontFamily:'JetBrains Mono, monospace', marginBottom:4 }}>SUBJECT</div>
        <div style={{ fontWeight:500 }}>{subject}</div>
      </div>
      <div style={{ padding:'12px 12px 14px', fontSize:12.5, lineHeight:1.6 }}>
        {body.map((line, i) => <p key={i} style={{ margin:i===0?0:'8px 0 0' }}>{line}</p>)}
      </div>
    </div>
  );
}

function ThinkingTrace() {
  const steps = ["Reading account record","Querying signals · 4 hits","Cross-referencing external sources","Scoring fit against MDM SKU catalog","Composing brief"];
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    if (step >= steps.length) return;
    const t = setTimeout(() => setStep(step + 1), 280);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div style={{ ...aS.brief, padding:'10px 12px' }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, opacity:i<step?0.55:i===step?1:0.25, padding:'3px 0' }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:i<step?'var(--ok)':i===step?'var(--agent-accent)':'var(--agent-line)' }} />
          <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--agent-ink)' }}>{s}</span>
          {i===step && <span style={{ marginLeft:'auto', fontSize:10, color:'var(--agent-ink-2)' }}>…</span>}
          {i<step && <span style={{ marginLeft:'auto', fontSize:10, color:'var(--ok)' }}>done</span>}
        </div>
      ))}
    </div>
  );
}

function AgentBlock({ block, onAction, account }) {
  if (block.kind === 'text') return <div style={aS.agentLine}>{block.instant ? block.text : <StreamText text={block.text} />}</div>;
  if (block.kind === 'brief') return (
    <div style={aS.brief}>
      {block.rows.map(([label, val], i) => (
        <div key={i} style={{ ...aS.briefRow, borderBottom:i===block.rows.length-1?'none':'1px solid var(--agent-line)' }}>
          <div style={aS.briefLabel}>{label}</div>
          <div style={aS.briefVal}>{val}</div>
        </div>
      ))}
    </div>
  );
  if (block.kind === 'actions') return (
    <div style={aS.actions}>
      {block.items.map((a, i) => (
        <button key={a.id} onClick={() => onAction(a.id)} style={{ ...aS.action, ...(i===0?aS.actionPrimary:{}) }}>{a.label}</button>
      ))}
    </div>
  );
  if (block.kind === 'dupes') return <DupeBars account={account} />;
  if (block.kind === 'map') return <CommitteeMap account={account} />;
  if (block.kind === 'email') return <EmailDraft subject={block.subject} body={block.body} />;
  return null;
}

function AgentTurn({ turn, onAction, fresh, account }) {
  const [revealed, setRevealed] = React.useState(fresh ? 0 : turn.blocks.length);
  const [thinking, setThinking] = React.useState(fresh);
  React.useEffect(() => {
    if (!fresh) return;
    const t = setTimeout(() => { setThinking(false); setRevealed(1); }, 1500);
    return () => clearTimeout(t);
  }, [fresh]);
  React.useEffect(() => {
    if (revealed === 0 || revealed >= turn.blocks.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 800);
    return () => clearTimeout(t);
  }, [revealed]);
  if (thinking) return <div style={aS.msgAgent} className="fade-up"><ThinkingTrace /></div>;
  return (
    <div style={aS.msgAgent}>
      {turn.blocks.slice(0, revealed).map((b, i) => (
        <div key={i} className="fade-up"><AgentBlock block={b} onAction={onAction} account={account} /></div>
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <div style={aS.msgAgent} className="fade-up">
      <div style={{ ...aS.brief, padding:'12px 14px', display:'flex', gap:6, alignItems:'center' }}>
        <span style={{ fontSize:11, color:'var(--agent-ink-2)', fontFamily:'JetBrains Mono, monospace' }}>thinking</span>
        <span className="caret" style={{ width:5, height:5, borderRadius:'50%' }} />
      </div>
    </div>
  );
}

function SettingsPopover({ onClose, onSaved }) {
  const cfg = window.MDM.getAgentSettings();
  const [key, setKey] = React.useState(cfg.apiKey || '');
  const [model, setModel] = React.useState(cfg.model || 'claude-sonnet-4-6');
  const save = () => { window.MDM.setAgentSettings({ apiKey:key.trim(), model }); onSaved && onSaved(); onClose(); };
  const clear = () => { window.MDM.setAgentSettings({ apiKey:'' }); setKey(''); onSaved && onSaved(); };
  const fld = { width:'100%', boxSizing:'border-box', background:'#0d0b09', color:'var(--agent-ink)', border:'1px solid var(--agent-line)', borderRadius:7, padding:'8px 10px', fontSize:12, fontFamily:'inherit', outline:'none', marginTop:6 };
  return (
    <div style={{ position:'absolute', top:46, right:12, width:300, background:'#1d1916', border:'1px solid var(--agent-line)', borderRadius:12, padding:14, zIndex:50, boxShadow:'0 16px 40px rgba(0,0,0,0.5)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
        <b style={{ fontSize:12.5 }}>Agent intelligence</b>
        <button onClick={onClose} style={{ ...aS.action, padding:'2px 7px', fontSize:12 }}>✕</button>
      </div>
      <div style={{ fontSize:11, color:'var(--agent-ink-2)', lineHeight:1.5, marginBottom:10 }}>
        Without a key the agent runs <b style={{ color:'var(--agent-ink)' }}>offline synthesis</b>. Add a Claude API key for live, free-form answers grounded on the account.
      </div>
      <label style={{ fontSize:10.5, color:'var(--agent-ink-2)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'JetBrains Mono, monospace' }}>Claude API key</label>
      <input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="sk-ant-…" style={fld} autoComplete="off" />
      <label style={{ fontSize:10.5, color:'var(--agent-ink-2)', textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'JetBrains Mono, monospace', display:'block', marginTop:10 }}>Model</label>
      <select value={model} onChange={e=>setModel(e.target.value)} style={fld}>
        <option value="claude-sonnet-4-6">Sonnet 4.6 — balanced</option>
        <option value="claude-opus-4-8">Opus 4.8 — most capable</option>
        <option value="claude-haiku-4-5-20251001">Haiku 4.5 — fastest</option>
      </select>
      <div style={{ display:'flex', gap:8, marginTop:12 }}>
        <button onClick={save} style={{ ...aS.action, ...aS.actionPrimary, flex:1 }}>Save</button>
        <button onClick={clear} style={aS.action}>Clear key</button>
      </div>
      <div style={{ fontSize:10, color:'var(--agent-ink-2)', marginTop:10, lineHeight:1.5 }}>
        Stored only in this browser (localStorage) — never written into the file. Calls go direct to api.anthropic.com.
      </div>
    </div>
  );
}

function AgentPanel({ persona, account }) {
  const [turns, setTurns] = React.useState(() => {
    const conv = window.MDM.getConversation(account);
    return [{ ...conv[0], id: 'u0' }, { ...conv[1], id: 'a0', fresh: false }];
  });
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [live, setLive] = React.useState(() => window.MDM.hasLiveAgent());
  const scrollRef = React.useRef(null);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [turns, busy]);

  const handleAction = id => {
    const followup = window.MDM.FOLLOWUPS[id];
    if (!followup) return;
    const userText = { draft:'Yes, draft it.', dupes:'Show the duplicate analysis.', map:'Map the committee.', short:'Make it shorter.', sv:'Translate to Swedish.', log:'Log to CRM.' }[id] || 'Continue';
    setTurns(t => [...t, { role:'user', text:userText, id:`u${t.length}` }, { ...followup, fresh:true, id:`a${t.length+1}` }]);
  };

  const offlineReply = text => {
    const dh = account.dataHealth, pp = account.painpoints[0], champ = account.stakeholders[0];
    return { role:'agent', fresh:true, id:`a${Date.now()}`, blocks: [
      { kind:'text', text:`On ${account.name}: the sharpest wedge is "${pp.title}" — ${dh.duplicates}% duplicate rate, only ${dh.mdmCoverage}% MDM coverage. Open with ${champ.name} (${champ.title}). Recommended fit: ${pp.fit.sku} — ${pp.fit.arr} ARR, ${pp.fit.timeToValue}.` },
      { kind:'text', text:'Offline synthesis from the account dossier. Add a Claude API key via ⚙ for live, free-form answers.' },
      { kind:'actions', items:[{ label:'Brief me before the call', id:'draft' }, { label:'Show dirty data', id:'dupes' }, { label:'Map the buying committee', id:'map' }] }
    ]};
  };

  const handleSubmit = async () => {
    if (!input.trim() || busy) return;
    const text = input.trim(); setInput('');
    const history = turns;
    setTurns(t => [...t, { role:'user', text, id:`u${t.length}` }]);

    if (!window.MDM.hasLiveAgent()) {
      setTurns(t => [...t, offlineReply(text)]);
      return;
    }
    setBusy(true);
    try {
      const reply = await window.MDM.askClaude(account, persona, history, text);
      setTurns(t => [...t, { role:'agent', fresh:false, id:`a${Date.now()}`, _plain:reply, blocks:[{ kind:'text', text:reply, instant:true }] }]);
    } catch (err) {
      const msg = String(err.message||err);
      const friendly = msg.startsWith('api-401') ? 'That API key was rejected (401). Re-check it in ⚙.'
        : msg.startsWith('api-') ? `The API returned an error — ${msg.replace('api-','')}.`
        : 'Could not reach the Claude API (network or CORS). Falling back to offline synthesis below.';
      setTurns(t => [...t, { role:'agent', fresh:false, id:`a${Date.now()}`, blocks:[{ kind:'text', text:friendly, instant:true }] }, offlineReply(text)]);
    } finally {
      setBusy(false);
    }
  };

  const personaSub = { consultative:'Consultative · asks before assuming', analytical:'Analytical · numbers first', opinionated:'Opinionated · gives a recommendation' }[persona] || 'Consultative';
  const cfg = window.MDM.getAgentSettings();
  const modelShort = (cfg.model || 'claude-sonnet-4-6').replace('claude-','').replace('-20251001','');

  return (
    <div style={aS.wrap}>
      <div style={{ ...aS.header, position:'relative' }}>
        <div style={aS.badge}>M</div>
        <div style={{ flex:1 }}>
          <div style={aS.title}>MDM Sales Specialist</div>
          <div style={aS.sub}>agent · {personaSub}</div>
        </div>
        <button title="Agent intelligence settings" onClick={() => setSettingsOpen(o=>!o)} style={{ ...aS.action, padding:'5px 9px', fontSize:12.5 }}>⚙</button>
        {settingsOpen && <SettingsPopover onClose={()=>setSettingsOpen(false)} onSaved={()=>setLive(window.MDM.hasLiveAgent())} />}
      </div>
      <div style={aS.context}>
        <span style={{ ...aS.dot, background: live ? 'var(--ok)' : 'var(--ink-3)' }} />
        <span>Context: <b style={{ color:'var(--agent-ink)' }}>{account.name}</b>{account.synthetic ? ' · synthesized' : ''} · {live ? `live · ${modelShort}` : 'offline synthesis'}</span>
      </div>
      <div style={aS.scroll} ref={scrollRef}>
        {turns.map(t =>
          t.role === 'user'
            ? <div key={t.id} style={aS.msgUser} className="fade-up">{t.text}</div>
            : <AgentTurn key={t.id} turn={t} onAction={handleAction} fresh={t.fresh} account={account} />
        )}
        {busy && <TypingDots />}
      </div>
      <div style={aS.composer}>
        <div style={aS.prompts}>
          {window.MDM.SUGGESTED_PROMPTS.map(p => <button key={p} style={aS.promptChip} onClick={() => setInput(p)}>{p}</button>)}
        </div>
        <div style={aS.input}>
          <textarea style={aS.textarea} placeholder={live ? 'Ask anything about this account…' : 'Ask the agent…'} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }} rows={1} disabled={busy} />
          <button style={{ ...aS.send, opacity:busy?0.5:1 }} onClick={handleSubmit} disabled={busy}>↑</button>
        </div>
        <div style={aS.meta}>
          <span>{live ? `${modelShort} · grounded on account dossier` : 'offline synthesis · ⚙ to enable live'}</span>
          <span>shift+↵ newline</span>
        </div>
      </div>
    </div>
  );
}

window.AgentPanel = AgentPanel;
