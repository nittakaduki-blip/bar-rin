const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 70);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
