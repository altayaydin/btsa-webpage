# BTSA Webpage

## Adding events

Events live in [`src/content/events.json`](src/content/events.json). Add an entry to the list (order doesn't matter, the site sorts by date):

```json
{
  "name": { "tr": "BTSA Kasım Partisi", "en": "BTSA November Party" },
  "date": "2026-11-07",
  "time": "22:30",
  "location": { "name": "Corso Como", "maps": "https://maps.app.goo.gl/..." },
  "tags": ["party"],
  "description": { "tr": "Ayın büyük partisi.", "en": "The big party of the month." },
  "link": "https://...",
  "linkLabel": { "tr": "Bilet al →", "en": "Get tickets →" }
}
```

- `name`, `date` (`YYYY-MM-DD`) and `location.name` are required; `time`, `location.maps`, `tags`, `description`, `link` and `linkLabel` are optional.
- `name`, `description` and `linkLabel` can be a plain string instead of `{ "tr", "en" }` if the text is the same in both languages.
- `link`: the ticket, sign-up or details page, shown as a button on the event. `linkLabel` sets the button text; without it the button says "Detaylar → / Details →".
- `location.maps`: in Google Maps, open the place → **Share** → **Copy link**. Without it, the site links to a Maps search for the place name in Milan.
- `tags`: `party`, `social`, `culture` and `career` get a colour and a translated label; any other tag is shown as written. The first coloured tag sets the event's colour in the calendar.

If the file has a mistake, the site shows an error naming the event and field (e.g. `event #4 date: use YYYY-MM-DD`).

## Adding feed posts

The "What we've been up to" feed on the home page reads [`src/content/posts.json`](src/content/posts.json). It shows the newest 4 posts, with a "Show more" button for older ones.

```json
{
  "date": "2026-10-26",
  "title": { "tr": "Ekim'de neler yaptık?", "en": "What we did in October" },
  "body": { "tr": "120+ kişiyle hoş geldin partisi...", "en": "A 120+ person welcome party..." },
  "image": "/posts/2026-10-october.jpg",
  "link": "https://www.instagram.com/p/..."
}
```

- `date`, `title` and `body` are required; `image` and `link` are optional. `title` and `body` can be plain strings, as with events.
- `image`: put the photo in `public/posts/` and write its path starting with `/posts/`. Don't copy image links from Instagram, they expire.
- `link`: adds a "Read more →" link, e.g. to the Instagram post.

## Development

A Vite + React + TypeScript app with [TanStack Router](https://tanstack.com/router) file-based routing (pages live in `src/routes/`). Needs Node.js 24.

```sh
npm install
npm run dev     # http://localhost:8080
npm test
npm run build   # static site in dist/
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages at [btsa.altayaydin.com](https://btsa.altayaydin.com) via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It can also be run by hand from the **Actions** tab.

In the repository's **Settings → Pages**, **Source** must be **GitHub Actions**. With "Deploy from a branch", Pages shows this README instead of the site.
