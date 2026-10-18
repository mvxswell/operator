import { absoluteUrl } from "./site";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function sharePayload(line: string, path: string): { line: string; url: string; text: string } {
  const url = `${absoluteUrl(path)}?ref=share`;
  return { line, url, text: `${line}\n${url}` };
}

export function operatorShareText(score: number, tierLabel: string): { line: string; url: string; text: string } {
  return sharePayload(
    `I scored ${score} (${tierLabel} tier) on the Operator Test. Can you beat it?`,
    "/operator",
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
  );
}

export function quickShareText(dpm: number, tierLabel: string): { line: string; url: string; text: string } {
  return sharePayload(
    `I scored ${dpm} DPM (${tierLabel} tier) on Quick Decisions. Can you beat it?`,
    "/quick",
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
  return sharePayload(`Daily Decision ${month} ${day}: ${mark} L${level}, ${days}`, "/daily");
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

function copyWithSelection(value: string): boolean {
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
