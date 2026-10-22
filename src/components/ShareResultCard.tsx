"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { channelUrl, copyWithSelection, type ShareChannel } from "@/lib/shareResult";
import { drawResult } from "@/lib/resultCanvas";
import { recordResultShared } from "@/lib/storage";
import { track } from "@/lib/track";
import { Button } from "./ui";

const subscribeToCapabilities = () => () => {};

export function ShareResultCard({
  title,
  score,
  verdict,
  shared,
  daily = false,
  shareKind,
  heading,
  blurb,
  prompt,
  headingId,
  downloadName = "thinkoperator-result.png",
}: {
  title: string;
  score: string;
  verdict: string;
  shared: { line: string; url: string };
  daily?: boolean;
  /** Quiz results count as a share. A badge card does not earn Challenger by itself. */
  shareKind?: "result" | "daily" | "badge";
  heading?: string;
  blurb?: string;
  prompt?: string;
  headingId?: string;
  downloadName?: string;
}) {
  const kind = shareKind ?? (daily ? "daily" : "result");
  const canvasPrompt = prompt ?? "Think you can beat it?";
  const canvas = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const native = useSyncExternalStore(subscribeToCapabilities, () => typeof navigator.share === "function", () => false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let active = true;
    if (canvas.current) void drawResult(canvas.current, title, score, verdict, canvasPrompt).then(() => {
      if (!active) return;
      canvas.current?.toBlob((blob) => {
        if (active && blob) setFile(new File([blob], downloadName, { type: "image/png" }));
        else if (active) setStatus("Image unavailable. You can still share your link.");
      }, "image/png");
    }).catch(() => { if (active) setStatus("Image unavailable. You can still share your link."); });
    return () => { active = false; };
  }, [title, score, verdict, canvasPrompt, downloadName]);

  const clicked = (channel: ShareChannel) => {
    if (kind === "daily") track("daily:share");
    else if (kind === "result") track("result:share");
    track(`share_click:${channel}`);
  };
  const markShared = () => {
    if (kind !== "badge") recordResultShared();
  };
  const socialText = daily ? `${shared.line}. Think you can beat it?` : shared.line;
  const x = new URL("https://twitter.com/intent/tweet");
  x.searchParams.set("text", socialText);
  x.searchParams.set("url", channelUrl(shared.url, "x"));
  const linkedin = new URL("https://www.linkedin.com/feed/");
  linkedin.searchParams.set("shareActive", "true");
  linkedin.searchParams.set("text", `${socialText}\n${channelUrl(shared.url, "linkedin")}`);
  const linkClass = "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-faint focus-visible:outline-2 focus-visible:outline-accent";

  async function copy() {
    clicked("copy");
    const url = channelUrl(shared.url, "copy");
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else if (!copyWithSelection(url)) throw new Error("clipboard unavailable");
      setStatus("Link copied.");
      markShared();
    } catch {
      if (copyWithSelection(url)) {
        setStatus("Link copied.");
        markShared();
      } else setStatus("Could not copy. Select the link below to copy it.");
    }
  }

  async function share() {
    clicked("native");
    const data: ShareData = { title, text: socialText, url: channelUrl(shared.url, "native") };
    if (file && navigator.canShare?.({ files: [file] })) data.files = [file];
    try {
      await navigator.share(data);
      setStatus(kind === "badge" ? "Badge shared." : "Result shared.");
      markShared();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setStatus("Sharing unavailable. Use Copy link or Download image.");
    }
  }

  return <section className="mt-8 rounded-xl border border-line bg-surface p-4 sm:p-5" aria-label={heading ?? "Share your result"}>
    <h2 id={headingId} tabIndex={headingId ? -1 : undefined} className="text-sm font-semibold text-ink outline-none">{heading ?? "Share your result"}</h2>
    <p className="mt-1 text-sm text-muted">{blurb ?? "Challenge a friend to make the better call."}</p>
    <canvas ref={canvas} role="img" aria-label={`${title}: ${score}. ${verdict}. thinkoperator.com`}
      className="mt-4 aspect-[1200/630] w-full rounded-lg border border-line" />
    <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      <Button variant="secondary" disabled={!file} onClick={() => {
        if (!file) return;
        clicked("download");
        markShared();
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url; a.download = file.name; a.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
        setStatus("Image downloaded.");
      }}>Download image</Button>
      <Button variant="secondary" onClick={() => { void copy(); }}>Copy link</Button>
      <a href={x.toString()} target="_blank" rel="noopener noreferrer" className={linkClass} onClick={() => { clicked("x"); markShared(); }}>Share to X</a>
      <a href={linkedin.toString()} target="_blank" rel="noopener noreferrer" className={linkClass} onClick={() => { clicked("linkedin"); markShared(); }}>Share to LinkedIn</a>
      {native ? <Button variant="secondary" onClick={() => { void share(); }}>Share…</Button> : null}
    </div>
    <p role="status" aria-live="polite" className="mt-2 text-xs text-muted">{status}</p>
    {status.startsWith("Could not copy") ? <input readOnly aria-label="Result link" className="mt-2 w-full p-2 text-sm" value={channelUrl(shared.url, "copy")} onFocus={(e) => e.target.select()} /> : null}
  </section>;
}
