"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up on mount. Used for the score reveals, where the count is
 * most of the payoff. Respects reduced-motion by jumping straight to the value.
 */
export function CountUp({
  value,
  durationMs = 1000,
  decimals = 0,
  className = "",
  suffix = "",
}: {
  value: number;
  durationMs?: number;
  decimals?: number;
  className?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || durationMs <= 0) {
      frameRef.current = requestAnimationFrame(() => setDisplay(value));
      return () => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      };
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutExpo: fast climb, gentle settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, durationMs]);

  return (
    <span className={`tabular ${className}`}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
