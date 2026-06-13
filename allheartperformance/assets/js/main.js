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
