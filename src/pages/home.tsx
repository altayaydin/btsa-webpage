import hero from "@/assets/hero.jpg";
import { PageMeta } from "@/components/PageMeta";
import { SiteShell } from "@/components/SiteShell";
import { DateBadge } from "@/components/EventList";
import { EventsView } from "@/components/EventsView";
import { Feed } from "@/components/Feed";
import { events, linkLabel, todayKey } from "@/lib/events";
import { posts } from "@/lib/posts";
import { useLang } from "@/lib/i18n";

export default function Index() {
  const { t } = useLang();
  const today = todayKey();
  const upcoming = events.filter((e) => e.date >= today).slice(0, 4);
  return (
    <SiteShell>
      <PageMeta
        title="BocconiTSA — Turkish Students Association at Bocconi"
        description="Events, parties and community for Turkish students at Bocconi University, Milan."
        ogTitle="BocconiTSA — Turkish Students at Bocconi"
        ogDescription="Events calendar, recaps and community for Turkish students in Milan."
      />
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
        <div className="min-w-0">
          <div className="eyebrow">{t({ tr: "Takvim", en: "Calendar" })}</div>
          <h2 className="text-4xl mt-2 mb-6">{t({ tr: "Etkinliklerimiz", en: "Our events" })}</h2>
          <EventsView />
        </div>
        {/* Hidden on smaller screens, where the list view already shows what's coming up */}
        <aside className="hidden lg:block">
          <h3 className="text-2xl mb-4">{t({ tr: "Yaklaşanlar", en: "Coming up" })}</h3>
          <ul className="space-y-3">
            {upcoming.map((e) => (
              <li key={e.id} className="flex gap-4 rounded-lg border p-3">
                <DateBadge day={e.day} />
                <div>
                  <div className="font-semibold">{t(e.name)}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.time && `${e.time} · `}
                    <a href={e.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">{e.location.name}</a>
                  </div>
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-bold text-primary hover:underline">{t(linkLabel(e))}</a>
                  )}
                </div>
              </li>
            ))}
            {!upcoming.length && <li className="text-sm text-muted-foreground">{t({ tr: "Yakında yeni etkinlikler.", en: "New events coming soon." })}</li>}
          </ul>
        </aside>
      </section>

      {posts.length > 0 && (
        <section className="bg-muted">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <div className="eyebrow">Feed</div>
            <h2 className="text-4xl mt-2 mb-6">{t({ tr: "Neler yaptık?", en: "What we've been up to" })}</h2>
            <Feed />
          </div>
        </section>
      )}
    </SiteShell>
  );
}
