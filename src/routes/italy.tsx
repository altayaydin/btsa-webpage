import { createFileRoute } from "@tanstack/react-router";
import italy from "@/assets/italy.jpg";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/italy")({
  head: () => ({
    meta: [
      { title: "Italy Travel Guide for Students | BocconiTSA" },
      { name: "description", content: "Must-see cities, must-eat dishes and must-do experiences in Italy, picked by Bocconi students." },
      { property: "og:title", content: "Italy Guide — BocconiTSA" },
      { property: "og:description", content: "Cities, food and experiences you shouldn't miss while studying in Italy." },
    ],
  }),
  component: Page,
});

const cities = [
  { n: "Firenze", d: { tr: "Milano'dan trenle 1s 50dk. Duomo, Uffizi, Piazzale Michelangelo'da gün batımı.", en: "1h50 by train. Duomo, Uffizi, sunset at Piazzale Michelangelo." } },
  { n: "Roma", d: { tr: "Kolezyum, Trastevere akşamları, Vatikan.", en: "Colosseum, Trastevere evenings, the Vatican." } },
  { n: "Venezia", d: { tr: "Günübirlik yapılır. Burano'ya da uğra.", en: "Doable as a day trip. Stop by Burano too." } },
  { n: "Lago di Como", d: { tr: "Milano'ya 1 saat. Varenna ve Bellagio.", en: "1 hour from Milan. Varenna and Bellagio." } },
  { n: "Cinque Terre", d: { tr: "Köyler arası yürüyüş, deniz ve focaccia.", en: "Hikes between villages, sea and focaccia." } },
  { n: "Napoli & Amalfi", d: { tr: "Gerçek pizza ve Amalfi kıyıları.", en: "Real pizza and the Amalfi coast." } },
];
const foods = [
  { e: "🍕", n: "Pizza Napoletana", w: "Napoli" },
  { e: "🍝", n: "Carbonara", w: "Roma" },
  { e: "🍚", n: "Risotto alla Milanese", w: "Milano" },
  { e: "🥩", n: "Bistecca alla Fiorentina", w: "Firenze" },
  { e: "🍨", n: "Gelato", w: "Ovunque" },
  { e: "🍹", n: "Aperitivo + Spritz", w: "Navigli" },
];
const tips = [
  { tr: "Trenitalia & Italo'da öğrenci indirimleri için erken al.", en: "Book Trenitalia & Italo early for cheap fares." },
  { tr: "Müzelerin ayın ilk pazarı ücretsiz günlerini takip et.", en: "Watch for free first-Sunday museum days." },
  { tr: "Kapuçino sadece sabah içilir, öğleden sonra sipariş etme!", en: "Cappuccino is a morning drink — don't order it after lunch!" },
];

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero img={italy} eyebrow={t({ tr: "İtalya rehberi", en: "Italy guide" })} title={t({ tr: "İtalya'dayken kaçırma", en: "Don't miss while you're in Italy" })} />
      <Section eyebrow={t({ tr: "Görülecek yerler", en: "Places to see" })} title={t({ tr: "Mutlaka git", en: "Must go" })}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((c, i) => (
            <div key={c.n} className="rounded-xl border p-6">
              <div className="font-display text-4xl text-gold">0{i + 1}</div>
              <h3 className="text-2xl mt-1">{c.n}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{t(c.d)}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted eyebrow={t({ tr: "Yemekler", en: "Food" })} title={t({ tr: "Mutlaka ye", en: "Must eat" })}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {foods.map((f) => (
            <div key={f.n} className="rounded-xl bg-card p-5">
              <div className="text-4xl">{f.e}</div>
              <div className="font-display text-xl mt-2">{f.n}</div>
              <div className="text-xs text-muted-foreground">{f.w}</div>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow={t({ tr: "İpuçları", en: "Tips" })} title={t({ tr: "Bilmekte fayda var", en: "Good to know" })}>
        <ul className="space-y-3">
          {tips.map((x, i) => <li key={i} className="rounded-lg border-l-4 border-gold bg-muted p-4">{t(x)}</li>)}
        </ul>
      </Section>
    </SiteShell>
  );
}
