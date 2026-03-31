const initPanelEntrance = () => {
  const panels = document.querySelectorAll(
    '.glass-panel:not(.glass-panel--hero)'
  );
  if (!panels.length) return;

  panels.forEach(panel => {
    panel.classList.remove('is-visible');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  panels.forEach((panel, i) => {
    const rect = panel.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setTimeout(() => panel.classList.add('is-visible'), 100 + i * 80);
    } else {
      observer.observe(panel);
    }
  });
};

// ═══ MOUSE PARALLAX ═══

const initMouseParallax = () => {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    gsap.to(document.documentElement, {
      '--bg-x': `${50 + x}%`,
      '--bg-y': `${50 + y}%`,
      duration: 1.8,
      ease: 'power1.out',
    });
  });
};

// ═══ DIAMOND FIREWORK ═══

const GEM_PALETTES = [
  ['#ffffff', '#a8d8ff', '#7ec8ff'],
  ['#C9A84C', '#fff8e0', '#ffd700'],
  ['#ffb7c5', '#ff8fab', '#ffffff'],
  ['#a8ffda', '#50fa7b', '#ffffff'],
  ['#c8b8ff', '#9d8fff', '#ffffff'],
];

class Diamond {
  constructor(ox, oy, mobile) {
    const angle = -Math.PI / 2 + (-1.1 + Math.random() * 2.2);
    const speed = 4 + Math.random() * 14;
    this.x = ox + (Math.random() - 0.5) * 30;
    this.y = oy;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 2;
    this.size = 6 + Math.random() * 18;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = -0.08 + Math.random() * 0.16;
    this.life = 1;
    this.decay = mobile ? 0.014 + Math.random() * 0.018 : 0.008 + Math.random() * 0.012;
    this.gravity = 0.15 + Math.random() * 0.1;
    this.colors = GEM_PALETTES[Math.floor(Math.random() * GEM_PALETTES.length)];
    this.sides = Math.random() > 0.5 ? 4 : 6;
    this.shimmer = Math.random() * Math.PI * 2;
    this.mobile = mobile;
    this.maxTrail = mobile ? 0 : 6;
    this.trail = [];
  }
  update() {
    if (this.maxTrail > 0) {
      this.trail.push({ x: this.x, y: this.y, size: this.size, rot: this.rotation });
      if (this.trail.length > this.maxTrail) this.trail.shift();
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.rotation += this.rotSpeed;
    this.shimmer += 0.15;
    this.life -= this.decay;
  }
  drawDiamond4(ctx, s, c, alpha, shimA) {
    const paths = [
      [[0, s * 1.2], [-s * 0.7, 0], [s * 0.7, 0]],
      [[-s * 0.7, 0], [0, -s * 0.7], [0, s * 1.2]],
      [[s * 0.7, 0], [0, -s * 0.7], [0, s * 1.2]],
      [[-s * 0.7, 0], [0, -s * 0.7], [s * 0.7, 0]],
    ];
    const alphas = [0.7, 0.86, 1, shimA];
    paths.forEach((pts, i) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      ctx.lineTo(pts[1][0], pts[1][1]);
      ctx.lineTo(pts[2][0], pts[2][1]);
      ctx.closePath();
      const hex = Math.floor(alpha * alphas[i] * 255).toString(16).padStart(2, '0');
      ctx.fillStyle = c[i % 3] + hex;
      ctx.fill();
    });
  }
  drawDiamond6(ctx, s, c, alpha, rot) {
    for (let i = 0; i < 6; i++) {
      const a1 = (i / 6) * Math.PI * 2;
      const a2 = ((i + 1) / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(a1) * s, Math.sin(a1) * s);
      ctx.lineTo(Math.cos(a2) * s, Math.sin(a2) * s);
      ctx.closePath();
      const b = 0.4 + 0.6 * Math.abs(Math.cos(a1 + rot));
      const hex = Math.floor(alpha * b * 255).toString(16).padStart(2, '0');
      ctx.fillStyle = c[i % 3] + hex;
      ctx.fill();
    }
  }
  drawGem(ctx, x, y, size, rot, alpha) {
    const s = size;
    const c = this.colors;
    const shimA = (Math.sin(this.shimmer) * 0.5 + 0.5) * alpha;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    if (this.sides === 4) this.drawDiamond4(ctx, s, c, alpha, shimA);
    else this.drawDiamond6(ctx, s, c, alpha, rot);
    const bGrd = ctx.createRadialGradient(-s * 0.25, -s * 0.25, 0, -s * 0.25, -s * 0.25, s * 0.6);
    bGrd.addColorStop(0, `rgba(255,255,255,${shimA * 0.9})`);
    bGrd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(-s * 0.25, -s * 0.25, s * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = bGrd;
    ctx.fill();
    ctx.restore();
    if (!this.mobile) {
      const gGrd = ctx.createRadialGradient(x, y, 0, x, y, s * 2.5);
      gGrd.addColorStop(0, c[1] + Math.floor(alpha * 80).toString(16).padStart(2, '0'));
      gGrd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(x, y, s * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gGrd;
      ctx.fill();
    }
  }
  draw(ctx) {
    if (this.life <= 0) return;
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const a = (i / this.trail.length) * this.life * 0.25;
      this.drawGem(ctx, t.x, t.y, t.size * (i / this.trail.length) * 0.7, t.rot, a);
    }
    this.drawGem(ctx, this.x, this.y, this.size, this.rotation, this.life);
  }
}

class MicroSpark {
  constructor(ox, oy) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 8;
    this.x = ox + (Math.random() - 0.5) * 20;
    this.y = oy;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 3;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.03;
    this.size = 1 + Math.random() * 2;
    this.color = GEM_PALETTES[Math.floor(Math.random() * GEM_PALETTES.length)][0];
    this.gravity = 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.97;
    this.life -= this.decay;
  }
  draw(ctx) {
    if (this.life <= 0) return;
    const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
    grd.addColorStop(0, `rgba(255,255,255,${this.life})`);
    grd.addColorStop(0.3, this.color + Math.floor(this.life * 200).toString(16).padStart(2, '0'));
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }
}

const initChestSparks = (chestEl) => {
  if (window.matchMedia('(max-width: 767px)').matches) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'chest-sparks-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const rect = chestEl.getBoundingClientRect();
  const ox = rect.left + rect.width / 2;
  const oy = rect.top + rect.height / 2;
  const particles = [];
  let frame;
  const isMobile = window.innerWidth < 768;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    if (particles.length > 0) frame = requestAnimationFrame(animate);
    else canvas.remove();
  };

  const count1 = isMobile ? 10 : 20;
  const count2 = isMobile ? 6 : 12;
  const microCount = isMobile ? 30 : 60;
  const interval1 = isMobile ? 20 : 30;
  const interval2 = isMobile ? 25 : 40;
  const delay2 = isMobile ? 250 : 400;

  for (let i = 0; i < count1; i++) {
    setTimeout(() => particles.push(new Diamond(ox, oy, isMobile)), i * interval1);
  }
  for (let i = 0; i < microCount; i++) particles.push(new MicroSpark(ox, oy));
  setTimeout(() => {
    for (let i = 0; i < count2; i++) {
      setTimeout(() => particles.push(new Diamond(ox, oy, isMobile)), i * interval2);
    }
  }, delay2);

  cancelAnimationFrame(frame);
  animate();
};

// ═══ INIT ═══

document.addEventListener('DOMContentLoaded', () => {
  initPanelEntrance();
  initMouseParallax();
});
