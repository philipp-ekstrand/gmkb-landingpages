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
     5. MULTI-STEP FORM
     ------------------------------------------------------------ */
  function initMultiStepForm() {
    var form = document.getElementById('bewerbung-form');
    var track = document.getElementById('form-track');
    if (!form || !track) return;

    var steps = form.querySelectorAll('.form-steps__step');
    var bars = form.querySelectorAll('.form-steps__bar');
    var backBtn = document.getElementById('form-back');
    var currentStep = 0;
    var stepMap = {};
    var stepHistory = ['0'];

    // Build step index map (supports numeric + 'reject')
    steps.forEach(function (step, i) {
      stepMap[step.getAttribute('data-step')] = i;
    });

    function updateTrackHeight() {
      var activeStep = steps[currentStep];
      if (activeStep) {
        track.style.height = activeStep.scrollHeight + 'px';
      }
    }

    function updateBackButton(key) {
      if (backBtn) {
        if (key === '0') {
          backBtn.classList.remove('form-steps__back--visible');
        } else {
          backBtn.classList.add('form-steps__back--visible');
        }
      }
    }

    function goToStep(key) {
      var index = stepMap[key];
      if (index === undefined) return;
      currentStep = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      updateTrackHeight();
      updateBackButton(key);

      // Update progress bars (hide on reject)
      bars.forEach(function (bar) {
        var barStep = parseInt(bar.getAttribute('data-step'), 10);
        if (key === 'reject') {
          bar.style.display = 'none';
        } else {
          bar.style.display = '';
          if (barStep <= parseInt(key, 10)) {
            bar.classList.add('form-steps__bar--active');
          } else {
            bar.classList.remove('form-steps__bar--active');
          }
        }
      });

      // Scroll form into view
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Set initial height after render
    requestAnimationFrame(function () {
      updateTrackHeight();
    });

    // Back button
    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (stepHistory.length > 1) {
          stepHistory.pop();
          var prevKey = stepHistory[stepHistory.length - 1];

          // Clear selection styling on the step we're leaving
          steps[currentStep].querySelectorAll('.form-step__choice--selected').forEach(function (el) {
            el.classList.remove('form-step__choice--selected');
          });

          goToStep(prevKey);
        }
      });
    }

    // Handle choice button clicks
    form.addEventListener('click', function (e) {
      var choice = e.target.closest('.form-step__choice');
      if (!choice) return;

      var nextStep = choice.getAttribute('data-next');
      var value = choice.getAttribute('data-value');
      var step = choice.closest('.form-steps__step');
      var stepKey = step.getAttribute('data-step');

      // Visual feedback
      choice.classList.add('form-step__choice--selected');

      // Store value in hidden field
      if (stepKey === '0') {
        var qField = document.getElementById('hidden-qualifikation');
        if (qField) qField.value = value;
      } else if (stepKey === '1') {
        var sField = document.getElementById('hidden-starttermin');
        if (sField) sField.value = value;
      }

      // Short delay for visual feedback, then advance
      setTimeout(function () {
        stepHistory.push(nextStep);
        goToStep(nextStep);
      }, 250);
    });
  }

  /* ------------------------------------------------------------
     5b. FORM VALIDATION (Step 3 only)
     ------------------------------------------------------------ */
  function initFormValidation() {
    var form = document.getElementById('bewerbung-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      var alertBox = form.querySelector('.form__alert');
      var isValid = true;
      var firstInvalid = null;

      // Clear previous errors
      form.querySelectorAll('.form-group--error').forEach(function (g) {
        g.classList.remove('form-group--error');
      });

      // Only validate visible step (step 2 = contact details)
      var contactStep = form.querySelector('.form-steps__step[data-step="2"]');
      if (!contactStep) return;

      contactStep.querySelectorAll('[required]').forEach(function (input) {
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
        if (alertBox) alertBox.hidden = false;
        if (firstInvalid) firstInvalid.focus();
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

    // Clear checkbox/select error on change
    form.addEventListener('change', function (e) {
      var group = e.target.closest('.form-group');
      if (group && group.classList.contains('form-group--error')) {
        group.classList.remove('form-group--error');
        e.target.classList.remove('form-input--error');
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
     8. HERO V2 IMAGE SLIDER (fade + progress bar)
     ------------------------------------------------------------ */
  function initHeroSlider() {
    var slider = document.querySelector('.hero-v2__slider');
    if (!slider) return;

    var card = slider.closest('.hero-v2__card');
    var slides = slider.querySelectorAll('.hero-v2__slide');
    var bars = card.querySelectorAll('.hero-v2__progress-bar');
    if (slides.length < 2) return;

    var interval = parseInt(slider.dataset.interval, 10) || 5000;
    var current = 0;
    var timer = null;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function goTo(index) {
      slides[current].classList.remove('hero-v2__slide--active');
      bars[current].classList.remove('hero-v2__progress-bar--active');

      current = index % slides.length;

      slides[current].classList.add('hero-v2__slide--active');
      // Re-trigger animation by removing and re-adding class
      bars[current].classList.remove('hero-v2__progress-bar--active');
      void bars[current].offsetWidth; // force reflow
      bars[current].classList.add('hero-v2__progress-bar--active');
    }

    function next() {
      goTo(current + 1);
    }

    // Start auto-play
    bars[0].classList.add('hero-v2__progress-bar--active');
    timer = setInterval(next, interval);

    // Pause on hover
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', function () { timer = setInterval(next, interval); });
  }

  /* ------------------------------------------------------------
     9. FAQ ACCORDION
     ------------------------------------------------------------ */
  function initFaqAccordion() {
    var columns = document.querySelectorAll('.faq__col');
    if (!columns.length) return;

    var isDesktop = window.innerWidth >= 768;

    columns.forEach(function (col, colIndex) {
      var items = col.querySelectorAll('.faq__item');

      items.forEach(function (item, index) {
        var btn = item.querySelector('.faq__question');
        if (!btn) return;

        // Desktop: open first item of each column. Mobile: only first column's first item
        var shouldOpen = index === 0 && (isDesktop || colIndex === 0);
        if (shouldOpen) {
          item.classList.add('faq__item--open');
          btn.setAttribute('aria-expanded', 'true');
        }

        btn.addEventListener('click', function () {
          var isOpen = item.classList.contains('faq__item--open');

          // Close all other items in this column
          items.forEach(function (sibling) {
            sibling.classList.remove('faq__item--open');
            var siblingBtn = sibling.querySelector('.faq__question');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          });

          // If it was closed, open it (if it was open, it stays closed = all closed)
          if (!isOpen) {
            item.classList.add('faq__item--open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------
     10. FILE UPLOAD DISPLAY
     ------------------------------------------------------------ */
  function initFileUpload() {
    var fileInput = document.getElementById('bewerbung-datei');
    var fileName = document.getElementById('file-name');
    var fileText = document.querySelector('.form-file__text');
    if (!fileInput || !fileName) return;

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        var names = Array.from(fileInput.files).map(function (f) { return f.name; });
        fileName.textContent = names.join(', ');
        if (fileText) fileText.style.display = 'none';
      } else {
        fileName.textContent = '';
        if (fileText) fileText.style.display = '';
      }
    });
  }

  /* ------------------------------------------------------------
     10. TESTIMONIAL SLIDER
     ------------------------------------------------------------ */
  function initTestimonialSlider() {
    var slider = document.querySelector('.testimonial__slider');
    if (!slider) return;

    var track = slider.querySelector('.testimonial__track');
    var slides = slider.querySelectorAll('.testimonial__slide');
    var prevBtn = slider.querySelector('.testimonial__arrow--prev');
    var nextBtn = slider.querySelector('.testimonial__arrow--next');
    if (!track || slides.length < 2) return;

    var interval = 4500;
    var current = 0;
    var timer = null;

    function goTo(index) {
      current = ((index % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Arrow buttons
    if (nextBtn) nextBtn.addEventListener('click', function () { clearInterval(timer); next(); timer = setInterval(next, interval); });
    if (prevBtn) prevBtn.addEventListener('click', function () { clearInterval(timer); prev(); timer = setInterval(next, interval); });

    // Auto-play
    timer = setInterval(next, interval);

    // Pause on hover
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', function () { timer = setInterval(next, interval); });
  }

  /* ------------------------------------------------------------
     INIT
     ------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroEntrance();
    initReveal();
    initSmoothScroll();
    initStickyCTA();
    initMultiStepForm();
    initFormValidation();
    initVideoPlayer();
    initTracking();
    initHeroSlider();
    initFaqAccordion();
    initFileUpload();
    initTestimonialSlider();
  });

})();
