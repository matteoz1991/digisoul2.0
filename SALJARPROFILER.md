# Säljarprofiler

Dolda profilsidor för säljare på Digisoul Media. Sidorna har unika adresser (`/s/<id>-<slug>`) och är markerade med `noindex` så de inte indexeras av sökmotorer.

## Lägg till en ny säljare

### 1. Generera en unik slug

```bash
cd saljarprofil
python3 build.py --ny-slug anna
```

Detta genererar en slug som t.ex. `anna-k7m2qp`. Spara den!

### 2. Skapa datafil

Kopiera mallen och fyll i uppgifterna:

```bash
cp data/_mall.json data/anna.json
```

Redigera `data/anna.json` och fyll i:
- `id`: säljarens förnamn i gemener (t.ex. "anna")
- `slug`: den genererade slugen från steg 1
- `namn`: säljarens namn
- `titel`: jobbtitel
- `telefon`: telefonnummer eller `"[TELEFON]"` om det inte finns än
- `epost`: e-postadress
- `presentation`: array med stycken som beskriver säljaren
- `hjalper_till_med`: lista över tjänster
- `uppdrag`: lista över projekt (valfritt). Använd `url` för en fungerande länk eller `adress` för en ännu opublicerad webbadress som visas som text.
- `omdomen`: lämna tom tills verkliga omdömen finns

### 3. Bygg profilerna

```bash
cd saljarprofil
python3 build.py
```

Detta skapar/uppdaterar `dist/s/<slug>/index.html`, vCard-filen och gemensamma profilresurser. Mallen laddar startsidans `/styles.css` och profilens CSS/JS med absoluta sökvägar från `config.json`, så även den tryckta QR-adressen utan avslutande snedstreck fungerar.

### 4. Kopiera till public

```bash
cd ..
cp -r saljarprofil/dist/s public/
```

Nu är profilen tillgänglig på `/s/<slug>` när sidan körs eller deployas.

### 5. Testa lokalt

```bash
npm run dev
```

Vites utvecklingsserver kan visa startsidan som fallback för profiladresser. För att kontrollera den faktiska byggda profilen, kör även `npm run build` och servera `dist` statiskt, till exempel med `python3 -m http.server 5174 --directory dist`. Öppna både `http://localhost:5174/s/<slug>` och adressen med avslutande snedstreck. Kontrollera CSS, JavaScript och vCard-länken.

### 6. Committa och pusha

```bash
git add saljarprofil/data/<id>.json
git add public/s/
git commit -m "Lägg till säljarprofil för <namn>"
git push
```

## Uppdatera en befintlig profil

1. Redigera `saljarprofil/data/<id>.json`
2. Kör `python3 build.py` i `saljarprofil/`
3. Kopiera: `cp -r saljarprofil/dist/s public/`
4. Committa och pusha ändringarna

## Omdömesformulär

Formuläret är förberett för Formspree men skickar inget än. När en Formspree-endpoint finns:

1. Skapa ett formulär på [formspree.io](https://formspree.io)
2. Uppdatera `saljarprofil/config.json`:
   ```json
   "omdome_formular": {
     "typ": "formspree",
     "formspree_endpoint": "https://formspree.io/f/DITT_ID"
   }
   ```
3. Bygg om profilerna enligt steg 3-6 ovan

Tills dess hänvisas besökare till mejl direkt.

## Publicerade omdömen

Omdömen läggs **manuellt** till i säljarens JSON-fil efter godkännande:

```json
"omdomen": [
  {
    "namn": "Anna Andersson",
    "foretag": "Exempel AB",
    "betyg": 5,
    "text": "Fantastiskt samarbete!",
    "datum": "2026-10-15"
  }
]
```

Bygg om och kopiera enligt steg 3-6.

## Struktur

```
saljarprofil/
├── config.json           # Gemensamma inställningar
├── data/
│   ├── _mall.json       # Mall (byggs inte)
│   └── sara.json        # En fil per säljare
├── src/
│   ├── profil.template.html
│   ├── profil.css
│   ├── profil.js
│   └── symbol.svg
├── build.py             # Byggskript
└── dist/s/              # Genererad output
    ├── _assets/
    └── <slug>/
        ├── index.html
        └── <id>.vcf

public/s/                # Kopieras hit för deployment
```

## Viktigt

- Sidorna är **dolda** med `noindex` och ska inte länkas från huvudsajten
- QR-koder på visitkort pekar på `/s/<slug>` — ändra inte slugen efter utskrift!
- Bevara absoluta resurs- och vCard-länkar i mallen. Relativa länkar bryts på QR-adressen utan avslutande snedstreck.
- Startsidan ändras inte av profilgeneratorn; profilerna använder dess befintliga typografi och grundstil via `/styles.css`.
- Telefonnummer `[TELEFON]` gör att Ring-knappen blir inaktiv
- Visa **inga** påhittade omdömen eller kunder
