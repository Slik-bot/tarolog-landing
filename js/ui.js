// ═══════════════════════════════════════
// 01-tarolog: ui.js — cursor, progress, header
// ═══════════════════════════════════════

let chestAudioCtx = null;

const ensureAudioCtx = () => {
  if (!chestAudioCtx) {
    chestAudioCtx = new (window.AudioContext ||
      window.webkitAudioContext)();
  }
  if (chestAudioCtx.state === 'suspended') {
    chestAudioCtx.resume();
  }
  return chestAudioCtx;
};

document.addEventListener('touchstart', ensureAudioCtx, { once: true });
document.addEventListener('click', ensureAudioCtx, { once: true });

const playChestSlideSound = () => {
  try {
    const ctx = ensureAudioCtx();
    if (!ctx || ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const len = ctx.sampleRate * 0.4;

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.15);
    oscGain.gain.setValueAtTime(0.9, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);

    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) { d[i] = Math.random() * 2 - 1; }

    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1200;
    bp.Q.value = 0.8;
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0, now);
    nGain.gain.linearRampToValueAtTime(0.6, now + 0.02);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    noise.connect(bp);
    bp.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now + 0.02);

    const buf2 = ctx.createBuffer(1, len, ctx.sampleRate);
    const d2 = buf2.getChannelData(0);
    for (let i = 0; i < len; i++) { d2[i] = Math.random() * 2 - 1; }
    const noise2 = ctx.createBufferSource();
    noise2.buffer = buf2;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 400;
    const n2Gain = ctx.createGain();
    n2Gain.gain.setValueAtTime(0.15, now + 0.15);
    n2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    noise2.connect(lp);
    lp.connect(n2Gain);
    n2Gain.connect(ctx.destination);
    noise2.start(now + 0.15);
  } catch (err) {
    console.error('Audio error:', err);
  }
};

const initCursor = () => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;

  const cursor = document.querySelector('.cursor');
  const trail = document.querySelector('.cursor-trail');
  if (!cursor || !trail) return;

  let trailX = 0;
  let trailY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    trailX += (e.clientX - trailX) * 0.15;
    trailY += (e.clientY - trailY) * 0.15;
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
};

const initProgressBar = () => {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.transform = `scaleX(${progress / 100})`;
  }, { passive: true });
};

const initHeader = () => {
  const header = document.getElementById('header');
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const backdrop = document.getElementById('navBackdrop');
  if (!burger || !nav) return;

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  const openMenu = () => {
    burger.classList.add('active');
    nav.classList.add('open');
    if (backdrop) {
      backdrop.classList.add('is-visible');
    }
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
    }
  };

  burger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initProgressBar();
  initHeader();
});
