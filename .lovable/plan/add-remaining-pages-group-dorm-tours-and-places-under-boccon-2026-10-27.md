# Add remaining pages + group Dorm Tours and Places under Bocconi 101

## Navigation
- Top menu: Events, Bocconi 101 (dropdown: Guide, Dorm Tours, Places), Notes, Turkish Culture, Turkey, Italy, About, Contact.
- On mobile, the same items in a scrollable row, with Bocconi 101 sub-pages shown as tabs on the Bocconi 101 pages.
- Dorm Tours and Places move to /bocconi-101/dorm-tours and /bocconi-101/places; old addresses redirect to the new ones.
- Bocconi 101 guide page gets a sub-navigation strip (Guide / Dorm Tours / Places).

## New pages (all TR + EN, sample content)
1. **Notes sharing** (/notes): list of course notes with filters by year and course, "coming soon: upload" notice. Sample entries only for now.
2. **Turkish Culture** (/turkish-culture): visual, playful cards — food (simit, baklava, çay), traditions (nazar, kahve falı, bayramlar), music, short "learn a Turkish word" section.
3. **Turkey travel** (/turkey): city cards (Istanbul, Antalya, Kapadokya, İzmir, Bodrum...) each with a student recommendation list (e.g. "Ahmet's Antalya list"), plus link to goturkiye.com.
4. **Italy guide** (/italy): must-see cities, must-eat foods, experiences.
5. **Contact** (/contact): email, Instagram, a contact form (shows a thank-you message; no sending yet), team roles.

## Images
- Generate a few new images: Turkish culture (tea/simit), Turkey landscape (Kapadokya), Italy (e.g. Florence/Rome).

## Technical
- Each new page gets its own route file and head() metadata.
- Bocconi 101 becomes a layout: `bocconi-101.tsx` (Outlet + sub-nav), `bocconi-101.index.tsx`, `bocconi-101.dorm-tours.tsx`, `bocconi-101.places.tsx`; old `dorm-tours.tsx` / `places.tsx` become redirects.
- Sample content added to `src/lib/data.ts`.
- Contact form is front-end only until Lovable Cloud is added.
