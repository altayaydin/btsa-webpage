import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import culture from "@/assets/culture.jpg";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/turkish-culture")({
  head: () => ({
    meta: [
      { title: "Turkish Culture — Food, Traditions, Words | BocconiTSA" },
      { name: "description", content: "A fun, visual look at Turkish culture: tea, simit, nazar, coffee fortunes, holidays and words to learn." },
      { property: "og:title", content: "Discover Turkish Culture — BocconiTSA" },
      { property: "og:description", content: "Food, traditions, music and Turkish words for our international friends." },
    ],
  }),
  component: Page,
});

const foods = [
  { e: "🫖", n: "Çay", d: { tr: "Günde 5 bardak normaldir. İnce belli bardakta içilir.", en: "5 glasses a day is normal. Served in tulip-shaped glasses." } },
  { e: "🥯", n: "Simit", d: { tr: "Susamlı, çıtır, sokak kahvaltısının kralı.", en: "Sesame-crusted, crunchy, king of street breakfast." } },
  { e: "🍯", n: "Baklava", d: { tr: "Kat kat yufka, fıstık ve şerbet.", en: "Layers of filo, pistachio and syrup." } },
  { e: "🍳", n: "Menemen", d: { tr: "Domates, biber, yumurta. Soğanlı mı soğansız mı? Büyük tartışma.", en: "Tomato, pepper, egg. With onion or without? Big debate." } },
];
const traditions = [
  { e: "🧿", n: "Nazar", d: { tr: "Kem gözlere karşı mavi boncuk.", en: "Blue bead against the evil eye." } },
  { e: "☕", n: { tr: "Kahve falı", en: "Coffee fortune" }, d: { tr: "Türk kahvesinden sonra fincan kapatılır, gelecek okunur.", en: "After Turkish coffee, the cup is flipped and the future is read." } },
  { e: "🍬", n: { tr: "Bayramlar", en: "Bayram" }, d: { tr: "Büyüklerin eli öpülür, çocuklara harçlık verilir.", en: "Kiss elders' hands, kids get pocket money." } },
  { e: "🎶", n: { tr: "Müzik", en: "Music" }, d: { tr: "Bağlamadan Tarkan'a, Barış Manço'dan Sezen Aksu'ya.", en: "From bağlama to Tarkan, Barış Manço to Sezen Aksu." } },
];
const words = [
  { w: "Merhaba", m: "Hello" },
  { w: "Teşekkürler", m: "Thank you" },
  { w: "Afiyet olsun", m: "Enjoy your meal" },
  { w: "Kolay gelsin", m: "May it be easy (to someone working)" },
  { w: "Şerefe", m: "Cheers" },
  { w: "Maşallah", m: "Wonderful! (and protects from nazar)" },
];

function Page() {
  const { t } = useLang();
  const [flip, setFlip] = useState<number | null>(null);
  const label = (n: string | { tr: string; en: string }) => (typeof n === "string" ? n : t(n));
  return (
    <SiteShell>
      <PageHero img={culture} eyebrow={t({ tr: "Türk kültürü", en: "Turkish culture" })} title={t({ tr: "Türkiye'ye yakından bakın", en: "Take a closer look at Türkiye" })} sub={t({ tr: "Yabancı arkadaşlarımız için geleneklerimiz, lezzetlerimiz ve kelimelerimiz.", en: "Our traditions, flavours and words for our international friends." })} />
      <Section eyebrow={t({ tr: "Lezzetler", en: "Flavours" })} title={t({ tr: "Mutlaka denemelisin", en: "You have to try" })}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foods.map((f) => (
            <div key={f.n} className="rounded-xl border p-6 hover:-translate-y-1 transition-transform">
              <div className="text-5xl">{f.e}</div>
              <h3 className="text-2xl mt-3">{f.n}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t(f.d)}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted eyebrow={t({ tr: "Gelenekler", en: "Traditions" })} title={t({ tr: "Bizde böyle", en: "How we do it" })}>
        <div className="grid sm:grid-cols-2 gap-4">
          {traditions.map((f, i) => (
            <div key={i} className="rounded-xl bg-primary text-primary-foreground p-6 flex gap-4">
              <div className="text-4xl">{f.e}</div>
              <div>
                <h3 className="text-2xl text-gold">{label(f.n)}</h3>
                <p className="opacity-85 mt-1">{t(f.d)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow={t({ tr: "Biraz Türkçe", en: "A bit of Turkish" })} title={t({ tr: "Kelimeyi çevir", en: "Flip the word" })}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((w, i) => (
            <button key={w.w} onClick={() => setFlip(flip === i ? null : i)} className={`rounded-xl p-6 min-h-28 text-left transition-colors ${flip === i ? "bg-gold text-gold-foreground" : "bg-muted"}`}>
              <div className="font-display text-2xl">{flip === i ? w.m : w.w}</div>
              <div className="text-xs mt-2 opacity-70">{flip === i ? w.w : t({ tr: "Çevirmek için dokun", en: "Tap to flip" })}</div>
            </button>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
