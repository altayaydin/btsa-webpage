import type { T } from "./i18n";

export type EventItem = {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  title: T;
  place: string;
  kind: "party" | "social" | "culture" | "career";
  desc: T;
};

// Sample content — replace with real events
export const events: EventItem[] = [
  { id: "1", date: "2026-10-03", time: "21:00", kind: "party", place: "Navigli", title: { tr: "Hoş Geldin Partisi", en: "Welcome Party" }, desc: { tr: "Yeni dönemi yeni gelenlerle kutladık.", en: "We kicked off the semester with the newcomers." } },
  { id: "2", date: "2026-10-12", time: "13:00", kind: "culture", place: "Bocconi Velodromo", title: { tr: "Kahvaltı Buluşması", en: "Turkish Breakfast Meetup" }, desc: { tr: "Simit, menemen ve çay ile pazar kahvaltısı.", en: "Sunday breakfast with simit, menemen and tea." } },
  { id: "3", date: "2026-10-29", time: "19:00", kind: "culture", place: "Aula Magna", title: { tr: "29 Ekim Cumhuriyet Bayramı", en: "Republic Day Celebration" }, desc: { tr: "Cumhuriyetimizin 103. yılını birlikte kutluyoruz.", en: "Celebrating 103 years of the Turkish Republic together." } },
  { id: "4", date: "2026-11-07", time: "22:30", kind: "party", place: "Corso Como", title: { tr: "BTSA Kasım Partisi", en: "BTSA November Party" }, desc: { tr: "Ayın büyük partisi. Biletler Instagram'da.", en: "The big party of the month. Tickets on Instagram." } },
  { id: "5", date: "2026-11-10", time: "18:30", kind: "culture", place: "Room N01", title: { tr: "10 Kasım Anma", en: "Atatürk Memorial" }, desc: { tr: "Atatürk'ü saygı ve özlemle anıyoruz.", en: "Commemorating Atatürk with respect." } },
  { id: "6", date: "2026-11-18", time: "18:00", kind: "career", place: "Room AS01", title: { tr: "Kariyer Sohbeti: Mezunlarla", en: "Career Talk with Alumni" }, desc: { tr: "Londra ve İstanbul'da çalışan mezunlarımızla soru-cevap.", en: "Q&A with alumni working in London and Istanbul." } },
  { id: "7", date: "2026-11-28", time: "20:00", kind: "social", place: "Porta Romana", title: { tr: "Tavla & Okey Gecesi", en: "Backgammon & Okey Night" }, desc: { tr: "Turnuva, çay ve bol sohbet.", en: "Tournament, tea and lots of chatting." } },
  { id: "8", date: "2026-12-12", time: "22:00", kind: "party", place: "Isola", title: { tr: "Yılbaşı Öncesi Parti", en: "Pre-Holiday Party" }, desc: { tr: "Sınavlardan önce son büyük parti.", en: "The last big party before exams." } },
];

export const posts: { date: string; title: T; body: T }[] = [
  { date: "2026-10-26", title: { tr: "Ekim'de neler yaptık?", en: "What we did in October" }, body: { tr: "120+ kişiyle hoş geldin partisi, iki kahvaltı ve ilk yurt turu çekimimiz. Teşekkürler!", en: "A 120+ person welcome party, two breakfasts and our first dorm tour shoot. Thank you!" } },
  { date: "2026-10-15", title: { tr: "Medya ekibi alımları açıldı", en: "Media team applications open" }, body: { tr: "Fotoğraf ve video çekmeyi seviyorsan bize katıl.", en: "Love shooting photos and videos? Join us." } },
];

export const dorms: { name: string; area: string; price: string; walk: T; note: T }[] = [
  { name: "Bocconi Castiglioni", area: "Via Castiglioni", price: "€750–900", walk: { tr: "Kampüse 5 dk", en: "5 min to campus" }, note: { tr: "Tek kişilik odalar, ortak mutfak.", en: "Single rooms, shared kitchen." } },
  { name: "Bocconi Isonzo", area: "Viale Isonzo", price: "€700–850", walk: { tr: "Kampüse 10 dk", en: "10 min to campus" }, note: { tr: "Sosyal alanı geniş, hareketli.", en: "Big common areas, lively." } },
  { name: "Bocconi Arcobaleno", area: "Via Spadolini", price: "€650–800", walk: { tr: "Tramvayla 15 dk", en: "15 min by tram" }, note: { tr: "Daha sakin, geniş odalar.", en: "Quieter, bigger rooms." } },
  { name: "Bocconi Bligny", area: "Viale Bligny", price: "€800–950", walk: { tr: "Kampüse 7 dk", en: "7 min to campus" }, note: { tr: "Merkezi konum, yeni tadilatlı.", en: "Central, recently renovated." } },
];

export const places: { name: string; cat: T; price: string; tip: T }[] = [
  { name: "Panificio Davide Longoni", cat: { tr: "Fırın", en: "Bakery" }, price: "€", tip: { tr: "Sabah dersinden önce focaccia.", en: "Focaccia before morning class." } },
  { name: "Pizzeria Spontini", cat: { tr: "Pizza", en: "Pizza" }, price: "€", tip: { tr: "Kalın dilim, hızlı ve doyurucu.", en: "Thick slice, fast and filling." } },
  { name: "Erbil Kebab", cat: { tr: "Türk mutfağı", en: "Turkish food" }, price: "€", tip: { tr: "Memleket özlemi çekince.", en: "When you miss home." } },
  { name: "Bar Bocconi", cat: { tr: "Kafe", en: "Café" }, price: "€", tip: { tr: "1 €'luk espresso, ders arası klasik.", en: "€1 espresso, a classic between lectures." } },
  { name: "Trattoria Masuelli", cat: { tr: "Trattoria", en: "Trattoria" }, price: "€€", tip: { tr: "Aileniz ziyarete gelince.", en: "When family visits." } },
  { name: "Darsena", cat: { tr: "Aperitivo", en: "Aperitivo" }, price: "€€", tip: { tr: "Gün batımında Navigli kanalı.", en: "Navigli canal at sunset." } },
];
