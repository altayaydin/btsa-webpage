import { lazy, Suspense, useRef, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { SiteShell, PageHero, Bocconi101Tabs, ChipRow } from "@/components/SiteShell";
import { placeCats, places, type PlaceCat } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const PlacesMap = lazy(() => import("@/components/PlacesMap"));

const directions = (p: { lat: number; lng: number }) => `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;

export default function Page() {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<PlaceCat | "all">("all");
  const [active, setActive] = useState<string | null>(null);
  const mapBox = useRef<HTMLDivElement>(null);
  const list = places.filter((p) => cat === "all" || p.cat === cat);
  const current = places.find((p) => p.name === active);
  // Below lg the list sits under the map, so bring the map back into view
  const pick = (name: string) => {
    setActive(name);
    if (window.matchMedia("(max-width: 1023px)").matches) mapBox.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const fallback = <div className="h-full w-full bg-muted animate-pulse" />;

  return (
    <SiteShell>
      <PageMeta
        title="Places Around Bocconi — Map | BocconiTSA"
        description="Interactive map of student-approved restaurants, cafés, Turkish food and study spots near Bocconi."
        ogTitle="Map: where to go around Bocconi"
        ogDescription="Our favourite cheap eats, cafés, aperitivo and study spots in Milan, on one map."
      />
      <PageHero eyebrow={t({ tr: "Öğrenci onaylı", en: "Student approved" })} title={t({ tr: "Bocconi etrafında mekanlar", en: "Places around Bocconi" })} />
      <Bocconi101Tabs />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-5">
          <ChipRow>
            {(["all", ...Object.keys(placeCats)] as const).map((c) => (
              <button key={c} onClick={() => { setCat(c as PlaceCat | "all"); setActive(null); }} className={`rounded-full border px-4 py-2 text-sm font-semibold ${cat === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-gold"}`}>
                {c === "all" ? t({ tr: "Tümü", en: "All" }) : `${placeCats[c as PlaceCat].emoji} ${t(placeCats[c as PlaceCat])}`}
              </button>
            ))}
          </ChipRow>
        </div>
        <div className="grid lg:grid-cols-[1fr_340px] gap-5">
          <div ref={mapBox} className="relative h-[420px] sm:h-[480px] lg:h-[600px] rounded-xl overflow-hidden border">
            <Suspense fallback={fallback}>
              <PlacesMap visible={list.map((p) => p.name)} active={active} onSelect={setActive} lang={lang} />
            </Suspense>
            {/* Below lg the list is out of sight, so show the picked place on the map */}
            {current && (
              <div className="lg:hidden absolute inset-x-3 bottom-3 z-10 rounded-lg bg-card p-4 shadow-lg border">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-gold">{placeCats[current.cat].emoji} {t(placeCats[current.cat])} · {current.price}</div>
                    <div className="font-display text-xl mt-0.5">{current.name}</div>
                  </div>
                  <button onClick={() => setActive(null)} aria-label={t({ tr: "Kapat", en: "Close" })} className="self-start opacity-60">✕</button>
                </div>
                <p className="text-sm text-muted-foreground">{t(current.tip)}</p>
                <a href={directions(current)} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm font-bold text-primary">
                  {t({ tr: "Yol tarifi →", en: "Directions →" })}
                </a>
              </div>
            )}
          </div>
          <ul className="space-y-2 lg:h-[600px] lg:overflow-y-auto lg:pr-1">
            {list.map((p) => (
              <li key={p.name}>
                <button onClick={() => pick(p.name)} className={`w-full text-left rounded-lg border p-4 transition-colors ${active === p.name ? "bg-primary text-primary-foreground border-primary" : "hover:border-gold"}`}>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-gold">{placeCats[p.cat].emoji} {t(placeCats[p.cat])}</span>
                    <span className="opacity-70">{p.price}</span>
                  </div>
                  <div className="font-display text-xl mt-1">{p.name}</div>
                  <p className="text-sm opacity-75">{t(p.tip)}</p>
                  {active === p.name && (
                    <a href={directions(p)} target="_blank" rel="noreferrer" className="inline-block mt-2 text-xs font-bold text-gold">
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
