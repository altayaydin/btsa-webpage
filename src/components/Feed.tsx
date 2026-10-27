import { useState } from "react";
import { Segmented } from "@/components/SiteShell";
import { groupByMonth } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { posts } from "@/lib/posts";

const PAGE = 4;

type Post = (typeof posts)[number];

function ReadMore({ post }: { post: Post }) {
  const { t } = useLang();
  if (!post.link) return null;
  return (
    <a href={post.link} target="_blank" rel="noreferrer" className="mt-3 self-start text-sm font-semibold text-primary hover:underline">
      {t({ tr: "Devamı →", en: "Read more →" })}
    </a>
  );
}

export function Feed() {
  const { lang, t } = useLang();
  const [view, setView] = useState<"cards" | "timeline">("cards");
  const [count, setCount] = useState(PAGE);
  const locale = lang === "tr" ? "tr-TR" : "en-GB";
  const shown = posts.slice(0, count);

  return (
    <div>
      <div className="mb-6">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "cards", label: t({ tr: "Kartlar", en: "Cards" }) },
            { value: "timeline", label: t({ tr: "Zaman çizelgesi", en: "Timeline" }) },
          ]}
        />
      </div>

      {view === "cards" ? (
        <div className="grid md:grid-cols-2 gap-5">
          {shown.map((p) => (
            <article key={p.id} className="rounded-xl bg-card overflow-hidden border-l-4 border-gold flex flex-col">
              {p.image && <img src={p.image} alt={t(p.title)} loading="lazy" className="aspect-video w-full object-cover" />}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs text-muted-foreground">{p.day.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}</div>
                <h3 className="text-2xl mt-1">{t(p.title)}</h3>
                <p className="mt-2 text-muted-foreground">{t(p.body)}</p>
                <ReadMore post={p} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {groupByMonth(shown).map((g) => (
            <section key={g.key}>
              <h3 className="text-xl capitalize border-b border-foreground/10 pb-2 mb-4">{g.month.toLocaleDateString(locale, { month: "long", year: "numeric" })}</h3>
              <ol className="relative border-l-2 border-gold ml-2 space-y-5">
                {g.items.map((p) => (
                  <li key={p.id} className="relative pl-6">
                    <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-gold" />
                    <article className="flex gap-4 rounded-xl bg-card p-4">
                      {p.image && <img src={p.image} alt={t(p.title)} loading="lazy" className="h-20 w-28 shrink-0 rounded-md object-cover" />}
                      <div className="min-w-0 flex flex-col">
                        <div className="text-xs text-muted-foreground">{p.day.toLocaleDateString(locale, { day: "numeric", month: "long" })}</div>
                        <h4 className="text-lg font-semibold leading-snug">{t(p.title)}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{t(p.body)}</p>
                        <ReadMore post={p} />
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}

      {count < posts.length && (
        <button onClick={() => setCount(count + PAGE)} className="mt-6 rounded-full border bg-card px-5 py-2 text-sm font-semibold hover:border-gold">
          {t({ tr: "Daha fazla göster", en: "Show more" })}
        </button>
      )}
    </div>
  );
}
