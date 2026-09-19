/* ==========================================================================
   BLACK VOID HAUS — script.js
   Proyecto de práctica (DAM). Toda la lógica de la tienda vive aquí:
   fallback de imágenes, routing entre páginas, filtros y carrito.
   ========================================================================== */

/* ============================
   FALLBACK DE IMÁGENES
   Si una imagen local no carga (por ejemplo, al clonar el repo sin
   descargar la carpeta de imágenes en el mismo sitio), se sustituye
   por una imagen de stock libre de derechos (Unsplash) para que la
   UI nunca se quede rota. No depende de ninguna tienda ni marca real.
============================ */
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop';

window.addEventListener('error', function (event) {
    if (event.target.tagName === 'IMG' && event.target.src !== FALLBACK_IMAGE) {
        event.target.src = FALLBACK_IMAGE;
    }
}, true);

/* ============================
   PAGE ROUTING
============================ */
const pages = {
    home: 'page-home',
    men: 'page-men',
    women: 'page-women',
    archive: 'page-archive',
    about: 'page-about',
    support: 'page-support'
};

function showPage(name) {
    Object.values(pages).forEach(id => {
        document.getElementById(id).classList.remove('active');
    });
    document.getElementById(pages[name]).classList.add('active');
    window.scrollTo(0, 0);

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('data-page') === name);
    });
}
window.showPage = showPage;

/* ============================
   MEN FILTER
============================ */
document.querySelectorAll('[data-filter-men]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-men]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-filter-men');
        document.querySelectorAll('[data-men-cat]').forEach(el => {
            el.style.display = (val === 'all' || el.getAttribute('data-men-cat') === val) ? '' : 'none';
        });
    });
});

/* ============================
   WOMEN FILTER
============================ */
document.querySelectorAll('[data-filter-women]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-women]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-filter-women');
        document.querySelectorAll('[data-women-cat]').forEach(el => {
            el.style.display = (val === 'all' || el.getAttribute('data-women-cat') === val) ? '' : 'none';
        });
    });
});

/* ============================
   ARCHIVE FILTER
============================ */
document.querySelectorAll('[data-filter-archive]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-archive]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-filter-archive');
        document.querySelectorAll('[data-archive-gender]').forEach(el => {
            el.style.display = (val === 'all' || el.getAttribute('data-archive-gender') === val) ? '' : 'none';
        });
    });
});

/* ============================
   CART (con persistencia en localStorage)
============================ */
const CART_STORAGE_KEY = 'bvh_cart_state';

function loadCartState() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn('No se pudo leer el carrito guardado:', err);
        return [];
    }
}

function saveCartState() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch (err) {
        console.warn('No se pudo guardar el carrito:', err);
    }
}

const cartState = loadCartState();
const cartToggleBtn = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const closeCartBtn = document.getElementById('closeCart');
const cartContainer = document.getElementById('cartItemsContainer');
const cartTotalText = document.getElementById('cartTotalValue');
const toast = document.getElementById('toastNotification');

cartToggleBtn.addEventListener('click', () => cartDrawer.classList.toggle('open'));
closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('open'));

document.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart-btn[data-name]');
    if (!btn) return;
    const name = btn.getAttribute('data-name');
    const price = parseFloat(btn.getAttribute('data-price'));
    const existing = cartState.find(i => i.name === name);
    if (existing) existing.quantity += 1;
    else cartState.push({ name, price, quantity: 1 });
    updateCartUI();
    showNotification(`${name.toUpperCase()} — ADDED`);
});

function updateCartUI() {
    cartContainer.innerHTML = '';
    let total = 0, items = 0;
    cartState.forEach((item, i) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal; items += item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div>
                <p class="tech-text" style="font-size:0.7rem;color:var(--bone)">${item.name}</p>
                <p class="tech-text" style="font-size:0.55rem;color:var(--silver)">${item.quantity}x — $${item.price.toFixed(2)}</p>
            </div>
            <div style="display:flex;align-items:center;gap:10px">
                <span class="tech-text" style="color:var(--bone);font-size:0.7rem">$${itemTotal.toFixed(2)}</span>
                <button class="close-cart" style="font-size:1rem;color:var(--silver)" onclick="removeItem(${i})">×</button>
            </div>`;
        cartContainer.appendChild(row);
    });
    cartTotalText.innerText = `$${total.toFixed(2)}`;
    cartToggleBtn.innerText = `Cart (${items})`;
    saveCartState();
}

window.removeItem = i => { cartState.splice(i, 1); updateCartUI(); };

function showNotification(msg) {
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

window.processCheckout = () => {
    if (!cartState.length) { showNotification('CART IS EMPTY'); return; }
    showNotification('ORDER PROCESSED SUCCESSFULLY');
    cartState.length = 0;
    updateCartUI();
    setTimeout(() => cartDrawer.classList.remove('open'), 1000);
};

/* Pinta el carrito guardado nada más cargar la página */
updateCartUI();
