function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(rating);
    const half = !full && i < rating;
    const color = full || half ? "#f59e0b" : "#d1d5db";
    return `<svg viewBox="0 0 24 24" width="13" height="13" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  }).join("");
}

function renderProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  return `
    <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x400/f3f3f3/aaa?text=Product'"/>
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ""}
        <button class="product-card-wishlist ${inWishlist ? "active" : ""}" 
          onclick="event.stopPropagation(); handleWishlistToggle(this, '${product.id}')" 
          title="Wishlist">
          <svg fill="${inWishlist ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-meta">
          <span class="product-card-stock ${product.inStock ? "" : "out"}">${product.inStock ? "In Stock" : "Out of Stock"}</span>
          <span class="product-card-price">${product.price.toFixed(2)}DA</span>
        </div>
      </div>
    </div>
  `;
}

function handleWishlistToggle(btn, productId) {
  const product = getProductById(productId);
  if (!product) return;
  const added = toggleWishlist(product);
  btn.classList.toggle("active", added);
  btn.querySelector("svg").setAttribute("fill", added ? "currentColor" : "none");
}

function switchTab(btn, tab) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderFeaturedGrid(tab);
}

function renderFeaturedGrid(tab = "featured") {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  let products = tab === "latest"
    ? PRODUCTS.slice().reverse().slice(0, 4)
    : PRODUCTS.slice(4, 8);
  grid.innerHTML = products.map(renderProductCard).join("");
}

function renderBestSelling() {
  const grid = document.getElementById("best-selling-grid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 4).map(renderProductCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderBestSelling();
  renderFeaturedGrid("featured");
});