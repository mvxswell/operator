/**
 * Search-result titles and descriptions for pages that already rank.
 * These strings are metadata only. Visible headings and article copy stay on
 * the content fields.
 */
export const SERP_COPY: Record<string, { title: string; description: string }> = {
  "/guides/how-to-decide-which-product-to-shut-down": {
    title: "Shutting Down a Core Product Decision — Think Operator",
    description:
      "Worked example for shutting down a core product: compare future contribution, strategic fit, and complexity, then try the free strategy test.",
  },
  "/guides/how-to-run-a-weekly-operating-review": {
    title: "Weekly Operating Review, Worked Example — Think Operator",
    description:
      "A worked weekly operating review: choose a small scorecard, diagnose exceptions, and leave with owners and due dates. Free operations skill test.",
  },
  "/guides/how-to-decide-whether-to-drop-an-unprofitable-customer": {
    title: "Drop an Unprofitable Customer? Example — Think Operator",
    description:
      "Worked numbers for dropping an unprofitable customer: separate contribution from overhead, then keep, reprice, or exit. Free finance skill test.",
  },
  "/guides/how-to-stop-every-decision-coming-to-the-ceo": {
    title: "Stop Every Decision Coming to the CEO — Think Operator",
    description:
      "Stop every decision coming to the CEO. A worked example of decision rights, escalation rules, and reviewing outcomes without taking the work back.",
  },
  "/guides/how-to-test-a-new-market-before-expanding": {
    title: "Test a New Market Without an Entity — Think Operator",
    description:
      "Test a new market without an entity: run a priced pilot before a lease or local company, and decide when a soft market test should stop. Free.",
  },
  "/cases/key-person-dependency": {
    title: "Key-Person Dependency: Worked Case — Think Operator",
    description:
      "Key-person dependency, worked: one person holds a bakery's production. Choose an action, then read the full reasoning. Free practice case today.",
  },
  "/cases/membership-business-break-even": {
    title: "Gym Franchise Break-Even Timeline — Think Operator",
    description:
      "How to estimate a break-even timeline for a gym franchise startup. A worked membership case: commit to an answer, then check the math. Free.",
  },
  "/operator": {
    title: "Free Operator Test: Business Judgment — Think Operator",
    description:
      "Free Operator Test: twenty adaptive business scenarios, then an Operator Score and a skill breakdown across all eight skills. No account required.",
  },
  "/tests/operator": {
    title: "Operator Test: What It Measures — Think Operator",
    description:
      "What the free Operator Test measures before you start: finance, people, operations, and strategy across twenty scenarios. Then start the test.",
  },
};

export function searchMetadata(
  path: string,
  fallbackTitle: string,
  fallbackDescription: string,
): { title: string; description: string } {
  const key = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return SERP_COPY[key] ?? { title: fallbackTitle, description: fallbackDescription };
}
