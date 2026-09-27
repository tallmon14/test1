/* ── APP ── */
const appS = {
  shell: { height:900, width:1440, display:'flex', overflow:'hidden', background:'var(--bg)', color:'var(--ink)' },
  rail: { width:240, flexShrink:0, borderRight:'1px solid var(--line)', background:'var(--panel)', display:'flex', flexDirection:'column', overflow:'hidden' },
  brand: { padding:'14px 16px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', gap:10 },
  brandMark: { width:26, height:26, borderRadius:7, background:'var(--ink)', color:'var(--panel)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, fontFamily:'Fraunces, serif', letterSpacing:'-0.3px' },
  brandText: { fontSize:13, fontWeight:600, letterSpacing:'-0.1px' },
  brandSub: { fontSize:10, color:'var(--ink-3)', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.04em' },
  nav: { padding:'12px 0', borderBottom:'1px solid var(--line)' },
  navItem: { padding:'7px 16px', fontSize:12.5, color:'var(--ink-2)', display:'flex', alignItems:'center', gap:10, cursor:'pointer' },
  navItemActive: { background:'var(--accent-soft)', color:'var(--accent)', fontWeight:500, borderRight:'2px solid var(--accent)' },
  navIcon: { width:14, height:14, opacity:0.7, fontSize:12, display:'inline-flex', alignItems:'center', justifyContent:'center' },
  listHead: { padding:'14px 16px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline' },
  listLabel: { fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink-3)', fontWeight:600 },
  listAside: { fontSize:10.5, color:'var(--ink-3)', fontFamily:'JetBrains Mono, monospace' },
  searchWrap: { padding:'2px 12px 8px' },
  search: { width:'100%', boxSizing:'border-box', padding:'7px 10px', fontSize:12, border:'1px solid var(--line)', borderRadius:7, background:'var(--bg)', color:'var(--ink)', outline:'none', fontFamily:'inherit' },
  addBtn: { width:'100%', boxSizing:'border-box', padding:'8px 10px', fontSize:12, border:'1px dashed var(--accent)', borderRadius:7, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:500, marginTop:6, textAlign:'left' },
  acctList: { flex:1, overflowY:'auto', padding:'0 8px 12px' },
  acctRow: { padding:'10px 10px', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:2 },
  acctRowActive: { background:'var(--line-2)' },
  acctFlag: { fontSize:18 },
  acctName: { fontSize:12.5, fontWeight:500, marginBottom:1, display:'flex', alignItems:'center', gap:6 },
  acctMeta: { fontSize:10.5, color:'var(--ink-3)', fontFamily:'JetBrains Mono, monospace' },
  acctScore: { fontSize:10, padding:'2px 5px', borderRadius:4, fontFamily:'JetBrains Mono, monospace', background:'var(--line-2)', color:'var(--ink-2)' },
  newTag: { fontSize:8.5, padding:'1px 4px', borderRadius:3, background:'var(--accent-soft)', color:'var(--accent)', fontWeight:600, letterSpacing:'0.04em', textTransform:'uppercase' },
  railFoot: { padding:'12px 16px', borderTop:'1px solid var(--line)', fontSize:11, color:'var(--ink-3)', display:'flex', justifyContent:'space-between', alignItems:'center' },
  // modal
  overlay: { position:'absolute', inset:0, background:'rgba(10,9,8,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 },
  modal: { width:460, maxHeight:760, overflow:'auto', background:'var(--panel)', border:'1px solid var(--line)', borderRadius:14, boxShadow:'0 30px 80px rgba(0,0,0,0.35)' },
  modalHead: { padding:'16px 20px', borderBottom:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' },
  modalBody: { padding:'16px 20px 20px', display:'flex', flexDirection:'column', gap:12 },
  field: { display:'flex', flexDirection:'column', gap:5 },
  fieldRow: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 },
  label: { fontSize:11, color:'var(--ink-3)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:600, fontFamily:'JetBrains Mono, monospace' },
  input: { width:'100%', boxSizing:'border-box', padding:'8px 10px', fontSize:12.5, border:'1px solid var(--line)', borderRadius:7, background:'var(--bg)', color:'var(--ink)', outline:'none', fontFamily:'inherit' }
};

const SECTOR_OPTIONS = ['Industrial manufacturing','Insurance','Banking','Energy & utilities','Logistics','Life sciences','Retail','Telecom','Public sector','Other'];
const COUNTRY_OPTIONS = [['SE','Sweden'],['NO','Norway'],['DK','Denmark'],['FI','Finland'],['IS','Iceland'],['DE','Germany'],['GB','United Kingdom'],['US','United States'],['NL','Netherlands'],['XX','Other']];

function AddAccountForm({ initialName, onCancel, onCreate }) {
  const [f, setF] = React.useState({ name:initialName||'', country:'SE', sector:'Industrial manufacturing', revenue:'', employees:'', systems:'', duplicates:'' });
  const set = (k,v) => setF(s => ({ ...s, [k]:v }));
  const submit = () => { if (!f.name.trim()) return; onCreate(window.MDM.synthesizeAccount(f)); };
  return (
    <div style={appS.overlay} onClick={onCancel}>
      <div style={appS.modal} onClick={e=>e.stopPropagation()}>
        <div style={appS.modalHead}>
          <div>
            <div style={{ fontSize:15, fontWeight:600 }}>Add account</div>
            <div style={{ fontSize:11.5, color:'var(--ink-3)', marginTop:2 }}>The agent synthesizes signals, committee, painpoints &amp; ROI from these inputs.</div>
          </div>
          <button onClick={onCancel} style={{ ...rS.pill, cursor:'pointer', padding:'4px 8px' }}>✕</button>
        </div>
        <div style={appS.modalBody}>
          <div style={appS.field}>
            <label style={appS.label}>Company name *</label>
            <input style={appS.input} value={f.name} autoFocus placeholder="e.g. Nordavind Telecom ASA" onChange={e=>set('name',e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter') submit(); }} />
          </div>
          <div style={appS.fieldRow}>
            <div style={appS.field}>
              <label style={appS.label}>Country</label>
              <select style={appS.input} value={f.country} onChange={e=>set('country',e.target.value)}>
                {COUNTRY_OPTIONS.map(([c,n]) => <option key={c} value={c}>{n}</option>)}
              </select>
            </div>
            <div style={appS.field}>
              <label style={appS.label}>Sector</label>
              <select style={appS.input} value={f.sector} onChange={e=>set('sector',e.target.value)}>
                {SECTOR_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={appS.fieldRow}>
            <div style={appS.field}>
              <label style={appS.label}>Revenue</label>
              <input style={appS.input} value={f.revenue} placeholder="e.g. 12.4B" onChange={e=>set('revenue',e.target.value)} />
            </div>
            <div style={appS.field}>
              <label style={appS.label}>Duplicate rate %</label>
              <input style={appS.input} type="number" value={f.duplicates} placeholder="auto" onChange={e=>set('duplicates',e.target.value)} />
            </div>
          </div>
          <div style={appS.field}>
            <label style={appS.label}>Employees <span style={{ textTransform:'none', color:'var(--ink-3)' }}>· optional</span></label>
            <input style={appS.input} value={f.employees} placeholder="auto from revenue" onChange={e=>set('employees',e.target.value)} />
          </div>
          <div style={appS.field}>
            <label style={appS.label}>Systems of record <span style={{ textTransform:'none', color:'var(--ink-3)' }}>· comma-separated</span></label>
            <input style={appS.input} value={f.systems} placeholder="SAP S/4HANA, Salesforce, Legacy ERP" onChange={e=>set('systems',e.target.value)} />
          </div>
          <div style={{ display:'flex', gap:10, marginTop:6 }}>
            <button onClick={submit} style={{ flex:1, padding:'10px', fontSize:13, background:'var(--ink)', color:'var(--panel)', border:'none', borderRadius:8, fontWeight:600 }}>Synthesize account →</button>
            <button onClick={onCancel} style={{ padding:'10px 16px', fontSize:13, background:'transparent', color:'var(--ink)', border:'1px solid var(--line)', borderRadius:8 }}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SideRail({ accounts, selectedId, onSelect, query, setQuery, onAdd, onRemove }) {
  const q = query.trim().toLowerCase();
  const filtered = q ? accounts.filter(a => (a.name+' '+a.sector+' '+a.country).toLowerCase().includes(q)) : accounts;
  return (
    <div style={appS.rail}>
      <div style={appS.brand}>
        <div style={appS.brandMark}>N</div>
        <div>
          <div style={appS.brandText}>Nordic Sales Desk</div>
          <div style={appS.brandSub}>MDM · region SE/NO/DK/FI/IS</div>
        </div>
      </div>
      <div style={appS.nav}>
        {[{ i:'◧', l:'Dashboard' },{ i:'◉', l:'Accounts', active:true },{ i:'◇', l:'Opportunities' },{ i:'◐', l:'Agent runs' },{ i:'☰', l:'Playbooks' }].map(item => (
          <div key={item.l} style={{ ...appS.navItem, ...(item.active?appS.navItemActive:{}) }}>
            <span style={appS.navIcon}>{item.i}</span>{item.l}
          </div>
        ))}
      </div>
      <div style={appS.listHead}>
        <div style={appS.listLabel}>Accounts</div>
        <div style={appS.listAside}>{filtered.length} of {accounts.length}</div>
      </div>
      <div style={appS.searchWrap}>
        <input style={appS.search} value={query} placeholder="Search or add any account…" onChange={e=>setQuery(e.target.value)} />
        {q && filtered.length === 0 && (
          <button style={appS.addBtn} onClick={() => onAdd(query.trim())}>+ Add “{query.trim()}” as a new account</button>
        )}
        {!q && (
          <button style={appS.addBtn} onClick={() => onAdd('')}>+ New account</button>
        )}
      </div>
      <div style={appS.acctList}>
        {filtered.map(a => (
          <div key={a.id}
            style={{ ...appS.acctRow, ...(a.id===selectedId?appS.acctRowActive:{}) }}
            onClick={() => onSelect(a.id)}
            onMouseEnter={e => { if (a.id!==selectedId) e.currentTarget.style.background='var(--bg)'; }}
            onMouseLeave={e => { if (a.id!==selectedId) e.currentTarget.style.background='transparent'; }}>
            <span style={appS.acctFlag}>{a.flag}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={appS.acctName}>
                <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.name}</span>
                {a.synthetic && <span style={appS.newTag}>new</span>}
              </div>
              <div style={appS.acctMeta}>{a.opportunityValue || a.sector}</div>
            </div>
            {a.synthetic
              ? <button title="Remove" onClick={e => { e.stopPropagation(); onRemove(a.id); }} style={{ ...appS.acctScore, cursor:'pointer', color:'var(--ink-3)', border:'none' }}>✕</button>
              : <div style={{ ...appS.acctScore, color:a.opportunity>80?'var(--ok)':a.opportunity>60?'var(--warn)':'var(--ink-2)' }}>{a.opportunity}</div>}
          </div>
        ))}
      </div>
      <div style={appS.railFoot}><span>Mikael Lindqvist</span><span className="mono">SE · Stockholm</span></div>
    </div>
  );
}

const CUSTOM_KEY = 'mdm_custom_accounts_v1';
function loadCustom() { try { return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || []; } catch (e) { return []; } }
function saveCustom(list) { localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); }

function App() {
  const [tweaks, setTweak] = window.useTweaks(window.__TWEAK_DEFAULTS);
  const [custom, setCustom] = React.useState(loadCustom);
  const accounts = React.useMemo(() => {
    const seen = new Set();
    return [...custom, ...window.MDM.ACCOUNTS].filter(a => (seen.has(a.id) ? false : (seen.add(a.id), true)));
  }, [custom]);
  const [selectedId, setSelectedId] = React.useState('saga');
  const [tab, setTab] = React.useState('Overview');
  const [query, setQuery] = React.useState('');
  const [adding, setAdding] = React.useState(null); // null | string (prefill name)
  const account = accounts.find(a => a.id === selectedId) || accounts[0];

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.setAttribute('data-density', tweaks.density);
    document.documentElement.style.setProperty('--accent', tweaks.accent || '#6a3df5');
  }, [tweaks.theme, tweaks.density, tweaks.accent]);

  const createAccount = acct => {
    setCustom(prev => {
      const next = [acct, ...prev.filter(a => a.id !== acct.id)];
      saveCustom(next); return next;
    });
    setSelectedId(acct.id); setTab('Overview'); setQuery(''); setAdding(null);
  };
  const removeAccount = id => {
    setCustom(prev => { const next = prev.filter(a => a.id !== id); saveCustom(next); return next; });
    if (selectedId === id) setSelectedId('saga');
  };

  return (
    <div style={appS.shell}>
      <SideRail accounts={accounts} selectedId={account && account.id} query={query} setQuery={setQuery}
        onSelect={id => { setSelectedId(id); setTab('Overview'); }}
        onAdd={name => setAdding(name)} onRemove={removeAccount} />
      <Record account={account} tab={tab} setTab={setTab} />
      <AgentPanel persona={tweaks.persona} account={account} key={(account && account.id) + tweaks.persona} />
      {adding !== null && <AddAccountForm initialName={adding} onCancel={() => setAdding(null)} onCreate={createAccount} />}
      {ReactDOM.createPortal(
        <window.TweaksPanel>
          <window.TweakSection label="Agent">
            <window.TweakRadio label="Persona" value={tweaks.persona}
              options={[{ value:'consultative', label:'Consultative' },{ value:'analytical', label:'Analytical' },{ value:'opinionated', label:'Opinionated' }]}
              onChange={v => setTweak('persona', v)} />
          </window.TweakSection>
          <window.TweakSection label="Appearance">
            <window.TweakRadio label="Theme" value={tweaks.theme}
              options={[{ value:'light', label:'Light' },{ value:'dark', label:'Dark' }]}
              onChange={v => setTweak('theme', v)} />
            <window.TweakRadio label="Density" value={tweaks.density}
              options={[{ value:'comfortable', label:'Comfortable' },{ value:'compact', label:'Compact' }]}
              onChange={v => setTweak('density', v)} />
            <window.TweakColor label="Accent" value={tweaks.accent}
              options={['#6a3df5','#3858d6','#2f7a4d','#c2510a']}
              onChange={v => setTweak('accent', v)} />
          </window.TweakSection>
        </window.TweaksPanel>,
        document.body
      )}
    </div>
  );
}

window.App = App;
