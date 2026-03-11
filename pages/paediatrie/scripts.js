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

        // For #bewerbung links: scroll to the next form section below current position
        if (targetId === '#bewerbung') {
          e.preventDefault();
          var formSections = document.querySelectorAll('.form-section');
          var scrollTop = window.scrollY || window.pageYOffset;
          var target = null;

          formSections.forEach(function (section) {
            if (!target && section.offsetTop > scrollTop + 100) {
              target = section;
            }
          });

          // Fallback to last form section
          if (!target && formSections.length) {
            target = formSections[formSections.length - 1];
          }

          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }

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
    var formSections = document.querySelectorAll('.form-section');
    var heroSection = document.querySelector('.hero');

    if (!stickyCta || !formSections.length) return;

    // Only on mobile
    if (window.innerWidth >= 768) return;

    var visibleForms = 0;

    var formObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visibleForms++;
        } else {
          visibleForms--;
        }
      });

      if (visibleForms > 0) {
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
    }, {
      threshold: 0,
      rootMargin: '0px'
    });

    formSections.forEach(function (section) {
      formObserver.observe(section);
    });

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
     5. MULTI-STEP FORM (supports multiple form instances)
     ------------------------------------------------------------ */
  function initMultiStepForm() {
    document.querySelectorAll('.form').forEach(function (form) {
      var track = form.querySelector('.form-steps__track');
      if (!track) return;

      var steps = form.querySelectorAll('.form-steps__step');
      var dots = form.querySelectorAll('.form-steps__dot');
      var lines = form.querySelectorAll('.form-steps__line');
      var backBtn = form.querySelector('.form-steps__back');
      var currentStep = 0;
      var stepMap = {};
      var stepHistory = ['0'];

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

        var nav = form.querySelector('.form-steps__nav');
        if (key === 'reject') {
          if (nav) nav.style.display = 'none';
        } else {
          if (nav) nav.style.display = '';
          var stepNum = parseInt(key, 10);
          dots.forEach(function (dot) {
            var dotStep = parseInt(dot.getAttribute('data-step'), 10);
            if (dotStep <= stepNum) {
              dot.classList.add('form-steps__dot--active');
            } else {
              dot.classList.remove('form-steps__dot--active');
            }
          });
          lines.forEach(function (line) {
            var lineIdx = parseInt(line.getAttribute('data-line'), 10);
            if (lineIdx < stepNum) {
              line.classList.add('form-steps__line--active');
            } else {
              line.classList.remove('form-steps__line--active');
            }
          });
        }

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

      form.addEventListener('click', function (e) {
        var choice = e.target.closest('.form-step__choice');
        if (!choice) return;

        var nextStep = choice.getAttribute('data-next');
        var value = choice.getAttribute('data-value');
        var step = choice.closest('.form-steps__step');
        var stepKey = step.getAttribute('data-step');

        choice.classList.add('form-step__choice--selected');

        if (stepKey === '0') {
          var qField = form.querySelector('[name="qualifikation"]');
          if (qField) qField.value = value;
        } else if (stepKey === '1') {
          var sField = form.querySelector('[name="starttermin"]');
          if (sField) sField.value = value;
        }

        setTimeout(function () {
          stepHistory.push(nextStep);
          goToStep(nextStep);
        }, 250);
      });
    });
  }

  /* ------------------------------------------------------------
     5b. FORM VALIDATION (Step 3 only, supports multiple forms)
     ------------------------------------------------------------ */
  function initFormValidation() {
    document.querySelectorAll('.form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var alertBox = form.querySelector('.form__alert');
        var isValid = true;
        var firstInvalid = null;

        form.querySelectorAll('.form-group--error').forEach(function (g) {
          g.classList.remove('form-group--error');
        });

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

        var submitBtn = form.querySelector('.form__submit');
        if (submitBtn) {
          submitBtn.classList.add('form__submit--loading');
          submitBtn.disabled = true;
        }

        if (alertBox) alertBox.hidden = true;
      });

      form.addEventListener('input', function (e) {
        var group = e.target.closest('.form-group');
        if (group && group.classList.contains('form-group--error')) {
          group.classList.remove('form-group--error');
          e.target.classList.remove('form-input--error');
        }
      });

      form.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
          var group = e.target.closest('.form-group');
          if (group) group.classList.remove('form-group--error');
        }
      });
    });
  }

  /* ------------------------------------------------------------
     6. VIDEO PLAYER
     ------------------------------------------------------------ */
  function initVideoPlayer() {
    var consentBtn = document.querySelector('.video__consent-btn');
    if (!consentBtn) return;

    consentBtn.addEventListener('click', function () {
      var vimeoId = consentBtn.getAttribute('data-vimeo-id');
      if (!vimeoId || vimeoId.indexOf('VIMEO_ID') === 0) return;

      var frame = consentBtn.closest('.video__frame');
      if (!frame) return;

      var iframe = document.createElement('iframe');
      iframe.className = 'video__iframe';
      iframe.src = 'https://player.vimeo.com/video/' + vimeoId + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1';
      iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('title', 'Team-Video');
      frame.appendChild(iframe);
      frame.classList.add('video__frame--playing');

      pushEvent('video_play', consentBtn.getAttribute('data-track-label') || 'team-video');
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

    // Track form submission for all forms
    document.querySelectorAll('.form').forEach(function (form) {
      form.addEventListener('submit', function () {
        var label = form.getAttribute('data-track-label') || 'bewerbung';
        pushEvent('form_submit', label);
      });
    });
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
     10. FILE UPLOAD DISPLAY (supports multiple forms)
     ------------------------------------------------------------ */
  function initFileUpload() {
    document.querySelectorAll('.form-file input[type="file"]').forEach(function (fileInput) {
      var label = fileInput.closest('.form-file');
      var fileName = label ? label.querySelector('.form-file__name') : null;
      var fileText = label ? label.querySelector('.form-file__text') : null;
      if (!fileName) return;

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
    });
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
  });

})();
