function renderAdminSidebar(activePage) {
  const pages = [
    { key: "dashboard", label: "Dashboard", href: "dashboard.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
    { key: "products", label: "Products", href: "products.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>` },
    { key: "orders", label: "Orders", href: "orders.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>` },
    { key: "customers", label: "Customers", href: "customers.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>` },
    { key: "reviews", label: "Reviews", href: "reviews.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>` },
    { key: "settings", label: "Settings", href: "settings.html", icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>` },
  ];

  return `
    <aside class="admin-sidebar">
      <div class="admin-sidebar-logo">
        <div class="admin-login-logo-icon">E</div>
        Admin
      </div>
      <nav class="admin-nav">
        ${pages.map(p => `
          <a href="${p.href}" class="admin-nav-item ${activePage === p.key ? "active" : ""}">
            ${p.icon} ${p.label}
          </a>`).join("")}
        <hr class="admin-nav-divider" />
        <a href="admin-profile.html" class="admin-nav-item ${activePage === 'profile' ? 'active' : ''}"
          style="margin-bottom:4px;">
          <svg fill="none" viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Admin Profile
        </a>
        <div class="admin-nav-extras" onclick="adminLogout()">
          <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M12 4v1m0 14v1m8-8h-1M5 12H4m13.657-6.343l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707"/></svg>
          + Extras
        </div>
      </nav>
    </aside>`;
}

function renderAdminTopbar(pageLabel) {
  return `
    <div class="admin-topbar">
      <div class="admin-breadcrumb">
        <span>Admin</span>
        <span>›</span>
        <strong>${pageLabel}</strong>
      </div>
      <button class="admin-logout-btn" onclick="adminLogout()" title="Logout">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
      </button>
    </div>`;
}

// Shared pagination renderer
function renderAdminPagination(containerId, total, pageSize, currentPage, onPageChange) {
  const pages = Math.ceil(total / pageSize);
  const container = document.getElementById(containerId);
  if (!container || pages <= 1) { if (container) container.innerHTML = ""; return; }

  let html = `<button class="admin-page-btn" onclick="${onPageChange}(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>‹</button>`;
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<button class="admin-page-btn ${i === currentPage ? "active" : ""}" onclick="${onPageChange}(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += `<span class="admin-page-dots">…</span>`;
    }
  }
  html += `<button class="admin-page-btn" onclick="${onPageChange}(${currentPage + 1})" ${currentPage === pages ? "disabled" : ""}>›</button>`;
  container.innerHTML = html;
}

// Seed sample data if localStorage is empty
function seedAdminData() {
  // Seed users if none
  if (!localStorage.getItem("ec_users")) {
    localStorage.setItem("ec_users", JSON.stringify([
  {name: "Ahmed Benali",email: "ahmed.benali23@gmail.com",password: btoa("pass"),address: {street: "Cité 120 Logements",city: "Blida",state: "Blida",zip: "09000",country: "DZ"}},
  {name: "Yasmine Kaci",email: "yasmine.kaci@gmail.com",password: btoa("pass"),address: {street: "Rue Didouche Mourad",city: "Alger",state: "Alger",zip: "16000",country: "DZ"}},
  {name: "Sofiane Boudiaf",email: "sofiane.bdz@gmail.com",password: btoa("pass"),address: {street: "حي النصر",city: "Constantine",state: "Constantine",zip: "25000",country: "DZ"}},
  {name: "Nour El Houda Meziane",email: "nour.meziane@gmail.com",password: btoa("pass"),address: {street: "حي 500 مسكن",city: "Oran",state: "Oran",zip: "31000",country: "DZ"}},
  {name: "Karim Touati",email: "karim.touati19@gmail.com",password: btoa("pass"),address: {street: "حي بن بولعيد",city: "Batna",state: "Batna",zip: "05000",country: "DZ"}},
  {name: "Imane Saadi",email: "imane.saadi@gmail.com",password: btoa("pass"),address: {street: "حي الزهور",city: "Sétif",state: "Sétif",zip: "19000",country: "DZ"}},
  {name: "Walid Cherif",email: "walid.cherif@gmail.com",password: btoa("pass"),address: {street: "حي المستقبل",city: "Annaba",state: "Annaba",zip: "23000",country: "DZ"}},
  {name: "Sara Hamdani",email: "sara.hamdani@gmail.com",password: btoa("pass"),address: {street: "حي السلام",city: "Tlemcen",state: "Tlemcen",zip: "13000",country: "DZ"}},
    ]));
  }

  // Seed orders if none
  if (!localStorage.getItem("ec_orders")) {
    localStorage.setItem("ec_orders", JSON.stringify([
      { id: "ORD-001", date: "20 Mar, 2026", status: "Processing", total: 3000, items: [{ name: "Raw Black T-Shirt Lineup", image: "https://i.pinimg.com/1200x/94/f5/a0/94f5a0c9f1cbe18c186c0329d2e99ea8.jpg" }] },
      { id: "ORD-002", date: "19 Mar, 2026", status: "Processing", total: 3500, items: [{ name: "Athletic Shirt", image: "https://i.pinimg.com/736x/6a/2e/25/6a2e2542940ca69bf1b9861a06ad15c7.jpg" }] },
      { id: "ORD-003", date: "7 Feb, 2026",  status: "Completed", total: 3500, items: [{ name: "Block Round Neck Tee", image: "https://i.pinimg.com/1200x/7c/69/74/7c6974f728649407513b2d821dbb9d09.jpg" }] },
      { id: "ORD-004", date: "29 Jan, 2026", status: "Completed", total: 2000, items: [{ name: "Essential Neutrals", image: "https://i.pinimg.com/736x/b1/44/b1/b144b16ae18e9a0d47df53b4a7fbc959.jpg" }] },
      { id: "ORD-005", date: "27 Jan, 2026", status: "Processing", total: 3000, items: [{ name: "UTRAANET Black", image: "https://i.pinimg.com/736x/7d/61/b5/7d61b52c030b0e2c097f9ff6e873f1bd.jpg" }] },
      { id: "ORD-006", date: "4 Jan, 2026",  status: "Cancelled", total: 3000, items: [{ name: "Elegant Ebony Sweatshirts", image: "https://i.pinimg.com/1200x/f2/cf/f1/f2cff143a07e663d292a9133913eb0a3.jpg" }] },
      { id: "ORD-007", date: "28 Dec, 2025", status: "Completed", total: 5000, items: [{ name: "Sleek and Cozy Black", image: "https://i.pinimg.com/736x/8e/60/90/8e609035bace0110e49d743b03b46344.jpg" }] },
      { id: "ORD-008", date: "20 Dec, 2025", status: "Processing", total: 2500, items: [{ name: "MOCKUP Black", image: "https://i.pinimg.com/736x/9b/62/c7/9b62c786e9a42844313f15cbde0cc046.jpg" }] },
    ]));
  }

  // Seed reviews if none
  if (!localStorage.getItem("ec_reviews")) {
    localStorage.setItem("ec_reviews", JSON.stringify([
  {name: "Ahmed Benali",initials: "AB", review: "Produit top, qualité مليحة بزاف والتوصيل كان سريع.",rating: 5},
  {name: "Yasmine Kaci",initials: "YK",review: "الخدمة مليحة بصح livraison تأخرت شوية.",rating: 4},
  {name: "Sofiane Boudiaf",initials: "SB",review: "Franchement, produit عادي، كنت متوقع خير من هكذا.",rating: 3},
  {name: "Nour Meziane",initials: "NM",review: "Support كان متعاون بزاف، المشكلة تتحلت بسرعة.",rating: 5},
  {name: "Karim Touati",initials: "KT",review: "Bon rapport qualité/prix، يستاهل التجربة.",rating: 4},
  {name: "Imane Saadi",initials: "IS",review: "ما عجبنيش بزاف، كاين نقص في الجودة.",rating: 2},
  {name: "Walid Cherif",initials: "WC",review: "Good experience overall, نقدر نعاود نطلب.",rating: 4},
  {name: "Sara Hamdani",initials: "SH",review: "Service professionnel وتعامل راقي، merci !",rating: 5},
    ]));
  }
}
