// ── Toast System ──
function showToast(message, type = "info", duration = 3000) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const icons = {
    success: `<svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info: `<svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 8v4m0 4h.01"/></svg>`,
  };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span><button class="toast-close" onclick="removeToast(this.parentElement)">✕</button>`;
  container.appendChild(toast);
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  if (!toast || toast.classList.contains("removing")) return;
  toast.classList.add("removing");
  setTimeout(() => toast.remove(), 300);
}

// ── Navbar HTML ──
function renderNavbar() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  const nav = document.getElementById("navbar-placeholder");
  if (!nav) return;
  nav.innerHTML = `
    <div class="announce-bar">
      Get 25% OFF on your first order. <a href="listing.html">Order Now</a>
    </div>
    <nav class="navbar">
      <div class="container navbar-inner">
        <a href="index.html" class="nav-logo">
          <div class="nav-logo-icon">E</div>
          Ecommerce
        </a>
        <ul class="nav-links">
          <li><a href="index.html" class="${page === "index.html" ? "active" : ""}">Home</a></li>
          <li class="nav-dropdown">
            <a href="listing.html" class="${page === "listing.html" ? "active" : ""}">Categories
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </a>
            <ul class="dropdown-menu">
              <li><a href="listing.html?cat=tshirts">T-Shirts</a></li>
              <li><a href="listing.html?cat=hoodies">Hoodies</a></li>
              <li><a href="listing.html?cat=sweatshirts">Sweatshirts</a></li>
              <li><a href="listing.html?cat=accessories">Accessories</a></li>
            </ul>
          </li>
          <li><a href="about.html" class="${page === "about.html" ? "active" : ""}">About</a></li>
          <li><a href="contact.html" class="${page === "contact.html" ? "active" : ""}">Contact</a></li>
        </ul>
        <div class="nav-right">
          <form class="nav-search-form" onsubmit="handleSearch(event)">
            <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
            <input type="text" id="nav-search-input" placeholder="Search products" />
          </form>
          <button class="nav-icon-btn" onclick="openCartDrawer()" title="Cart">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span class="badge" id="cart-badge" style="display:none">0</span>
          </button>
          <a href="${isLoggedIn() ? "account.html" : "login.html"}" class="nav-icon-btn" title="Account">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
          </a>
          <button class="nav-icon-btn hamburger" onclick="toggleMobileMenu()">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <div id="mobile-menu" style="display:none;background:var(--white);border-bottom:1px solid var(--gray-200);padding:16px 24px;">
      <ul style="display:flex;flex-direction:column;gap:4px;">
        <li><a href="index.html" style="display:block;padding:10px 12px;border-radius:4px;">Home</a></li>
        <li><a href="listing.html" style="display:block;padding:10px 12px;border-radius:4px;">Shop All</a></li>
        <li><a href="about.html" style="display:block;padding:10px 12px;border-radius:4px;">About</a></li>
        <li><a href="contact.html" style="display:block;padding:10px 12px;border-radius:4px;">Contact</a></li>
        <li><a href="${isLoggedIn() ? "account.html" : "login.html"}" style="display:block;padding:10px 12px;border-radius:4px;">${isLoggedIn() ? "My Account" : "Login"}</a></li>
      </ul>
    </div>
  `;
  updateCartBadge();
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById("nav-search-input").value.trim();
  if (q) window.location.href = `listing.html?q=${encodeURIComponent(q)}`;
}

// ── Footer HTML ──
function renderFooter() {
  const footer = document.getElementById("footer-placeholder");
  if (!footer) return;
  footer.innerHTML = `
    <footer class="footer">
      <div class="newsletter-section">
        <div class="container newsletter-inner">
          <div>
            <h3>Join Our Newsletter</h3>
            <p>We love to surprise our subscribers with occasional gifts.</p>
          </div>
          <form class="newsletter-form" onsubmit="handleNewsletter(event)">
            <input type="email" placeholder="Your email address" required />
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="nav-logo" style="display:inline-flex;">
                <div class="nav-logo-icon">E</div>
                Ecommerce
              </a>
              <p>DevCut is a YouTube channel for practical project-based learning.</p>
              <div class="footer-social">
                <a href="#" title="GitHub"><svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg></a>
                <a href="#" title="Instagram"><svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" title="YouTube"><svg fill="currentColor" viewBox="0 0 24 24" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of use</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="about.html">About us</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Shop</h4>
              <ul>
                <li><a href="account.html">My Account</a></li>
                <li><a href="checkout.html">Checkout</a></li>
                <li><a href="cart.html">Cart</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Accepted Payments</h4>
              <div class="footer-payments">
                <span class="payment-badge">MC</span>
                <span class="payment-badge">AMEX</span>
                <span class="payment-badge">VISA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">© 2026 DevCut. All rights reserved.</div>
      </div>
    </footer>
  `;
}

function handleNewsletter(e) {
  e.preventDefault();
  showToast("You've been subscribed!", "success");
  e.target.reset();
}

// ── Cart Drawer ──
function renderCartDrawer() {
  const existing = document.getElementById("cart-overlay");
  if (existing) return;
  const overlay = document.createElement("div");
  overlay.id = "cart-overlay";
  overlay.className = "cart-overlay";
  overlay.onclick = closeCartDrawer;
  const drawer = document.createElement("div");
  drawer.id = "cart-drawer";
  drawer.className = "cart-drawer";
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  refreshCartDrawer();
}

function openCartDrawer() {
  refreshCartDrawer();
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

function refreshCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  const cart = getCart();
  const { total } = getCartTotal();
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h3>Shopping Cart</h3>
      <button class="cart-drawer-close" onclick="closeCartDrawer()">
        <svg fill="none" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="cart-drawer-items">
      ${cart.length === 0 ? `
        <div class="cart-empty">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <p>Your cart is empty</p>
        </div>` :
        cart.map(item => `
          <div class="cart-drawer-item">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/64x64/f3f3f3/aaa?text=img'">
            <div class="cart-drawer-item-info">
              <h4>${item.name}</h4>
              <div class="cart-drawer-item-meta">${item.color ? item.color + " · " : ""}${item.size || ""}</div>
              <div class="cart-drawer-item-price">${(item.price * item.qty).toFixed(2)}DA</div>
            </div>
            <button onclick="drawerRemove('${item.id}','${item.color}','${item.size}')" style="color:var(--gray-400);align-self:flex-start;padding:4px;">
              <svg fill="none" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>`).join("")
      }
    </div>
    <div class="cart-drawer-footer">
      <div class="cart-drawer-total"><span>Total</span><span>${total.toFixed(2)}DA</span></div>
      <a href="cart.html" class="btn btn-outline w-full" onclick="closeCartDrawer()">View Cart</a>
      <a href="checkout.html" class="btn btn-primary w-full" onclick="closeCartDrawer()">Checkout</a>
    </div>
  `;
}

function drawerRemove(id, color, size) {
  removeFromCart(id, color, size);
  refreshCartDrawer();
  updateCartBadge();
}

// ── Init ──
document.addEventListener("DOMContentLoaded", () => {
  renderNavbar();
  renderFooter();
  renderCartDrawer();
  updateCartBadge();
});