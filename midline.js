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

document.querySelectorAll(".hover-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
    card.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)";
    card.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
    card.style.boxShadow = "none";
  });
});
