/**
 * In-memory "just earned" queue. Persistence lives on the profile; this only
 * drives the results toast for the current page session.
 */

const EMPTY: readonly string[] = [];
let pending: string[] = [];
let snapshot: readonly string[] = EMPTY;
const listeners = new Set<() => void>();

export function celebrationSnapshot(): readonly string[] {
  return snapshot;
}

export function subscribeCelebrations(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function queueBadgeCelebrations(ids: readonly string[]): void {
  if (ids.length === 0) return;
  let changed = false;
  for (const id of ids) {
    if (!pending.includes(id)) {
      pending.push(id);
      changed = true;
    }
  }
  if (!changed) return;
  snapshot = pending.slice();
  listeners.forEach((listener) => listener());
}

export function dismissCelebrations(): void {
  if (pending.length === 0) return;
  pending = [];
  snapshot = EMPTY;
  listeners.forEach((listener) => listener());
}
