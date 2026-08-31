"use client";

import { useCallback, useSyncExternalStore } from "react";
import { emptyProfile, profileStore, type Profile } from "./storage";

const SERVER_SNAPSHOT = emptyProfile();

/**
 * Reads the persisted profile. Returns an empty profile during SSR and the
 * first client render, then re-renders with real data once mounted — which
 * keeps markup identical on both sides and avoids hydration mismatches.
 */
export function useProfile(): { profile: Profile; hydrated: boolean } {
  const subscribe = useCallback((cb: () => void) => profileStore.subscribe(cb), []);
  const profile = useSyncExternalStore(
    subscribe,
    () => profileStore.load(),
    () => SERVER_SNAPSHOT,
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return { profile, hydrated };
}
