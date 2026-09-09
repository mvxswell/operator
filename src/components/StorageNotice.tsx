"use client";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getStorageWarning, subscribeStorageWarning } from "@/lib/storage";

export function StorageNotice() {
  const message = useSyncExternalStore(subscribeStorageWarning, getStorageWarning, () => "");
  return message ? <div role="alert" className="border-b border-accent/30 bg-accent-soft px-4 py-3 text-center text-sm text-ink">{message} <Link href="/progress" className="underline">My progress</Link></div> : null;
}
