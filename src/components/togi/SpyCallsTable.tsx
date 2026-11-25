"use client";

import { useEffect, useState } from "react";
import snapshotJson from "@/data/togiSnapshot.json";
import { fmtDate } from "@/components/togi/renderTogi";
import { isTogiData, loadTogiData, xPostUrl, type TogiData, type TogiSource } from "@/lib/togi";
import { postedText, spyPnlText, spyTrades } from "@/lib/togiSpy";

if (!isTogiData(snapshotJson)) throw new Error("Togi Tracker snapshot does not match the expected shape");
const SNAPSHOT: TogiData = snapshotJson;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * SPY rows from the bundled snapshot on first paint (including the static export),
 * then the live feed when it loads. Columns are feed fields only.
 */
export function SpyCallsTable() {
  const [data, setData] = useState<TogiData>(SNAPSHOT);
  const [source, setSource] = useState<"pending" | TogiSource>("pending");

  useEffect(() => {
    let cancelled = false;
    loadTogiData(SNAPSHOT).then(({ data: next, source: nextSource }) => {
      if (!cancelled) {
        setData(next);
        setSource(nextSource);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = spyTrades(data.trades);
  const asOf = data.meta.last_updated;
  const sourceNote =
    source === "live" ? " · live feed" : source === "snapshot" ? " · saved snapshot (live feed unavailable)" : "";

  return (
    <section className="spy-trades" aria-labelledby="spy-trades-title">
      <h2 id="spy-trades-title">SPY trades</h2>
      <p className="spy-updated">
        Last updated <time dateTime={asOf}>{fmtDate(asOf)}</time>
        {sourceNote}
      </p>
      <p className="spy-count">
        Showing {rows.length} SPY {rows.length === 1 ? "trade" : "trades"}
      </p>
      {rows.length === 0 ? (
        <p className="spy-empty">The loaded feed has no trades tagged SPY.</p>
      ) : (
        <div className="spy-table-wrap">
          <table className="spy-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Direction</th>
                <th scope="col">Result</th>
                <th scope="col">Details</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((trade, index) => {
                const sourceUrl = xPostUrl(trade.source_url);
                return (
                  <tr key={`${trade.date}-${trade.source_url}-${index}`}>
                    <td data-label="Date">{fmtDate(trade.date)}</td>
                    <td data-label="Type">{postedText(trade.type)}</td>
                    <td data-label="Direction">{postedText(trade.direction)}</td>
                    <td data-label="Result">
                      <span className="spy-outcome">{postedText(trade.outcome)}</span>
                      <span className="spy-pnl tabular">{spyPnlText(trade)}</span>
                    </td>
                    <td data-label="Details">
                      <p>{trade.details}</p>
                      {trade.note?.trim() ? <p className="spy-note">Note: {trade.note}</p> : null}
                    </td>
                    <td data-label="Source">
                      {sourceUrl ? (
                        <a className="spy-source" href={sourceUrl} {...ext}>
                          Source post
                        </a>
                      ) : (
                        "not disclosed"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > 0 ? (
        <p className="spy-caption">Date, type, direction, outcome, P&amp;L, details, and source are the fields on the feed. Strike, expiry, and entry price are not stored separately.</p>
      ) : null}
    </section>
  );
}
