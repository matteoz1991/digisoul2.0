(() => {
  const logo = document.querySelector('header .header-logo');
  if (!logo) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;

  logo.querySelectorAll('.header-word .header-letter').forEach((letter, index) => letter.style.setProperty('--letter-index', index));
  logo.querySelectorAll('.header-descriptor .header-letter').forEach((letter, index) => letter.style.setProperty('--letter-index', index));

  function play() {
    if (reducedMotion.matches) return;
    clearTimeout(timer);
    logo.classList.remove('is-animating');
    void logo.offsetWidth;
    logo.classList.add('is-animating');
    timer = setTimeout(() => logo.classList.remove('is-animating'), 2600);
  }

  logo.addEventListener('click', event => {
    event.preventDefault();
    scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    play();
  });

  play();
  window.addEventListener('pageshow', event => {
    if (event.persisted) play();
  });
})();
