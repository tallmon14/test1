/* ── RECORD ── */
const rS = {
  wrap: { flex:1, minWidth:0, display:'flex', flexDirection:'column', background:'var(--panel)', borderRight:'1px solid var(--line)', overflow:'hidden' },
  topbar: { height:48, display:'flex', alignItems:'center', padding:'0 18px', borderBottom:'1px solid var(--line)', fontSize:12, color:'var(--ink-3)', gap:6 },
  crumb: { display:'flex', alignItems:'center', gap:6 },
  crumbActive: { color:'var(--ink)', fontWeight:500 },
  hero: { padding:'22px 28px 18px', borderBottom:'1px solid var(--line)', display:'flex', gap:20, alignItems:'flex-start' },
  monogram: { width:56, height:56, background:'linear-gradient(135deg, #14110d 0%, #4b463e 100%)', color:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Fraunces, serif', fontSize:26, fontWeight:500, letterSpacing:'-0.5px' },
  title: { fontSize:22, fontWeight:600, letterSpacing:'-0.2px', marginBottom:4, display:'flex', alignItems:'center', gap:10 },
  flag: { fontSize:18 },
  sub: { fontSize:12.5, color:'var(--ink-2)', display:'flex', gap:14, flexWrap:'wrap' },
  subDot: { color:'var(--ink-3)' },
  kpis: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, borderBottom:'1px solid var(--line)' },
  kpi: { padding:'16px 22px', borderRight:'1px solid var(--line)' },
  kpiLabel: { fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--ink-3)', marginBottom:6, fontWeight:500 },
  kpiValue: { fontSize:20, fontWeight:600, letterSpacing:'-0.3px' },
  kpiSub: { fontSize:11.5, color:'var(--ink-2)', marginTop:2 },
  tabs: { display:'flex', gap:0, borderBottom:'1px solid var(--line)', padding:'0 22px' },
  tab: { padding:'12px 14px', background:'none', border:'none', borderBottom:'2px solid transparent', color:'var(--ink-2)', fontSize:12.5, fontWeight:500 },
  tabActive: { color:'var(--ink)', borderBottomColor:'var(--accent)' },
  body: { flex:1, overflow:'auto', padding:'20px 22px 60px' },
  section: { marginBottom:22 },
  sectionHead: { display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10 },
  sectionTitle: { fontSize:11.5, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink-3)', fontWeight:600 },
  sectionAside: { fontSize:11, color:'var(--ink-3)', fontFamily:'JetBrains Mono, monospace' },
  card: { background:'var(--panel)', border:'1px solid var(--line)', borderRadius:'var(--radius)', overflow:'hidden' },
  row: { display:'grid', gridTemplateColumns:'160px 1fr', padding:'10px 14px', fontSize:12.5, borderBottom:'1px solid var(--line-2)', alignItems:'baseline' },
  rowLabel: { color:'var(--ink-3)', fontSize:11.5 },
  rowValue: { color:'var(--ink)' },
  pill: { display:'inline-flex', alignItems:'center', gap:5, padding:'2px 7px', fontSize:10.5, borderRadius:4, fontWeight:500, border:'1px solid var(--line)' },
  signal: { display:'grid', gridTemplateColumns:'52px 1fr auto', padding:'11px 14px', fontSize:12.5, borderBottom:'1px solid var(--line-2)', gap:12, alignItems:'start' },
  signalTag: { fontSize:9.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--ink-2)', background:'var(--line-2)', padding:'3px 6px', borderRadius:4, fontWeight:600, textAlign:'center', height:'fit-content' },
  signalSource: { fontSize:10.5, color:'var(--ink-3)', fontFamily:'JetBrains Mono, monospace', whiteSpace:'nowrap' },
  health: { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12, marginBottom:12 },
  healthCard: { padding:14, border:'1px solid var(--line)', borderRadius:'var(--radius)', background:'var(--panel)' },
  bigNum: { fontSize:26, fontWeight:700, letterSpacing:'-1px', fontFamily:'Fraunces, serif' },
  bigNumUnit: { fontSize:13, fontWeight:500, color:'var(--ink-3)', marginLeft:2 },
  stakeRow: { display:'grid', gridTemplateColumns:'36px 1fr 90px 80px', padding:'12px 14px', gap:12, alignItems:'center', borderBottom:'1px solid var(--line-2)', fontSize:12.5 },
  avatar: { width:32, height:32, borderRadius:'50%', background:'var(--accent-soft)', color:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600, letterSpacing:'0.02em' },
  bar: { height:4, borderRadius:2, background:'var(--line)', overflow:'hidden', position:'relative' },
  barFill: { height:'100%', background:'var(--ink)' },
  ribbon: { background:'linear-gradient(180deg, #fffceb 0%, #fff8d6 100%)', border:'1px solid #f0dca0', borderRadius:8, padding:'10px 14px', fontSize:12, color:'#6a4d09', display:'flex', alignItems:'center', gap:10, marginBottom:14 }
};

function HealthBar({ value, max = 100, color = 'var(--ink)' }) {
  return <div style={rS.bar}><div style={{ ...rS.barFill, width:`${(value/max)*100}%`, background:color }} /></div>;
}
function SentimentDot({ s }) {
  const c = s === 'warm' ? 'var(--ok)' : s === 'cold' ? 'var(--bad)' : 'var(--ink-3)';
  return <span style={{ width:7, height:7, borderRadius:'50%', background:c, display:'inline-block' }} />;
}
function Pill({ tone = 'neutral', children }) {
  const t = { neutral:{background:'var(--line-2)',color:'var(--ink-2)',borderColor:'var(--line)'}, ok:{background:'var(--ok-soft)',color:'var(--ok)',borderColor:'transparent'}, warn:{background:'var(--warn-soft)',color:'var(--warn)',borderColor:'transparent'}, bad:{background:'var(--bad-soft)',color:'var(--bad)',borderColor:'transparent'}, accent:{background:'var(--accent-soft)',color:'var(--accent)',borderColor:'transparent'} };
  return <span style={{ ...rS.pill, ...t[tone] }}>{children}</span>;
}

const ACCT_NUMS = { saga:'SE-0048221', fjord:'NO-0093142', aurora:'SE-0071834', kalmar:'FI-0058967', borg:'DK-0036412', vatna:'IS-0012847' };

function Topbar({ account }) {
  return (
    <div style={rS.topbar}>
      <span style={rS.crumb}>Sales · Nordic Region</span>
      <span style={{ color:'var(--ink-3)' }}>›</span>
      <span style={rS.crumb}>Accounts</span>
      <span style={{ color:'var(--ink-3)' }}>›</span>
      <span style={{ ...rS.crumb, ...rS.crumbActive }}>{account.name}</span>
      <div style={{ marginLeft:'auto', display:'flex', gap:14, alignItems:'center', color:'var(--ink-3)' }}>
        <span className="mono" style={{ fontSize:11 }}>Acct #{ACCT_NUMS[account.id] || account.id}</span>
        <span style={{ width:1, height:14, background:'var(--line)' }} />
        <span>ML</span>
      </div>
    </div>
  );
}

function Hero({ account }) {
  const mono = account.name.slice(0, 2);
  return (
    <div style={rS.hero}>
      <div style={rS.monogram}>{mono}</div>
      <div style={{ flex:1 }}>
        <div style={rS.title}>
          <span style={rS.flag}>{account.flag}</span>
          {account.name}
          <Pill tone="accent">{account.stage}</Pill>
        </div>
        <div style={rS.sub}>
          <span>{account.sector}</span><span style={rS.subDot}>·</span>
          <span>{account.hq}</span><span style={rS.subDot}>·</span>
          <span>{account.relationship}</span>
        </div>
        <div style={{ ...rS.sub, marginTop:6 }}>
          <span className="mono" style={{ color:'var(--ink-3)' }}>parent</span><span>{account.parent}</span>
          <span style={rS.subDot}>·</span>
          <span className="mono" style={{ color:'var(--ink-3)' }}>subs</span><span>{account.subsidiaries}</span>
          <span style={rS.subDot}>·</span>
          <span className="mono" style={{ color:'var(--ink-3)' }}>owner</span><span>{account.owner}</span>
        </div>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end' }}>
        <button style={{ padding:'7px 12px', fontSize:12, background:'var(--ink)', color:'var(--panel)', border:'none', borderRadius:6, fontWeight:500 }}>+ Log activity</button>
        <button style={{ padding:'7px 12px', fontSize:12, background:'transparent', color:'var(--ink)', border:'1px solid var(--line)', borderRadius:6, fontWeight:500 }}>Edit record</button>
      </div>
    </div>
  );
}

function KPIs({ account }) {
  return (
    <div style={rS.kpis}>
      <div style={rS.kpi}>
        <div style={rS.kpiLabel}>Revenue (FY24)</div>
        <div style={rS.kpiValue}>{account.revenue}</div>
        <div style={rS.kpiSub}>{account.employees} employees</div>
      </div>
      <div style={rS.kpi}>
        <div style={rS.kpiLabel}>Opportunity score</div>
        <div style={rS.kpiValue}>{account.opportunity}<span style={rS.bigNumUnit}>/100</span></div>
        <div style={rS.kpiSub}>{account.opportunityValue} · upside</div>
      </div>
      <div style={rS.kpi}>
        <div style={rS.kpiLabel}>Relationship health</div>
        <div style={{ ...rS.kpiValue, color:'var(--ok)' }}>{account.health}<span style={{ ...rS.bigNumUnit, color:'var(--ink-3)' }}>/100</span></div>
        <div style={rS.kpiSub}>Last touch · 8 days ago</div>
      </div>
      <div style={{ ...rS.kpi, borderRight:'none' }}>
        <div style={rS.kpiLabel}>Data quality (MDM)</div>
        <div style={{ ...rS.kpiValue, color:'var(--bad)' }}>{account.dataHealth.score}<span style={{ ...rS.bigNumUnit, color:'var(--ink-3)' }}>/100</span></div>
        <div style={rS.kpiSub}>{account.dataHealth.duplicates}% duplicates detected</div>
      </div>
    </div>
  );
}

function BusinessCase({ account }) {
  const { currency = 'SEK', investment: invRows, benefits: benRows, paybackMonths } = account.roi;
  const investment = { label: 'Investment', rows: invRows };
  const benefits = { label: 'Benefit', rows: benRows };
  const sum = (rows, col) => rows.reduce((s, r) => s + r[col], 0);
  const investTotals = [1,2,3].map(i => sum(investment.rows, i));
  const benefitTotals = [1,2,3].map(i => sum(benefits.rows, i));
  const netTotals = benefitTotals.map((b, i) => b - investTotals[i]);
  const cumNet = netTotals.reduce((a, b) => a + b, 0);
  const cumInvest = investTotals.reduce((a, b) => a + b, 0);
  const cumBenefit = benefitTotals.reduce((a, b) => a + b, 0);
  const roi = Math.round((cumNet / cumInvest) * 100);
  const max = Math.max(...investTotals, ...benefitTotals);
  const chartH = 90;
  const hl = { display:'grid', gridTemplateColumns:'repeat(4, 1fr)', borderBottom:'1px solid var(--line)' };
  const hc = { padding:'14px 18px', borderRight:'1px solid var(--line)' };
  const th = { textAlign:'right', padding:'8px 14px', fontSize:10.5, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--ink-3)', fontWeight:600, borderBottom:'1px solid var(--line)', background:'var(--line-2)' };
  const td = { padding:'7px 14px', borderBottom:'1px solid var(--line-2)', textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:12 };
  const tdL = { ...td, textAlign:'left', fontFamily:'Inter, sans-serif', color:'var(--ink-2)' };
  const tdT = { ...td, fontWeight:600, color:'var(--ink)' };
  const tdTL = { ...tdL, fontWeight:600, color:'var(--ink)', fontFamily:'Inter, sans-serif' };
  return (
    <div style={rS.card}>
      <div style={hl}>
        <div style={hc}>
          <div style={rS.kpiLabel}>3-yr Net ROI</div>
          <div style={{ ...rS.bigNum, color:'var(--ok)', marginTop:4 }}>{roi}<span style={{ ...rS.bigNumUnit, color:'var(--ink-3)' }}>%</span></div>
          <div style={{ fontSize:11.5, color:'var(--ink-2)' }}>net {currency} {cumNet.toFixed(1)}M</div>
        </div>
        <div style={hc}>
          <div style={rS.kpiLabel}>3-yr TCO</div>
          <div style={{ ...rS.bigNum, marginTop:4 }}>{currency} {cumInvest.toFixed(1)}<span style={rS.bigNumUnit}>M</span></div>
          <div style={{ fontSize:11.5, color:'var(--ink-2)' }}>license + svc + enablement</div>
        </div>
        <div style={hc}>
          <div style={rS.kpiLabel}>3-yr Benefit</div>
          <div style={{ ...rS.bigNum, marginTop:4 }}>{currency} {cumBenefit.toFixed(1)}<span style={rS.bigNumUnit}>M</span></div>
          <div style={{ fontSize:11.5, color:'var(--ink-2)' }}>recovered + avoided</div>
        </div>
        <div style={{ ...hc, borderRight:'none' }}>
          <div style={rS.kpiLabel}>Payback</div>
          <div style={{ ...rS.bigNum, marginTop:4 }}>{paybackMonths}<span style={rS.bigNumUnit}>mo</span></div>
          <div style={{ fontSize:11.5, color:'var(--ink-2)' }}>break-even in FY26</div>
        </div>
      </div>
      <div style={{ padding:'18px 18px 8px', borderBottom:'1px solid var(--line)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
          <div style={rS.kpiLabel}>Annual flow ({currency} M)</div>
          <div style={{ display:'flex', gap:14, fontSize:11, color:'var(--ink-2)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:9, height:9, background:'var(--bad)', borderRadius:2 }} /> Investment</span>
            <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:9, height:9, background:'var(--ok)', borderRadius:2 }} /> Benefit</span>
            <span style={{ display:'flex', alignItems:'center', gap:5 }}><span style={{ width:9, height:2, background:'var(--ink)' }} /> Net</span>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:28 }}>
          {[0,1,2].map(i => (
            <div key={i}>
              <div style={{ display:'flex', gap:8, alignItems:'flex-end', height:chartH, justifyContent:'center' }}>
                <div style={{ width:28, height:`${(investTotals[i]/max)*chartH}px`, background:'var(--bad)', borderRadius:'3px 3px 0 0', position:'relative' }}>
                  <div style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontSize:10, color:'var(--ink-2)', fontFamily:'JetBrains Mono, monospace' }}>{investTotals[i].toFixed(1)}</div>
                </div>
                <div style={{ width:28, height:`${(benefitTotals[i]/max)*chartH}px`, background:'var(--ok)', borderRadius:'3px 3px 0 0', position:'relative' }}>
                  <div style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', fontSize:10, color:'var(--ink-2)', fontFamily:'JetBrains Mono, monospace' }}>{benefitTotals[i].toFixed(1)}</div>
                </div>
              </div>
              <div style={{ textAlign:'center', fontSize:11, color:'var(--ink-3)', marginTop:8, fontFamily:'JetBrains Mono, monospace' }}>
                Y{i+1} · net <span style={{ color:netTotals[i]>=0?'var(--ok)':'var(--bad)', fontWeight:600 }}>{netTotals[i]>=0?'+':''}{netTotals[i].toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
        {[investment, benefits].map((group, gi) => (
          <div key={gi} style={{ borderRight:gi===0?'1px solid var(--line)':'none' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12.5 }}>
              <thead><tr>
                <th style={{ ...th, textAlign:'left', color:gi===0?'var(--bad)':'var(--ok)' }}>{group.label}</th>
                <th style={th}>Y1</th><th style={th}>Y2</th><th style={th}>Y3</th>
              </tr></thead>
              <tbody>
                {group.rows.map((r, ri) => (
                  <tr key={ri}><td style={tdL}>{r[0]}</td><td style={td}>{r[1].toFixed(1)}</td><td style={td}>{r[2].toFixed(1)}</td><td style={td}>{r[3].toFixed(1)}</td></tr>
                ))}
                <tr><td style={tdTL}>Total ({currency} M)</td>{[1,2,3].map(c => <td key={c} style={tdT}>{sum(group.rows, c).toFixed(1)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div style={{ padding:'12px 18px', fontSize:11, color:'var(--ink-3)', background:'var(--line-2)', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span><span className="mono" style={{ color:'var(--ink-2)' }}>Assumptions:</span> {account.dataHealth.duplicates}% duplicate rate, {account.dataHealth.stewardshipHours.toLocaleString()} steward-hr/yr, 0.6% revenue recovery, regulatory avg fine exposure per sector benchmark.</span>
        <button style={{ padding:'4px 9px', fontSize:10.5, background:'transparent', color:'var(--ink-2)', border:'1px solid var(--line)', borderRadius:4 }}>Open in modeler</button>
      </div>
    </div>
  );
}

function OverviewTab({ account }) {
  return (
    <>
      <div style={rS.ribbon}>
        <span style={{ fontSize:14 }}>◆</span>
        <span><b>Agent suggests:</b> Before your next call with {account.stakeholders[0].name}. {account.painpoints.length} painpoints surfaced.</span>
        <span style={{ marginLeft:'auto', fontFamily:'JetBrains Mono', fontSize:10.5 }}>updated 4m ago</span>
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Company details</div><div style={rS.sectionAside}>via Bisnode + Bolagsverket</div></div>
        <div style={rS.card}>
          <div style={rS.row}><div style={rS.rowLabel}>Headquarters</div><div style={rS.rowValue}>{account.hq}</div></div>
          <div style={rS.row}><div style={rS.rowLabel}>Sector</div><div style={rS.rowValue}>{account.sector}</div></div>
          <div style={rS.row}><div style={rS.rowLabel}>Revenue (FY24)</div><div style={rS.rowValue}>{account.revenue} · {account.employees} employees</div></div>
          <div style={rS.row}><div style={rS.rowLabel}>Fiscal year</div><div style={rS.rowValue}>{account.fiscal}</div></div>
          <div style={{ ...rS.row, borderBottom:'none' }}>
            <div style={rS.rowLabel}>Systems of record</div>
            <div style={{ ...rS.rowValue, display:'flex', gap:6, flexWrap:'wrap' }}>{account.systems.map(s => <Pill key={s}>{s}</Pill>)}</div>
          </div>
        </div>
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Signals · last 30 days</div><div style={rS.sectionAside}>{account.signals.length} new · agent-monitored</div></div>
        <div style={rS.card}>
          {account.signals.map((s, i) => (
            <div key={i} style={{ ...rS.signal, borderBottom:i===account.signals.length-1?'none':'1px solid var(--line-2)' }}>
              <div style={rS.signalTag}>{s.tag}</div>
              <div>{s.text}</div>
              <div style={rS.signalSource}>{s.source}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Buying committee</div><div style={rS.sectionAside}>{account.stakeholders.length} mapped</div></div>
        <div style={rS.card}>
          {account.stakeholders.map((p, i) => (
            <div key={p.name} style={{ ...rS.stakeRow, borderBottom:i===account.stakeholders.length-1?'none':'1px solid var(--line-2)' }}>
              <div style={rS.avatar}>{p.initials}</div>
              <div>
                <div style={{ fontWeight:500 }}>{p.name}</div>
                <div style={{ fontSize:11.5, color:'var(--ink-3)' }}>{p.title}</div>
                <div style={{ fontSize:11.5, color:'var(--ink-2)', marginTop:4 }}>{p.note}</div>
              </div>
              <div>
                <div style={{ fontSize:10.5, color:'var(--ink-3)', marginBottom:4 }}>Influence {p.influence}</div>
                <HealthBar value={p.influence} color="var(--ink)" />
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11.5, color:'var(--ink-2)' }}>
                <SentimentDot s={p.sentiment} />{p.sentiment}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Data health · MDM diagnostic</div><div style={rS.sectionAside}>last run {account.dataHealth.lastAudit}</div></div>
        <div style={rS.health}>
          <div style={rS.healthCard}>
            <div style={rS.kpiLabel}>Duplicate rate</div>
            <div style={{ ...rS.bigNum, color:'var(--bad)', marginTop:6 }}>{account.dataHealth.duplicates}<span style={rS.bigNumUnit}>%</span></div>
            <div style={{ marginTop:8 }}><HealthBar value={account.dataHealth.duplicates} max={35} color="var(--bad)" /></div>
            <div style={{ fontSize:11, color:'var(--ink-3)', marginTop:6 }}>sector benchmark 6%</div>
          </div>
          <div style={rS.healthCard}>
            <div style={rS.kpiLabel}>Steward hours / yr</div>
            <div style={{ ...rS.bigNum, marginTop:6 }}>{(account.dataHealth.stewardshipHours/1000).toFixed(1)}<span style={rS.bigNumUnit}>k</span></div>
            <div style={{ marginTop:8 }}><HealthBar value={Math.min(92, account.dataHealth.stewardshipHours/36)} color="var(--warn)" /></div>
            <div style={{ fontSize:11, color:'var(--ink-3)', marginTop:6 }}>loaded cost est.</div>
          </div>
          <div style={rS.healthCard}>
            <div style={rS.kpiLabel}>MDM coverage</div>
            <div style={{ ...rS.bigNum, color:'var(--warn)', marginTop:6 }}>{account.dataHealth.mdmCoverage}<span style={rS.bigNumUnit}>%</span></div>
            <div style={{ marginTop:8 }}><HealthBar value={account.dataHealth.mdmCoverage} color="var(--warn)" /></div>
            <div style={{ fontSize:11, color:'var(--ink-3)', marginTop:6 }}>customer + product domains</div>
          </div>
          <div style={rS.healthCard}>
            <div style={rS.kpiLabel}>GDPR readiness</div>
            <div style={{ ...rS.bigNum, color:'var(--bad)', marginTop:6 }}>{account.dataHealth.score >= 70 ? 'B' : account.dataHealth.score >= 50 ? 'C' : 'D'}<span style={rS.bigNumUnit}>{account.dataHealth.score >= 70 ? '+' : account.dataHealth.score >= 50 ? '−' : '−'}</span></div>
            <div style={{ marginTop:8 }}><HealthBar value={account.dataHealth.score} color="var(--bad)" /></div>
            <div style={{ fontSize:11, color:'var(--ink-3)', marginTop:6 }}>DPIA last: {account.dataHealth.lastAudit}</div>
          </div>
        </div>
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Business case · ROI &amp; TCO</div><div style={rS.sectionAside}>3-year · agent-modeled</div></div>
        <BusinessCase account={account} />
      </div>
      <div style={rS.section}>
        <div style={rS.sectionHead}><div style={rS.sectionTitle}>Painpoints surfaced · agent</div><div style={rS.sectionAside}>{account.painpoints.length} active</div></div>
        {account.painpoints.map(p => (
          <div key={p.id} style={{ ...rS.card, marginBottom:10, padding:16 }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:8 }}>
              <Pill tone={p.severity==='critical'?'bad':p.severity==='high'?'warn':'neutral'}>{p.severity}</Pill>
              <div style={{ fontWeight:600, fontSize:13.5, flex:1 }}>{p.title}</div>
            </div>
            <div style={{ fontSize:12.5, color:'var(--ink-2)', marginBottom:10 }}>{p.impact}</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, paddingTop:10, borderTop:'1px solid var(--line-2)' }}>
              <div>
                <div style={{ ...rS.kpiLabel, marginBottom:6 }}>Evidence</div>
                <ul style={{ margin:0, padding:0, listStyle:'none', fontSize:11.5, color:'var(--ink-2)' }}>
                  {p.evidence.map((e, i) => (
                    <li key={i} style={{ display:'flex', gap:6, marginBottom:3 }}>
                      <span className="mono" style={{ color:'var(--ink-3)' }}>{String(i+1).padStart(2,'0')}</span><span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={{ ...rS.kpiLabel, marginBottom:6 }}>Recommended fit</div>
                <div style={{ fontSize:12.5, fontWeight:500 }}>{p.fit.sku}</div>
                <div style={{ fontSize:11.5, color:'var(--ink-2)', marginTop:2 }}>{p.fit.tier} tier · {p.fit.arr} · TTV {p.fit.timeToValue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Record({ account, tab, setTab }) {
  const tabs = ['Overview', 'Activity', 'Opportunities', 'Files', 'Settings'];
  return (
    <div style={rS.wrap}>
      <Topbar account={account} />
      <Hero account={account} />
      <KPIs account={account} />
      <div style={rS.tabs}>
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} style={{ ...rS.tab, ...(tab===t?rS.tabActive:{}) }}>{t}</button>)}
      </div>
      <div style={rS.body}>
        {tab === 'Overview' ? <OverviewTab account={account} /> : (
          <div style={{ padding:40, textAlign:'center', color:'var(--ink-3)', fontSize:13 }}>{tab} view — out of scope for this prototype.</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Record, Pill });
