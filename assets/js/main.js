// ── Hamburger menu ──
const hamburger = document.getElementById('nav-hamburger');
const navMenu   = document.getElementById('nav-menu');

const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);

function openMenu() {
  hamburger.classList.add('open');
  navMenu.classList.add('open');
  overlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  navMenu.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);
}

// ── Nav transparency on scroll ──
const header = document.getElementById('site-header');
if (header) {
  function syncNav() {
    if (window.scrollY > 55) {
      header.classList.replace('transparent', 'solid');
    } else {
      header.classList.replace('solid', 'transparent');
    }
  }
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();
}

// ── Scroll-reveal ──
const revealEls = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));
