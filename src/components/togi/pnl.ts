import { isTogiPortfolio, xPostUrl, type TogiData } from "../../lib/togi";

const money = (n: number) => (n < 0 ? "−" : "") + "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Prefer the broker's cash-flow-adjusted return to an incomplete sum of public trades.
 * No balances, transfers, self-reported losses or other accounts are added/subtracted.
 * The period, balance and receipt must come from the same validated account record.
 */
export function renderBrokerPnlHtml(data: TogiData): string | null {
  if (!isTogiPortfolio(data.portfolio)) return null;
  const account = data.portfolio.accounts.find(a => a.id === "robinhood" && a.status === "current");
  if (!account || typeof account.period_change_3m !== "number") return null;
  const source = xPostUrl(account.source_url);
  if (!source) return null;
  const value = account.period_change_3m;
  const date = new Date(account.as_of + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `<div class="pnl-return"><p class="eyebrow">Robinhood · broker-reported</p><h2>Past 3 months P&amp;L</h2><p class="pnl-amount ${value >= 0 ? "pos" : "neg"}">${value > 0 ? "+" : ""}${money(value)}</p><a href="${source}" target="_blank" rel="noopener noreferrer">Posted ${date} · screenshot ↗</a></div>
    <div class="pnl-balance"><p class="lbl">Same screenshot · account balance</p><p class="pnl-amount">${money(account.total_value)}</p><p class="fine">The balance is what remains in the account. It is different from profit earned over the period.</p></div>
    <details class="pnl-method"><summary>How we reconcile the P&amp;L</summary><p>We use the return shown on his Robinhood Investing 3M chart, rather than adding selected trade wins. It covers this Robinhood account over the displayed three-month window; it is not a verified options-only realized total or an all-time result.</p><p>Robinhood says external deposits, withdrawals and transfers are excluded from portfolio returns. We do not count wires as profit, transfers as losses, or subtract the self-reported ~$700K again. Open-position marks and closed-trade profits measure different things.</p><p>Fidelity’s latest posted balance is dated ${new Date(data.meta.latest_value_date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}. We keep it separate: different dates and transfers mean there is no defensible combined current balance or all-account P&amp;L. Unknown daily and closed-trade results stay undisclosed.</p><p><a href="https://robinhood.com/us/en/support/articles/using-the-charts/" target="_blank" rel="noopener noreferrer">Robinhood’s return methodology ↗</a> · Public screenshots are partial evidence, not audited statements.</p></details>`;
}
