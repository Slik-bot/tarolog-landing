const initRevealText = () => {
  const elements = document.querySelectorAll('.reveal-chars');
  if (!elements.length) return;

  elements.forEach((el) => {
    const text = el.textContent.trim();
    el.textContent = '';
    el.setAttribute('aria-label', text);

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'reveal-char';
      span.style.transitionDelay = `${i * 0.035}s`;
      el.appendChild(span);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-chars').forEach((el) => {
    observer.observe(el);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initRevealText();
});
