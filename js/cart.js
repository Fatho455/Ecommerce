function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-content");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="listing.html" class="btn btn-primary">Start Shopping</a>
      </div>`;
    return;
  }

  const { subtotal, shipping, tax, total } = getCartTotal();

  container.innerHTML = `
    <div class="cart-grid">
      <div>
        <div class="cart-table-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span></span>
        </div>
        <div class="cart-items" id="cart-items-list">
          ${cart.map(item => renderCartItem(item)).join("")}
        </div>
      </div>
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)} DA</span></div>
        <div class="summary-row"><span>Shipping:</span><span class="free">${shipping === 0 ? "Free" : shipping.toFixed(2) + " DA"}</span></div>
        <div class="summary-row"><span>Tax:</span><span>${tax.toFixed(2)} DA</span></div>
        <div class="summary-row total"><span>Total</span><span>${total.toFixed(2)} DA</span></div>
        <a href="checkout.html" class="btn btn-primary">Checkout</a>
        <a href="listing.html" class="btn btn-ghost w-full" style="margin-top:8px;text-align:center;">Continue Shopping</a>
      </div>
    </div>`;
}

function renderCartItem(item) {
  return `
    <div class="cart-item" id="cart-item-${item.id}-${item.size}">
      <div class="cart-item-product">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}"
          onerror="this.src='https://placehold.co/80x80/f3f3f3/aaa?text=img'" />
        <div>
          <div class="cart-item-name"><a href="product.html?id=${item.id}">${item.name}</a></div>
          <div class="cart-item-meta">
            ${item.color ? `Color: <span style="font-weight:500;color:var(--black);">${item.color}</span> &nbsp;` : ""}
            ${item.size ? `Size: <span style="font-weight:500;color:var(--black);">${item.size}</span>` : ""}
          </div>
        </div>
      </div>
      <div class="cart-item-price">${item.price.toFixed(2)} DA</div>
      <div class="qty-stepper">
        <button class="qty-btn" onclick="handleQtyChange('${item.id}','${item.color}','${item.size}',-1)">−</button>
        <div class="qty-value">${item.qty}</div>
        <button class="qty-btn" onclick="handleQtyChange('${item.id}','${item.color}','${item.size}',1)">+</button>
      </div>
      <div class="cart-item-total">${(item.price * item.qty).toFixed(2)} DA</div>
      <button class="cart-remove-btn" onclick="handleRemove('${item.id}','${item.color}','${item.size}')" title="Remove">
        <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>`;
}

function handleQtyChange(id, color, size, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.color === color && i.size === size);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) {
    handleRemove(id, color, size);
    return;
  }
  updateQty(id, color, size, newQty);
  renderCartPage();
}

function handleRemove(id, color, size) {
  removeFromCart(id, color, size);
  renderCartPage();
}

document.addEventListener("DOMContentLoaded", renderCartPage);
