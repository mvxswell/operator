"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type Token = number | "+" | "-" | "*" | "/" | "%" | "(" | ")";

const KEYS = [
  "C", "(", ")", "⌫",
  "7", "8", "9", "÷",
  "4", "5", "6", "×",
  "1", "2", "3", "−",
  "0", ".", "%", "+",
] as const;

export function Calculator() {
  const [open, setOpen] = useState(false);
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const expressionRef = useRef<HTMLInputElement>(null);
  const controlsId = useId();

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const update = () => document.documentElement.style.setProperty("--calculator-height", `${mobile.matches ? Math.ceil(panelRef.current?.getBoundingClientRect().height ?? 52) : 0}px`);
    const observer = new ResizeObserver(update);
    if (panelRef.current) observer.observe(panelRef.current);
    mobile.addEventListener("change", update);
    update();
    return () => { observer.disconnect(); mobile.removeEventListener("change", update); document.documentElement.style.removeProperty("--calculator-height"); };
  }, []);

  function close() { setOpen(false); toggleRef.current?.focus(); }

  const display = useMemo(() => expression || result || "0", [expression, result]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        close();
        return;
      }
      if (!panelRef.current?.contains(document.activeElement)) return;
      // Native inputs handle editing; Enter still evaluates. Buttons retain
      // their normal Enter activation (including Close and Collapse).
      if (event.target === expressionRef.current && event.key !== "Enter" && event.key !== "=") return;
      if (event.key === "Enter" && event.target instanceof HTMLButtonElement) return;
      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        event.stopImmediatePropagation();
        calculate();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        event.stopImmediatePropagation();
        setExpression((value) => value.slice(0, -1));
        return;
      }
      if (/^[0-9.+\-*/%()]$/.test(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        append(event.key);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  });

  function append(value: string) {
    const normalized = value.replace("×", "*").replace("÷", "/").replace("−", "-");
    setResult(null);
    setExpression((current) => (current + normalized).slice(0, 48));
  }

  function calculate() {
    if (!expression) return;
    try {
      const value = evaluate(expression);
      const formatted = Number.isInteger(value)
        ? String(value)
        : String(Number(value.toFixed(8)));
      setHistory((items) => [`${pretty(expression)} = ${formatted}`, ...items].slice(0, 3));
      setExpression(formatted);
      setResult(formatted);
    } catch {
      setResult("Check the expression");
    }
  }

  function press(key: (typeof KEYS)[number]) {
    if (key === "C") {
      setExpression("");
      setResult(null);
    } else if (key === "⌫") {
      setExpression((value) => value.slice(0, -1));
      setResult(null);
    } else {
      append(key);
    }
  }

  return (
    <div ref={panelRef} className="calculator-dock" data-calculator-root data-calculator-open={open ? "true" : "false"}>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => { setOpen((value) => !value); if (!open) requestAnimationFrame(() => expressionRef.current?.focus()); }}
        aria-expanded={open}
        aria-controls={controlsId}
        className="calculator-toggle inline-flex min-h-12 items-center justify-center gap-2 border-accent/35 bg-surface-2 px-4 text-sm font-medium text-ink transition-colors hover:border-accent"
      >
        <CalculatorIcon />
        {open ? "Collapse calculator" : "Calculator"}
      </button>

      {open ? (
        <div
          id={controlsId}
          role="region"
          aria-label="Scratch calculator"
          className="calculator-panel overflow-y-auto border-line bg-surface p-4 shadow-[0_28px_80px_rgba(0,0,0,0.6)]"
        >
          <div className="calculator-header flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Scratch calculator</p>
              <p className="mt-0.5 text-[11px] text-faint">Percent means divide by 100 · e.g. 200 × 10%</p>
            </div>
            <button type="button" onClick={close} className="h-11 w-11 rounded-md text-lg text-muted hover:bg-raised hover:text-ink" aria-label="Close calculator">×</button>
          </div>

          <div className="calculator-display mt-3 rounded-xl border border-line-soft bg-bg px-4 py-3 text-right">
            <p className="min-h-5 truncate font-mono text-xs text-faint">{history[0] ?? "Ready"}</p>
            <label htmlFor={`${controlsId}-expression`} className="sr-only">Calculator expression</label>
            <input ref={expressionRef} id={`${controlsId}-expression`} value={expression} maxLength={48} autoComplete="off" inputMode="decimal" placeholder="0" onChange={(event) => { setExpression(event.target.value); setResult(null); }} className="mt-1 min-h-11 w-full rounded bg-transparent text-right font-mono text-2xl font-semibold text-ink outline-offset-2" />
            <p role="status" aria-label="Calculator display" className={result === "Check the expression" ? "mt-1 text-sm text-neg" : "sr-only"}>
              {result === "Check the expression" ? result : pretty(display)}
            </p>
          </div>

          <div className="calculator-keys mt-3 grid grid-cols-4 gap-2">
            {KEYS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                aria-label={key === "C" ? "Clear" : key === "⌫" ? "Backspace" : key}
                className={`h-11 rounded-lg border text-sm font-medium transition-colors ${/[+×÷−]/.test(key) ? "border-accent/25 bg-accent-soft text-accent hover:border-accent/60" : "border-line bg-surface-2 text-ink hover:bg-raised"}`}
              >
                {key}
              </button>
            ))}
            <button type="button" onClick={calculate} className="col-span-4 h-11 rounded-lg bg-accent text-sm font-semibold text-[#16120a] transition-opacity hover:opacity-90">Calculate</button>
          </div>
          {history.length > 1 ? (
            <div className="calculator-history mt-3 border-t border-line-soft pt-3">
              {history.slice(1).map((item, index) => <p key={`${index}-${item}`} className="truncate font-mono text-[11px] text-faint">{item}</p>)}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <rect x="5" y="2.8" width="14" height="18.4" rx="2.4" />
      <path d="M8 6.5h8v3H8zM8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" strokeLinecap="round" />
    </svg>
  );
}

function pretty(value: string) {
  return value.replaceAll("*", "×").replaceAll("/", "÷").replaceAll("-", "−");
}

function evaluate(input: string): number {
  const tokens = tokenize(input);
  let position = 0;

  function parseExpression(): number {
    let value = parseTerm();
    while (tokens[position] === "+" || tokens[position] === "-") {
      const operator = tokens[position++];
      const right = parseTerm();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  }

  function parseTerm(): number {
    let value = parseFactor();
    while (tokens[position] === "*" || tokens[position] === "/") {
      const operator = tokens[position++];
      const right = parseFactor();
      if (operator === "/" && right === 0) throw new Error("division by zero");
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  }

  function parseFactor(): number {
    let sign = 1;
    if (tokens[position] === "+" || tokens[position] === "-") {
      if (tokens[position++] === "-") sign = -1;
    }
    let value: number;
    const token = tokens[position++];
    if (typeof token === "number") value = token;
    else if (token === "(") {
      value = parseExpression();
      if (tokens[position++] !== ")") throw new Error("missing parenthesis");
    } else throw new Error("expected number");
    while (tokens[position] === "%") {
      position += 1;
      value /= 100;
    }
    return value * sign;
  }

  const value = parseExpression();
  if (position !== tokens.length || !Number.isFinite(value)) throw new Error("invalid expression");
  return value;
}

function tokenize(input: string): Token[] {
  const compact = input.replace(/\s/g, "");
  if (!compact || /[^0-9.+\-*/%()]/.test(compact)) throw new Error("invalid character");
  const tokens: Token[] = [];
  let index = 0;
  while (index < compact.length) {
    const char = compact[index];
    if (/[0-9.]/.test(char)) {
      let end = index + 1;
      while (end < compact.length && /[0-9.]/.test(compact[end])) end += 1;
      const raw = compact.slice(index, end);
      if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw)) throw new Error("invalid number");
      const number = Number(raw);
      if (!Number.isFinite(number)) throw new Error("invalid number");
      tokens.push(number);
      index = end;
    } else {
      tokens.push(char as Token);
      index += 1;
    }
  }
  return tokens;
}
