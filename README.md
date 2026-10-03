# Digisoul Media

Den nya webbplatsen för Digisoul Media. Startsidan byggs av Vite från `index.html` och statiska resurser i `public/`. Befintliga kundprojekt under `public/projects/` finns kvar.

## Lokalt

```bash
npm ci
npm run dev
npm test
npm run build
```

## Vercel

Vercel-projektet ska använda repots rot som Root Directory, Vite som framework och `npm run build` som Build Command. Vite publicerar `dist/`; Vercel publicerar dessutom `api/contact.js` som funktion på `/api/contact`.

Kontaktformuläret behöver följande miljövariabler i Vercel: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` och `MAIL_FROM`. Använd en verifierad avsändaradress som SMTP-kontot tillåter. Mottagaren är fast `info@digisoul.se`. Utan dessa variabler ger API:t ett tydligt fel och inga meddelanden räknas som skickade. Hemligheter ska aldrig läggas i Git. `.env.example` visar fälten utan lösenord.

Kontrollera förhandsversion och gör ett riktigt formulärtest innan produktionsgrenen publiceras. Om samma Vercel-projekt fortsätter använda `digisoul.se` behövs normalt ingen ändring av DNS hos STRATO.
