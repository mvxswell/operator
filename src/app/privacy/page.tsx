import Link from "next/link";

export const metadata = { title: "Your data — Think Operator" };

export default function PrivacyPage() {
  return <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-sm leading-relaxed text-muted">
    <h1 className="text-3xl font-semibold text-ink">Your data at Think Operator</h1>
    <p>Current preview · updated September 8, 2026</p>
    <h2 className="text-lg font-semibold text-ink">Progress stays in your browser</h2>
    <p>The app stores completed scores, answer accuracy, test dates, skill results, and daily decisions in local browser storage. It does not currently send these results to an account or a database. Anyone using the same browser profile can see them. They do not automatically transfer between browsers, devices, domains, or HTTP and HTTPS.</p>
    <p>Up to 100 recent runs are retained for each test type and each skill, alongside personal bests and up to ten years of daily decisions. Older entries outside these limits are removed. Clearing site data or using private browsing may remove your progress.</p>
    <h2 className="text-lg font-semibold text-ink">Back up or delete your progress</h2>
    <p>Use <Link href="/progress" className="text-accent underline">My progress</Link> to download a JSON backup, restore a backup, or delete your saved progress. A backup contains your test history, so share it only if you want someone to see those results.</p>
    <h2 className="text-lg font-semibold text-ink">Hosting and tracking</h2>
    <p>This preview is hosted by GitHub Pages. Like any web host, GitHub receives connection information such as your IP address when serving the site. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-accent underline">GitHub’s privacy statement</a> for its handling of that information. We have not added advertising trackers, analytics scripts, account registration, or payment collection.</p>
    <h2 className="text-lg font-semibold text-ink">What scores mean</h2>
    <p>Scores are practice feedback from the current question bank, not a professional certification or a validated hiring assessment. They are calculated on your device and can be edited by its user. Daily community percentages are illustrative examples, not measurements of real users.</p>
    <h2 className="text-lg font-semibold text-ink">Future accounts</h2>
    <p>Accounts, cloud sync, and payments are not active. Before those features launch, this page will be updated to describe the data collected, service providers, retention, and account deletion process.</p>
  </div>;
}
