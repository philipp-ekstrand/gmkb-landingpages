/* ============================================================
   Paediatrie Landingpage – Scripts
   ============================================================
   Scroll-Reveal, Sticky Mobile CTA, Smooth Scroll, Tracking
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. SCROLL REVEAL (IntersectionObserver)
     ------------------------------------------------------------ */
  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------
     2. HERO ENTRANCE ANIMATION
     ------------------------------------------------------------ */
  function initHeroEntrance() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var content = hero.querySelector('.hero__content');
    var image = hero.querySelector('.hero__image');

    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(24px)';
      requestAnimationFrame(function () {
        content.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      });
    }

    if (image) {
      image.style.opacity = '0';
      image.style.transform = 'scale(1.03)';
      setTimeout(function () {
        image.style.transition = 'opacity 1s ease, transform 1.2s ease';
        image.style.opacity = '1';
        image.style.transform = 'scale(1)';
      }, 200);
    }
  }

  /* ------------------------------------------------------------
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ------------------------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------------------------------------------------------------
     4. TRACKING EVENT HELPER
     ------------------------------------------------------------ */
  function initTracking() {
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        var event = this.getAttribute('data-track');
        var label = this.getAttribute('data-track-label') || '';
        // Push to dataLayer if GTM is loaded
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({
            event: event,
            eventLabel: label
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroEntrance();
    initReveal();
    initSmoothScroll();
    initTracking();
  });

})();
