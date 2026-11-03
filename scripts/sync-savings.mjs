// Grok Bot Savings Tracker: CSV -> src/data/grokBotSavings.json
//
//   npm run savings:sync -- /workspace/social/grokbot_roi.csv [--revenue /workspace/social/grokbot_revenue.csv]
//                           [--as-of YYYY-MM-DD] [--meta /workspace/social/build_roi.py]
//
// Reads the task log CSV (date,bot,business,task,evidence,role,hours,rate,value,credit,issues),
// recomputes the totals exactly the way build_roi.py does, and writes the committed JSON the
// /grok-bot-savings-tracker/ page renders. Month, spend, rate bases, sources and misses live in
// src/data/grokBotSavings.config.json; pass --meta <build_roi.py> to refresh that file from
// build_roi.py's MONTH / RATES / SOURCES / MISSES (needs python3).
//
// Raw evidence (box paths, private repo URLs) is never copied into the JSON: each row keeps only
// a short public label, plus a link when it is a PR on a public repo listed in publicRepos.
//
// Revenue (optional --revenue CSV: date,business,source,amount,evidence,notes) counts only money
// actually received with evidence, same rules as build_roi.py: rows outside start..as_of are
// skipped; a row with amount <= 0 or empty evidence fails the sync. Without the file revenue is 0.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const CONFIG_PATH = join(HERE, "..", "src/data/grokBotSavings.config.json");
export const OUT_PATH = join(HERE, "..", "src/data/grokBotSavings.json");
export const REVENUE_COLUMNS = ["date", "business", "source", "amount", "evidence", "notes"];
export const COLUMNS = ["date", "bot", "business", "task", "evidence", "role", "hours", "rate", "value", "credit", "issues"];

/** RFC 4180 CSV (quoted fields, doubled quotes, CRLF or LF). */
export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  const s = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quoted) {
      if (ch === '"' && s[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && s[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? "").trim()])));
}

const round2 = (x) => Math.round(x * 100) / 100;
const day = (s) => new Date(`${s}T00:00:00Z`);

/** Today's date in America/New_York, as YYYY-MM-DD. */
export function todayET(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Short public label for a row's evidence. Never returns a box path or a private URL. */
export function publicEvidence(evidence, publicRepos = []) {
  const ev = String(evidence ?? "").trim();
  const gh = ev.match(/^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/pull\/(\d+)\/?$/);
  if (gh) return publicRepos.includes(gh[1]) ? { kind: "pr", label: `PR #${gh[2]}`, href: `https://github.com/${gh[1]}/pull/${gh[2]}` } : { kind: "pr", label: "PR (private repo)" };
  if (/^https?:\/\//.test(ev)) return { kind: "link", label: "Link (private)" };
  if (/\bcommit\b/i.test(ev)) return { kind: "commit", label: "Commit" };
  if (ev.startsWith("/") || /\/workspace\//.test(ev)) return { kind: "file", label: "File on the box" };
  return ev ? { kind: "log", label: "Log entry" } : { kind: "none", label: "None" };
}

/**
 * Same math as build_roi.py main(): rows dated start..as_of, value = round(hours * rate, 2),
 * totals summed in CSV order, role/business breakdowns over rows with value > 0 sorted by value desc.
 */
export function buildSavings(csvRows, config, asOfArg, revenueRows = []) {
  const M = config.month;
  const today = asOfArg ?? todayET();
  const asOf = today < M.start ? M.start : today > M.end ? M.end : today;
  const days = Math.round((day(M.end) - day(M.start)) / 864e5) + 1;
  const dayN = Math.round((day(asOf) - day(M.start)) / 864e5) + 1;
  const prorated = (M.spend * dayN) / days;
  const rateBy = Object.fromEntries(config.rates.map((r) => [r.role, r]));
  const problems = [];

  const rows = [];
  csvRows.forEach((r, i) => {
    const line = i + 2;
    for (const c of COLUMNS) if (!(c in r)) throw new Error(`CSV is missing column "${c}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) throw new Error(`line ${line}: bad date "${r.date}"`);
    if (!(M.start <= r.date && r.date <= asOf)) return;
    const hours = Number(r.hours), rate = Number(r.rate);
    if (!Number.isFinite(hours) || !Number.isFinite(rate) || hours < 0 || rate < 0) throw new Error(`line ${line}: hours/rate must be numbers`);
    const value = round2(hours * rate);
    if (r.value !== "" && Math.abs(Number(r.value) - value) > 0.005) problems.push(`line ${line}: value ${r.value} != hours*rate ${value}`);
    if (r.credit !== "None" && value > 0) {
      if (!rateBy[r.role]) problems.push(`line ${line}: role "${r.role}" has no rate/source in the config`);
      else if (rateBy[r.role].rate !== rate) problems.push(`line ${line}: rate ${rate} for "${r.role}" differs from config ${rateBy[r.role].rate}`);
    }
    rows.push({ date: r.date, bot: r.bot, business: r.business, task: r.task, role: r.role, hours, rate, value, credit: r.credit, issues: r.issues, evidence: publicEvidence(r.evidence, config.publicRepos) });
  });

  const total = rows.reduce((a, r) => a + r.value, 0);
  const hours = rows.reduce((a, r) => a + r.hours, 0);
  const agg = (key) => {
    const m = new Map();
    for (const r of rows) if (r.value > 0) {
      const v = m.get(r[key]) ?? { label: r[key], value: 0, hours: 0 };
      v.value += r.value; v.hours += r.hours; m.set(r[key], v);
    }
    return [...m.values()].sort((a, b) => b.value - a.value);
  };
  const revenue = buildRevenue(revenueRows, config, M.start, asOf);
  const revTotal = round2(revenue.reduce((a, r) => a + r.amount, 0));
  const revByBiz = new Map();
  for (const r of revenue) revByBiz.set(r.business, (revByBiz.get(r.business) ?? 0) + r.amount);
  const usedSources = new Set(config.rates.map((r) => r.source));
  const summary = {
    month: M.n, start: M.start, end: M.end, as_of: asOf, day: dayN, days, spend: M.spend, plans: M.plans,
    prorated: round2(prorated), total, hours, credited: rows.filter((r) => r.value > 0).length,
    net_full: total - M.spend, net_pro: total - round2(prorated),
    ratio_full: M.spend ? total / M.spend : 0, ratio_pro: prorated ? total / round2(prorated) : 0,
    by_role: agg("role"), by_biz: agg("business"),
    revenue: revTotal, revenue_count: revenue.length,
    revenue_by_biz: [...revByBiz].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    return_full: round2(total + revTotal - M.spend), return_pro: round2(total + revTotal - prorated),
  };
  return {
    data: {
      _generated: "by scripts/sync-savings.mjs from grokbot_roi.csv. Do not edit by hand.",
      summary,
      tasks: rows,
      revenue,
      misses: (config.misses ?? []).filter((m) => m.date <= asOf),
      rates: [...config.rates].sort((a, b) => b.rate - a.rate).map(({ role, rate, basis, source }) => ({ role, rate, basis, source })),
      sources: config.sources.filter((s) => usedSources.has(s.key)),
    },
    problems,
  };
}

/**
 * Received-money ledger, build_roi.py rules: keep rows dated start..as_of; inside that window a row
 * with empty evidence or amount <= 0 throws (the sync fails rather than counting it). Evidence goes
 * through publicEvidence() so receipt URLs and box paths never reach the public JSON.
 */
export function buildRevenue(revenueRows, config, start, asOf) {
  const out = [];
  revenueRows.forEach((r, i) => {
    const line = i + 2;
    for (const c of REVENUE_COLUMNS) if (!(c in r)) throw new Error(`revenue CSV is missing column "${c}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) throw new Error(`revenue line ${line}: bad date "${r.date}"`);
    if (!(start <= r.date && r.date <= asOf)) return;
    if (!String(r.evidence ?? "").trim()) throw new Error(`revenue line ${line} (${r.date} ${r.business}): no evidence; only received money with evidence counts`);
    const amount = Number(r.amount);
    if (r.amount === "" || !Number.isFinite(amount) || amount <= 0) throw new Error(`revenue line ${line} (${r.date} ${r.business}): amount must be a positive received amount`);
    out.push({ date: r.date, business: r.business, source: r.source, amount: round2(amount), notes: r.notes, evidence: publicEvidence(r.evidence, config.publicRepos) });
  });
  return out;
}

/** Refresh the config from build_roi.py (MONTH, RATES, SOURCES, MISSES) without running its main(). */
function refreshConfigFrom(pyPath, config) {
  const py = `import sys,json,importlib.util
sys.dont_write_bytecode=True
spec=importlib.util.spec_from_file_location("build_roi",sys.argv[1]);b=importlib.util.module_from_spec(spec);spec.loader.exec_module(b)
print(json.dumps(dict(month=dict(n=b.MONTH["n"],start=b.MONTH["start"].isoformat(),end=b.MONTH["end"].isoformat(),spend=b.MONTH["spend"]),
 rates=[dict(role=k,rate=v[0],basis=v[1],source=v[2]) for k,v in b.RATES.items()],
 sources=[dict(title=t,site=s,href=h) for t,s,h in b.SOURCES],
 misses=[dict(date=d,title=t,detail=dt,label=l,tone=tn) for d,t,dt,l,tn in b.MISSES])))`;
  const m = JSON.parse(execFileSync("python3", ["-B", "-c", py, pyPath], { encoding: "utf8", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } }));
  const keyByHref = Object.fromEntries(config.sources.map((s) => [s.href, s.key]));
  const unkeyed = m.sources.filter((s) => !keyByHref[s.href]);
  if (unkeyed.length) console.warn(`savings:sync: new sources need a "key" in the config: ${unkeyed.map((s) => s.href).join(", ")}`);
  return { ...config, month: { ...config.month, ...m.month }, rates: m.rates, misses: m.misses,
    sources: m.sources.map((s) => ({ key: keyByHref[s.href] ?? null, ...s })) };
}

function main(argv) {
  const args = argv.slice(2);
  const opt = (name) => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
  const asOf = opt("--as-of"), meta = opt("--meta"), revenuePath = opt("--revenue");
  const csvPath = args[0];
  if (!csvPath) { console.error("usage: npm run savings:sync -- <grokbot_roi.csv> [--revenue grokbot_revenue.csv] [--as-of YYYY-MM-DD] [--meta build_roi.py]"); process.exit(2); }
  let config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  if (meta) { config = refreshConfigFrom(meta, config); writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n"); }
  const revenueRows = revenuePath ? parseCsv(readFileSync(revenuePath, "utf8")) : [];
  if (revenuePath) {
    const header = readFileSync(revenuePath, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)[0].split(",").map((h) => h.trim());
    for (const c of REVENUE_COLUMNS) if (!header.includes(c)) throw new Error(`revenue CSV is missing column "${c}"`);
  }
  const { data, problems } = buildSavings(parseCsv(readFileSync(csvPath, "utf8")), config, asOf, revenueRows);
  for (const p of problems) console.warn(`savings:sync: ${p}`);
  writeFileSync(OUT_PATH, JSON.stringify(data, null, 2) + "\n");
  const S = data.summary;
  console.log(`savings:sync: ${data.tasks.length} rows, day ${S.day} of ${S.days} (as of ${S.as_of}); value $${S.total.toFixed(2)}, ${S.hours} h, ${S.credited} credited; spend $${S.spend} ($${S.prorated} prorated); revenue $${S.revenue.toFixed(2)} (${S.revenue_count}); return $${S.return_full.toFixed(2)}`);
  if (problems.length) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main(process.argv);
