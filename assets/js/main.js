// ── Hamburger menu ──
const hamburger = document.getElementById('nav-hamburger');
const navMenu   = document.getElementById('nav-menu');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  navMenu.style.right = '0px';
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuOpen = false;
  navMenu.style.right = '';
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    menuOpen ? closeMenu() : openMenu();
  });
}

// Close when tapping outside the menu
document.addEventListener('touchstart', function(e) {
  if (menuOpen && !navMenu.contains(e.target) && e.target !== hamburger) {
    closeMenu();
  }
});

// ── Nav transparency on scroll ──
const header = document.getElementById('site-header');
if (header && !header.classList.contains('page')) {
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
// threshold: 0 fires as soon as any part of the element enters the viewport.
// A higher threshold (e.g. 0.08) requires that fraction of the element's OWN
// height to be visible — which a long article body (thousands of px tall) can
// never reach on a phone screen, leaving it stuck at opacity:0 forever.
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
  { threshold: 0, rootMargin: '0px 0px -48px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// Safety net: if for any reason an element never gets marked visible
// (JS error elsewhere, unusual layout, very tall element edge case),
// don't let content stay permanently invisible.
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal-on-scroll:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 2500);
});
