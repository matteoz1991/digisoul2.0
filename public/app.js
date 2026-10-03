const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const projects = {
  edberg: { title: 'Mr. Edberg Art', category: 'KONSTGALLERI & WEBBDESIGN · PÅGÅENDE', image: 'assets/edberg-art.jpg', description: 'En svensk galleriwebbplats för Mr. Edberg Art, med ett uttryck inspirerat av graffiti, popkonst och gatukonst. Vi har arbetat med webbdesign, responsiv utveckling och presentation av konstnärens verk i galleri och produktvyer. Projektet är under utveckling; betalning och slutliga produktuppgifter återstår inför försäljningsstart.', tags: ['Webbdesign', 'Digitalt galleri', 'Responsiv utveckling'], url: 'https://galleri-avtryck-matti.ozmeister1991.chatgpt.site/' },
  centrum: { title: 'Centrum Lack', category: 'WEBBDESIGN & UTVECKLING', image: 'assets/e52a9e355bd23cfc.png', description: 'En webbplats för ett företag med över 35 års erfarenhet av fordonslackering. Vi lyfte fram hantverket och gjorde vägen till kontakt tydlig. Uppdraget omfattade webbutveckling, sökmotoroptimering och visuell utformning.', tags: ['Webbutveckling', 'SEO', 'Branding'], url: 'https://centrumlack.se/' },
  oak: { title: 'Oak Design Door', category: 'IDENTITET & WEBB', image: 'assets/dac901f351ff6080.png', description: 'Från ny logotyp till en skräddarsydd, flerspråkig webbplats. Uttrycket tar avstamp i företagets snickeri och dörrar, med fokus på material, tydlig produktpresentation och ett lättanvänt gränssnitt.', tags: ['Logotypdesign', 'Webbutveckling', 'UX/UI', 'Flerspråkig webbplats'], url: 'https://oakdesign.vercel.app/' },
  avtal: { title: 'Avtalsväggen', category: 'DIGITAL PRODUKT & UX', image: 'assets/c91adb2296bb35a3.png', description: 'En digital tjänst för att skapa avtalsdokument med hjälp av formulär. Vi arbetade med hela flödet, från gränssnitt och användarupplevelse till backend och AI-integration.', tags: ['SaaS', 'Systemutveckling', 'UX/UI', 'AI-integration'], url: null }
};
const dialog = document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  const img = document.querySelector('#dialog-img'); img.src = project.image; img.alt = project.title + ', projektbild';
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => { const element = document.createElement('span'); element.textContent = tag; return element; }));
  const live = document.querySelector('#dialog-live'); live.hidden = !project.url; if (project.url) live.href = project.url; else live.removeAttribute('href');
  dialog.showModal(); document.body.classList.add('modal-open');
}));
function closeDialog() { dialog.close(); }
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', e => { if (e.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) closeDialog(); } });
document.querySelector('#dialog-contact').addEventListener('click', () => { closeDialog(); document.querySelector('#contact-form input[name=name]').focus({preventScroll:true}); });
let selectedPackage = '';
document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => { selectedPackage = link.dataset.package; document.querySelector('input[value="Webbplats"]').checked = true; document.querySelector('textarea').value = `Vi är intresserade av paketet ${selectedPackage}.\n\n`; }));
document.querySelector('#contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const button = form.querySelector('button[type=submit]');
  if (button.disabled) return;
  const status = document.querySelector('#form-status');
  const data = Object.fromEntries(new FormData(form));
  button.disabled = true;
  button.textContent = 'Skickar…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Skickar din förfrågan…';
  try {
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await response.json();
    if (response.status === 502 || response.status === 503) throw new TypeError('Mejltjänsten är inte tillgänglig.');
    if (!response.ok || !result.ok) throw new Error(result.message || 'Förfrågan kunde inte skickas. Mejla info@digisoul.se.');
    status.textContent = result.message;
    form.reset(); selectedPackage = '';
  } catch (error) {
    if (error instanceof TypeError || error instanceof SyntaxError) {
      const subject = encodeURIComponent(`Projektförfrågan: ${data.service}`);
      const body = encodeURIComponent(`Namn: ${data.name}\nE-post: ${data.email}\nIntresse: ${data.service}\n\n${data.message}`);
      const link = document.createElement('a');
      link.href = `mailto:info@digisoul.se?subject=${subject}&body=${body}`;
      link.textContent = 'Öppna e-postprogrammet med din förfrågan';
      status.replaceChildren('Direktutskick är inte tillgängligt just nu. ', link, '. Skicka mejlet därifrån.');
    } else status.textContent = error.message;
  } finally {
    button.disabled = false;
    button.textContent = 'Skicka förfrågan';
    form.removeAttribute('aria-busy');
  }
});
const motionButtons = document.querySelectorAll('.motion-control, .motion-toggle');
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion() { document.documentElement.classList.toggle('paused', paused); document.querySelector('.motion-control').textContent = paused ? 'Återuppta rörelse' : 'Pausa rörelse'; document.querySelector('.motion-control').setAttribute('aria-pressed', String(paused)); const toggle = document.querySelector('.motion-toggle'); toggle.textContent = paused ? '▷' : 'Ⅱ'; toggle.setAttribute('aria-label', paused ? 'Återuppta animationer' : 'Pausa animationer'); }
motionButtons.forEach(button => button.addEventListener('click', () => { paused = !paused; setMotion(); })); setMotion();
if ('IntersectionObserver' in window && !paused) { document.documentElement.classList.add('js-motion'); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, {threshold: 0.08}); document.querySelectorAll('.section-heading, .project, .services-intro, .studio-intro, .person, .price-grid, .contact-layout').forEach(element => { element.classList.add('reveal'); observer.observe(element); }); }
document.querySelector('#year').textContent = new Date().getFullYear();
