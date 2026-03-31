const initRegisterModal = () => {
  const modalHTML = `
<div class="register-modal" id="registerModal"
     aria-hidden="true" role="dialog" aria-label="Регистрация">
  <div class="register-modal__backdrop"></div>
  <div class="register-modal__card">
    <button class="register-modal__close" aria-label="Закрыть"></button>
    <p class="section-eyebrow">Звёздный Путь</p>
    <h2 class="register-modal__title">Войти</h2>
    <form class="register-form" novalidate>
      <div class="form-field register-field">
        <input class="form-input" type="text"
               name="reg-name" id="reg-name"
               placeholder=" " required autocomplete="name">
        <label class="form-label" for="reg-name">Ваше имя</label>
        <span class="form-line"></span>
      </div>
      <div class="form-field register-field">
        <input class="form-input" type="email"
               name="reg-email" id="reg-email"
               placeholder=" " required autocomplete="email">
        <label class="form-label" for="reg-email">Email</label>
        <span class="form-line"></span>
      </div>
      <div class="form-field register-field">
        <input class="form-input" type="text"
               name="reg-ref" id="reg-ref"
               placeholder=" ">
        <label class="form-label" for="reg-ref">
          Реферальный код (необязательно)
        </label>
        <span class="form-line"></span>
      </div>
      <button type="submit" class="register-form__btn">
        ✦ Войти в Звёздный Путь
      </button>
    </form>
    <div class="register-success is-hidden">
      <div class="register-success__icon">✦</div>
      <p class="register-success__title">Добро пожаловать</p>
      <p class="register-success__sub">Звёзды рады вашему присутствию</p>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('registerModal');
  const closeBtn = modal.querySelector('.register-modal__close');
  const backdrop = modal.querySelector('.register-modal__backdrop');
  const form = modal.querySelector('.register-form');
  const successEl = modal.querySelector('.register-success');
  const registerBtn = document.querySelector('.register-open');

  const checkLoggedIn = () => {
    try {
      const user = JSON.parse(localStorage.getItem('zp_user'));
      if (user?.name && registerBtn) {
        registerBtn.textContent = `✦ ${user.name}`;
        registerBtn.classList.add('is-logged');
      }
    } catch (err) {
      console.error('Storage read error:', err);
    }
  };

  const openModal = () => {
    modal.classList.add('is-visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.querySelectorAll('.register-open')
    .forEach((btn) => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="reg-name"]').value.trim();
    const email = form.querySelector('[name="reg-email"]').value.trim();
    const ref = form.querySelector('[name="reg-ref"]').value.trim();
    if (!name || !email) return;
    try {
      localStorage.setItem('zp_user', JSON.stringify({
        name, email, ref, date: new Date().toISOString(),
      }));
    } catch (err) {
      console.error('Storage error:', err);
    }
    form.classList.add('is-hidden');
    successEl.classList.remove('is-hidden');
    successEl.classList.add('is-visible');
    if (registerBtn) {
      registerBtn.textContent = `✦ ${name}`;
      registerBtn.classList.add('is-logged');
    }
    setTimeout(() => {
      window.location.href = 'shop.html';
    }, 2000);
  });

  checkLoggedIn();
};

document.addEventListener('DOMContentLoaded', initRegisterModal);
