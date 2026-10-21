import { absoluteUrl } from "./site";
import { maxScoreForMode } from "./leaderboardRules";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function sharePayload(line: string, path: string, score: number): { line: string; url: string; text: string } {
  const quiz = path.split("/").at(-1)!;
  const query = new URLSearchParams({ ref: "share", q: quiz, score: String(score), utm_source: "copy" });
  const url = `${absoluteUrl(path)}?${query}`;
  return { line, url, text: `${line}\n${url}` };
}

export function operatorShareText(score: number, tierLabel: string): { line: string; url: string; text: string } {
  return sharePayload(
    `I scored ${score} (${tierLabel} tier) on the Operator Test. Can you beat it?`,
    "/operator",
    score,
  );
}

export function skillShareText(
  score: number,
  tierLabel: string,
  skillName: string,
  category: string,
): { line: string; url: string; text: string } {
  return sharePayload(
    `I scored ${score} (${tierLabel} tier) on the ${skillName} test. Can you beat it?`,
    `/skills/${category}`,
    score,
  );
}

export function quickShareText(dpm: number, tierLabel: string): { line: string; url: string; text: string } {
  return sharePayload(
    `I scored ${dpm} DPM (${tierLabel} tier) on Quick Decisions. Can you beat it?`,
    "/quick",
    dpm,
  );
}

/** Wordle-style daily line, for example "Daily Decision Oct 18: ✅ L3, 4-day streak". */
export function dailyShareText(
  dateKey: string,
  correct: boolean,
  level: number,
  streak: number,
): { line: string; url: string; text: string } {
  const [, monthRaw, dayRaw] = dateKey.split("-");
  const month = MONTHS[Number(monthRaw) - 1] ?? monthRaw;
  const day = Number(dayRaw);
  const mark = correct ? "✅" : "❌";
  const days = streak === 1 ? "1-day streak" : `${streak}-day streak`;
  return sharePayload(`Daily Decision ${month} ${day}: ${mark} L${level}, ${days}`, "/daily", correct ? 1 : 0);
}

export type ShareChannel = "copy" | "x" | "linkedin" | "native" | "download";

export function channelUrl(url: string, channel: ShareChannel): string {
  const link = new URL(url);
  link.searchParams.set("utm_source", channel);
  return link.toString();
}

/** Only integer scores for this quiz are displayed; URL text is never rendered. */
export function sharedScore(search: string, quiz: string): number | null {
  const params = new URLSearchParams(search);
  if (params.getAll("ref").length !== 1 || params.get("ref") !== "share" ||
      params.getAll("q").length !== 1 || params.get("q") !== quiz ||
      params.getAll("score").length !== 1) return null;
  const raw = params.get("score") ?? "";
  if (!/^(0|[1-9]\d{0,3})$/.test(raw)) return null;
  const score = Number(raw);
  const maximum = quiz === "daily" ? 1 : maxScoreForMode(quiz);
  return maximum !== null && score <= maximum ? score : null;
}

export type ShareOutcome = "shared" | "copied" | "dismissed" | "failed";

/** Web Share API, then the clipboard. A cancelled share sheet does not copy. */
export async function shareOrCopy(text: string): Promise<ShareOutcome> {
  const data = { text };
  const canUseShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    (typeof navigator.canShare !== "function" || navigator.canShare(data));

  if (canUseShare) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return "dismissed";
    }
  }

  if (copyWithSelection(text)) {
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    return "copied";
  }

  try {
    if (navigator.clipboard?.writeText) {
      await Promise.race([
        navigator.clipboard.writeText(text),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error("clipboard timeout")), 800);
        }),
      ]);
      return "copied";
    }
  } catch {
    // Neither copy path worked.
  }
  return "failed";
}

export function copyWithSelection(value: string): boolean {
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "0";
    area.style.left = "0";
    area.style.width = "2em";
    area.style.height = "2em";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, area.value.length);
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}
