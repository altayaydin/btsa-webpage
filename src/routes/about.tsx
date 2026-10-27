import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BocconiTSA — Who We Are" },
      { name: "description", content: "Meet the Bocconi Turkish Students Association: our mission, activities and team." },
      { property: "og:title", content: "About BocconiTSA" },
      { property: "og:description", content: "The community of Turkish students at Bocconi University, Milan." },
    ],
  }),
  component: Page,
});

const pillars = [
  { t: { tr: "Topluluk", en: "Community" }, d: { tr: "Partiler, kahvaltılar, oyun geceleri.", en: "Parties, breakfasts, game nights." } },
  { t: { tr: "Rehberlik", en: "Guidance" }, d: { tr: "Yeni gelenlere bürokrasiden yurda destek.", en: "Helping newcomers from paperwork to housing." } },
  { t: { tr: "Kültür", en: "Culture" }, d: { tr: "Türk kültürünü Bocconi'ye tanıtmak.", en: "Sharing Turkish culture with Bocconi." } },
  { t: { tr: "Kariyer", en: "Career" }, d: { tr: "Mezun ağı ve sektör sohbetleri.", en: "Alumni network and industry talks." } },
];

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Biz kimiz", en: "Who we are" })} title={t({ tr: "Bocconi'deki Türk öğrencilerin evi", en: "The home of Turkish students at Bocconi" })} sub={t({ tr: "BTSA, Bocconi Üniversitesi'ndeki Türk öğrencileri bir araya getiren öğrenci derneğidir.", en: "BTSA is the student association bringing together Turkish students at Bocconi University." })} />
      <section className="mx-auto max-w-6xl px-5 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p) => (
          <div key={p.t.en} className="rounded-xl bg-muted p-6 border-t-4 border-gold">
            <h2 className="text-2xl">{t(p.t)}</h2>
            <p className="mt-2 text-muted-foreground">{t(p.d)}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <h2 className="text-3xl">{t({ tr: "Bize katıl", en: "Join us" })}</h2>
            <p className="opacity-80 mt-1">{t({ tr: "Etkinlik duyuruları için Instagram'dan takip et.", en: "Follow us on Instagram for event announcements." })}</p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full bg-gold text-gold-foreground px-6 py-3 font-bold">Instagram</a>
        </div>
      </section>
    </SiteShell>
  );
}
