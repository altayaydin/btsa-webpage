import { format, parseISO } from "date-fns";
import { z } from "zod";
import raw from "@/content/events.json";
import { date, parseList, text } from "./content";
import type { T } from "./i18n";

const eventSchema = z.object({
  name: text,
  date,
  time: z.string().regex(/^\d{2}:\d{2}$/, "use HH:MM").optional(),
  location: z.object({
    name: z.string().min(1),
    maps: z.string().url().optional(), // Google Maps share link
  }),
  tags: z.array(z.string().min(1)).default([]),
  description: text.optional(),
  link: z.string().url().optional(), // tickets, sign-up or details page
  linkLabel: text.optional(),
});

// Without a maps link, fall back to a Google Maps search for the place name
const mapsSearch = (place: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place}, Milano`)}`;

export const events = parseList("events.json", "event", eventSchema, raw)
  .map((e, i) => ({ ...e, id: `${e.date}-${i}`, day: parseISO(e.date), mapsUrl: e.location.maps ?? mapsSearch(e.location.name) }))
  .sort((a, b) => `${a.date} ${a.time ?? ""}`.localeCompare(`${b.date} ${b.time ?? ""}`));

export type EventItem = (typeof events)[number];

export const todayKey = () => format(new Date(), "yyyy-MM-dd");

export const linkLabel = (e: EventItem): T => e.linkLabel ?? { tr: "Detaylar →", en: "Details →" };

const tagLabels: Record<string, T> = {
  party: { tr: "Parti", en: "Party" },
  social: { tr: "Sosyal", en: "Social" },
  culture: { tr: "Kültür", en: "Culture" },
  career: { tr: "Kariyer", en: "Career" },
};

export const tagLabel = (tag: string): T => tagLabels[tag] ?? { tr: tag, en: tag };

// Known tags first, then any others in the order they appear
export const allTags = [...new Set([...Object.keys(tagLabels), ...events.flatMap((e) => e.tags)])].filter((tag) => events.some((e) => e.tags.includes(tag)));

const tagColors: Record<string, string> = {
  party: "bg-gold text-gold-foreground",
  social: "bg-primary text-primary-foreground",
  culture: "bg-ink text-primary-foreground",
  career: "bg-secondary text-secondary-foreground border",
};

const defaultColor = "bg-secondary text-secondary-foreground border";

export const tagColor = (tag: string) => tagColors[tag] ?? defaultColor;

// The first tag with a colour decides the event's colour
export const eventColor = (e: EventItem) => e.tags.map((tag) => tagColors[tag]).find(Boolean) ?? defaultColor;
