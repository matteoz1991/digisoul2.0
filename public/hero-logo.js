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
  play();
  window.addEventListener('pageshow', event => {
    if (event.persisted) play();
  });
})();
