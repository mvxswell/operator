"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { CATEGORY_MAP } from "@/lib/categories";
import type { CategoryId, DataBlock } from "@/lib/types";

/* --------------------------------- Buttons -------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-40";

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#16120a] hover:brightness-110 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]",
  secondary: "border border-line bg-surface-2 text-ink hover:border-faint hover:bg-raised",
  ghost: "text-muted hover:text-ink hover:bg-surface-2",
};

const BUTTON_SIZE: Record<ButtonSize, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={`${BUTTON_BASE} ${BUTTON_VARIANT[variant]} ${BUTTON_SIZE[size]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${BUTTON_BASE} ${BUTTON_VARIANT[variant]} ${BUTTON_SIZE[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

/* --------------------------------- Surfaces -------------------------------- */

export function Panel({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-line bg-surface ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">{children}</p>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11px] text-muted">
      {children}
    </span>
  );
}

/* ------------------------------- Data display ------------------------------ */

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</p>
      <p className="tabular mt-1 text-2xl font-semibold text-ink sm:text-[28px]">{value}</p>
      {hint ? <p className="mt-0.5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

/** Renders the optional operating-data block attached to a question. */
export function DataTable({ data }: { data: DataBlock }) {
  const hasHeader = Boolean(data.columns?.length);

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-surface-2">
      <table className="w-full min-w-[320px] text-sm">
        {hasHeader ? (
          <thead>
            <tr className="border-b border-line">
              {data.columns!.map((col, i) => (
                <th
                  key={i}
                  className={`px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-faint ${
                    i === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="border-b border-line-soft last:border-0">
              <td className="px-3 py-2 text-muted">{row.label}</td>
              {row.values.map((value, j) => (
                <td key={j} className="tabular px-3 py-2 text-right font-medium text-ink">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.note ? (
        <p className="border-t border-line px-3 py-2 text-xs text-muted">{data.note}</p>
      ) : null}
    </div>
  );
}

/** Six pips showing which difficulty level is currently in play. */
export function DifficultyPips({ level, max = 6 }: { level: number; max?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Level ${level} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full transition-colors duration-300 ${
            i < level ? "bg-accent" : "bg-line"
          }`}
        />
      ))}
    </div>
  );
}

export function CategoryIcon({
  category,
  className = "h-4 w-4",
}: {
  category: CategoryId;
  className?: string;
}) {
  const meta = CATEGORY_MAP[category];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={meta.icon} />
    </svg>
  );
}

/** Horizontal 0-100 skill bar used on the results screens. */
export function SkillBar({
  category,
  score,
  detail,
}: {
  category: CategoryId;
  score: number | null;
  detail?: string;
}) {
  const meta = CATEGORY_MAP[category];
  const pct = score ?? 0;

  return (
    <div className="flex items-center gap-3 py-2">
      <span className="shrink-0 text-muted" style={{ color: meta.accent }}>
        <CategoryIcon category={category} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="truncate text-sm text-ink">{meta.name}</p>
          <p className="tabular shrink-0 text-sm font-semibold text-ink">
            {score === null ? <span className="text-faint">—</span> : score}
          </p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line-soft">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{
              width: `${pct}%`,
              backgroundColor: score === null ? "transparent" : meta.accent,
            }}
          />
        </div>
        {detail ? <p className="mt-1 text-[11px] text-faint">{detail}</p> : null}
      </div>
    </div>
  );
}
