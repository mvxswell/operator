"use client";

import { useState } from "react";
import { shareOrCopy } from "@/lib/shareResult";
import { track } from "@/lib/track";
import { Button } from "./ui";

export function ShareScoreButton({
  text,
  event,
  variant = "secondary",
  size = "lg",
  className = "",
}: {
  text: string;
  /** `result:share` on scored results, `daily:share` on the daily page. */
  event: "result:share" | "daily:share";
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
}) {
  const [label, setLabel] = useState("Share");

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        track(event);
        void shareOrCopy(text).then((outcome) => {
          if (outcome === "copied") setLabel("Copied");
          else if (outcome === "shared") setLabel("Shared");
          else if (outcome === "failed") setLabel("Copy failed");
          else setLabel("Share");
          if (outcome !== "dismissed") {
            window.setTimeout(() => setLabel("Share"), 4000);
          }
        });
      }}
    >
      {label}
    </Button>
  );
}
