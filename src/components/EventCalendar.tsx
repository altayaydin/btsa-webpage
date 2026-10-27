import { useMemo, useState } from "react";
import { eventColor, linkLabel, tagLabel, todayKey, type EventItem } from "@/lib/events";
import { useLang } from "@/lib/i18n";

export function EventCalendar({ events }: { events: EventItem[] }) {
  const { lang, t } = useLang();
  const [cursor, setCursor] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const locale = lang === "tr" ? "tr-TR" : "en-GB";
  const today = todayKey();
  const dayEvents = selectedDay ? events.filter((e) => e.date === selectedDay) : [];

  const days = useMemo(() => {
    const y = cursor.getFullYear(), m = cursor.getMonth();
    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const count = new Date(y, m + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  }, [cursor]);

  const key = (d: number) => `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2026, 10, 2 + i).toLocaleDateString(locale, { weekday: "short" }));
  const move = (n: number) => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + n, 1));

  return (
    <div className="rounded-xl border bg-card p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => move(-1)} className="h-9 w-9 rounded-full border hover:bg-muted" aria-label="prev">‹</button>
        <h3 className="text-2xl capitalize">{cursor.toLocaleDateString(locale, { month: "long", year: "numeric" })}</h3>
        <button onClick={() => move(1)} className="h-9 w-9 rounded-full border hover:bg-muted" aria-label="next">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-muted-foreground mb-1">
        {weekdays.map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const k = d ? key(d) : "";
          const evs = d ? events.filter((e) => e.date === k) : [];
          return (
            <div
              key={i}
              className={`relative min-h-14 sm:min-h-16 md:min-h-24 rounded-md p-1 text-left ${d ? "bg-muted" : ""} ${k === today ? "ring-2 ring-gold" : ""} ${k && k === selectedDay ? "outline-2 outline-primary" : ""}`}
            >
              {d && <div className={`text-xs font-semibold ${k === today ? "text-foreground" : "text-muted-foreground"}`}>{d}</div>}
              {/* Phones: names don't fit, so show a dot per event and make the whole day tappable */}
              {evs.length > 0 && (
                <button onClick={() => setSelectedDay(k)} aria-label={`${d}: ${evs.map((e) => t(e.name)).join(", ")}`} className="sm:hidden absolute inset-0 flex items-end justify-center gap-1 pb-2">
                  {/* border colour only shows on the pale colours, which carry a border */}
                  {evs.map((e) => <span key={e.id} className={`h-2.5 w-2.5 rounded-full border-muted-foreground ${eventColor(e)}`} />)}
                </button>
              )}
              {evs.map((e) => (
                <button key={e.id} onClick={() => setSelectedDay(k)} className={`hidden sm:block mt-1 w-full truncate rounded px-1 py-0.5 text-[10px] md:text-xs font-semibold text-left ${eventColor(e)}`}>
                  {t(e.name)}
                </button>
              ))}
            </div>
          );
        })}
      </div>
      {dayEvents.length > 0 && (
        <div className="mt-4 rounded-lg bg-primary text-primary-foreground p-4 flex justify-between gap-4">
          <div className="space-y-5 min-w-0">
            {dayEvents.map((e) => (
              <div key={e.id}>
                <div className="eyebrow">
                  {e.day.toLocaleDateString(locale, { day: "numeric", month: "long" })}
                  {e.time && ` · ${e.time}`}
                </div>
                <div className="font-display text-2xl mt-1">{t(e.name)}</div>
                <a href={e.mapsUrl} target="_blank" rel="noreferrer" className="text-sm text-gold hover:underline">📍 {e.location.name}</a>
                {e.description && <p className="text-sm opacity-80 mt-1">{t(e.description)}</p>}
                {e.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-primary-foreground/30 px-2 py-0.5 text-[11px] font-semibold">{t(tagLabel(tag))}</span>
                    ))}
                  </div>
                )}
                {e.link && (
                  <a href={e.link} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-full bg-gold text-gold-foreground px-4 py-1.5 text-sm font-bold">{t(linkLabel(e))}</a>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedDay(null)} aria-label={t({ tr: "Kapat", en: "Close" })} className="self-start opacity-70">✕</button>
        </div>
      )}
    </div>
  );
}
