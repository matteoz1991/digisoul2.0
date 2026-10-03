# Digisoul Media

Den nya webbplatsen för Digisoul Media. Startsidan och projektkatalogen byggs av Vite från `index.html` och statiska resurser i `public/`.

## Lokalt

```bash
npm ci
npm run dev
npm test
npm run build
```

## Vercel

Vercel-projektet ska använda repots rot som Root Directory, Vite som framework och `npm run build` som Build Command. Vite publicerar `dist/`; Vercel publicerar dessutom `api/contact.js` som funktion på `/api/contact`.

Kontaktformuläret behöver `SMTP_USER` (det fullständiga STRATO-kontot) och `SMTP_PASS` som hemliga miljövariabler i Vercel. Standardvärdena är `smtp.strato.de`, port `465` och avsändare `info@digisoul.se`; de kan ändras med `SMTP_HOST`, `SMTP_PORT` och `MAIL_FROM`. Avsändaren måste vara tillåten för SMTP-kontot. Mottagaren är fast `info@digisoul.se`. Utan användarnamn eller lösenord ger API:t ett tydligt fel och inga meddelanden räknas som skickade. Hemligheter ska aldrig läggas i Git. `.env.example` visar fälten utan lösenord.

Kontrollera förhandsversion och gör ett riktigt formulärtest innan produktionsgrenen publiceras. Om samma Vercel-projekt fortsätter använda `digisoul.se` behövs normalt ingen ändring av DNS hos STRATO.
