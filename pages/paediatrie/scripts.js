/* ============================================================
   Paediatrie Landingpage – Scripts
   ============================================================
   Scroll-Reveal, Sticky Mobile CTA, Form Validation,
   Smooth Scroll, Video Player, Tracking
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
    var visual = hero.querySelector('.hero__visual');

    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(24px)';
      requestAnimationFrame(function () {
        content.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      });
    }

    if (visual) {
      visual.style.opacity = '0';
      visual.style.transform = 'scale(1.03)';
      setTimeout(function () {
        visual.style.transition = 'opacity 1s ease, transform 1.2s ease';
        visual.style.opacity = '1';
        visual.style.transform = 'scale(1)';
      }, 200);
    }
  }

  /* ------------------------------------------------------------
     3. SMOOTH SCROLL FOR ANCHOR LINKS
     ------------------------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------------------------------------------------------------
     4. STICKY MOBILE CTA
     ------------------------------------------------------------ */
  function initStickyCTA() {
    var stickyCta = document.getElementById('sticky-cta');
    var formSection = document.getElementById('bewerbung');
    var heroSection = document.querySelector('.hero');

    if (!stickyCta || !formSection) return;

    // Only on mobile
    if (window.innerWidth >= 768) return;

    var formObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.remove('sticky-cta--visible');
        } else {
          // Only show if we've scrolled past the hero
          if (heroSection) {
            var heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom < 0) {
              stickyCta.classList.add('sticky-cta--visible');
            }
          } else {
            stickyCta.classList.add('sticky-cta--visible');
          }
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px'
    });

    formObserver.observe(formSection);

    // Also observe hero to hide while hero is visible
    if (heroSection) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            stickyCta.classList.remove('sticky-cta--visible');
          }
        });
      }, { threshold: 0.3 });

      heroObserver.observe(heroSection);
    }
  }

  /* ------------------------------------------------------------
     5. FORM VALIDATION
     ------------------------------------------------------------ */
  function initFormValidation() {
    var form = document.getElementById('bewerbung-form');
    if (!form) return;

    var alertBox = form.querySelector('.form__alert');

    form.addEventListener('submit', function (e) {
      var isValid = true;
      var firstInvalid = null;

      // Clear previous errors
      form.querySelectorAll('.form-group--error').forEach(function (g) {
        g.classList.remove('form-group--error');
      });

      // Validate required inputs
      form.querySelectorAll('[required]').forEach(function (input) {
        var group = input.closest('.form-group');
        var valid = true;

        if (input.type === 'checkbox') {
          valid = input.checked;
        } else if (input.type === 'email') {
          valid = input.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        } else {
          valid = input.value.trim() !== '';
        }

        if (!valid) {
          isValid = false;
          if (group) {
            group.classList.add('form-group--error');
            input.classList.add('form-input--error');
          }
          if (!firstInvalid) firstInvalid = input;
        } else {
          if (input.classList) input.classList.remove('form-input--error');
        }
      });

      // Honeypot check
      var honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) {
        e.preventDefault();
        return;
      }

      if (!isValid) {
        e.preventDefault();
        if (alertBox) {
          alertBox.hidden = false;
        }
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Show loading state
      var submitBtn = form.querySelector('.form__submit');
      if (submitBtn) {
        submitBtn.classList.add('form__submit--loading');
        submitBtn.disabled = true;
      }

      if (alertBox) alertBox.hidden = true;
    });

    // Clear field errors on input
    form.addEventListener('input', function (e) {
      var group = e.target.closest('.form-group');
      if (group && group.classList.contains('form-group--error')) {
        group.classList.remove('form-group--error');
        e.target.classList.remove('form-input--error');
      }
    });

    // Clear checkbox error on change
    form.addEventListener('change', function (e) {
      if (e.target.type === 'checkbox') {
        var group = e.target.closest('.form-group');
        if (group) group.classList.remove('form-group--error');
      }
    });
  }

  /* ------------------------------------------------------------
     6. VIDEO PLAYER
     ------------------------------------------------------------ */
  function initVideoPlayer() {
    var playBtn = document.querySelector('.video__play-btn');
    if (!playBtn) return;

    playBtn.addEventListener('click', function () {
      // TODO: Replace with actual video embed URL when available
      // For now, this is a placeholder – will be replaced with
      // YouTube/Vimeo embed or self-hosted video element
      var frame = playBtn.closest('.video__frame');
      if (!frame) return;

      // Placeholder: Toggle a "playing" state
      // In production, this will inject an iframe or video element
      frame.classList.toggle('video__frame--playing');
    });
  }

  /* ------------------------------------------------------------
     7. TRACKING EVENT HELPER
     ------------------------------------------------------------ */
  function pushEvent(eventName, eventLabel) {
    if (typeof window.dataLayer === 'undefined') return;
    window.dataLayer.push({
      event: eventName,
      eventLabel: eventLabel || ''
    });
  }

  function initTracking() {
    document.querySelectorAll('[data-track]').forEach(function (el) {
      el.addEventListener('click', function () {
        var event = this.getAttribute('data-track');
        var label = this.getAttribute('data-track-label') || '';
        pushEvent(event, label);
      });
    });

    // Track form submission separately (on valid submit)
    var form = document.getElementById('bewerbung-form');
    if (form) {
      form.addEventListener('submit', function () {
        pushEvent('form_submit', 'bewerbung-paediatrie');
      });
    }
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroEntrance();
    initReveal();
    initSmoothScroll();
    initStickyCTA();
    initFormValidation();
    initVideoPlayer();
    initTracking();
  });

})();
