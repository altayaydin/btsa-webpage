import { createFileRoute, Link } from "@tanstack/react-router";
import milan from "@/assets/milan.jpg";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/bocconi-101/")({
  head: () => ({
    meta: [
      { title: "Bocconi 101 — Newcomer Guide | BocconiTSA" },
      { name: "description", content: "Everything new Turkish students need to know about Bocconi and life in Italy." },
      { property: "og:title", content: "Bocconi 101 — Newcomer Guide" },
      { property: "og:description", content: "Codice fiscale, permesso di soggiorno, housing, transport and campus life." },
    ],
  }),
  component: Page,
});

const sections = [
  { title: { tr: "İtalya'ya varmadan önce", en: "Before you arrive" }, items: [
    { tr: "Öğrenci vizesi (Tip D) randevusunu erken al.", en: "Book your student visa (Type D) appointment early." },
    { tr: "Codice fiscale'i konsolosluktan veya geldikten sonra al.", en: "Get your codice fiscale from the consulate or after arrival." },
    { tr: "İlk ay için konaklamanı garantile.", en: "Secure housing for at least the first month." },
  ]},
  { title: { tr: "İlk hafta", en: "First week" }, items: [
    { tr: "8 gün içinde Permesso di Soggiorno başvurusu (posta kiti).", en: "Apply for the Permesso di Soggiorno within 8 days (post office kit)." },
    { tr: "ATM öğrenci aboneliği: aylık ~22 €.", en: "ATM student transit pass: ~€22/month." },
    { tr: "Bir İtalyan SIM kartı ve banka hesabı aç.", en: "Get an Italian SIM and open a bank account." },
  ]},
  { title: { tr: "Bocconi'de", en: "At Bocconi" }, items: [
    { tr: "you@B uygulamasını ve e-postanı kur.", en: "Set up the you@B app and your email." },
    { tr: "Kütüphane ve çalışma odalarını uygulamadan rezerve et.", en: "Book library and study rooms through the app." },
    { tr: "Sınav kayıtları zamanında yapılmalı — tarihleri kaçırma!", en: "Exam registration has deadlines — don't miss them!" },
  ]},
  { title: { tr: "Günlük hayat", en: "Daily life" }, items: [
    { tr: "Market: Esselunga, Carrefour, Lidl.", en: "Groceries: Esselunga, Carrefour, Lidl." },
    { tr: "Pazar günleri çoğu dükkân kapalı olabilir.", en: "Many shops may be closed on Sundays." },
    { tr: "Doktor için medico di base kaydı yaptır.", en: "Register with a medico di base (GP)." },
  ]},
];

function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageHero img={milan} eyebrow="Bocconi 101" title={t({ tr: "Yeni gelenler için rehber", en: "The newcomer's guide" })} sub={t({ tr: "İtalya'ya ve Bocconi'ye ilk adımın için bilmen gerekenler.", en: "What you need for your first steps in Italy and at Bocconi." })} />
      <section className="mx-auto max-w-6xl px-5 py-14 grid md:grid-cols-2 gap-6">
        {sections.map((s, i) => (
          <div key={i} className="rounded-xl border p-6">
            <div className="font-display text-5xl text-gold">0{i + 1}</div>
            <h2 className="text-2xl mt-2">{t(s.title)}</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {s.items.map((it, j) => <li key={j} className="flex gap-2"><span className="text-gold">●</span>{t(it)}</li>)}
            </ul>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 grid sm:grid-cols-2 gap-4">
        <Link to="/bocconi-101/dorm-tours" className="rounded-xl bg-primary text-primary-foreground p-6 hover:opacity-95">
          <div className="eyebrow">→</div><div className="font-display text-2xl">{t({ tr: "Yurt turlarını izle", en: "Watch dorm tours" })}</div>
        </Link>
        <Link to="/bocconi-101/places" className="rounded-xl bg-gold text-gold-foreground p-6 hover:opacity-95">
          <div className="text-xs font-bold">→</div><div className="font-display text-2xl">{t({ tr: "Kampüs çevresi mekanlar", en: "Places around campus" })}</div>
        </Link>
      </section>
    </SiteShell>
  );
}
