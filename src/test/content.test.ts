import { describe, expect, it } from "vitest";

import { groupByMonth } from "@/lib/content";
import { events } from "@/lib/events";
import { posts } from "@/lib/posts";

// Importing these modules validates src/content/*.json and throws on a bad entry
describe("content", () => {
  it("loads valid, date-ordered events with a maps link", () => {
    expect(events.length).toBeGreaterThan(0);
    for (const e of events) expect(e.mapsUrl).toMatch(/^https:\/\//);
    expect(events.map((e) => e.date)).toEqual([...events.map((e) => e.date)].sort());
  });

  it("loads valid posts, newest first", () => {
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.map((p) => p.date)).toEqual([...posts.map((p) => p.date)].sort().reverse());
  });

  it("groups by month in the given order", () => {
    const groups = groupByMonth([{ date: "2026-11-20" }, { date: "2026-11-02" }, { date: "2026-10-30" }]);
    expect(groups.map((g) => [g.key, g.items.length])).toEqual([["2026-11", 2], ["2026-10", 1]]);
    expect(groups[0]?.month.getMonth()).toBe(10);
  });
});
