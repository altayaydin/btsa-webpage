import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { places } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/bocconi-101/places")({
  head: () => ({
    meta: [
      { title: "Places Around Bocconi — Food & Cafés | BocconiTSA" },
      { name: "description", content: "Student-approved restaurants, cafés and aperitivo spots near Bocconi." },
      { property: "og:title", content: "Where to eat around Bocconi" },
      { property: "og:description", content: "Our favourite cheap eats, cafés and evening spots in Milan." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Öğrenci onaylı", en: "Student approved" })} title={t({ tr: "Bocconi etrafında mekanlar", en: "Places around Bocconi" })} />
      <section className="mx-auto max-w-6xl px-5 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {places.map((p) => (
          <article key={p.name} className="rounded-xl border p-6 hover:border-gold transition-colors">
            <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
              <span className="text-gold">{t(p.cat)}</span><span className="text-muted-foreground">{p.price}</span>
            </div>
            <h2 className="text-2xl mt-2">{p.name}</h2>
            <p className="mt-2 text-muted-foreground">{t(p.tip)}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
