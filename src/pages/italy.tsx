import italy from "@/assets/italy.jpg";
import { PageMeta } from "@/components/PageMeta";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";

// Turkish-only: written for Turkish students
const cities = [
  { n: "Firenze", d: "Milano'dan trenle 1s 50dk. Duomo, Uffizi, Piazzale Michelangelo'da gün batımı." },
  { n: "Roma", d: "Kolezyum, Trastevere akşamları, Vatikan." },
  { n: "Venezia", d: "Günübirlik yapılır. Burano'ya da uğra." },
  { n: "Lago di Como", d: "Milano'ya 1 saat. Varenna ve Bellagio." },
  { n: "Cinque Terre", d: "Köyler arası yürüyüş, deniz ve focaccia." },
  { n: "Napoli & Amalfi", d: "Gerçek pizza ve Amalfi kıyıları." },
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
  "Trenitalia & Italo'da öğrenci indirimleri için erken al.",
  "Müzelerin ayın ilk pazarı ücretsiz günlerini takip et.",
  "Kapuçino sadece sabah içilir, öğleden sonra sipariş etme!",
];

export default function Page() {
  return (
    <SiteShell only="tr">
      <PageMeta
        title="İtalya Gezi Rehberi | BocconiTSA"
        description="Bocconi'deki Türk öğrencilerden İtalya'da mutlaka görülecek şehirler, yenecek yemekler ve ipuçları."
        ogTitle="İtalya Gezi Rehberi — BocconiTSA"
        ogDescription="İtalya'da okurken kaçırmaman gereken şehirler, lezzetler ve deneyimler."
      />
      <PageHero img={italy} eyebrow="İtalya rehberi" title="İtalya'dayken kaçırma" />
      <Section eyebrow="Görülecek yerler" title="Mutlaka git">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((c, i) => (
            <div key={c.n} className="rounded-xl border p-6">
              <div className="font-display text-4xl text-gold">0{i + 1}</div>
              <h3 className="text-2xl mt-1">{c.n}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted eyebrow="Yemekler" title="Mutlaka ye">
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
      <Section eyebrow="İpuçları" title="Bilmekte fayda var">
        <ul className="space-y-3">
          {tips.map((x) => <li key={x} className="rounded-lg border-l-4 border-gold bg-muted p-4">{x}</li>)}
        </ul>
      </Section>
    </SiteShell>
  );
}
