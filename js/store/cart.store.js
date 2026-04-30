const CART_KEY = "ec_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(
    (i) => i.id === product.id && i.color === product.color && i.size === product.size
  );
  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart(cart);
  showToast("Item added to cart!", "success");
}

function removeFromCart(id, color, size) {
  let cart = getCart();
  cart = cart.filter((i) => !(i.id === id && i.color === color && i.size === size));
  saveCart(cart);
}

function updateQty(id, color, size, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.color === color && i.size === size);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartTotal() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = parseFloat((subtotal * 0.03).toFixed(2));
 const shipping = subtotal >= 5000 ? 0 : 250;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));
  return { subtotal: parseFloat(subtotal.toFixed(2)), tax, shipping, total };
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}
