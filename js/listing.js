const PAGE_SIZE = 9;
let currentPage = 1;
let activeColors = [];
let activeSizes = [];
let maxPrice = 10000;

function getFilters() {
  const cat = document.querySelector('input[name="cat"]:checked')?.value || "all";
  const sort = document.getElementById("sort-select")?.value || "default";
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";
  return { cat, sort, q };
}

function getFilteredProducts() {
  const { cat, sort, q } = getFilters();
  let products = q ? searchProducts(q) : getProductsByCategory(cat);

  if (activeColors.length > 0) {
    products = products.filter(p =>
      p.colorNames.some(c => activeColors.includes(c))
    );
  }
  if (activeSizes.length > 0) {
    products = products.filter(p =>
      p.sizes.some(s => activeSizes.includes(s))
    );
  }
  products = products.filter(p => p.price <= maxPrice);

  switch (sort) {
    case "price-asc": products.sort((a, b) => a.price - b.price); break;
    case "price-desc": products.sort((a, b) => b.price - a.price); break;
    case "rating": products.sort((a, b) => b.rating - a.rating); break;
    case "name": products.sort((a, b) => a.name.localeCompare(b.name)); break;
  }
  return products;
}

function applyFilters() {
  currentPage = 1;
  renderListing();
  renderAppliedFilters();
}

function renderAppliedFilters() {
  const container = document.getElementById("applied-filters");
  if (!container) return;
  const { cat, q } = getFilters();
  let tags = [];
  if (q) tags.push({ label: `"${q}"`, remove: () => { window.history.replaceState({}, "", "listing.html"); applyFilters(); } });
  if (cat !== "all") tags.push({ label: cat, remove: () => { document.querySelector('input[name="cat"][value="all"]').checked = true; applyFilters(); } });
  activeColors.forEach(c => tags.push({ label: c, remove: () => { activeColors = activeColors.filter(x => x !== c); document.querySelectorAll(".filter-color-btn").forEach(b => { if (b.dataset.color === c) b.classList.remove("active"); }); applyFilters(); } }));
  activeSizes.forEach(s => tags.push({ label: `Size ${s}`, remove: () => { activeSizes = activeSizes.filter(x => x !== s); document.querySelectorAll(".size-btn").forEach(b => { if (b.dataset.size === s) b.classList.remove("active"); }); applyFilters(); } }));
  container.innerHTML = tags.map((t, i) => `
    <span class="applied-filter-tag">
      ${t.label}
      <button onclick="window.__filterRemovers[${i}]()" title="Remove">✕</button>
    </span>
  `).join("");
  window.__filterRemovers = tags.map(t => t.remove);
}

function renderListing() {
  const grid = document.getElementById("listing-grid");
  const countEl = document.getElementById("listing-count");
  if (!grid) return;
  const all = getFilteredProducts();
  const total = all.length;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paged = all.slice(start, start + PAGE_SIZE);

  if (countEl) {
    const end = Math.min(start + PAGE_SIZE, total);
    countEl.innerHTML = `Showing <strong>${total > 0 ? start + 1 : 0}–${end}</strong> of <strong>${total}</strong> results`;
  }

  if (paged.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms.</p>
      </div>`;
  } else {
    grid.innerHTML = paged.map(renderProductCard).join("");
  }
  renderPagination(total);
}

function renderPagination(total) {
  const container = document.getElementById("pagination");
  if (!container) return;
  const pages = Math.ceil(total / PAGE_SIZE);
  if (pages <= 1) { container.innerHTML = ""; return; }

  let buttons = "";
  // Prev
  buttons += `<button class="pagination-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>‹</button>`;
  // Pages
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      buttons += `<button class="pagination-btn ${i === currentPage ? "active" : ""}" onclick="goToPage(${i})">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      buttons += `<span class="pagination-dots">…</span>`;
    }
  }
  // Next
  buttons += `<button class="pagination-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === pages ? "disabled" : ""}>›</button>`;
  container.innerHTML = buttons;
}

function goToPage(page) {
  const all = getFilteredProducts();
  const pages = Math.ceil(all.length / PAGE_SIZE);
  if (page < 1 || page > pages) return;
  currentPage = page;
  renderListing();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleColorFilter(btn) {
  const color = btn.dataset.color;
  btn.classList.toggle("active");
  if (activeColors.includes(color)) {
    activeColors = activeColors.filter(c => c !== color);
  } else {
    activeColors.push(color);
  }
  applyFilters();
}

function toggleSizeFilter(btn) {
  const size = btn.dataset.size;
  btn.classList.toggle("active");
  if (activeSizes.includes(size)) {
    activeSizes = activeSizes.filter(s => s !== size);
  } else {
    activeSizes.push(size);
  }
  applyFilters();
}

function updatePriceFilter(val) {
  maxPrice = parseInt(val);
  document.getElementById("price-display-val").textContent = `DA${val}`;
  applyFilters();
}

// Pre-select category from URL
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const q = params.get("q");
  if (cat) {
    const radio = document.querySelector(`input[name="cat"][value="${cat}"]`);
    if (radio) radio.checked = true;
  }
  const label = document.getElementById("breadcrumb-label");
  if (label) label.textContent = q ? `Search: "${q}"` : cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All Products";
}

document.addEventListener("DOMContentLoaded", () => {
  initFromURL();
  applyFilters();
});