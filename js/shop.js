const CATEGORY_LABELS = {
  all: 'Все',
  money: 'Деньги и достаток',
  love: 'Любовь и отношения',
  protection: 'Защита и сила',
  luck: 'Удача и путь',
};

let cart = [];
let currentFilter = 'all';
let currentProduct = null;

const formatPrice = (price) =>
  price.toLocaleString('ru-RU') + ' ₽';

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('zp_cart')) || [];
  } catch {
    return [];
  }
};

const saveCart = () => {
  try {
    localStorage.setItem('zp_cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Cart save error:', err);
  }
};

const isInCart = (id) => cart.some((item) => item.id === id);

const updateCartCount = () => {
  const count = document.getElementById('cartCount');
  if (count) count.textContent = cart.length;
};

const renderGrid = () => {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  const filtered = currentFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === currentFilter);
  grid.innerHTML = filtered.map((product) => `
    <article class="shop-card" data-id="${product.id}">
      <div class="shop-card__img-wrap">
        <img class="shop-card__img" src="${product.img}"
             alt="${product.name}" loading="lazy">
        <div class="shop-card__overlay">
          <button class="shop-card__view-btn" data-id="${product.id}">
            Подробнее
          </button>
        </div>
      </div>
      <div class="shop-card__body">
        <p class="shop-card__category">
          ${CATEGORY_LABELS[product.category]}
        </p>
        <h3 class="shop-card__title">${product.name}</h3>
        <p class="shop-card__short">${product.short}</p>
        <div class="shop-card__footer">
          <span class="shop-card__price">${formatPrice(product.price)}</span>
          <button class="shop-card__btn ${isInCart(product.id) ? 'is-added' : ''}"
                  data-id="${product.id}">
            ${isInCart(product.id) ? '✦ Добавлено' : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  `).join('');
  grid.querySelectorAll('.shop-card__view-btn').forEach((btn) => {
    btn.addEventListener('click', () => openProductModal(
      parseInt(btn.dataset.id, 10)
    ));
  });
  grid.querySelectorAll('.shop-card__btn').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(
      parseInt(btn.dataset.id, 10)
    ));
  });
};

const addToCart = (id) => {
  if (isInCart(id)) return;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  cart.push(product);
  saveCart();
  updateCartCount();
  renderGrid();
  renderCartItems();
};

const removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartCount();
  renderGrid();
  renderCartItems();
};

const renderCartItems = () => {
  const items = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  if (!items) return;
  if (!cart.length) {
    items.innerHTML = '<p class="shop-cart__empty">Корзина пуста</p>';
    if (total) total.textContent = '0 ₽';
    return;
  }
  items.innerHTML = cart.map((item) => `
    <div class="shop-cart__item">
      <img class="shop-cart__item-img" src="${item.img}" alt="${item.name}">
      <div class="shop-cart__item-info">
        <p class="shop-cart__item-name">${item.name}</p>
        <p class="shop-cart__item-price">${formatPrice(item.price)}</p>
      </div>
      <button class="shop-cart__item-remove" data-id="${item.id}">✕</button>
    </div>
  `).join('');
  items.querySelectorAll('.shop-cart__item-remove').forEach((btn) => {
    btn.addEventListener('click', () => removeFromCart(
      parseInt(btn.dataset.id, 10)
    ));
  });
  const sum = cart.reduce((acc, item) => acc + item.price, 0);
  if (total) total.textContent = formatPrice(sum);
};

const openCart = () => {
  const shopCart = document.getElementById('shopCart');
  if (shopCart) {
    shopCart.classList.add('is-open');
    shopCart.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    renderCartItems();
  }
};

const closeCart = () => {
  const shopCart = document.getElementById('shopCart');
  if (shopCart) {
    shopCart.classList.remove('is-open');
    shopCart.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
};

const openProductModal = (id) => {
  currentProduct = PRODUCTS.find((p) => p.id === id);
  if (!currentProduct) return;
  const modal = document.getElementById('productModal');
  document.getElementById('modalImg').src = currentProduct.img;
  document.getElementById('modalImg').alt = currentProduct.name;
  document.getElementById('modalCategory').textContent =
    CATEGORY_LABELS[currentProduct.category];
  document.getElementById('modalTitle').textContent = currentProduct.name;
  document.getElementById('modalDesc').textContent = currentProduct.desc;
  document.getElementById('modalMaterial').textContent =
    '✦ Материал: ' + currentProduct.material;
  document.getElementById('modalStone').textContent =
    '✦ Камень: ' + currentProduct.stone;
  document.getElementById('modalSize').textContent =
    '✦ Размер: ' + currentProduct.size;
  document.getElementById('modalPrice').textContent =
    formatPrice(currentProduct.price);
  const addBtn = document.getElementById('modalAddBtn');
  if (isInCart(id)) {
    addBtn.textContent = '✦ Уже в корзине';
    addBtn.classList.add('is-added');
  } else {
    addBtn.textContent = '✦ В корзину';
    addBtn.classList.remove('is-added');
  }
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeProductModal = () => {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
};

const openCheckout = () => {
  closeCart();
  const modal = document.getElementById('checkoutModal');
  const total = document.getElementById('checkoutTotal');
  if (total) {
    const sum = cart.reduce((acc, item) => acc + item.price, 0);
    total.textContent = 'Сумма заказа: ' + formatPrice(sum);
  }
  if (modal) {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
};

const closeCheckout = () => {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
};

const initShop = () => {
  cart = getCart();
  updateCartCount();
  renderGrid();

  document.getElementById('cartBtn')
    ?.addEventListener('click', openCart);
  document.getElementById('cartClose')
    ?.addEventListener('click', closeCart);
  document.getElementById('cartBackdrop')
    ?.addEventListener('click', closeCart);
  document.getElementById('productClose')
    ?.addEventListener('click', closeProductModal);
  document.getElementById('productBackdrop')
    ?.addEventListener('click', closeProductModal);
  document.getElementById('checkoutBtn')
    ?.addEventListener('click', openCheckout);
  document.getElementById('checkoutClose')
    ?.addEventListener('click', closeCheckout);
  document.getElementById('checkoutBackdrop')
    ?.addEventListener('click', closeCheckout);

  document.getElementById('modalAddBtn')
    ?.addEventListener('click', () => {
      if (!currentProduct || isInCart(currentProduct.id)) return;
      addToCart(currentProduct.id);
      const btn = document.getElementById('modalAddBtn');
      btn.textContent = '✦ Уже в корзине';
      btn.classList.add('is-added');
    });

  document.querySelectorAll('.shop-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.shop-filter-btn')
        .forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  document.getElementById('checkoutForm')
    ?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('[name="order-name"]').value.trim();
      const phone = form.querySelector('[name="order-phone"]').value.trim();
      const address = form.querySelector('[name="order-address"]').value.trim();
      if (!name || !phone || !address) return;
      const orderList = cart.map((i) => `${i.name} — ${formatPrice(i.price)}`).join('\n');
      const sum = cart.reduce((acc, i) => acc + i.price, 0);
      const message = `🛒 Новый заказ!\n👤 ${name}\n📱 ${phone}\n🏠 ${address}\n\n${orderList}\n\n💰 Итого: ${formatPrice(sum)}`;
      console.error('Order:', message);
      form.classList.add('is-hidden');
      document.getElementById('checkoutSuccess')
        ?.classList.remove('is-hidden');
      cart = [];
      saveCart();
      updateCartCount();
      renderGrid();
    });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCart();
      closeCheckout();
    }
  });

  const header = document.getElementById('shopHeader');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
};

document.addEventListener('DOMContentLoaded', initShop);
