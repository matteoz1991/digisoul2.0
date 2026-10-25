// Swedish is the source language. Translate text nodes so existing markup and links stay intact.
(() => {
  const common = {
    'Vad vi gör': 'What we do', 'Studion': 'The studio', 'Prata med oss': 'Talk to us',
    'Meny': 'Menu', 'Meny +': 'Menu +', 'Göteborg, Sverige': 'Gothenburg, Sweden',
    'GÖTEBORG, SVERIGE': 'GOTHENBURG, SWEDEN', 'Med': 'With', 'själ.': 'soul.',
    'Utforska projektet': 'Explore the project', 'Berätta om ert projekt': 'Tell us about your project',
    'Säljare & kundansvarig': 'Sales & client relations', 'Ert namn': 'Your name',
    'E-post': 'Email', 'Annat': 'Other', 'Vad behöver ni hjälp med?': 'What can we help you with?',
    'Skicka förfrågan': 'Send enquiry', 'Till toppen ↑': 'Back to top ↑',
    'Pausa rörelse': 'Pause motion', 'Starta rörelse': 'Resume motion',
    'Prata om ett liknande projekt': 'Talk about a similar project',
    'Film kommer snart': 'Film coming soon', 'Svenska': 'Swedish', 'English': 'English',
    'För- och efternamn': 'First and last name', 'namn@foretag.se': 'name@company.com',
    'kr': 'SEK', 'kr+': 'SEK+',
    'Webbdesigner & digital konsult': 'Web designer & digital consultant',
    'Alla priser exklusive moms.': 'All prices exclude VAT.'
  };
  const web = {
    'Hoppa till innehåll': 'Skip to content', 'Projekt': 'Projects', 'WEBBSTUDIO': 'WEB STUDIO',
    'Hoppa över': 'Skip intro', 'Spela upp loggans animation igen': 'Replay the logo animation',
    'Digitalt': 'Digital', 'hantverk.': 'craft.', 'FORM + FUNKTION + KÄNSLA': 'FORM + FUNCTION + FEELING',
    'Vi designar och bygger webbplatser som känns som er.': 'We design and build websites that feel like you.',
    'Och fungerar för era kunder.': 'And work for your customers.',
    'Se våra projekt': 'See our projects',
    'Webbdesign / Utveckling / Identitet': 'Web design / Development / Identity',
    'Scrolla och lär känna oss': 'Scroll and get to know us',
    '01 / UTVALDA PROJEKT': '01 / SELECTED PROJECTS',
    'FRÅN HANTVERK TILL DIGITALA TJÄNSTER': 'FROM CRAFT TO DIGITAL SERVICES',
    'Olika företag.': 'Different businesses.', 'Egna uttryck.': 'Distinct expressions.',
    'En webbplats ska göra verksamheten rättvisa.': 'A website should do your business justice.',
    'Här är några som vi har hjälpt på vägen.': 'Here are some of the businesses we have helped.',
    'WEBBDESIGN & UTVECKLING': 'WEB DESIGN & DEVELOPMENT',
    'Hantverk som får ta plats.': 'Craftsmanship in the spotlight.',
    'IDENTITET & WEBB': 'IDENTITY & WEB',
    'Ett digitalt hem för gediget snickeri.': 'A digital home for fine woodworking.',
    'DIGITAL PRODUKT & UX': 'DIGITAL PRODUCT & UX',
    'Avtalsväggen': 'Avtalsväggen',
    'Från komplex idé till användbar tjänst.': 'From complex idea to useful service.',
    'KONSTGALLERI & WEBBDESIGN · PÅGÅENDE': 'ART GALLERY & WEB DESIGN · IN PROGRESS',
    'GRAFFITI / POP / GATUKONST': 'GRAFFITI / POP / STREET ART',
    'Ett digitalt galleri där konsten tar plats.': 'A digital gallery where the art takes centre stage.',
    'GENOMTÄNKT FRÅN FÖRSTA PIXELN.': 'THOUGHTFUL FROM THE FIRST PIXEL.',
    'HELA VÄGEN TILL SISTA KLICKET.': 'ALL THE WAY TO THE FINAL CLICK.',
    '02 / VAD VI GÖR': '02 / WHAT WE DO', 'Bra form.': 'Great design.',
    'Rätt funktion.': 'The right function.',
    'Från första skiss till färdig webbplats. Vi hjälper er att hitta ett uttryck och bygga det som behövs.': 'From first sketch to finished website. We help you find the right expression and build what you need.',
    'Webbdesign & utveckling': 'Web design & development',
    'En tydlig struktur, genomarbetad design och en snabb webbplats. Vi bygger för människorna som ska använda den, på mobil såväl som stor skärm.': 'Clear structure, considered design and a fast website. We build for the people who use it, on mobile and large screens alike.',
    'Webbdesign': 'Web design', 'Utveckling': 'Development', 'Teknisk SEO': 'Technical SEO',
    'Visuell identitet': 'Visual identity',
    'Logotyp, färger och typografi som hänger ihop. Vi tar fram en visuell identitet som gör ert företag lätt att känna igen och enkel att arbeta vidare med.': 'A logo, colours and typography that work together. We create a visual identity that makes your business recognisable and easy to build on.',
    'Logotyp': 'Logo', 'Grafisk profil': 'Brand identity',
    'Digitala tjänster & rådgivning': 'Digital services & consulting',
    'När en vanlig webbplats inte räcker. Vi hjälper till med gränssnitt, integrationer och digitala arbetsflöden, och reder ut vad som är värt att bygga.': 'When a standard website is not enough. We help with interfaces, integrations and digital workflows, and work out what is worth building.',
    'Integrationer': 'Integrations', 'Digital rådgivning': 'Digital consulting',
    'Drift & vidareutveckling': 'Hosting & ongoing development',
    'En webbplats behöver tas om hand även efter lanseringen. Vi erbjuder drift, säkerhet och support som tillval, och hjälper er vidare när verksamheten förändras.': 'A website needs care after launch. We offer hosting, security and support as optional services, and help you evolve as your business changes.',
    'Drift': 'Hosting', 'Säkerhet': 'Security',
    '03 / MÄNNISKORNA BAKOM': '03 / THE PEOPLE BEHIND IT',
    'LITEN STUDIO. NÄRA SAMARBETE.': 'SMALL STUDIO. CLOSE COLLABORATION.',
    'Ni pratar med oss.': 'You speak with us.', 'Vi gör jobbet.': 'We do the work.',
    'Digisoul Media är en webbstudio i Göteborg. Här möter ni Mattias och Sara, från första samtalet till det som händer efter lanseringen.': 'Digisoul Media is a web studio in Gothenburg. You work with Mattias and Sara from the first conversation through launch and beyond.',
    'Vi vill förstå vad ni gör, vilka ni vill nå och vad er webbplats behöver lösa. Sedan gör vi en plan tillsammans.': 'We want to understand what you do, who you want to reach and what your website needs to solve. Then we make a plan together.',
    '04 / INVESTERINGEN': '04 / THE INVESTMENT', 'En bra början.': 'A good start.',
    'Eller nästa steg.': 'Or your next step.',
    'Tre utgångspunkter för olika behov.': 'Three starting points for different needs.',
    'Vi går igenom omfattningen innan vi börjar.': 'We agree on the scope before we begin.',
    'BAS': 'BASIC', 'MELLAN': 'STANDARD', 'kr': 'SEK', 'kr+': 'SEK+',
    'En mindre webbplats som gör det enkelt att hitta er och ta kontakt.': 'A smaller website that makes it easy to find and contact you.',
    '1–3 sidor': '1–3 pages', 'Responsiv design': 'Responsive design',
    'Kontaktformulär': 'Contact form', 'Grundläggande SEO': 'Basic SEO',
    'Prata om Bas': 'Ask about Basic',
    'Mer utrymme för er verksamhet, med ett eget uttryck och fler sidor.': 'More room for your business, with a distinct look and more pages.',
    '5–8 sidor': '5–8 pages', 'Unik design': 'Custom design',
    'SEO-optimering': 'SEO optimisation', 'Prata om Mellan': 'Ask about Standard',
    'För större webbplatser med fler funktioner och integrationer.': 'For larger websites with more features and integrations.',
    '10+ sidor': '10+ pages', 'Bokningssystem': 'Booking system',
    'Flerspråkig webbplats': 'Multilingual website', 'Avancerade integrationer': 'Advanced integrations',
    'Prata om Premium': 'Ask about Premium',
    'Drift, säkerhet och support finns som frivilligt tillval för 399 kr/mån. Under de första tre månaderna ingår en ändring per månad med tillvalet. Logodesign och Google Ads-uppsättning offereras separat.': 'Hosting, security and support are available as an optional add-on for SEK 399/month. One change per month is included during the first three months with this add-on. Logo design and Google Ads setup are quoted separately.',
    '05 / NÄSTA KAPITEL': '05 / THE NEXT CHAPTER',
    'DET BÖRJAR MED ETT SAMTAL': 'IT STARTS WITH A CONVERSATION',
    'Vad vill ni': 'What would you like to', 'göra': 'create', 'nu?': 'next?',
    'En ny webbplats, ett nytt uttryck eller en idé som behöver ta form. Vi lyssnar gärna.': 'A new website, a new look or an idea taking shape. We would love to hear about it.',
    'Lämna detta fält tomt': 'Leave this field empty', 'Webbplats': 'Website',
    'Identitet': 'Identity', 'Berätta lite om projektet': 'Tell us about your project',
    'Vad har ni i tankarna?': 'What do you have in mind?',
    'Vi försöker skicka direkt till info@digisoul.se. Annars kan du öppna förfrågan i ditt e-postprogram.': 'We try to send directly to info@digisoul.se. Otherwise, you can open the enquiry in your email app.',
    'Digitalt hantverk. Med själ.': 'Digital craft. With soul.',
    'Webbstudio i Göteborg': 'Web studio in Gothenburg',
    'Stäng': 'Close', 'Stäng projekt': 'Close project',
    'Besök webbplatsen': 'Visit website',
    'Digisoul Media — Digitalt hantverk. Med själ.': 'Digisoul Media — Digital craft. With soul.',
    'Digisoul Media är en webbstudio i Göteborg. Vi hjälper företag med webbdesign, utveckling och visuell identitet. Lär känna oss och se våra projekt.': 'Digisoul Media is a web studio in Gothenburg. We help businesses with web design, development and visual identity. Meet the studio and explore our projects.',
    'Skickar…': 'Sending…', 'Skickar din förfrågan…': 'Sending your enquiry…',
    'Tack! Din förfrågan har skickats till oss.': 'Thank you! Your enquiry has been sent to us.',
    'Förfrågan kunde inte godkännas. Ladda om sidan och försök igen.': 'The enquiry could not be approved. Reload the page and try again.',
    'Ogiltigt format.': 'Invalid format.',
    'För många försök. Vänta en stund eller mejla info@digisoul.se.': 'Too many attempts. Wait a while or email info@digisoul.se.',
    'Meddelandet är för långt.': 'The message is too long.',
    'Förfrågan kunde inte läsas.': 'The enquiry could not be read.',
    'Ogiltig förfrågan.': 'Invalid enquiry.',
    'Förfrågan kunde inte godkännas.': 'The enquiry could not be approved.',
    'Kontrollera namn, e-post och meddelande (högst 5 000 tecken).': 'Check your name, email and message (maximum 5,000 characters).',
    'Formuläret är inte anslutet ännu. Mejla info@digisoul.se så hjälper vi er.': 'The form is not connected yet. Email info@digisoul.se and we will help you.',
    'Mejltjänsten kunde inte bekräfta utskicket. Försök senare eller kontakta info@digisoul.se.': 'The email service could not confirm delivery. Try again later or contact info@digisoul.se.',
    'Mejltjänsten är inte tillgänglig.': 'The email service is unavailable.',
    'Förfrågan kunde inte skickas. Mejla info@digisoul.se.': 'Your enquiry could not be sent. Email info@digisoul.se.',
    'Öppna e-postprogrammet med din förfrågan': 'Open your email app with the enquiry',
    'Direktutskick är inte tillgängligt just nu.': 'Direct sending is unavailable right now.',
    'Skicka mejlet därifrån.': 'Send the email from there.',
    'Återuppta rörelse': 'Resume motion', 'Pausa animationer': 'Pause animations',
    'Återuppta animationer': 'Resume animations',
    'En svensk galleriwebbplats för Mr. Edberg Art, med ett uttryck inspirerat av graffiti, popkonst och gatukonst. Vi har arbetat med webbdesign, responsiv utveckling och presentation av konstnärens verk i galleri och produktvyer. Projektet är under utveckling; betalning och slutliga produktuppgifter återstår inför försäljningsstart.': 'A Swedish gallery website for Mr. Edberg Art, with a look inspired by graffiti, pop art and street art. We worked on web design, responsive development and presenting the artist’s work in gallery and product views. The project is still in development; payment and final product details remain before launch.',
    'En webbplats för ett företag med över 35 års erfarenhet av fordonslackering. Vi lyfte fram hantverket och gjorde vägen till kontakt tydlig. Uppdraget omfattade webbutveckling, sökmotoroptimering och visuell utformning.': 'A website for a company with over 35 years of automotive painting experience. We highlighted the craftsmanship and made it easy to get in touch. The project covered web development, SEO and visual design.',
    'Från ny logotyp till en skräddarsydd, flerspråkig webbplats. Uttrycket tar avstamp i företagets snickeri och dörrar, med fokus på material, tydlig produktpresentation och ett lättanvänt gränssnitt.': 'From a new logo to a custom multilingual website. The design draws on the company’s woodworking and doors, focusing on materials, clear product presentation and an easy-to-use interface.',
    'En digital tjänst för att skapa avtalsdokument med hjälp av formulär. Vi arbetade med hela flödet, från gränssnitt och användarupplevelse till backend och AI-integration.': 'A digital service for creating contract documents through forms. We worked on the full flow, from interface and user experience to backend and AI integration.',
    'Webbutveckling': 'Web development', 'Digitalt galleri': 'Digital gallery',
    'Logotypdesign': 'Logo design', 'Flerspråkig webbplats': 'Multilingual website',
    'Systemutveckling': 'Systems development', 'AI-integration': 'AI integration',
    'Digisoul Media, startsidan': 'Digisoul Media, home page',
    'Digisoul Media, till toppen': 'Digisoul Media, back to top',
    'Huvudmeny': 'Main menu', 'Välj språk': 'Choose language',
    'Läs om projektet Centrum Lack': 'Read about the Centrum Lack project',
    'Läs om projektet Oak Design Door': 'Read about the Oak Design Door project',
    'Läs om projektet Avtalsväggen': 'Read about the Avtalsväggen project',
    'Läs om projektet Mr. Edberg Art': 'Read about the Mr. Edberg Art project',
    'Mattias, webbdesigner på Digisoul Media': 'Mattias, web designer at Digisoul Media',
    'Sara, kundansvarig på Digisoul Media': 'Sara, client relations at Digisoul Media',
    'Centrum Lacks webbplats': 'Centrum Lack’s website',
    'Oak Design Doors webbplats': 'Oak Design Door’s website',
    'Avtalsväggen, digital tjänst för avtal': 'Avtalsväggen, digital contract service',
    'Konstverk av Mr. Edberg med en hund i solglasögon och färgstarka graffitidetaljer': 'Artwork by Mr. Edberg featuring a dog in sunglasses and colourful graffiti details'
  };
  const media = {
    'Arbete': 'Work', 'Content- & videostudio': 'Content & video studio',
    'Rörligt': 'Moving', 'innehåll.': 'content.',
    'UGC · Produktfilm · Motion': 'UGC · Product film · Motion',
    'Från stillbild till scroll-stopp': 'From still image to scroll-stopper',
    'Vi skapar annonsfilmer, produktvideor och motion design som får folk att stanna i flödet. Och klicka vidare.': 'We create ads, product videos and motion design that make people stop scrolling. And click through.',
    'Se vårt arbete': 'See our work',
    'UGC-annonser / Produktfilm / Motion design / Reklamfilm': 'UGC ads / Product film / Motion design / Commercials',
    'Scrolla och se vad vi gör ↓': 'Scroll to see what we do ↓',
    'STOPPAR SCROLLEN PÅ TVÅ SEKUNDER.': 'STOP THE SCROLL IN TWO SECONDS.',
    'HELA VÄGEN TILL SISTA BILDRUTAN.': 'ALL THE WAY TO THE FINAL FRAME.',
    '01 / Utvalt arbete': '01 / Selected work',
    'Från produktbild till färdig film': 'From product image to finished film',
    'Olika produkter.': 'Different products.', 'Samma känsla.': 'The same feeling.',
    'Varje film börjar med produkten och slutar med en tittare som vill veta mer. Här är några exempel på vad vi gör.': 'Every film starts with the product and ends with a viewer who wants to know more. Here are a few examples of our work.',
    'UGC-annonser · 9:16': 'UGC ads · 9:16', 'Hook: reaktion': 'Hook: reaction',
    'Hook: tyst demo': 'Hook: silent demo', 'Hook: tre sätt': 'Hook: three ways',
    '0:10 · spårvagn → Haga': '0:10 · tram → Haga',
    'ÄLV Kombucha – UGC-serie': 'ÄLV Kombucha – UGC series',
    'Tre hooks, en produkt, inspelat i Göteborgs city. Påhittat varumärke och AI-skådespelare, gjort som demo.': 'Three hooks, one product, set in central Gothenburg. A fictional brand and AI actors, created as a demo.',
    'Produktfilm': 'Product film', 'Makro · ljus · fysik': 'Macro · light · physics',
    'ÄLV Kombucha – hyper motion': 'ÄLV Kombucha – hyper motion',
    'Kondens, fizz och ett plask i slow motion. Påhittat varumärke, gjort som demo.': 'Condensation, fizz and a slow-motion splash. Fictional brand, made as a demo.',
    'Logoanimation · 16:9': 'Logo animation · 16:9', 'Logoanimation': 'Logo animation',
    'Varumärke i rörelse': 'Brand in motion',
    'Oak Design Door – logo i rörelse': 'Oak Design Door – logo in motion',
    'Guld som fångar ljuset. Samma kund som vi byggde webbplatsen åt.': 'Gold catching the light. The same client whose website we built.',
    'Sprejad på väggen': 'Spray-painted on the wall',
    'Mr Edberg Art – sprejad logga': 'Mr Edberg Art – spray-painted logo',
    'En sprejburk skriver ut loggan på väggen, bokstav för bokstav.': 'A spray can writes the logo on the wall, letter by letter.',
    'Reklamfilm · 30 s · 16:9': 'Commercial · 30 s · 16:9',
    'Reklamfilm': 'Commercial', 'Manus · storyboard · film': 'Script · storyboard · film',
    'Oak Design Door – Dörrens resa': 'Oak Design Door – The door’s journey',
    'Från fabriken, över havet och in genom Göteborgs hamn – till entrén hemma.': 'From the factory, across the sea and through the Port of Gothenburg – to the front door at home.',
    'GENOMTÄNKT FRÅN FÖRSTA BILDRUTAN.': 'THOUGHTFUL FROM THE FIRST FRAME.',
    'STORYBOARD INNAN RENDERING.': 'STORYBOARD BEFORE RENDERING.',
    '02 / Vad vi gör': '02 / What we do', 'Rätt hook.': 'The right hook.',
    'Rätt rörelse.': 'The right motion.',
    'Från produktbild till färdig film. Vi hjälper er hitta vinkeln som fungerar i er nisch och bygger innehållet runt den.': 'From product image to finished film. We find the angle that works in your niche and build the content around it.',
    'Berätta om er produkt': 'Tell us about your product',
    'UGC-annonser': 'UGC ads',
    'Korta, vertikala annonser i creator-stil för TikTok, Reels och Shorts. Vi börjar med en konkurrentanalys av er nisch, skriver manus med en hook på två sekunder och levererar flera varianter att testa.': 'Short vertical creator-style ads for TikTok, Reels and Shorts. We start with a competitor analysis of your niche, write scripts with a two-second hook and deliver several versions to test.',
    'Konkurrentanalys': 'Competitor analysis', 'Manus': 'Script', 'A/B-varianter': 'A/B variants',
    'Produktfilm & hyper motion': 'Product film & hyper motion',
    'Premium produktfilm med makrodetaljer, dramatiskt ljus och fysik: tyg som rör sig, droppar, partiklar. Ni godkänner ljussättning och storyboard innan något renderas.': 'Premium product film with macro details, dramatic lighting and physical effects: moving fabric, droplets and particles. You approve the lighting and storyboard before anything is rendered.',
    'Ljussättning': 'Lighting',
    'Motion design & logo': 'Motion design & logo',
    'Animerade loggor, typografi och övergångar för appar, tjänster och varumärken. Rent, elegant och i er visuella identitet.': 'Animated logos, typography and transitions for apps, services and brands. Clean, elegant and true to your visual identity.',
    'Typografi': 'Typography', 'Intro/outro': 'Intro/outro',
    'En hel annons med berättelse, upp till 30 sekunder. Manus först, sedan storyboard, sedan film.': 'A complete story-driven ad, up to 30 seconds. Script first, then storyboard, then film.',
    'Ljuddesign': 'Sound design', 'Produktbilder': 'Product images',
    'Stillbilder till webbshop och annonser i samma ljus och stil som era filmer, så att allt hänger ihop.': 'Still images for your online shop and ads, with the same lighting and style as your films.',
    'Webbshop': 'Online shop', 'Annonser': 'Ads', 'Enhetlig stil': 'Consistent style',
    '03 / Så jobbar vi': '03 / How we work', 'Inga överraskningar': 'No surprises',
    'Stillbild först.': 'Still image first.', 'Film sen.': 'Film next.',
    'Ni ser och godkänner varje steg innan vi går vidare. Det gör ändringar snabba och billiga.': 'You see and approve every step before we move on. That makes changes fast and affordable.',
    'Ni skickar produktbild, mål och kanal. Vi kollar vad som fungerar i er nisch just nu.': 'You send us a product image, your goals and channels. We look at what is working in your niche right now.',
    'Manus & ljus': 'Script & lighting',
    'Hooks, manus och ljussättning tas fram och visas som stillbilder.': 'We develop hooks, scripts and lighting concepts and show them as still images.',
    'Hela filmen bild för bild. Inget renderas förrän ni sagt ja.': 'The full film, frame by frame. Nothing is rendered until you approve it.',
    'Leverans': 'Delivery',
    'Färdiga filmer i rätt format, plus varianter för fler produkter eller kanaler.': 'Finished films in the right formats, plus versions for more products or channels.',
    '04 / Människorna bakom': '04 / The people behind it',
    'Liten studio. Nära samarbete.': 'Small studio. Close collaboration.',
    'Ni pratar med oss.': 'You speak with us.', 'Vi gör filmen.': 'We make the film.',
    'Digisoul Media är systerstudion till Digisoul i Göteborg. Här jobbar vi med rörligt innehåll och annonser, och ni möter samma personer från första idé till färdig film.': 'Digisoul Media is the sister studio to Digisoul in Gothenburg. We make video content and ads, and you work with the same people from the first idea to the finished film.',
    'Vi använder AI-verktyg i produktionen. Därför är vi noga med att produkten alltid ser ut som i verkligheten och att allt AI-genererat märks enligt plattformarnas regler.': 'We use AI tools in production. We make sure the product always looks true to life and label AI-generated content according to each platform’s rules.',
    'Kreativ ledare & produktion': 'Creative lead & production',
    '05 / Investeringen': '05 / The investment', 'Testa först.': 'Test first.',
    'Skala sen.': 'Scale next.',
    'Tre utgångspunkter för olika behov. Vi går igenom omfattningen innan vi börjar.': 'Three starting points for different needs. We agree on the scope before we begin.',
    'Ett första test: se hur er produkt fungerar som UGC-annons.': 'A first test to see how your product works as a UGC ad.',
    '3 UGC-videor, 15 s': '3 UGC videos, 15 s',
    'Kort konkurrentanalys': 'Brief competitor analysis',
    '9:16 för TikTok & Reels': '9:16 for TikTok & Reels',
    '1 revideringsrunda': '1 revision round', 'Prata om Test': 'Ask about Test',
    'Kampanj': 'Campaign',
    'Fler varianter att testa och en produktfilm som håller över tid.': 'More versions to test and a product film with lasting value.',
    '10 UGC-videor': '10 UGC videos', '1 produktfilm, 15 s': '1 product film, 15 s',
    'Alla format: 9:16, 16:9, 1:1': 'All formats: 9:16, 16:9, 1:1',
    '2 revideringsrundor': '2 revision rounds', 'Prata om Kampanj': 'Ask about Campaign',
    'Varumärke': 'Brand',
    'För varumärken som vill ha en hel kampanj med berättelse.': 'For brands that want a complete story-driven campaign.',
    'Reklamfilm upp till 30 s': 'Commercial up to 30 s',
    'UGC-serie & produktbilder': 'UGC series & product images',
    'Löpande innehåll per månad': 'Ongoing monthly content',
    'Prata om Varumärke': 'Ask about Brand',
    '06 / Nästa kapitel': '06 / The next chapter',
    'Det börjar med en produkt': 'It starts with a product',
    'Vad ska vi': 'What should we', 'filma': 'film', 'nu?': 'next?',
    'En produkt, en lansering eller en idé som behöver röra sig. Skicka en bild, så återkommer vi med en vinkel.': 'A product, a launch or an idea that needs to move. Send us an image and we will come back with an angle.',
    'Berätta om produkten': 'Tell us about the product',
    'Vad säljer ni, och var ska filmen synas?': 'What do you sell, and where will the film appear?',
    'Förfrågan öppnas i ditt e-postprogram och skickas till info@digisoul.se.': 'The enquiry opens in your email app and is addressed to info@digisoul.se.',
    'Rörligt innehåll. Med själ.': 'Moving content. With soul.',
    'Behöver ni en webbplats?': 'Need a website?',
    'Till toppen': 'Back to top',
    'Digisoul Media – Rörligt innehåll. Med själ.': 'Digisoul Media – Moving content. With soul.',
    'Digisoul Media i Göteborg skapar UGC-annonser, produktfilm, motion design och reklamfilm för varumärken.': 'Digisoul Media in Gothenburg creates UGC ads, product films, motion design and commercials for brands.',
    'Digisoul Media – till startsidan': 'Digisoul Media – home page',
    'Huvudmeny': 'Main menu', 'Välj språk': 'Choose language',
    'Utforska ÄLV Kombucha – UGC-serie': 'Explore ÄLV Kombucha – UGC series',
    'Utforska ÄLV Kombucha – hyper motion': 'Explore ÄLV Kombucha – hyper motion',
    'Utforska Oak Design Door – logo i rörelse': 'Explore Oak Design Door – logo in motion',
    'Utforska Mr Edberg Art – sprejad logga': 'Explore Mr Edberg Art – spray-painted logo',
    'Utforska Oak Design Door – Dörrens resa': 'Explore Oak Design Door – The door’s journey',
    'Stäng projektet': 'Close project',
    'Mattias på Digisoul Media': 'Mattias at Digisoul Media',
    'Sara på Digisoul Media': 'Sara at Digisoul Media'
  };

  for (let number = 1; number <= 3; number++) {
    media[`Slå på ljud för UGC-video ${number}`] = `Turn on sound for UGC video ${number}`;
    media[`Stäng av ljud för UGC-video ${number}`] = `Turn off sound for UGC video ${number}`;
  }

  const isMedia = location.pathname.startsWith('/media/');
  const dictionary = { ...common, ...(isMedia ? media : web) };
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const attributes = ['aria-label', 'alt', 'placeholder', 'title', 'content'];
  const meta = document.querySelector('meta[name="description"]');
  let language = new URLSearchParams(location.search).get('lang');
  if (language !== 'sv' && language !== 'en') {
    try { language = localStorage.getItem('digisoul-language'); } catch {}
  }
  if (language !== 'en') language = 'sv';
  try { localStorage.setItem('digisoul-language', language); } catch {}

  function translateText(node) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const key = source.trim();
    const value = language === 'en' ? dictionary[key] : key;
    if (!key || value === undefined) return;
    const next = source.replace(key, value);
    if (node.nodeValue !== next) node.nodeValue = next;
  }
  function translateAttributes(element) {
    let originals = originalAttributes.get(element);
    if (!originals) { originals = {}; originalAttributes.set(element, originals); }
    for (const name of attributes) {
      if (!element.hasAttribute(name)) continue;
      if (!(name in originals)) originals[name] = element.getAttribute(name);
      const source = originals[name];
      const value = language === 'en' ? dictionary[source] : source;
      if (value !== undefined && element.getAttribute(name) !== value) element.setAttribute(name, value);
    }
  }
  function translate(root = document.body) {
    if (root.nodeType === Node.TEXT_NODE) { translateText(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    if (root.matches('script,style,svg')) return;
    translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.parentElement.closest('script,style,svg')) translateText(node);
      } else if (!node.matches('script,style,svg')) translateAttributes(node);
    }
  }
  function syncLinks() {
    document.querySelectorAll('[data-cross-site]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (language === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      link.href = url.pathname + url.search + url.hash;
    });
  }
  function render() {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    translate();
    if (meta) translateAttributes(meta);
    const title = document.querySelector('title');
    if (title) {
      if (!originalText.has(title.firstChild)) originalText.set(title.firstChild, title.textContent);
      translateText(title.firstChild);
    }
    syncLinks();
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.lang;
    try { localStorage.setItem('digisoul-language', language); } catch {}
    const url = new URL(location.href);
    if (language === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    history.replaceState(null, '', url);
    render();
  }));
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') translate(record.target);
      else for (const node of record.addedNodes) translate(node);
    }
  });
  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  window.DigiSoulI18n = { translate, t: source => language === 'en' ? (dictionary[source] || source) : source, get language() { return language; } };
  render();
})();
