import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { SiteShell } from "@/components/SiteShell";
import { EventCalendar } from "@/components/EventCalendar";
import { events, posts } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BocconiTSA — Turkish Students Association at Bocconi" },
      { name: "description", content: "Events, parties and community for Turkish students at Bocconi University, Milan." },
      { property: "og:title", content: "BocconiTSA — Turkish Students at Bocconi" },
      { property: "og:description", content: "Events calendar, monthly recap and community for Turkish students in Milan." },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, t } = useLang();
  const locale = lang === "tr" ? "tr-TR" : "en-GB";
  const upcoming = events.filter((e) => e.date >= "2026-10-27").slice(0, 4);
  return (
    <SiteShell>
      <section className="relative text-primary-foreground overflow-hidden">
        <img src={hero} alt="BocconiTSA" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 md:pt-48 md:pb-24">
          <div className="eyebrow">Bocconi Turkish Students Association</div>
          <h1 className="mt-3 text-5xl md:text-7xl max-w-3xl">{t({ tr: "Milano'da evden uzakta bir ev.", en: "A home away from home in Milan." })}</h1>
          <p className="mt-4 max-w-xl opacity-85">{t({ tr: "Partiler, kahvaltılar, kariyer sohbetleri — hepsi tek takvimde.", en: "Parties, breakfasts, career talks — all in one calendar." })}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 grid lg:grid-cols-[1fr_340px] gap-10">
        <div>
          <div className="eyebrow">{t({ tr: "Takvim", en: "Calendar" })}</div>
          <h2 className="text-4xl mt-2 mb-6">{t({ tr: "Etkinliklerimiz", en: "Our events" })}</h2>
          <EventCalendar />
        </div>
        <aside>
          <h3 className="text-2xl mb-4">{t({ tr: "Yaklaşanlar", en: "Coming up" })}</h3>
          <ul className="space-y-3">
            {upcoming.map((e) => {
              const d = new Date(e.date);
              return (
                <li key={e.id} className="flex gap-4 rounded-lg border p-3">
                  <div className="w-14 shrink-0 rounded-md bg-primary text-primary-foreground text-center py-1">
                    <div className="font-display text-2xl leading-tight">{d.getDate()}</div>
                    <div className="text-[10px] uppercase text-gold font-bold">{d.toLocaleDateString(locale, { month: "short" })}</div>
                  </div>
                  <div>
                    <div className="font-semibold">{t(e.title)}</div>
                    <div className="text-xs text-muted-foreground">{e.time} · {e.place}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="eyebrow">Feed</div>
          <h2 className="text-4xl mt-2 mb-6">{t({ tr: "Bu ay neler oldu?", en: "What happened this month" })}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {posts.map((p) => (
              <article key={p.date} className="rounded-xl bg-card p-6 border-l-4 border-gold">
                <div className="text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}</div>
                <h3 className="text-2xl mt-1">{t(p.title)}</h3>
                <p className="mt-2 text-muted-foreground">{t(p.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
