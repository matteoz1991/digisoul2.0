(() => {
  const hero = document.querySelector('.hero');
  const logo = hero?.querySelector('.hero-logo-replay');
  if (!logo) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  logo.querySelectorAll('.hero-logo-letter').forEach((letter, index) => letter.style.setProperty('--letter-index', index));

  function play() {
    if (reducedMotion.matches) return;
    clearTimeout(timer);
    hero.classList.remove('is-logo-animating');
    void hero.offsetWidth;
    hero.classList.add('is-logo-animating');
    timer = setTimeout(() => hero.classList.remove('is-logo-animating'), 3800);
  }

  logo.addEventListener('click', play);
  let seen = false;
  try {
    seen = localStorage.getItem('digisoul-media-hero-seen') === '1';
    localStorage.setItem('digisoul-media-hero-seen', '1');
  } catch {}
  if (!seen) play();
})();
