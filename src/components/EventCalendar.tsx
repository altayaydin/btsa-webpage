import { useMemo, useState } from "react";
import { events, type EventItem } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const kindStyle: Record<EventItem["kind"], string> = {
  party: "bg-gold text-gold-foreground",
  social: "bg-primary text-primary-foreground",
  culture: "bg-ink text-primary-foreground",
  career: "bg-secondary text-secondary-foreground border",
};

export function EventCalendar() {
  const { lang, t } = useLang();
  const [cursor, setCursor] = useState(() => new Date(2026, 10, 1));
  const [selected, setSelected] = useState<EventItem | null>(null);
  const locale = lang === "tr" ? "tr-TR" : "en-GB";

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
          const evs = d ? events.filter((e) => e.date === key(d)) : [];
          return (
            <div key={i} className={`min-h-16 md:min-h-24 rounded-md p-1 text-left ${d ? "bg-muted" : ""}`}>
              {d && <div className="text-xs font-semibold text-muted-foreground">{d}</div>}
              {evs.map((e) => (
                <button key={e.id} onClick={() => setSelected(e)} className={`mt-1 w-full truncate rounded px-1 py-0.5 text-[10px] md:text-xs font-semibold text-left ${kindStyle[e.kind]}`}>
                  {t(e.title)}
                </button>
              ))}
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="mt-4 rounded-lg bg-primary text-primary-foreground p-4 flex justify-between gap-4">
          <div>
            <div className="eyebrow">{new Date(selected.date).toLocaleDateString(locale, { day: "numeric", month: "long" })} · {selected.time} · {selected.place}</div>
            <div className="font-display text-2xl mt-1">{t(selected.title)}</div>
            <p className="text-sm opacity-80 mt-1">{t(selected.desc)}</p>
          </div>
          <button onClick={() => setSelected(null)} className="self-start opacity-70">✕</button>
        </div>
      )}
    </div>
  );
}
