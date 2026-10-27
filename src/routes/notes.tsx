import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Course Notes — BocconiTSA" },
      { name: "description", content: "Course notes shared by Turkish students at Bocconi, filtered by year and course." },
      { property: "og:title", content: "Bocconi Course Notes — BocconiTSA" },
      { property: "og:description", content: "Find and share lecture notes for Bocconi courses." },
    ],
  }),
  component: Page,
});

// Sample notes
const notes = [
  { course: "Microeconomics", year: 1, author: "Elif K.", pages: 42, term: "2025/26" },
  { course: "Mathematics", year: 1, author: "Can D.", pages: 65, term: "2025/26" },
  { course: "Accounting", year: 1, author: "Zeynep A.", pages: 30, term: "2024/25" },
  { course: "Statistics", year: 2, author: "Mert Y.", pages: 51, term: "2025/26" },
  { course: "Corporate Finance", year: 2, author: "Deniz Ö.", pages: 38, term: "2025/26" },
  { course: "Macroeconomics", year: 2, author: "Ayşe T.", pages: 47, term: "2024/25" },
  { course: "Econometrics", year: 3, author: "Kerem B.", pages: 56, term: "2025/26" },
  { course: "Business Strategy", year: 3, author: "Selin G.", pages: 24, term: "2024/25" },
];

function Page() {
  const { t } = useLang();
  const [year, setYear] = useState<number | 0>(0);
  const [q, setQ] = useState("");
  const list = notes.filter((n) => (!year || n.year === year) && n.course.toLowerCase().includes(q.toLowerCase()));
  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Not paylaşımı", en: "Notes sharing" })} title={t({ tr: "Ders notları", en: "Course notes" })} sub={t({ tr: "Birbirimize destek olalım. Notlarını paylaş, başkalarınınkini bul.", en: "Help each other out. Share your notes, find others'." })} />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-lg bg-accent text-accent-foreground p-4 text-sm mb-6">
          {t({ tr: "Yakında: Notlarını doğrudan siteden yükleyebileceksin. Şimdilik bize e-postayla gönder.", en: "Coming soon: upload your notes directly. For now, send them to us by email." })}
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ tr: "Ders ara…", en: "Search course…" })} className="h-10 rounded-full border px-4 flex-1 min-w-48 bg-background" />
          {[0, 1, 2, 3].map((y) => (
            <button key={y} onClick={() => setYear(y)} className={`h-10 rounded-full px-4 text-sm font-semibold border ${year === y ? "bg-primary text-primary-foreground border-primary" : ""}`}>
              {y === 0 ? t({ tr: "Tümü", en: "All" }) : t({ tr: `${y}. sınıf`, en: `Year ${y}` })}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((n) => (
            <article key={n.course} className="rounded-xl border p-5 flex flex-col">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-gold">{t({ tr: `${n.year}. sınıf`, en: `Year ${n.year}` })}</span>
                <span className="text-muted-foreground">{n.term}</span>
              </div>
              <h2 className="text-2xl mt-2">{n.course}</h2>
              <p className="text-sm text-muted-foreground mt-1">{n.author} · {n.pages} {t({ tr: "sayfa", en: "pages" })}</p>
              <button disabled className="mt-4 self-start rounded-full border px-4 py-1.5 text-sm opacity-60">PDF · {t({ tr: "yakında", en: "soon" })}</button>
            </article>
          ))}
          {!list.length && <p className="text-muted-foreground">{t({ tr: "Sonuç yok.", en: "No results." })}</p>}
        </div>
      </section>
    </SiteShell>
  );
}
