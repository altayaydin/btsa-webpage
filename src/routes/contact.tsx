import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BocconiTSA" },
      { name: "description", content: "Get in touch with the Bocconi Turkish Students Association: email, Instagram and team contacts." },
      { property: "og:title", content: "Contact BocconiTSA" },
      { property: "og:description", content: "Questions, partnerships or joining the team — reach out to us." },
    ],
  }),
  component: Page,
});

// Sample team — replace with real names
const team = [
  { role: { tr: "Başkan", en: "President" }, name: "—" },
  { role: { tr: "Etkinlik Ekibi", en: "Events Team" }, name: "—" },
  { role: { tr: "Medya Ekibi", en: "Media Team" }, name: "—" },
  { role: { tr: "Sponsorluk", en: "Partnerships" }, name: "—" },
];

function Page() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const input = "w-full h-11 rounded-md border px-3 bg-background";
  return (
    <SiteShell>
      <PageHero eyebrow={t({ tr: "Bize ulaşın", en: "Contact us" })} title={t({ tr: "Bir mesaj uzağındayız", en: "We're one message away" })} />
      <section className="mx-auto max-w-6xl px-5 py-14 grid lg:grid-cols-2 gap-10">
        <div>
          {sent ? (
            <div className="rounded-xl bg-primary text-primary-foreground p-8">
              <h2 className="text-3xl">{t({ tr: "Teşekkürler!", en: "Thank you!" })}</h2>
              <p className="opacity-80 mt-2">{t({ tr: "Mesajını aldık, en kısa sürede döneceğiz.", en: "We got your message and will reply soon." })}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input required placeholder={t({ tr: "Adın", en: "Your name" })} className={input} />
              <input required type="email" placeholder="Email" className={input} />
              <select className={input}>
                <option>{t({ tr: "Genel soru", en: "General question" })}</option>
                <option>{t({ tr: "Ekibe katılmak", en: "Join the team" })}</option>
                <option>{t({ tr: "Sponsorluk", en: "Partnership" })}</option>
              </select>
              <textarea required rows={5} placeholder={t({ tr: "Mesajın", en: "Your message" })} className="w-full rounded-md border p-3 bg-background" />
              <button className="rounded-full bg-gold text-gold-foreground px-6 py-3 font-bold">{t({ tr: "Gönder", en: "Send" })}</button>
            </form>
          )}
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border p-6">
            <div className="eyebrow">Email</div>
            <a href="mailto:info@bocconitsa.com" className="font-display text-2xl">info@bocconitsa.com</a>
            <div className="eyebrow mt-4">Instagram</div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="font-display text-2xl">@bocconitsa</a>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {team.map((m) => (
              <div key={m.role.en} className="rounded-lg bg-muted p-4">
                <div className="text-xs font-bold uppercase text-gold">{t(m.role)}</div>
                <div className="mt-1">{m.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
