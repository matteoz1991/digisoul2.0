# Säljarprofiler – Digisoul Media

Statiska profilsidor per säljare. De har dolda adresser (`/s/<id>-<6 tecken>`) och `noindex`. QR-koden på visitkortet pekar hit.

## Struktur
- `data/<id>.json`: en fil per säljare. `data/_mall.json` är en mall och byggs inte.
- `config.json`: gemensamma inställningar (bas-URL och mottagare för omdömesformuläret).
- `src/`: mall (`profil.template.html`), `profil.css`, `profil.js` och `symbol.svg`.
- `build.py`: bygger `dist/s/<slug>/index.html` och `dist/s/<slug>/<id>.vcf` (vCard).
- `dist/`: färdigt att lägga i sajtens rot. `dist/s/` blir `https://www.digisoul.se/s/`.
- `forhandsvisa.sh`: lokal förhandsvisning på http://localhost:8765/s/sara-jecm69/
- `skarmdump.sh`: skapar `saljarprofil-mobil.png` (390 px bred, 2x).
- `vercel.json.exempel`: X-Robots-Tag noindex för `/s/*`. Slå ihop med sajtens egen vercel.json om den finns.
- `supabase-omdomen.sql`: tabell och RLS om ni väljer Supabase.

## Ny säljare
1. `python3 build.py --ny-slug anna` ger t.ex. `anna-k7m2qp`.
2. Kopiera `data/_mall.json` till `data/anna.json` och fyll i id, slug, namn, titel, epost, telefon och presentation.
3. `python3 build.py`
4. Visitkort: kopiera `../visitkort/src/build_visitkort.py`, ändra CONFIG (PROFIL_URL = bas_url + /s/ + slug) och OUT_BASE.

## Telefon
`"telefon": "[TELEFON]"` visas som en inaktiv streckad knapp och tas inte med i vCard. Skriv in rätt nummer (t.ex. "070-123 45 67") och bygg om. Då blir knappen en klickbar tel:-länk.

## Omdömen
Formulärets mottagare väljs i `config.json` → `omdome_formular.typ`:
- `ingen` (nu): formuläret validerar men skickar inget. Besökaren ombeds mejla i stället.
- `formspree`: skapa ett formulär på formspree.io och klistra in endpoint. Omdömena kommer som mejl. **Rekommenderas.**
- `supabase`: kör `supabase-omdomen.sql` och fyll i URL och publik anon-nyckel.
- `google_forms`: formResponse-URL och entry-id:n per fält.
- `post`: valfri egen endpoint (FormData-POST).

Publicerade omdömen läggs manuellt i `omdomen` i säljarens JSON efter godkännande. Därefter körs `build.py`. Inga omdömen visas automatiskt och inga påhittade omdömen ska läggas in.
Formatet är: `{"namn":"…","foretag":"…","betyg":5,"text":"…","datum":"2026-10-15"}`
