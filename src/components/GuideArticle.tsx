import Link from "next/link";
import { GuideScenario } from "@/components/GuideScenario";
import { SiteFooter } from "@/components/SiteFooter";
import { ButtonLink } from "@/components/ui";
import { getGuide, type Guide } from "@/content/guides";
import { readMinutes } from "@/content/guides/words";
import { CATEGORY_MAP } from "@/lib/categories";

export function GuideArticle({ guide }: { guide: Guide }) {
  const skill = CATEGORY_MAP[guide.skill];
  const minutes = readMinutes(guide);
  const related = guide.related.map((slug) => getGuide(slug)).filter((item): item is Guide => item !== null);

  return (
    <div className="py-14 sm:py-16">
      <article className="prose-guide">
        <p className="guide-kicker">
          {skill.name} · {minutes} min read
        </p>
        <h1>{guide.title}</h1>
        <p>{guide.answer}</p>
        {guide.blocks.map((block, index) => {
          if (block.type === "p") return <p key={index}><Rich text={block.text} /></p>;
          if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
          if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
          if (block.type === "ol") {
            return (
              <ol key={index}>
                {block.items.map((item) => (
                  <li key={item}><Rich text={item} /></li>
                ))}
              </ol>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}><Rich text={item} /></li>
                ))}
              </ul>
            );
          }
          if (block.type === "panel") {
            return (
              <div key={index} className="guide-panel panel-depth mt-[1.1em] divide-y divide-line-soft rounded-xl border border-line bg-surface">
                {block.items.map((item) => (
                  <p key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <Rich text={item} />
                  </p>
                ))}
              </div>
            );
          }
          if (block.type === "table") {
            return (
              <div key={index} className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {block.columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return <GuideScenario key={index} guide={guide} />;
        })}

        <h2>Questions operators ask</h2>
        {guide.faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p><Rich text={faq.answer} /></p>
          </div>
        ))}
      </article>

      <div className="mx-auto mt-10 flex max-w-[680px] flex-col gap-3 px-5 sm:flex-row sm:flex-wrap">
        <ButtonLink href={`/skills/${guide.skill}`} size="lg">
          Take the {skill.name} test
        </ButtonLink>
        <ButtonLink href="/quick" variant="secondary" size="lg">
          Quick Decisions — 60 sec
        </ButtonLink>
        {guide.extraLinks?.map((link) => (
          <ButtonLink key={link.href} href={link.href} variant="secondary" size="lg">
            {link.label}
          </ButtonLink>
        ))}
      </div>

      {related.length ? (
        <div className="prose-guide">
          <h2>Related guides</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SiteFooter />
      </div>
    </div>
  );
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(\/[^)\s]+\))/g);
  return parts.map((part, index) => {
    const link = /^\[([^\]]+)\]\((\/[^)\s]+)\)$/.exec(part);
    if (link) {
      return (
        <Link key={index} href={link[2]}>
          {link[1]}
        </Link>
      );
    }
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={index}>{bold[1]}</strong>;
    return <span key={index}>{part}</span>;
  });
}
