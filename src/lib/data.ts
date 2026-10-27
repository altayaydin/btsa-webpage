import type { T } from "./i18n";

export const social = {
  instagram: "https://www.instagram.com/bocconitsa/",
  instagramDm: "https://ig.me/m/bocconitsa",
  linkedin: "https://www.linkedin.com/company/bocconi-turkish-students-%E2%80%8B-association-btsa/",
};

export const dorms: { name: string; area: string; price: string; walk: T; note: T }[] = [
  { name: "Bocconi Castiglioni", area: "Via Castiglioni", price: "€750–900", walk: { tr: "Kampüse 5 dk", en: "5 min to campus" }, note: { tr: "Tek kişilik odalar, ortak mutfak.", en: "Single rooms, shared kitchen." } },
  { name: "Bocconi Isonzo", area: "Viale Isonzo", price: "€700–850", walk: { tr: "Kampüse 10 dk", en: "10 min to campus" }, note: { tr: "Sosyal alanı geniş, hareketli.", en: "Big common areas, lively." } },
  { name: "Bocconi Arcobaleno", area: "Via Spadolini", price: "€650–800", walk: { tr: "Tramvayla 15 dk", en: "15 min by tram" }, note: { tr: "Daha sakin, geniş odalar.", en: "Quieter, bigger rooms." } },
  { name: "Bocconi Bligny", area: "Viale Bligny", price: "€800–950", walk: { tr: "Kampüse 7 dk", en: "7 min to campus" }, note: { tr: "Merkezi konum, yeni tadilatlı.", en: "Central, recently renovated." } },
];

export type PlaceCat = "food" | "cafe" | "turkish" | "night" | "study";
export const placeCats: Record<PlaceCat, { tr: string; en: string; emoji: string }> = {
  food: { tr: "Yemek", en: "Food", emoji: "🍕" },
  cafe: { tr: "Kafe & Fırın", en: "Café & Bakery", emoji: "☕" },
  turkish: { tr: "Türk mutfağı", en: "Turkish food", emoji: "🥙" },
  night: { tr: "Aperitivo & Gece", en: "Aperitivo & Night", emoji: "🍹" },
  study: { tr: "Çalışma", en: "Study", emoji: "📚" },
};

export const BOCCONI = { lng: 9.1897, lat: 45.4505 };

// Sample places — approximate locations, replace with your own picks
export const places: { name: string; cat: PlaceCat; price: string; lng: number; lat: number; tip: T }[] = [
  { name: "Bar Bocconi", cat: "cafe", price: "€", lng: 9.1893, lat: 45.4511, tip: { tr: "1 €'luk espresso, ders arası klasik.", en: "€1 espresso, a classic between lectures." } },
  { name: "Panificio Davide Longoni", cat: "cafe", price: "€", lng: 9.1858, lat: 45.4522, tip: { tr: "Sabah dersinden önce focaccia.", en: "Focaccia before morning class." } },
  { name: "Pizzeria Spontini", cat: "food", price: "€", lng: 9.1935, lat: 45.4548, tip: { tr: "Kalın dilim, hızlı ve doyurucu.", en: "Thick slice, fast and filling." } },
  { name: "Trattoria Masuelli", cat: "food", price: "€€", lng: 9.2118, lat: 45.4553, tip: { tr: "Aileniz ziyarete gelince.", en: "When family visits." } },
  { name: "Erbil Kebab", cat: "turkish", price: "€", lng: 9.1938, lat: 45.4478, tip: { tr: "Memleket özlemi çekince.", en: "When you miss home." } },
  { name: "Baklava Shop", cat: "turkish", price: "€", lng: 9.1822, lat: 45.4575, tip: { tr: "Sınav sonrası ödül.", en: "Post-exam reward." } },
  { name: "Darsena", cat: "night", price: "€€", lng: 9.1772, lat: 45.4532, tip: { tr: "Gün batımında Navigli kanalı.", en: "Navigli canal at sunset." } },
  { name: "Fondazione Prada Bar Luce", cat: "night", price: "€€", lng: 9.2045, lat: 45.4448, tip: { tr: "Wes Anderson tasarımı kafe.", en: "Café designed by Wes Anderson." } },
  { name: "Biblioteca Bocconi", cat: "study", price: "—", lng: 9.1903, lat: 45.4498, tip: { tr: "Sınav haftası erken git.", en: "Go early during exam week." } },
  { name: "Biblioteca Sormani", cat: "study", price: "—", lng: 9.1972, lat: 45.4605, tip: { tr: "Tarihi, sessiz, ücretsiz.", en: "Historic, quiet and free." } },
];
