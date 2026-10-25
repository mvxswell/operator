"use client";

import Link from "next/link";
import { useState } from "react";
import { CASE_TOPICS, type CaseMeta, type CaseTopic } from "@/content/cases/types";

export function CaseLibrary({ cases }: { cases: CaseMeta[] }) {
  const [topic, setTopic] = useState<CaseTopic | "All">("All");
  const visible = topic === "All" ? cases : cases.filter((item) => item.topic === topic);
  return <>
    <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter cases by skill">
      {(["All", ...CASE_TOPICS] as const).map((name) => <button type="button" key={name} aria-pressed={topic === name} onClick={() => setTopic(name)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-accent ${topic === name ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface text-muted hover:text-ink"}`}>{name}</button>)}
    </div>
    <p className="mt-5 text-sm text-muted" role="status">{visible.length} {topic === "All" ? "business cases" : `${topic.toLowerCase()} cases`} · Choose first. Review the math after.</p>
    <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((item) => <li key={item.slug} className="flex flex-col rounded-xl border border-line bg-surface p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">{item.topic} · {item.industry}</p>
        <h2 className="mt-3 text-xl font-semibold leading-snug text-ink"><Link prefetch={false} href={`/cases/${item.slug}/`} className="hover:text-accent">{item.title}</Link></h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
        <Link prefetch={false} href={`/cases/${item.slug}/`} className="mt-5 text-sm font-medium text-accent underline-offset-4 hover:underline">Make the call <span aria-hidden="true">→</span></Link>
      </li>)}
    </ul>
  </>;
}
