// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hover effects
document.querySelectorAll('.hover-effect').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'scale(1.05)';
    el.style.transition = 'transform 0.25s ease';
    el.style.textShadow = '0 0 12px rgba(125, 211, 252, 0.9)';
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'scale(1)';
    el.style.textShadow = 'none';
  });
});

// Fade hero on scroll
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (!hero) return;

  const opacity = Math.max(1 - window.scrollY / 200, 0);
  hero.style.opacity = opacity;
});