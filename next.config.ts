import type { NextConfig } from "next";

/**
 * The app is entirely client-side (localStorage, no server components that need
 * a runtime), so it exports cleanly to static files for GitHub Pages.
 *
 * The Pages-specific options are opt-in via GITHUB_PAGES=true so that local
 * `next dev` keeps serving from the root with no basePath.
 */
const REPO = "operator";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        // Project sites are served from https://<user>.github.io/<repo>/
        basePath: `/${REPO}`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
