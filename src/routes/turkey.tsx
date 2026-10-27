import { createFileRoute } from "@tanstack/react-router";
import turkey from "@/assets/turkey.jpg";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/turkey")({
  head: () => ({
    meta: [
      { title: "Travel Türkiye — Student Picks | BocconiTSA" },
      { name: "description", content: "Where young people actually go in Türkiye: Istanbul, Antalya, Cappadocia, İzmir and more, with our members' personal lists." },
      { property: "og:title", content: "Travel Türkiye — BocconiTSA Student Picks" },
      { property: "og:description", content: "Real recommendations from Turkish students, not boring guidebooks." },
    ],
  }),
  component: Page,
});

// Sample recommendation lists
const cities = [
  { city: "İstanbul", by: "Elif", picks: { tr: ["Karaköy'de kahvaltı", "Kadıköy Moda sahili gün batımı", "Vapurla Adalar", "Balat sokakları"], en: ["Breakfast in Karaköy", "Sunset at Moda, Kadıköy", "Ferry to the Princes' Islands", "Streets of Balat"] } },
  { city: "Antalya", by: "Ahmet", picks: { tr: ["Kaputaş plajı", "Kaleiçi'nde akşam", "Düden şelalesi", "Olimpos'ta ağaç ev"], en: ["Kaputaş beach", "Evening in Kaleiçi", "Düden waterfalls", "Treehouse stay in Olympos"] } },
  { city: "Kapadokya", by: "Zeynep", picks: { tr: ["Gün doğumu balon turu", "Kızılçukur vadisinde yürüyüş", "Mağara otelde bir gece", "Testi kebabı"], en: ["Sunrise balloon ride", "Hike in Red Valley", "A night in a cave hotel", "Pottery kebab"] } },
  { city: "İzmir", by: "Can", picks: { tr: ["Kordon'da yürüyüş", "Alaçatı sokakları", "Boyoz & gevrek kahvaltı", "Şirince köyü"], en: ["Walk along Kordon", "Streets of Alaçatı", "Boyoz & gevrek breakfast", "Şirince village"] } },
  { city: "Bodrum", by: "Deniz", picks: { tr: ["Gümüşlük'te gün batımı", "Tekne turu", "Yalıkavak marina", "Bodrum Kalesi"], en: ["Sunset in Gümüşlük", "Boat tour", "Yalıkavak marina", "Bodrum Castle"] } },
  { city: "Karadeniz", by: "Mert", picks: { tr: ["Uzungöl", "Ayder yaylası", "Rize'de çay bahçeleri", "Sümela Manastırı"], en: ["Uzungöl lake", "Ayder plateau", "Tea gardens of Rize", "Sumela Monastery"] } },
];

function Page() {
  const { lang, t } = useLang();
  return (
    <SiteShell>
      <PageHero img={turkey} eyebrow={t({ tr: "Türkiye'yi gez", en: "Travel Türkiye" })} title={t({ tr: "Gençler gerçekten nereye gidiyor?", en: "Where do young people really go?" })} sub={t({ tr: "Sıkıcı rehber kitapları yerine üyelerimizin kişisel listeleri.", en: "Our members' personal lists instead of boring guidebooks." })} />
      <Section eyebrow={t({ tr: "Bizim listelerimiz", en: "Our lists" })} title={t({ tr: "Şehir şehir öneriler", en: "City by city" })}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((c) => (
            <article key={c.city} className="rounded-xl border p-6">
              <h3 className="text-3xl">{c.city}</h3>
              <div className="eyebrow mt-1">{t({ tr: `${c.by}'in listesi`, en: `${c.by}'s list` })}</div>
              <ol className="mt-4 space-y-2">
                {c.picks[lang].map((p, i) => (
                  <li key={p} className="flex gap-3"><span className="font-display text-gold">{i + 1}</span>{p}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <a href="https://goturkiye.com" target="_blank" rel="noreferrer" className="block rounded-xl bg-primary text-primary-foreground p-8 md:p-12 hover:opacity-95">
          <div className="eyebrow">goturkiye.com</div>
          <div className="font-display text-3xl mt-2">{t({ tr: "Türkiye'nin tüm güzellikleri için resmi turizm sitesi →", en: "Official tourism site for all of Türkiye's beauty →" })}</div>
        </a>
      </section>
    </SiteShell>
  );
}
