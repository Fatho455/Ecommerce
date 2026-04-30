function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const full = i < Math.floor(rating);
    const color = full ? "#f59e0b" : "#d1d5db";
    return `<svg viewBox="0 0 24 24" width="13" height="13" fill="${color}"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
  }).join("");
}

// ── Home card WITH hover Add to Cart ──
function renderHomeProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  return `
    <div class="product-card home-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}"
          onerror="this.src='https://placehold.co/400x400/f3f3f3/aaa?text=Product'"/>
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ""}
        <button class="product-card-wishlist ${inWishlist ? "active" : ""}"
          onclick="event.stopPropagation(); handleWishlistToggle(this, '${product.id}')"
          title="Wishlist">
          <svg fill="${inWishlist ? "currentColor" : "none"}" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <!-- Hover Add to Cart overlay -->
        <div class="home-card-hover-overlay" onclick="event.stopPropagation()">
          <button class="home-card-add-btn"
            onclick="event.stopPropagation(); quickAddToCart('${product.id}')">
            <svg fill="none" viewBox="0 0 24 24" width="16" height="16"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Add to cart
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-meta">
          <span class="product-card-stock ${product.inStock ? "" : "out"}">
            ${product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <span class="product-card-price">${product.price.toFixed(2)} DA</span>
        </div>
      </div>
    </div>
  `;
}

// ── Listing card (no hover overlay) ──
function renderProductCard(product) {
  const inWishlist = isInWishlist(product.id);
  return `
    <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-card-img">
        <img src="${product.image}" alt="${product.name}"
          onerror="this.src='https://placehold.co/400x400/f3f3f3/aaa?text=Product'"/>
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ""}
        <button class="product-card-wishlist ${inWishlist ? "active" : ""}"
          onclick="event.stopPropagation(); handleWishlistToggle(this, '${product.id}')"
          title="Wishlist">
          <svg fill="${inWishlist ? "currentColor" : "none"}" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-meta">
          <span class="product-card-stock ${product.inStock ? "" : "out"}">
            ${product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <span class="product-card-price">${product.price.toFixed(2)} DA</span>
        </div>
      </div>
    </div>
  `;
}

function quickAddToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    color: product.colorNames[0] || "",
    size: product.sizes[1] || product.sizes[0] || "M",
    qty: 1,
    image: product.image,
  });
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
  refreshProducts();
  const all = getAllProducts();
  let products = tab === "latest"
    ? all.slice().reverse().slice(0, 4)
    : all.slice(4, 8);
  if (products.length === 0) products = all.slice(0, 4);
  grid.innerHTML = products.map(renderHomeProductCard).join("");
}

function renderBestSelling() {
  const grid = document.getElementById("best-selling-grid");
  if (!grid) return;
  refreshProducts();
  const all = getAllProducts();
  grid.innerHTML = all.slice(0, 4).map(renderHomeProductCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderBestSelling();
  renderFeaturedGrid("featured");
});
