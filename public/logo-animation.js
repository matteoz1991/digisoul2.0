(() => {
  const intro = document.querySelector('#logo-intro');
  const skip = intro.querySelector('.logo-intro-skip');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let playTimer;
  let hideTimer;
  let returnFocus;

  function closeIntro() {
    clearTimeout(playTimer);
    clearTimeout(hideTimer);
    if (intro.hidden) return;
    intro.classList.add('is-leaving');
    document.body.classList.remove('logo-intro-active');
    hideTimer = setTimeout(() => {
      intro.hidden = true;
      intro.classList.remove('is-playing', 'is-leaving');
      window.dispatchEvent(new Event('digisoul:introclosed'));
      if (returnFocus && returnFocus !== document.body) returnFocus.focus({ preventScroll: true });
    }, reducedMotion.matches ? 0 : 380);
  }

  function playIntro() {
    clearTimeout(playTimer);
    clearTimeout(hideTimer);
    returnFocus = document.activeElement;
    intro.hidden = false;
    intro.classList.remove('is-playing', 'is-leaving');
    void intro.offsetWidth; // Restart the entrance animation on every click.
    intro.classList.add('is-playing');
    document.body.classList.add('logo-intro-active');
    skip.focus({ preventScroll: true });
    playTimer = setTimeout(closeIntro, reducedMotion.matches ? 700 : 2700);
  }

  skip.addEventListener('click', closeIntro);
  intro.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeIntro(); }
    if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
  });
  document.querySelectorAll('.footer .brand, .logo-replay').forEach(logo => {
    logo.addEventListener('click', event => {
      event.preventDefault();
      if (logo.matches('a')) scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
      playIntro();
    });
  });

  try {
    if (!sessionStorage.getItem('digisoul-intro-seen')) {
      sessionStorage.setItem('digisoul-intro-seen', '1');
      if (!reducedMotion.matches) playIntro();
    }
  } catch {
    if (!reducedMotion.matches) playIntro();
  }
})();
