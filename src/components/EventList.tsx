import { useState } from "react";
import { Segmented } from "@/components/SiteShell";
import { groupByMonth } from "@/lib/content";
import { linkLabel, tagColor, tagLabel, todayKey, type EventItem } from "@/lib/events";
import { useLang } from "@/lib/i18n";

export function DateBadge({ day }: { day: Date }) {
  const { lang } = useLang();
  return (
    <div className="w-14 shrink-0 self-start rounded-md bg-primary text-primary-foreground text-center py-1">
      <div className="font-display text-2xl leading-tight">{day.getDate()}</div>
      <div className="text-[10px] uppercase text-gold font-bold">{day.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { month: "short" })}</div>
    </div>
  );
}

export function EventList({ events }: { events: EventItem[] }) {
  const { lang, t } = useLang();
  const [when, setWhen] = useState<"upcoming" | "past">("upcoming");
  const locale = lang === "tr" ? "tr-TR" : "en-GB";
  const today = todayKey();
  // Upcoming soonest first, past most recent first
  const shown = when === "upcoming" ? events.filter((e) => e.date >= today) : events.filter((e) => e.date < today).reverse();

  return (
    <div className="rounded-xl border bg-card p-4 md:p-6">
      <Segmented
        value={when}
        onChange={setWhen}
        options={[
          { value: "upcoming", label: t({ tr: "Yaklaşan", en: "Upcoming" }) },
          { value: "past", label: t({ tr: "Geçmiş", en: "Past" }) },
        ]}
      />
      {groupByMonth(shown).map((g) => (
        <section key={g.key} className="mt-6">
          <h3 className="text-xl capitalize border-b pb-2 mb-3">{g.month.toLocaleDateString(locale, { month: "long", year: "numeric" })}</h3>
          <ul className="space-y-3">
            {g.items.map((e) => (
              <li key={e.id} className="flex gap-4">
                <DateBadge day={e.day} />
                <div className="min-w-0">
                  <div className="font-semibold text-lg leading-snug">{t(e.name)}</div>
                  <div className="text-sm text-muted-foreground">
                    {e.day.toLocaleDateString(locale, { weekday: "long" })}
                    {e.time && ` · ${e.time}`}
                    {" · "}
                    <a href={e.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">📍 {e.location.name}</a>
                  </div>
                  {e.description && <p className="text-sm mt-1">{t(e.description)}</p>}
                  {e.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.tags.map((tag) => (
                        <span key={tag} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tagColor(tag)}`}>{t(tagLabel(tag))}</span>
                      ))}
                    </div>
                  )}
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noreferrer" className="mt-2 inline-block rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm font-bold hover:bg-primary/90">{t(linkLabel(e))}</a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {!shown.length && (
        <p className="mt-6 text-muted-foreground">
          {when === "upcoming" ? t({ tr: "Yakında yeni etkinlikler.", en: "New events coming soon." }) : t({ tr: "Henüz geçmiş etkinlik yok.", en: "No past events yet." })}
        </p>
      )}
    </div>
  );
}
