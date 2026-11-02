import { PageMeta } from "@/components/PageMeta";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { social } from "@/lib/data";
import { useLang } from "@/lib/i18n";

// The four focus areas from our LinkedIn About section
const pillars = [
  { t: { tr: "Topluluk & Networking", en: "Community & Networking" }, d: { tr: "Üyelerimizi birbirine ve Bocconi topluluğuna bağlıyoruz.", en: "Connecting members with each other and the wider Bocconi community." } },
  { t: { tr: "Kültürel Değişim", en: "Cultural Exchange" }, d: { tr: "Türk geleneklerini Bocconi'ye tanıtıyoruz.", en: "Introducing Turkish traditions to the Bocconi community." } },
  { t: { tr: "Akademik & Kariyer", en: "Academic & Career" }, d: { tr: "Seminerler, atölyeler, profesyoneller ve mezunlarla networking.", en: "Seminars, workshops and networking with professionals and alumni." } },
  { t: { tr: "Öğrenci Hayatı", en: "Student Life" }, d: { tr: "Hoş geldin etkinlikleri ve diğer derneklerle iş birlikleri.", en: "Welcome events and collaborations with other associations." } },
];

const roles = {
  president: { tr: "Başkan", en: "President" },
  media: { tr: "Medya Birimi", en: "Media Division" },
  events: { tr: "Etkinlik Birimi", en: "Events Division" },
  career: { tr: "Kariyer Birimi", en: "Career Division" },
  logistics: { tr: "Lojistik Birimi", en: "Logistics Division" },
  sports: { tr: "Spor Birimi", en: "Sports Division" },
  advisor: { tr: "Danışman", en: "Advisor" },
};

// program, email and linkedin are optional; a linkedin URL makes the name a link
type Member = { name: string; role: { tr: string; en: string }; program?: string; email?: string; linkedin?: string };

const board: Member[] = [
  { name: "Selin Kışkır", role: roles.president, linkedin: "https://www.linkedin.com/in/selinkiskir1/" },
  { name: "Cansu Uyar", role: roles.media, linkedin: "https://www.linkedin.com/in/cansu-uyar-4b47122b6/" },
  { name: "Irmak Akyıldız", role: roles.events, linkedin: "https://www.linkedin.com/in/irmak-akyildiz-966517203/" },
  { name: "Didem Pekağca", role: roles.events, linkedin: "https://www.linkedin.com/in/zeynep-didem-pekagca/" },
  { name: "Zeynep Eylül Öksüz", role: roles.career, linkedin: "https://www.linkedin.com/in/zeynep-eylül-öksüz-b4a4052b3/" },
  { name: "İzlem Yılmaz", role: roles.logistics, linkedin: "https://www.linkedin.com/in/izlemyilmaz/" },
  { name: "Rüya Bekmezci", role: roles.logistics, linkedin: "https://www.linkedin.com/in/ruyabekmezci/" },
  { name: "Ayberk Akarsu", role: roles.sports, linkedin: "https://www.linkedin.com/in/rıza-ayberk-akarsu-459aa026b/" },
  { name: "Elif Necla Akoğlu", role: roles.advisor, linkedin: "https://www.linkedin.com/in/elifneclaakoglu/" },
];

// First and last name, so "Zeynep Eylül Öksüz" is ZÖ
const initials = (n: string) => {
  const parts = n.split(" ");
  return `${parts[0]?.[0] ?? ""}${parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : ""}`;
};

export default function Page() {
  const { t } = useLang();
  return (
    <SiteShell>
      <PageMeta
        title="Team & Contact — BocconiTSA"
        description="Supporting Turkish students at Bocconi with events, networking, and cultural exchange. Meet our board and get in touch."
        ogTitle="BocconiTSA — Team & Contact"
        ogDescription="Our mission, our board and how to get in touch."
      />
      <PageHero eyebrow="BocconiTSA" title={t({ tr: "Bocconi'deki Türk öğrencilerin evi", en: "The home of Turkish students at Bocconi" })} sub={t({ tr: "BTSA, Bocconi'deki Türk öğrencileri ve Türk kültürüne, iş dünyasına ve topluluk hayatına ilgi duyan herkesi bir araya getiren öğrenci derneğidir.", en: "BTSA brings together Turkish students at Bocconi and everyone interested in Turkish culture, business and community life." })} />
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
                <h3 className="text-xl">
                  {m.linkedin ? (
                    <a href={m.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">{m.name}</a>
                  ) : (
                    m.name
                  )}
                </h3>
                <div className="mt-0.5 text-xs font-bold uppercase tracking-wider text-gold">{t(m.role)}</div>
                {m.program && <div className="text-xs text-muted-foreground">{m.program}</div>}
                {m.email && (
                  <a href={`mailto:${m.email}`} className="mt-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold hover:border-gold truncate max-w-full">✉ {m.email}</a>
                )}
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
          <div className="flex flex-wrap gap-3">
            <a href={social.instagramDm} target="_blank" rel="noreferrer" className="rounded-full bg-gold text-gold-foreground px-6 py-3 font-bold">{t({ tr: "DM gönder →", en: "Send a DM →" })}</a>
            <a href={social.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/40 px-6 py-3 font-bold hover:border-gold">LinkedIn</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
