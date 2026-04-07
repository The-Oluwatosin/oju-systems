/* ========================================
   OJU SYSTEMS — MAIN JS
   Scroll reveals + smooth nav
   ======================================== */

(function () {
  'use strict';

  // Scroll reveal via IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Hero image loaded state
  const heroImg = document.querySelector('.hero__image');
  if (heroImg) {
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    }
  }

  // Smooth scroll for nav links (fallback for browsers without CSS scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Nav background on scroll
  const nav = document.getElementById('nav');
  let ticking = false;

  function updateNav() {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(18, 18, 18, 0.95)';
    } else {
      nav.style.background = 'rgba(18, 18, 18, 0.85)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });
})();
