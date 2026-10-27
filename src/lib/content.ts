import { parseISO } from "date-fns";
import { z } from "zod";
import type { T } from "./i18n";

// A plain string is shown in both languages; use { "tr": ..., "en": ... } to translate
export const text = z.union([
  z.string().min(1).transform((s): T => ({ tr: s, en: s })),
  z.object({ tr: z.string().min(1), en: z.string().min(1) }),
]);

export const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "use YYYY-MM-DD");

// Validates a list from src/content/, naming the entry and field of any mistake
export function parseList<S extends z.ZodTypeAny>(file: string, item: string, schema: S, raw: unknown): z.output<S>[] {
  const parsed = z.array(schema).safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  ${item} #${Number(i.path[0]) + 1} ${i.path.slice(1).join(".")}: ${i.message}`);
    throw new Error(`src/content/${file} is invalid:\n${issues.join("\n")}`);
  }
  return parsed.data;
}

// Groups dated items by month, keeping their order
export function groupByMonth<I extends { date: string }>(items: I[]) {
  const groups = new Map<string, I[]>();
  for (const item of items) {
    const key = item.date.slice(0, 7);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups].map(([key, items]) => ({ key, month: parseISO(`${key}-01`), items }));
}
