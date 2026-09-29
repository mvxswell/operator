"use client";

import { useEffect, useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_PRESENCE_URL;
const VISITOR_KEY = "operator.presence.visitor.v1";
const UPDATE_MS = 60_000;

function visitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing)) return existing;
    const id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function OnlineNow() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!ENDPOINT) return;
    const id = visitorId();
    const controller = new AbortController();
    let busy = false;

    async function update() {
      if (document.visibilityState !== "visible" || busy) return;
      busy = true;
      try {
        const response = await fetch(ENDPOINT!, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: id,
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Presence service returned ${response.status}`);
        const data: unknown = await response.json();
        const value = (data as { count?: unknown }).count;
        setCount(typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null);
      } catch {
        if (!controller.signal.aborted) setCount(null);
      } finally {
        busy = false;
      }
    }

    void update();
    const interval = window.setInterval(() => { void update(); }, UPDATE_MS);
    document.addEventListener("visibilitychange", update);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  if (count === null) return null;
  return <span className="shrink-0 whitespace-nowrap rounded-full border border-pos/20 bg-pos-soft/30 px-2.5 py-1.5 text-[11px] font-medium text-pos" aria-label={`${count} online now`}>
    <span aria-hidden="true" className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-pos" />
    {count} online
  </span>;
}
