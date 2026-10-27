import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Team & Contact — BocconiTSA" },
      { name: "description", content: "Meet the BocconiTSA board, what we do, and how to reach us on Instagram." },
      { property: "og:title", content: "BocconiTSA — Team & Contact" },
      { property: "og:description", content: "Our mission, our board and how to get in touch." },
    ],
  }),
  component: Page,
});

const INSTAGRAM_DM = "https://ig.me/m/bocconitsa"; // replace with real handle

const pillars = [
  { t: { tr: "Topluluk", en: "Community" }, d: { tr: "Partiler, kahvaltılar, oyun geceleri.", en: "Parties, breakfasts, game nights." } },
  { t: { tr: "Rehberlik", en: "Guidance" }, d: { tr: "Yeni gelenlere bürokrasiden yurda destek.", en: "Helping newcomers from paperwork to housing." } },
  { t: { tr: "Kültür", en: "Culture" }, d: { tr: "Türk kültürünü Bocconi'ye tanıtmak.", en: "Sharing Turkish culture with Bocconi." } },
  { t: { tr: "Kariyer", en: "Career" }, d: { tr: "Mezun ağı ve sektör sohbetleri.", en: "Alumni network and industry talks." } },
];

// Sample board — replace with real members
const board = [
  { name: "Ad Soyad", role: { tr: "Başkan", en: "President" }, program: "BIEM, 3rd year", email: "president@bocconitsa.com", linkedin: "https://linkedin.com" },
  { name: "Ad Soyad", role: { tr: "Başkan Yardımcısı", en: "Vice President" }, program: "BEMACS, 2nd year", email: "vp@bocconitsa.com", linkedin: "https://linkedin.com" },
  { name: "Ad Soyad", role: { tr: "Etkinlik Sorumlusu", en: "Head of Events" }, program: "CLEAM, 2nd year", email: "events@bocconitsa.com", linkedin: "https://linkedin.com" },
  { name: "Ad Soyad", role: { tr: "Medya Sorumlusu", en: "Head of Media" }, program: "BIEF, 2nd year", email: "media@bocconitsa.com", linkedin: "https://linkedin.com" },
  { name: "Ad Soyad", role: { tr: "Sponsorluk Sorumlusu", en: "Head of Partnerships" }, program: "MSc Finance", email: "partners@bocconitsa.com", linkedin: "https://linkedin.com" },
  { name: "Ad Soyad", role: { tr: "Sayman", en: "Treasurer" }, program: "BIEM, 2nd year", email: "treasury@bocconitsa.com", linkedin: "https://linkedin.com" },
];

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("").slice(0, 2);

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero eyebrow="BocconiTSA" title={t({ tr: "Bocconi'deki Türk öğrencilerin evi", en: "The home of Turkish students at Bocconi" })} sub={t({ tr: "BTSA, Bocconi Üniversitesi'ndeki Türk öğrencileri bir araya getiren öğrenci derneğidir.", en: "BTSA is the student association bringing together Turkish students at Bocconi University." })} />
      <Section eyebrow={t({ tr: "Ne yapıyoruz", en: "What we do" })} title={t({ tr: "Dört temel alan", en: "Four pillars" })}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div key={p.t.en} className="rounded-xl bg-muted p-6 border-t-4 border-gold">
              <h3 className="text-2xl">{t(p.t)}</h3>
              <p className="mt-2 text-muted-foreground">{t(p.d)}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section muted eyebrow="Board" title={t({ tr: "Yönetim kurulumuz", en: "Our board" })}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {board.map((m, i) => (
            <article key={i} className="rounded-xl bg-card p-5 flex gap-4 items-start">
              <div className="h-14 w-14 shrink-0 rounded-full bg-primary text-gold grid place-items-center font-display text-xl">{initials(m.name)}</div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-gold">{t(m.role)}</div>
                <h3 className="text-xl">{m.name}</h3>
                <div className="text-xs text-muted-foreground">{m.program}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <a href={`mailto:${m.email}`} className="rounded-full border px-3 py-1 hover:border-gold truncate">✉ {m.email}</a>
                  <a href={m.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-primary text-primary-foreground px-3 py-1">LinkedIn</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <div className="eyebrow">{t({ tr: "İletişim", en: "Contact" })}</div>
            <h2 className="text-3xl mt-1">{t({ tr: "Bize Instagram'dan yaz", en: "Message us on Instagram" })}</h2>
            <p className="opacity-80 mt-1">{t({ tr: "Soruların, iş birlikleri veya ekibe katılmak için DM'lerimiz açık.", en: "Questions, partnerships or joining the team — our DMs are open." })}</p>
          </div>
          <a href={INSTAGRAM_DM} target="_blank" rel="noreferrer" className="rounded-full bg-gold text-gold-foreground px-6 py-3 font-bold">{t({ tr: "DM gönder →", en: "Send a DM →" })}</a>
        </div>
      </section>
    </SiteShell>
  );
}
