import { createFileRoute } from "@tanstack/react-router";
import dorm from "@/assets/dorm.jpg";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { dorms } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/bocconi-101/dorm-tours")({
  head: () => ({
    meta: [
      { title: "Dorm Tours — Bocconi Residences | BocconiTSA" },
      { name: "description", content: "Room tours of Bocconi residences filmed by the BocconiTSA media team." },
      { property: "og:title", content: "Bocconi Dorm Tours" },
      { property: "og:description", content: "See real rooms, prices and walking distances before you apply." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Medya ekibimizden", en: "From our media team" })} title={t({ tr: "Yurt odası turları", en: "Dorm room tours" })} sub={t({ tr: "Başvurmadan önce odaları gerçekten gör.", en: "See the rooms for real before you apply." })} />
      <section className="mx-auto max-w-6xl px-5 py-14 grid sm:grid-cols-2 gap-6">
        {dorms.map((d) => (
          <article key={d.name} className="rounded-xl border overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <img src={dorm} alt={d.name} loading="lazy" width={1200} height={800} className="h-full w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="rounded-full bg-gold text-gold-foreground px-4 py-2 text-sm font-bold">▶ {t({ tr: "Video yakında", en: "Video coming soon" })}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-baseline">
                <h2 className="text-2xl">{d.name}</h2>
                <span className="font-bold text-primary">{d.price}</span>
              </div>
              <div className="text-sm text-muted-foreground">{d.area} · {t(d.walk)}</div>
              <p className="mt-2">{t(d.note)}</p>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
