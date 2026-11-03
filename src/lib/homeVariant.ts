/**
 * Homepage A/B assignment.
 *
 * A = quizzes first (condensed intro), B = trackers first (condensed intro),
 * C = full header intro, then trackers. A visitor gets a random 1/3 variant
 * that sticks in localStorage. `?v=a`, `?v=b` or `?v=c` forces one for preview
 * and QA without overwriting the stored assignment. The key is v2 so the
 * earlier 50/50 assignments (where the letters meant something else) reset.
 *
 * HOME_VARIANT_SCRIPT runs inline at the top of the homepage, before the
 * sections are parsed, and sets <html data-home-v>. CSS orders the sections
 * from that attribute, so the wrong variant never paints. secure-export.mjs
 * hashes the script into the page CSP like every other inline script.
 * resolveHomeVariant below is the same logic for client-side navigation;
 * tests/home.test.cjs checks the two agree.
 */

export type HomeVariant = "a" | "b" | "c";

export const HOME_VARIANT_KEY = "operator.home.variant.v2";
export const HOME_VARIANT_ATTR = "data-home-v";

export function isHomeVariant(value: unknown): value is HomeVariant {
  return value === "a" || value === "b" || value === "c";
}

/** Returns the variant to show and the value to store (null = leave storage alone). */
export function resolveHomeVariant(
  search: string,
  stored: string | null,
  random: number,
): { variant: HomeVariant; store: HomeVariant | null } {
  const forced = /(?:^|[?&])v=([abc])(?:&|$)/i.exec(search)?.[1]?.toLowerCase();
  if (isHomeVariant(forced)) return { variant: forced, store: null };
  if (isHomeVariant(stored)) return { variant: stored, store: null };
  const variant: HomeVariant = random < 1 / 3 ? "a" : random < 2 / 3 ? "b" : "c";
  return { variant, store: variant };
}

/** Keep in step with resolveHomeVariant. ES5 so it runs before any bundle. */
export const HOME_VARIANT_SCRIPT = `(function(){var v="c";try{var m=/(?:^|[?&])v=([abc])(?:&|$)/i.exec(location.search),s=null;try{s=localStorage.getItem("${HOME_VARIANT_KEY}")}catch(e){}if(m){v=m[1].toLowerCase()}else if(s==="a"||s==="b"||s==="c"){v=s}else{var r=Math.random();v=r<1/3?"a":r<2/3?"b":"c";try{localStorage.setItem("${HOME_VARIANT_KEY}",v)}catch(e){}}}catch(e){}document.documentElement.setAttribute("${HOME_VARIANT_ATTR}",v)})();`;

/** Client fallback for client-side navigation to "/", where the inline script does not run. */
export function applyHomeVariant(): HomeVariant {
  const root = document.documentElement;
  const current = root.getAttribute(HOME_VARIANT_ATTR);
  const params = window.location.search;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(HOME_VARIANT_KEY);
  } catch {
    stored = null;
  }
  // The inline script already decided for this document load, unless a query forces otherwise.
  if (isHomeVariant(current) && !/(?:^|[?&])v=[abc](?:&|$)/i.test(params)) return current;
  const { variant, store } = resolveHomeVariant(params, stored, Math.random());
  if (store) {
    try {
      window.localStorage.setItem(HOME_VARIANT_KEY, store);
    } catch {
      // Private mode: the variant still applies to this page view.
    }
  }
  root.setAttribute(HOME_VARIANT_ATTR, variant);
  return variant;
}
