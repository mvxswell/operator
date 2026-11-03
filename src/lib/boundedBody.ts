/**
 * Reads a request body as UTF-8 text, but stops after `maxBytes`.
 * Returns null when the body is larger, whether or not Content-Length was sent
 * (a chunked body has none), so a worker never buffers an oversized payload.
 */
export async function readBoundedText(
  body: ReadableStream<Uint8Array> | null,
  maxBytes: number,
): Promise<string | null> {
  if (!body) return "";
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock?.();
  }
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(joined);
}

/** Content-Length when present and valid, else null. Over-limit values fail fast. */
export function declaredLength(header: string | null): number | null {
  if (header == null || header === "") return null;
  if (!/^\d{1,12}$/.test(header)) return Number.POSITIVE_INFINITY;
  return Number(header);
}
