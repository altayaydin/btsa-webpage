import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

const nav = [
  { to: "/", tr: "Etkinlikler", en: "Events" },
  { to: "/bocconi-101", tr: "Bocconi 101", en: "Bocconi 101" },
  { to: "/dorm-tours", tr: "Yurt Turları", en: "Dorm Tours" },
  { to: "/places", tr: "Mekanlar", en: "Places" },
  { to: "/about", tr: "Biz Kimiz", en: "About" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center gap-6">
          <Link to="/" className="font-display text-2xl">
            Bocconi<span className="text-gold">TSA</span>
          </Link>
          <nav className="hidden md:flex gap-5 text-sm ml-auto">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="opacity-80 hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:text-gold">
                {t(n)}
              </Link>
            ))}
          </nav>
          <div className="ml-auto md:ml-0 flex rounded-full border border-primary-foreground/30 text-xs font-bold overflow-hidden">
            {(["tr", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 uppercase ${lang === l ? "bg-gold text-gold-foreground" : ""}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <nav className="md:hidden flex gap-4 overflow-x-auto px-5 pb-3 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} className="whitespace-nowrap opacity-80 data-[status=active]:text-gold data-[status=active]:opacity-100">
              {t(n)}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-ink text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-wrap gap-6 justify-between text-sm">
          <div>
            <div className="font-display text-xl">Bocconi<span className="text-gold">TSA</span></div>
            <p className="opacity-60 mt-1">{t({ tr: "Bocconi Türk Öğrenciler Derneği · Milano", en: "Bocconi Turkish Students Association · Milan" })}</p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gold hover:underline self-center">Instagram →</a>
        </div>
      </footer>
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, img }: { eyebrow: string; title: string; sub?: string; img?: string }) {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      {img && <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      {img && <div className="absolute inset-0 hero-overlay" />}
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-3 text-4xl md:text-6xl max-w-3xl">{title}</h1>
        {sub && <p className="mt-4 max-w-xl opacity-80">{sub}</p>}
      </div>
    </section>
  );
}
