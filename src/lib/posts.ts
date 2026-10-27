import { parseISO } from "date-fns";
import { z } from "zod";
import raw from "@/content/posts.json";
import { date, parseList, text } from "./content";

const postSchema = z.object({
  date,
  title: text,
  body: text,
  // A file in public/ (e.g. "/posts/october.jpg") or a full https:// URL
  image: z.string().regex(/^(\/|https:\/\/)/, "use a /path inside public/ or a full https:// URL").optional(),
  link: z.string().url().optional(), // e.g. the Instagram post
});

// Newest first; posts on the same day keep their order from the file
export const posts = parseList("posts.json", "post", postSchema, raw)
  .map((p, i) => ({ ...p, id: `${p.date}-${i}`, day: parseISO(p.date) }))
  .sort((a, b) => b.date.localeCompare(a.date));
