import type { NextConfig } from "next";

/**
 * The app is entirely client-side (localStorage, no server components that need
 * a runtime), so it exports cleanly to static files for GitHub Pages.
 *
 * The Pages-specific options are opt-in via GITHUB_PAGES=true so that local
 * `next dev` keeps serving from the root with no basePath.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  ...(isGitHubPages
    ? {
        output: "export",
        // The project has a custom Pages domain, so it is served from the root.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
