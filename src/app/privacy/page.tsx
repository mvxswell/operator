import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/privacy");

export default function PrivacyPage() {
  return <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-sm leading-relaxed text-muted">
    <header className="brand-hero"><p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Your data, your control</p><h1 className="text-3xl font-semibold tracking-tight text-ink">Your data at Think Operator</h1><p className="mt-4">Updated October 17, 2026</p></header>
    <h2 className="text-lg font-semibold text-ink">Progress stays in your browser</h2>
    <p>The app stores completed scores, answer accuracy, test dates, skill results, and daily decisions in local browser storage. It does not send your full test history to an account. Anyone using the same browser profile can see it. Progress does not automatically transfer between browsers, devices, domains, or HTTP and HTTPS.</p>
    <p>Up to 100 recent runs are retained for each test type and each skill, alongside personal bests and up to ten years of daily decisions. Older entries outside these limits are removed. Clearing site data or using private browsing may remove your progress.</p>
    <p>We also remember up to 1,000 recently shown Quick Decisions scenario IDs to reduce repeats across rounds. This rotation history is included in backups and removed when you reset progress.</p>
    <p>When the online counter is enabled, this browser keeps a random visitor ID so multiple tabs count as one visitor. It sends the ID to the counter service about once a minute while the page is visible. After two minutes without a check-in, the ID stops counting and is removed during the next request. Cloudflare receives connection information such as IP addresses to serve and rate-limit these requests. The count is approximate and may include more than one browser used by the same person.</p>
    <h2 className="text-lg font-semibold text-ink">Optional public leaderboard</h2>
    <p>If the leaderboard is enabled and you choose to post a completed run, the public leaderboard stores your chosen nickname, test mode, score, completion time, and posting date in Supabase. It also stores a random browser ID to limit repeat submissions and highlight your row; that ID is not displayed publicly. We remember your nickname and browser ID in local storage. Do not use your real name or other personal information as a nickname unless you want it visible to everyone.</p>
    <p>Leaderboard posts are separate from your private progress backup. Deleting browser data or using My progress to reset your history does not remove a public post. There is no self-service removal or account recovery yet; contact the site owner if a public nickname needs to be removed. Scores are self-reported by browsers and are not proof of identity or verified performance.</p>
    <h2 className="text-lg font-semibold text-ink">Back up or delete your progress</h2>
    <p>Use <Link href="/progress" className="text-accent underline">My progress</Link> to download a JSON backup, restore a backup, or delete your saved progress. A backup contains your test history, so share it only if you want someone to see those results.</p>
    <h2 className="text-lg font-semibold text-ink">Hosting and tracking</h2>
    <p>This site is hosted by GitHub Pages. Like any web host, GitHub receives connection information such as your IP address when serving the site. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-accent underline">GitHub’s privacy statement</a> for its handling of that information. We use Cloudflare Web Analytics to measure aggregate visits, page views, referral sources, and page performance. The analytics beacon does not receive your saved test answers. If you choose to post a score, your browser connects directly to Supabase, which also receives connection information needed to serve the request. We have not added advertising trackers, account registration, or payment collection.</p>
    <h2 className="text-lg font-semibold text-ink">What scores mean</h2>
    <p>Scores are practice feedback from the current question bank, not a professional certification or a validated hiring assessment. They are calculated on your device and can be edited by its user. Daily community percentages are illustrative examples, not measurements of real users.</p>
    <h2 className="text-lg font-semibold text-ink">Future accounts</h2>
    <p>Accounts, cloud sync, and payments are not active. Before those features launch, this page will be updated to describe the data collected, service providers, retention, and account deletion process.</p>
  </div>;
}
