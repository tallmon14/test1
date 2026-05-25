import { BUSINESS_CASE } from "../data";

const YEARS = [0, 1, 2] as const;

function totals(rows: { years: number[] }[]): number[] {
  return YEARS.map((y) => rows.reduce((sum, r) => sum + r.years[y], 0));
}

export function BusinessCase() {
  const { investment, benefit } = BUSINESS_CASE;

  const investTotals = totals(investment.rows);
  const benefitTotals = totals(benefit.rows);
  const netTotals = benefitTotals.map((b, i) => b - investTotals[i]);

  const cumInvest = investTotals.reduce((a, b) => a + b, 0);
  const cumBenefit = benefitTotals.reduce((a, b) => a + b, 0);
  const cumNet = cumBenefit - cumInvest;
  const roi = Math.round((cumNet / cumInvest) * 100);

  const max = Math.max(...investTotals, ...benefitTotals);
  const chartH = 90;
  const groups = [investment, benefit];

  return (
    <div className="card">
      {/* Headline KPIs */}
      <div className="bizcase__headline">
        <div className="bizcase__headline-cell">
          <div className="kpi__label">3-yr Net ROI</div>
          <div className="big-num" style={{ color: "var(--ok)", marginTop: 4 }}>
            {roi}
            <span className="big-num__unit">%</span>
          </div>
          <div className="kpi__sub">net SEK {cumNet.toFixed(1)}M</div>
        </div>
        <div className="bizcase__headline-cell">
          <div className="kpi__label">3-yr TCO</div>
          <div className="big-num" style={{ marginTop: 4 }}>
            SEK {cumInvest.toFixed(1)}
            <span className="big-num__unit">M</span>
          </div>
          <div className="kpi__sub">license + svc + enablement</div>
        </div>
        <div className="bizcase__headline-cell">
          <div className="kpi__label">3-yr Benefit</div>
          <div className="big-num" style={{ marginTop: 4 }}>
            SEK {cumBenefit.toFixed(1)}
            <span className="big-num__unit">M</span>
          </div>
          <div className="kpi__sub">recovered + avoided</div>
        </div>
        <div className="bizcase__headline-cell">
          <div className="kpi__label">Payback</div>
          <div className="big-num" style={{ marginTop: 4 }}>
            11<span className="big-num__unit">mo</span>
          </div>
          <div className="kpi__sub">break-even in FY26 Q3</div>
        </div>
      </div>

      {/* Annual flow chart */}
      <div className="bizcase__chart">
        <div className="bizcase__chart-head">
          <div className="kpi__label">Annual flow (SEK M)</div>
          <div className="bizcase__legend">
            <span>
              <span style={{ width: 9, height: 9, background: "var(--bad)", borderRadius: 2 }} />{" "}
              Investment
            </span>
            <span>
              <span style={{ width: 9, height: 9, background: "var(--ok)", borderRadius: 2 }} />{" "}
              Benefit
            </span>
            <span>
              <span style={{ width: 9, height: 2, background: "var(--ink)" }} /> Net
            </span>
          </div>
        </div>
        <div className="bizcase__bars">
          {YEARS.map((i) => (
            <div key={i}>
              <div className="bizcase__year-bars">
                <div
                  className="bizcase__bar"
                  style={{
                    height: `${(investTotals[i] / max) * chartH}px`,
                    background: "var(--bad)",
                  }}
                >
                  <div className="bizcase__bar-label">{investTotals[i].toFixed(1)}</div>
                </div>
                <div
                  className="bizcase__bar"
                  style={{
                    height: `${(benefitTotals[i] / max) * chartH}px`,
                    background: "var(--ok)",
                  }}
                >
                  <div className="bizcase__bar-label">{benefitTotals[i].toFixed(1)}</div>
                </div>
              </div>
              <div className="bizcase__year-label">
                Y{i + 1} · net{" "}
                <span
                  style={{
                    color: netTotals[i] >= 0 ? "var(--ok)" : "var(--bad)",
                    fontWeight: 600,
                  }}
                >
                  {netTotals[i] >= 0 ? "+" : ""}
                  {netTotals[i].toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized tables */}
      <div className="bizcase__tables">
        {groups.map((group, gi) => (
          <div key={group.label} className="bizcase__table-wrap">
            <table className="bizcase__table">
              <thead>
                <tr>
                  <th style={{ color: gi === 0 ? "var(--bad)" : "var(--ok)" }}>{group.label}</th>
                  <th>Y1</th>
                  <th>Y2</th>
                  <th>Y3</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    {YEARS.map((y) => (
                      <td key={y}>{r.years[y].toFixed(1)}</td>
                    ))}
                  </tr>
                ))}
                <tr className="is-total">
                  <td>Total (SEK M)</td>
                  {totals(group.rows).map((t, i) => (
                    <td key={i}>{t.toFixed(1)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <div className="bizcase__foot">
        <span>
          <span className="mono" style={{ color: "var(--ink-2)" }}>
            Assumptions:
          </span>{" "}
          18.2% duplicate rate, 1,840 steward-hr/yr at SEK 1.3k loaded, 0.6% revenue recovery,
          Datainspektionen avg fine SEK 4.1M.
        </span>
        <button type="button" className="btn--mini">
          Open in modeler
        </button>
      </div>
    </div>
  );
}
