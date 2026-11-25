import type { TogiTrade } from "./togi";

/** Ticker match for the SPY page. SPXW and other symbols are a different product. */
export function isSpyTicker(ticker: unknown): boolean {
  return typeof ticker === "string" && ticker.trim().toUpperCase() === "SPY";
}

/**
 * Trades the feed tags as SPY, newest first. Same-day rows keep their feed order.
 * Does not read details text, so a post that only mentions SPY in prose is not added.
 */
export function spyTrades(trades: readonly TogiTrade[]): TogiTrade[] {
  return trades
    .map((trade, index) => ({ trade, index }))
    .filter(({ trade }) => isSpyTicker(trade.ticker))
    .sort((a, b) => b.trade.date.localeCompare(a.trade.date) || a.index - b.index)
    .map(({ trade }) => trade);
}

/** Posted text, or the tracker's existing phrase when the feed left the field blank. */
export function postedText(value: string | undefined): string {
  const text = value?.trim();
  return text ? text : "not disclosed";
}

/** Currency for a posted P&L. Null means the feed has no figure, so the caller must not invent one. */
export function formatSpyPnl(pnl: number | null): string | null {
  if (pnl == null || !Number.isFinite(pnl)) return null;
  const digits = Number.isInteger(pnl) ? 0 : 2;
  const abs = Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return `${pnl < 0 ? "-" : ""}$${abs}`;
}

/** Result figure from `pnl` only. A missing figure stays "P&L not disclosed". */
export function spyPnlText(trade: Pick<TogiTrade, "pnl" | "pnl_derived">): string {
  const money = formatSpyPnl(trade.pnl);
  if (money == null) return "P&L not disclosed";
  return trade.pnl_derived ? `${money} (derived)` : money;
}
