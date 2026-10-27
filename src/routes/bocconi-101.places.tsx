import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { SiteShell, PageHero, Bocconi101Tabs } from "@/components/SiteShell";
import { placeCats, places, type PlaceCat } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const PlacesMap = lazy(() => import("@/components/PlacesMap"));

export const Route = createFileRoute("/bocconi-101/places")({
  head: () => ({
    meta: [
      { title: "Places Around Bocconi — Map | BocconiTSA" },
      { name: "description", content: "Interactive map of student-approved restaurants, cafés, Turkish food and study spots near Bocconi." },
      { property: "og:title", content: "Map: where to go around Bocconi" },
      { property: "og:description", content: "Our favourite cheap eats, cafés, aperitivo and study spots in Milan, on one map." },
    ],
  }),
  component: Page,
});

function Page() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<PlaceCat | "all">("all");
  const [active, setActive] = useState<string | null>(null);
  const list = places.filter((p) => cat === "all" || p.cat === cat);
  const fallback = <div className="h-full w-full bg-muted animate-pulse" />;

  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Öğrenci onaylı", en: "Student approved" })} title={t({ tr: "Bocconi etrafında mekanlar", en: "Places around Bocconi" })} />
      <Bocconi101Tabs />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap gap-2 mb-5">
          {(["all", ...Object.keys(placeCats)] as const).map((c) => (
            <button key={c} onClick={() => { setCat(c as PlaceCat | "all"); setActive(null); }} className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-gold"}`}>
              {c === "all" ? t({ tr: "Tümü", en: "All" }) : `${placeCats[c as PlaceCat].emoji} ${t(placeCats[c as PlaceCat])}`}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-[1fr_340px] gap-5">
          <div className="relative h-[480px] lg:h-[600px] rounded-xl overflow-hidden border">
            <ClientOnly fallback={fallback}>
              <Suspense fallback={fallback}>
                <PlacesMap visible={list.map((p) => p.name)} active={active} onSelect={setActive} lang={lang} />
              </Suspense>
            </ClientOnly>
          </div>
          <ul className="space-y-2 lg:h-[600px] lg:overflow-y-auto pr-1">
            {list.map((p) => (
              <li key={p.name}>
                <button onClick={() => setActive(p.name)} className={`w-full text-left rounded-lg border p-4 transition-colors ${active === p.name ? "bg-primary text-primary-foreground border-primary" : "hover:border-gold"}`}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-gold">{placeCats[p.cat].emoji} {t(placeCats[p.cat])}</span>
                    <span className="opacity-70">{p.price}</span>
                  </div>
                  <div className="font-display text-xl mt-1">{p.name}</div>
                  <p className="text-sm opacity-75">{t(p.tip)}</p>
                  {active === p.name && (
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-bold text-gold">
                      {t({ tr: "Yol tarifi →", en: "Directions →" })}
                    </a>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
