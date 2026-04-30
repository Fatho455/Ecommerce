let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let selectedQty = 1;
let selectedImageIdx = 0;
let selectedReviewStar = 0;
let productReviews = [];

const SAMPLE_REVIEWS = [
  { name: "Ahmed Bensalem", date: "1 week ago", rating: 4, text: "This company always goes above and beyond to satisfy their customers." },
  { name: "Yasmine Khelifi", date: "1 months ago", rating: 4, text: "I can't believe how affordable and high-quality this item is!" },
  { name: "Karim Meziane", date: "3 weeks ago", rating: 4, text: "These guys know their craft and it shows in their products." },
];

function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  currentProduct = getProductById(id);
  if (!currentProduct) {
    document.getElementById("product-layout").innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:80px;color:var(--gray-400)"><h2>Product not found</h2><a href="listing.html" class="btn btn-primary" style="margin-top:16px">Browse Products</a></div>`;
    return;
  }
  productReviews = [...SAMPLE_REVIEWS];
  selectedColor = currentProduct.colors[0];
  selectedSize = currentProduct.sizes[2] || currentProduct.sizes[0];
  renderProduct();
  renderDetails();
  renderReviews();
  renderRelated();
  document.title = `${currentProduct.name} – Ecommerce`;
}

function renderProduct() {
  const p = currentProduct;
  const layout = document.getElementById("product-layout");
  const inWishlist = isInWishlist(p.id);
  const colorIdx = p.colors.indexOf(selectedColor);
  const colorName = p.colorNames[colorIdx] || "";

  layout.innerHTML = `
    <!-- Gallery -->
    <div class="gallery">
      <div class="gallery-thumbs">
        ${p.images.map((img, i) => `
          <div class="gallery-thumb ${i === selectedImageIdx ? "active" : ""}" onclick="selectImage(${i})">
            <img src="${img}" alt="View ${i + 1}" onerror="this.src='https://placehold.co/72x72/f3f3f3/aaa?text=img'"/>
          </div>`).join("")}
      </div>
      <div class="gallery-main">
        <img id="gallery-main-img" src="${p.images[selectedImageIdx]}" alt="${p.name}" onerror="this.src='https://placehold.co/600x600/f3f3f3/aaa?text=Product'"/>
        <div class="gallery-dots">
          ${p.images.map((_, i) => `<div class="gallery-dot ${i === selectedImageIdx ? "active" : ""}" onclick="selectImage(${i})"></div>`).join("")}
        </div>
      </div>
    </div>

    <!-- Info -->
    <div class="product-info">
      <div class="product-meta-top">
        <div class="product-rating-row">
          ${renderStars(p.rating)}
          <span>${p.rating} — ${p.reviews} Reviews</span>
        </div>
        <button onclick="copyProductLink()" style="color:var(--gray-400);display:flex;align-items:center;gap:4px;font-size:13px;" title="Share">
          <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path stroke-linecap="round" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
        </button>
      </div>

      <h1 style="font-family:var(--font-serif);font-size:28px;font-weight:400;margin-bottom:12px;">${p.name}</h1>
      <div class="product-price">${p.price.toFixed(2)} DA</div>
      <div class="product-stock-badge" style="margin-bottom:20px;">${p.inStock ? "In Stock" : "Out of Stock"}</div>

      <!-- Colors -->
      <div class="product-option-label">Available Colors: <span style="font-weight:400;color:var(--gray-500);">${colorName}</span></div>
      <div class="product-colors">
        ${p.colors.map((c, i) => `
          <button class="color-swatch ${c === selectedColor ? "active" : ""}"
            style="background:${c};${c === "#ffffff" ? "border:1.5px solid var(--gray-200);" : ""}"
            onclick="selectColor('${c}')" title="${p.colorNames[i]}">
          </button>`).join("")}
      </div>

      <!-- Sizes -->
      <div class="product-option-label">Select Size</div>
      <div class="product-sizes">
        ${p.sizes.map(s => `
          <button class="size-btn ${s === selectedSize ? "active" : ""}" onclick="selectSize('${s}')">${s}</button>`).join("")}
      </div>

      <!-- Qty -->
      <div class="product-option-label">Quantity</div>
      <div class="product-qty-row">
        <div class="qty-stepper">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <div class="qty-value" id="qty-display">${selectedQty}</div>
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
      </div>

      <!-- Actions -->
      <div class="product-actions">
        <button class="btn btn-primary" onclick="handleAddToCart()">Add to cart</button>
        <button class="wishlist-action-btn ${inWishlist ? "active" : ""}" id="wishlist-btn" onclick="handleWishlist()">
          <svg fill="${inWishlist ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <div class="product-shipping-note">
        <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4-1-4 1"/></svg>
        FREE SHIPPING ON ORDERS 5000 DA+
      </div>

      <!-- Share -->
      <div class="share-section">
        <div class="share-label">Share</div>
        <div class="share-links">
          <button class="share-link-copy" onclick="copyProductLink()">
            <svg fill="none" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            Copy Link
          </button>
          <div class="share-social">
            <a href="#" title="X">𝕏</a>
            <a href="#" title="Pinterest">P</a>
            <a href="#" title="WhatsApp">W</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("product-breadcrumb").innerHTML = `
    <a href="index.html">LuxStore</a>
    <span>›</span>
    <span>${p.name}</span>
  `;
  document.getElementById("product-tabs-section").style.display = "";
}

function renderDetails() {
  const p = currentProduct;
  document.getElementById("tab-details").innerHTML = `
    <p class="product-description">${p.description}</p>
    <div class="product-features">
      ${p.features.map(f => `<div class="product-feature">${f}</div>`).join("")}
    </div>
  `;
}

function renderReviews() {
  const p = currentProduct;
  const avgRating = productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length || p.rating;
  document.getElementById("tab-reviews").innerHTML = `
    <div class="reviews-header">
      <div class="reviews-avg">
        <div class="reviews-avg-score">${avgRating.toFixed(1)}</div>
        <div style="display:flex;justify-content:center;">${renderStars(avgRating)}</div>
        <div style="font-size:12px;color:var(--gray-400);margin-top:4px;">${productReviews.length} reviews</div>
      </div>
      <div>
        <button class="btn btn-outline review-write-btn" onclick="openReviewModal()">Write a Review</button>
      </div>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:20px;">
      <select style="padding:6px 12px;border:1.5px solid var(--gray-200);border-radius:4px;font-size:13px;">
        <option>SORT BY: Latest</option>
        <option>SORT BY: Rating</option>
      </select>
    </div>
    <div class="reviews-list">
      ${productReviews.map(r => `
        <div class="review-item">
          <div class="review-header">
            <div class="review-author">
              <div class="review-avatar">${r.name[0]}</div>
              <div>
                <div class="review-name">${r.name}</div>
                <div class="review-date">${r.date}</div>
              </div>
            </div>
            <div>${renderStars(r.rating)}</div>
          </div>
          <p class="review-text">${r.text}</p>
        </div>`).join("")}
    </div>
    <div style="text-align:center;margin-top:24px;">
      <button class="btn btn-outline">Load more reviews</button>
    </div>
  `;
}

function renderRelated() {
  const related = getRelatedProducts(currentProduct.id, 4);
  if (related.length === 0) return;
  const section = document.getElementById("related-section");
  const grid = document.getElementById("related-grid");
  section.style.display = "";
  grid.innerHTML = related.map(renderProductCard).join("");
}

function selectImage(idx) {
  selectedImageIdx = idx;
  const img = document.getElementById("gallery-main-img");
  if (img) {
    img.style.opacity = "0.5";
    setTimeout(() => {
      img.src = currentProduct.images[idx];
      img.style.opacity = "1";
    }, 150);
  }
  document.querySelectorAll(".gallery-thumb").forEach((t, i) => t.classList.toggle("active", i === idx));
  document.querySelectorAll(".gallery-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
}

function selectColor(color) {
  selectedColor = color;
  document.querySelectorAll(".color-swatch").forEach((s, i) => {
    s.classList.toggle("active", currentProduct.colors[i] === color);
  });
  const colorIdx = currentProduct.colors.indexOf(color);
  document.querySelector(".product-option-label").innerHTML = `Available Colors: <span style="font-weight:400;color:var(--gray-500);">${currentProduct.colorNames[colorIdx]}</span>`;
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll(".size-btn").forEach(b => b.classList.toggle("active", b.textContent === size));
}

function changeQty(delta) {
  selectedQty = Math.max(1, selectedQty + delta);
  const display = document.getElementById("qty-display");
  if (display) display.textContent = selectedQty;
}

function handleAddToCart() {
  if (!selectedSize) { showToast("Please select a size", "error"); return; }
  const colorIdx = currentProduct.colors.indexOf(selectedColor);
  addToCart({
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    color: currentProduct.colorNames[colorIdx] || "",
    size: selectedSize,
    qty: selectedQty,
    image: currentProduct.image,
  });
}

function handleWishlist() {
  const added = toggleWishlist(currentProduct);
  const btn = document.getElementById("wishlist-btn");
  if (btn) {
    btn.classList.toggle("active", added);
    btn.querySelector("svg").setAttribute("fill", added ? "currentColor" : "none");
  }
}

function copyProductLink() {
  navigator.clipboard.writeText(window.location.href).then(() => showToast("Link copied!", "success"));
}

function switchProductTab(btn, tab) {
  document.querySelectorAll(".product-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".product-tab-panel").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`tab-${tab}`).classList.add("active");
}

function openReviewModal() {
  document.getElementById("review-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeReviewModal() {
  document.getElementById("review-modal").classList.remove("open");
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target === e.currentTarget) closeReviewModal();
}

function setReviewStar(n) {
  selectedReviewStar = n;
  document.querySelectorAll(".star-rating-input button").forEach((b, i) => {
    b.classList.toggle("active", i < n);
  });
}

function submitReview(e) {
  e.preventDefault();
  if (selectedReviewStar === 0) { showToast("Please select a rating", "error"); return; }
  const name = document.getElementById("review-name").value;
  const text = document.getElementById("review-text").value;
  productReviews.unshift({ name, date: "Just now", rating: selectedReviewStar, text });
  closeReviewModal();
  renderReviews();
  showToast("Review submitted!", "success");
  e.target.reset();
  selectedReviewStar = 0;
}

document.addEventListener("DOMContentLoaded", initProduct);
