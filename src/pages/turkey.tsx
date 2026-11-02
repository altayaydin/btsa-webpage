import turkey from "@/assets/turkey.jpg";
import { PageMeta } from "@/components/PageMeta";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";

// English-only: written for international visitors. Sample recommendation lists
const cities = [
  { city: "İstanbul", by: "Elif", picks: ["Breakfast in Karaköy", "Sunset at Moda, Kadıköy", "Ferry to the Princes' Islands", "Streets of Balat"] },
  { city: "Antalya", by: "Ahmet", picks: ["Kaputaş beach", "Evening in Kaleiçi", "Düden waterfalls", "Treehouse stay in Olympos"] },
  { city: "Cappadocia", by: "Zeynep", picks: ["Sunrise balloon ride", "Hike in Red Valley", "A night in a cave hotel", "Pottery kebab"] },
  { city: "İzmir", by: "Can", picks: ["Walk along Kordon", "Streets of Alaçatı", "Boyoz & gevrek breakfast", "Şirince village"] },
  { city: "Bodrum", by: "Deniz", picks: ["Sunset in Gümüşlük", "Boat tour", "Yalıkavak marina", "Bodrum Castle"] },
  { city: "Black Sea", by: "Mert", picks: ["Uzungöl lake", "Ayder plateau", "Tea gardens of Rize", "Sumela Monastery"] },
];

export default function Page() {
  return (
    <SiteShell only="en">
      <PageMeta
        title="Travel Türkiye — Student Picks | BocconiTSA"
        description="Where young people actually go in Türkiye: Istanbul, Antalya, Cappadocia, İzmir and more, with our members' personal lists."
        ogTitle="Travel Türkiye — BocconiTSA Student Picks"
        ogDescription="Real recommendations from Turkish students, not boring guidebooks."
      />
      <PageHero img={turkey} eyebrow="Travel Türkiye" title="Where do young people really go?" sub="Our members' personal lists instead of boring guidebooks." />
      <Section eyebrow="Our lists" title="City by city">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((c) => (
            <article key={c.city} className="rounded-xl border p-6">
              <h3 className="text-3xl">{c.city}</h3>
              <div className="eyebrow mt-1">{c.by}'s list</div>
              <ol className="mt-4 space-y-2">
                {c.picks.map((p, i) => (
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
          <div className="font-display text-3xl mt-2">Official tourism site for all of Türkiye's beauty →</div>
        </a>
      </section>
    </SiteShell>
  );
}
