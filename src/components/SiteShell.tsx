import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

const sub101 = [
  { to: "/bocconi-101", tr: "Rehber", en: "Guide" },
  { to: "/bocconi-101/dorm-tours", tr: "Yurt Turları", en: "Dorm Tours" },
  { to: "/bocconi-101/places", tr: "Mekanlar", en: "Places" },
] as const;

const nav = [
  { to: "/", tr: "Etkinlikler", en: "Events" },
  { to: "/bocconi-101", tr: "Bocconi 101", en: "Bocconi 101" },
  { to: "/notes", tr: "Notlar", en: "Notes" },
  { to: "/turkish-culture", tr: "Türk Kültürü", en: "Turkish Culture" },
  { to: "/turkey", tr: "Türkiye", en: "Turkey" },
  { to: "/italy", tr: "İtalya", en: "Italy" },
  { to: "/about", tr: "Biz Kimiz", en: "About" },
  { to: "/contact", tr: "İletişim", en: "Contact" },
] as const;

const linkCls = "opacity-80 hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:text-gold whitespace-nowrap";

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center gap-6">
          <Link to="/" className="font-display text-2xl">
            Bocconi<span className="text-gold">TSA</span>
          </Link>
          <nav className="hidden lg:flex gap-5 text-sm ml-auto items-center">
            {nav.map((n) =>
              n.to === "/bocconi-101" ? (
                <div key={n.to} className="relative group">
                  <Link to={n.to} className={linkCls}>{t(n)} ▾</Link>
                  <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                    <div className="rounded-lg bg-card text-card-foreground shadow-lg border p-2 min-w-44">
                      {sub101.map((s) => (
                        <Link key={s.to} to={s.to} activeOptions={{ exact: true }} className="block rounded px-3 py-2 hover:bg-muted data-[status=active]:text-primary data-[status=active]:font-bold">
                          {t(s)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className={linkCls}>{t(n)}</Link>
              ),
            )}
          </nav>
          <div className="ml-auto lg:ml-0 flex rounded-full border border-primary-foreground/30 text-xs font-bold overflow-hidden">
            {(["tr", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 uppercase ${lang === l ? "bg-gold text-gold-foreground" : ""}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <nav className="lg:hidden flex gap-4 overflow-x-auto px-5 pb-3 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className={linkCls}>{t(n)}</Link>
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
          <div className="flex gap-5 self-center">
            <Link to="/contact" className="hover:text-gold">{t({ tr: "İletişim", en: "Contact" })}</Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gold hover:underline">Instagram →</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Bocconi101Tabs() {
  const { t } = useLang();
  return (
    <div className="border-b bg-card sticky top-16 z-20">
      <div className="mx-auto max-w-6xl px-5 flex gap-6 text-sm font-semibold overflow-x-auto">
        {sub101.map((s) => (
          <Link key={s.to} to={s.to} activeOptions={{ exact: true }} className="py-4 border-b-2 border-transparent text-muted-foreground whitespace-nowrap data-[status=active]:border-gold data-[status=active]:text-primary">
            {t(s)}
          </Link>
        ))}
      </div>
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

export function Section({ eyebrow, title, children, muted }: { eyebrow?: string; title: string; children: ReactNode; muted?: boolean }) {
  return (
    <section className={muted ? "bg-muted" : ""}>
      <div className="mx-auto max-w-6xl px-5 py-14">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="text-4xl mt-2 mb-6">{title}</h2>
        {children}
      </div>
    </section>
  );
}
