document.addEventListener("DOMContentLoaded", () => {

  // Smooth scrolling
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Hover effects (class-based)
  document.querySelectorAll('.hover-effect').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('hover-on'));
    el.addEventListener('mouseleave', () => el.classList.remove('hover-on'));
  });

  // Hero fade on scroll
  const hero = document.querySelector('.hero-content');

  if (hero) {
    window.addEventListener('scroll', () => {
      hero.style.opacity = Math.max(1 - window.scrollY / 300, 0);
    });
  }

});
