import { useEffect, useState } from "react";
import { EventCalendar } from "@/components/EventCalendar";
import { EventList } from "@/components/EventList";
import { ChipRow, Segmented } from "@/components/SiteShell";
import { allTags, events, tagLabel } from "@/lib/events";
import { useLang } from "@/lib/i18n";

export function EventsView() {
  const { t } = useLang();
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [tag, setTag] = useState<string | null>(null);
  const shown = tag ? events.filter((e) => e.tags.includes(tag)) : events;

  // The calendar is cramped on phones, so start them on the list
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setView("list");
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <ChipRow>
          {[null, ...allTags].map((tg) => (
            <button key={tg ?? "all"} onClick={() => setTag(tg)} className={`h-9 rounded-full px-4 text-sm font-semibold border ${tag === tg ? "bg-primary text-primary-foreground border-primary" : "hover:border-gold"}`}>
              {tg ? t(tagLabel(tg)) : t({ tr: "Tümü", en: "All" })}
            </button>
          ))}
        </ChipRow>
        <div className="shrink-0">
          <Segmented
            value={view}
            onChange={setView}
            options={[
              { value: "calendar", label: t({ tr: "Takvim", en: "Calendar" }) },
              { value: "list", label: t({ tr: "Liste", en: "List" }) },
            ]}
          />
        </div>
      </div>
      {view === "calendar" ? <EventCalendar events={shown} /> : <EventList events={shown} />}
    </div>
  );
}
