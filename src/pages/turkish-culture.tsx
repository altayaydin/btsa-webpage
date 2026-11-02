import { useState } from "react";
import culture from "@/assets/culture.jpg";
import { PageMeta } from "@/components/PageMeta";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";

// English-only: written for international visitors
const foods = [
  { e: "🫖", n: "Çay", d: "5 glasses a day is normal. Served in tulip-shaped glasses." },
  { e: "🥯", n: "Simit", d: "Sesame-crusted, crunchy, king of street breakfast." },
  { e: "🍯", n: "Baklava", d: "Layers of filo, pistachio and syrup." },
  { e: "🍳", n: "Menemen", d: "Tomato, pepper, egg. With onion or without? Big debate." },
];
const traditions = [
  { e: "🧿", n: "Nazar", d: "Blue bead against the evil eye." },
  { e: "☕", n: "Coffee fortune", d: "After Turkish coffee, the cup is flipped and the future is read." },
  { e: "🍬", n: "Bayram", d: "Kiss elders' hands, kids get pocket money." },
  { e: "🎶", n: "Music", d: "From bağlama to Tarkan, Barış Manço to Sezen Aksu." },
];
const words = [
  { w: "Merhaba", m: "Hello" },
  { w: "Teşekkürler", m: "Thank you" },
  { w: "Afiyet olsun", m: "Enjoy your meal" },
  { w: "Kolay gelsin", m: "May it be easy (to someone working)" },
  { w: "Şerefe", m: "Cheers" },
  { w: "Maşallah", m: "Wonderful! (and protects from nazar)" },
];

export default function Page() {
  const [flip, setFlip] = useState<number | null>(null);
  return (
    <SiteShell only="en">
      <PageMeta
        title="Turkish Culture — Food, Traditions, Words | BocconiTSA"
        description="A fun, visual look at Turkish culture: tea, simit, nazar, coffee fortunes, holidays and words to learn."
        ogTitle="Discover Turkish Culture — BocconiTSA"
        ogDescription="Food, traditions, music and Turkish words for our international friends."
      />
      <PageHero img={culture} eyebrow="Turkish culture" title="Take a closer look at Türkiye" sub="Our traditions, flavours and words for our international friends." />
      <Section eyebrow="Flavours" title="You have to try">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {foods.map((f) => (
            <div key={f.n} className="rounded-xl border p-6 hover:-translate-y-1 transition-transform">
              <div className="text-5xl">{f.e}</div>
              <h3 className="text-2xl mt-3">{f.n}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted eyebrow="Traditions" title="How we do it">
        <div className="grid sm:grid-cols-2 gap-4">
          {traditions.map((f) => (
            <div key={f.n} className="rounded-xl bg-primary text-primary-foreground p-6 flex gap-4">
              <div className="text-4xl">{f.e}</div>
              <div>
                <h3 className="text-2xl text-gold">{f.n}</h3>
                <p className="opacity-85 mt-1">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="A bit of Turkish" title="Flip the word">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((w, i) => (
            <button key={w.w} onClick={() => setFlip(flip === i ? null : i)} className={`rounded-xl p-6 min-h-28 text-left transition-colors ${flip === i ? "bg-gold text-gold-foreground" : "bg-muted"}`}>
              <div className="font-display text-2xl">{flip === i ? w.m : w.w}</div>
              <div className="text-xs mt-2 opacity-70">{flip === i ? w.w : "Tap to flip"}</div>
            </button>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
