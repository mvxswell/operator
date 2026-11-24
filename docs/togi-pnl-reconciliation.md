# TOGI P&L reconciliation — November 24, 2026

The latest [“3 month options PnL” post](https://x.com/ShaneStoffer/status/2125267313071104429) shows Robinhood Investing with 3M selected: **+$223,889.42 past three months**, **$94,222.62 account balance**, and **$13,882.80 buying power**. The original attached screenshot was visually checked. This is the account chart return; the caption does not establish an options-only realized total.

Use the live feed’s `portfolio.accounts[id=robinhood].period_change_3m`, date, balance and source from the same account record. Do not infer a percentage, a daily change, or a starting deposit from these figures. Hide the new card if the evidence is missing, malformed or marked historical. Offline mode continues using the untouched bundled snapshot.

[Robinhood’s chart methodology](https://robinhood.com/us/en/support/articles/using-the-charts/) says external money movements are excluded from portfolio returns. Do not add wires or transfers to profit, subtract transfers as losses, or sum broker return with trade receipts. The partial closed-trade tally is retained, relabelled, and excluded from the broker figure.

The [self-reported “losing the 700k” post](https://x.com/ShaneStoffer/status/2124901951133393202) does not establish exact realized loss or period. Preserve the attributed note; do not deduct it again from the later broker return. The earlier [November 17 realized P&L screenshot](https://x.com/ShaneStoffer/status/2122762728767127845) has different periods and measures, so subtracting its YTD realized total from the newer 3M account return would not yield a reliable loss estimate.

The last Fidelity balance remains dated November 11. It is not added to the November 24 Robinhood balance or presented as a verified current combined portfolio. No all-account net P&L can be reconstructed reliably from these partial receipts.

Frontend fixes also accept explicitly undisclosed daily Robinhood metrics and quote-only position updates. A quote without position size preserves the older dated position valuation and both source links. No Worker, backend record, trade record, snapshot, or other page is changed.
