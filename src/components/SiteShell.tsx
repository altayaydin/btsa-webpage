import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { social } from "@/lib/data";
import { useLang, type Lang } from "@/lib/i18n";

const sub101 = [
  { to: "/bocconi-101", tr: "Rehber", en: "Guide" },
  { to: "/bocconi-101/dorm-tours", tr: "Yurt Turları", en: "Dorm Tours" },
  { to: "/bocconi-101/places", tr: "Mekanlar", en: "Places" },
  { to: "/bocconi-101/notes", tr: "Ders Notları", en: "Course Notes" },
] as const;

// Single-language pages are written for one audience and are linked only in that language:
// the Italy guide for Turkish students, Travel Türkiye and Turkish Culture for international visitors
const italy = { to: "/italy", tr: "İtalya Gezi", en: "İtalya Gezi", only: "tr" } as const;
const turkey = { to: "/turkey", tr: "Travel Türkiye", en: "Travel Türkiye", only: "en" } as const;
const culture = { to: "/turkish-culture", tr: "Turkish Culture", en: "Turkish Culture", only: "en" } as const;

const forLang = <I extends { to: string; only?: Lang }>(items: readonly I[], lang: Lang) => items.filter((i) => !i.only || i.only === lang);

const nav = [
  { to: "/", tr: "Etkinlikler", en: "Events" },
  { to: "/bocconi-101", tr: "Bocconi 101", en: "Bocconi 101" },
  italy,
  turkey,
  culture,
  { to: "/about", tr: "Ekip & İletişim", en: "Team & Contact" },
] as const;

const linkCls = "opacity-80 hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:text-gold whitespace-nowrap";

// `only` marks a single-language page; visitors in the other language get a notice with a switch
export function SiteShell({ children, only }: { children: ReactNode; only?: Lang }) {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = forLang(nav, lang);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center gap-6">
          <Link to="/" onClick={closeMenu} className="font-display text-2xl">
            Bocconi<span className="text-gold">TSA</span>
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm ml-auto items-center">
            {links.map((n) =>
              n.to === "/bocconi-101" ? (
                <div key={n.to} className="relative group">
                  <Link to={n.to} className={linkCls}>{t(n)} ▾</Link>
                  <div className="absolute left-0 top-full pt-3 hidden group-hover:block group-focus-within:block">
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
          <div className="ml-auto lg:ml-0 shrink-0 flex rounded-full border border-primary-foreground/30 text-xs font-bold overflow-hidden">
            {(["tr", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-3 py-1.5 uppercase ${lang === l ? "bg-gold text-gold-foreground" : ""}`}>
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t({ tr: "Menüyü kapat", en: "Close menu" }) : t({ tr: "Menüyü aç", en: "Open menu" })}
            className="lg:hidden -mr-2 grid h-10 w-10 place-items-center rounded-full hover:bg-primary-foreground/10"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden border-t border-primary-foreground/10 max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <ul className="mx-auto max-w-6xl px-5 py-3">
              {links.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} onClick={closeMenu} activeOptions={{ exact: n.to === "/" }} className="block py-3 text-lg data-[status=active]:text-gold">
                    {t(n)}
                  </Link>
                  {n.to === "/bocconi-101" && (
                    <ul className="mb-2 ml-1 border-l border-primary-foreground/15 pl-4">
                      {sub101.map((s) => (
                        <li key={s.to}>
                          <Link to={s.to} onClick={closeMenu} activeOptions={{ exact: true }} className="block py-2 opacity-75 data-[status=active]:opacity-100 data-[status=active]:text-gold">
                            {t(s)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      {only && only !== lang && (
        <div className="bg-gold text-gold-foreground text-sm">
          <div className="mx-auto max-w-6xl px-5 py-2.5 flex flex-wrap gap-x-4 gap-y-1 items-center justify-between">
            {/* Shown in the visitor's language, which is the other one */}
            <span>
              {only === "en"
                ? "Bu sayfa yabancı ziyaretçilerimiz için hazırlandı, bu yüzden yalnızca İngilizce."
                : "This page is written for Turkish students, so it's only available in Turkish."}
            </span>
            <button onClick={() => setLang(only)} className="font-bold underline underline-offset-2">
              {only === "en" ? "İngilizce'ye geç →" : "Switch to Turkish →"}
            </button>
          </div>
        </div>
      )}
      <main className="flex-1" lang={only}>{children}</main>
      <Footer />
    </div>
  );
}

const explore = [{ to: "/", tr: "Etkinlikler", en: "Events" }, italy, turkey, culture] as const;

const footerLink = "opacity-70 hover:opacity-100 hover:text-gold";

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="bg-ink text-primary-foreground text-sm">
      <div className="mx-auto max-w-6xl px-5 py-12 grid gap-10 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Link to="/" className="font-display text-2xl">
            Bocconi<span className="text-gold">TSA</span>
          </Link>
          <p className="mt-3 max-w-xs opacity-70">
            {t({ tr: "Bocconi'deki Türk öğrencileri etkinlikler, networking ve kültürel değişimle destekliyoruz.", en: "Supporting Turkish students at Bocconi with events, networking and cultural exchange." })}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/25 hover:border-gold hover:text-gold">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/25 hover:border-gold hover:text-gold">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <FooterColumn title="Bocconi 101">
            {sub101.map((s) => (
              <li key={s.to}><Link to={s.to} className={footerLink}>{t(s)}</Link></li>
            ))}
          </FooterColumn>
          <FooterColumn title={t({ tr: "Keşfet", en: "Explore" })}>
            {forLang(explore, lang).map((s) => (
              <li key={s.to}><Link to={s.to} className={footerLink}>{t(s)}</Link></li>
            ))}
          </FooterColumn>
          <FooterColumn title={t({ tr: "İletişim", en: "Contact" })}>
            <li><Link to="/about" className={footerLink}>{t({ tr: "Ekip & İletişim", en: "Team & Contact" })}</Link></li>
            <li><a href={social.instagramDm} target="_blank" rel="noreferrer" className={footerLink}>{t({ tr: "Instagram'dan yaz", en: "Message us on Instagram" })}</a></li>
            <li><a href={social.linkedin} target="_blank" rel="noreferrer" className={footerLink}>LinkedIn</a></li>
          </FooterColumn>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-6xl px-5 py-5 flex flex-wrap gap-3 items-center justify-between text-xs opacity-60">
          <span>© {new Date().getFullYear()} {t({ tr: "Bocconi Türk Öğrenciler Derneği", en: "Bocconi Turkish Students Association" })} · Milano</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-gold">
            ↑ {t({ tr: "Başa dön", en: "Back to top" })}
          </button>
        </div>
      </div>
    </footer>
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

export function Segmented<V extends string>({ value, onChange, options }: { value: V; onChange: (v: V) => void; options: { value: V; label: string }[] }) {
  return (
    <div className="inline-flex rounded-full border bg-card p-1 text-sm font-semibold">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} aria-pressed={value === o.value} className={`rounded-full px-4 py-1.5 ${value === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Filter chips: one swipeable row on phones, wrapping from sm up
export function ChipRow({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible [&>*]:shrink-0">{children}</div>;
}
