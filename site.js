const menuButton = document.querySelector('[data-menu-button]');
const siteNav = document.querySelector('[data-site-nav]');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.photo-frame, .price-board, .menu-box, .copy-block');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach((item, index) => {
    item.classList.add('reveal-target');
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(item);
  });
}
