// ═══════════════════════════════════════
// 01-tarolog: main.js
// ═══════════════════════════════════════

// === 5. SCROLL REVEAL (появление при скролле) ===
function initScrollReveal() {
  const reveals = [
    { sel: '.about__photo-col', x: -30 },
    { sel: '.about__content-col', x: 30 },
  ];
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function(item) {
    const el = document.querySelector(item.sel);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateX(' + item.x + 'px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(el);
    }
  });

  const stats = document.querySelectorAll('.about__stat');
  const statsObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        stats.forEach(function(stat, i) {
          setTimeout(function() {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
          }, i * 150);
        });
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  stats.forEach(function(stat) {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const statsWrap = document.querySelector('.about__stats');
  if (statsWrap) statsObs.observe(statsWrap);
}

// === 6. COUNT-UP АНИМАЦИЯ ЦИФР ===
const initCountUp = () => {
  const nums = document.querySelectorAll('.about__stat-num[data-target]');
  if (!nums.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach((el) => observer.observe(el));
};

// === 7. FAQ АККОРДЕОН ===
const initFaqAccordion = () => {
  const buttons = document.querySelectorAll('.faq-item__question');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      const currentOpen = document.querySelector('.faq-item.open');
      if (currentOpen && currentOpen !== item) {
        currentOpen.classList.remove('open');
        currentOpen.querySelector('.faq-item__question')
          ?.setAttribute('aria-expanded', 'false');
      }

      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
};

// === 8. STEPS ACTIVATION ===
const initStepsAnimation = () => {
  const steps = document.querySelectorAll('.step');
  if (!steps.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  steps.forEach((step) => observer.observe(step));
};

// === 9. REVIEWS SLIDER (Swiper) ===
const initReviewsSlider = () => {
  if (!document.querySelector('.reviews-swiper')) return;
  new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });

  if (window.innerWidth < 768) {
    const initMobileSwipers = () => {
      new Swiper('.services-swiper', {
        slidesPerView: 'auto', spaceBetween: 16, centeredSlides: true,
        loop: false, observer: true, observeParents: true,
        pagination: { el: '.services-pagination', clickable: true },
      });
      new Swiper('.chests-swiper', {
        slidesPerView: 1, centeredSlides: true, spaceBetween: 24,
        loop: false, speed: 400, observer: true, observeParents: true,
        pagination: { el: '.chests-pagination', clickable: true, dynamicBullets: false },
        on: { slideChange() { playChestSlideSound(); } },
      });
    };
    const target = document.querySelector('.services-swiper')?.closest('section')
      || document.querySelector('.chests-swiper');
    if (target) {
      const lazyObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          initMobileSwipers();
          lazyObs.disconnect();
        });
      }, { threshold: 0.1 });
      lazyObs.observe(target);
    } else {
      initMobileSwipers();
    }
  }
};

// === 11. CONTACT FORM ===
const initContactForm = () => {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  if (!form) return;

  form.querySelectorAll('.form-input').forEach(input => {
    input.setAttribute('placeholder', ' ');
    input.addEventListener('change', () => {
      if (input.value) input.classList.add('has-value');
      else input.classList.remove('has-value');
    });
  });

  const nameField = document.getElementById('fieldName');
  const contactField = document.getElementById('fieldContact');
  const btnText = form.querySelector('.contact-form__btn-text');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.contact-form__btn');
    const name = nameField?.value.trim();
    const contact = contactField?.value.trim();

    if (!name || !contact) {
      if (!name && nameField) nameField.style.borderColor = 'rgba(255,80,80,0.6)';
      if (!contact && contactField) contactField.style.borderColor = 'rgba(255,80,80,0.6)';
      return;
    }

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Отправляем...';

    form.classList.add('is-hidden');
    success.classList.add('is-visible');
  });
};

// === 13. REVEAL BLUR ===
const initRevealBlur = () => {
  const groups = [
    '.services__grid .service-card',
    '.steps__list .step',
    '.faq__list .faq-item',
    '.reviews__slider',
    '.contact-form'
  ];
  const els = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.classList.add('reveal-blur');
      els.push(el);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = els.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('revealed'), idx * 100);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  els.forEach((el) => observer.observe(el));
};

// === 15. HERO — СУНДУКИ (data in chests.js) ===
const startChestShake = () => {
  const shakeTween = gsap.to('.chest-unit', {
    y: -4, rotation: 1.5, duration: 0.4, ease: 'sine.inOut',
    yoyo: true, repeat: -1, stagger: 0.15
  });
  const heroEl = document.getElementById('hero');
  if (!heroEl) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) shakeTween.resume();
      else shakeTween.pause();
    });
  }, { threshold: 0.1 });
  obs.observe(heroEl);
};

const initChestEntrance = () => {
  gsap.fromTo('.chest-unit',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.3,
      onComplete: startChestShake }
  );
};

const createChestModalCloser = (modal, state) => {
  return () => {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (state.activeUnit) {
      state.activeUnit.classList.remove('is-open');
      state.activeUnit = null;
    }
  };
};

const openChest = (unit, modal, state) => {
  if (navigator.vibrate) navigator.vibrate(200);
  if (state.activeUnit && state.activeUnit !== unit) {
    state.activeUnit.classList.remove('is-open');
  }
  state.activeUnit = unit;
  unit.classList.add('is-open');
  playThud();
  setTimeout(() => playVortexSound(), 200);

  const data = CHEST_DATA[unit.dataset.topic];
  const prophecy = data.prophecies[Math.floor(Math.random() * data.prophecies.length)];
  const insideProphecy = document.getElementById('cardProphecyInside');
  if (insideProphecy) insideProphecy.textContent = prophecy;

  const cardFlip = document.getElementById('cardFlip');
  if (cardFlip) {
    cardFlip.classList.remove('is-flipped');
    cardFlip.onclick = () => cardFlip.classList.toggle('is-flipped');
  }

  setTimeout(() => {
    const burst = unit.querySelector('.chest-burst');
    const beam = unit.querySelector('.chest-beam');
    if (burst) burst.style.animation = 'burstFlash 0.7s ease-out forwards';
    if (beam) beam.style.animation = 'lightBeamRise 1s ease-out forwards';
    initChestSparks(unit);
  }, 800);

  setTimeout(() => {
    playCardReveal();
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-visible');
    document.body.classList.add('modal-open');
  }, 1400);
};

const initChests = () => {
  const units = document.querySelectorAll('.chest-unit');
  const modal = document.getElementById('cardModal');
  if (!units.length || !modal) return;

  const state = { activeUnit: null };
  initChestEntrance();
  const closeModal = createChestModalCloser(modal, state);

  units.forEach((u) => u.addEventListener('click', () => openChest(u, modal, state)));
  modal.querySelector('.card-modal__close').addEventListener('click', closeModal);
  modal.querySelector('.card-modal__backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const ctaBtn = modal.querySelector('.card-modal__cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      setTimeout(() => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  }
};

// === 15b. CARD TILT ===
const initCardTilt = () => {
  const modal = document.getElementById('cardModal');
  const flip = document.getElementById('cardFlip');
  if (!modal || !flip) return;
  modal.addEventListener('mousemove', (e) => {
    if (!modal.classList.contains('is-visible')) return;
    const rect = flip.getBoundingClientRect();
    if (!rect.width) return;
    const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
    flip.style.transform = `perspective(1000px) rotateX(${dy * 18}deg) rotateY(${-dx * 18}deg)`;
  });
  modal.addEventListener('mouseleave', () => {
    flip.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    flip.style.transition = 'transform 0.6s ease';
    setTimeout(() => { flip.style.transition = ''; }, 600);
  });
};

// === 16. GLASS PANELS REVEAL ===
// === 17. КАРТОЧКИ ПО КЛИКУ ===
const initServiceCards = () => {
  const cards = document.querySelectorAll('.tarot-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.contains('is-flipped');
      cards.forEach((c) => c.classList.remove('is-flipped'));
      if (!isFlipped) card.classList.add('is-flipped');
    });
  });
};

// === 18. ИНИЦИАЛИЗАЦИЯ ===
const init = () => {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.js-reveal').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  initChests();
  initCardTilt();
  initScrollReveal();
  initCountUp();
  initFaqAccordion();
  initStepsAnimation();
  initReviewsSlider();
  initServiceCards();
  initContactForm();
  initRevealBlur();
};

document.addEventListener('DOMContentLoaded', init);
