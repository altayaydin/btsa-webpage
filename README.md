# Bocconi Turkish Community

We would like to create a webpage for our Turkish students association in Bocconi University. BocconiTSA

Here are what we want to have:
Etkinliklerimiz, gönderiler, bu ay neler yapıldı vs. gibi bir feed — 7 oy
Düzenli partiler ve etkinlikler yapılıyor fakat yalnızca Instagram'da paylaşılıyor. Daha düzeli bir şekilde gözüksün ve tutulsun istiyoruz. Calendar View çok hoş olabilir.

Yurt turları — 6 oy
Bocconi 101 sayfasına ekleyeceğimiz medya ekibimizin çekeceği yurt odası turları.

Bocconi 101 Sayfası — 5 oy
Yeni gelen öğrenciler için bilgiler. İtalya'ya yeni gelenler için bilgiler. Bocconi'ye yeni gelenler okulu anlatma vs.

Not paylaşma sayfası — 4 oy
Bu sonraki planda ders notları paylaşma sayfası

Bocconi etrafında mekanlar, yemek yeme yerleri — 4 oy
Bunu da Bocconi 101 altına veya ayrı olarak da yapabiliriz.

Türk Kültürü Sayfası — 4 oy
Türk Kültürüne yakından bakın. Daha görsel ve eğlenceli bir alan. Yabancılara öğretmek be göstermek için geleneksel şeyler

BTSA nedir, ne yapıyoruz, bizi tanıyın bilgilendirme sayfaları — 4 oy
Sunmamız beklenen en temel bilgiler

Bize ulaşın sayfası — 3 oy

Turizm, Türkiye'de gezilecek yerler — 3 oy
Türkiye'de gezilecek yerler, bizim önerilerimiz (Mesela işte Antalya için Ahmet'in öneri listesi vs.), direkt ülkenin güzelliklerini turizm bakanlığı goturkiye.com üzerine bağlantı. Biraz daha sıkıcı gezme kitapları yerine gerçekten gençler nerelere gidiyor, neler yapmalı vs.

İtalya Gezi Rehberi — 2 oy
İtalyada mutlaka görülmesi gereken yerler, yenilmesi gereken yemekler etkinlikler gibi gibi

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

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb7d9b8d-b53a-57d2-9c1d-8808b3c8dbf2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
