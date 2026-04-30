function renderCheckoutSummary() {
  const cart = getCart();
  const { subtotal, shipping, tax, total } = getCartTotal();

  const imgs = document.getElementById("checkout-imgs");
  if (imgs) {
    imgs.innerHTML = cart.map(item => `
      <img class="checkout-order-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://placehold.co/48x48/f3f3f3/aaa?text=img'" title="${item.name} x${item.qty}" />`
    ).join("");
  }

  const rows = document.getElementById("checkout-summary-rows");
  if (rows) {
    rows.innerHTML = `
      <div class="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)} DA</span></div>
      <div class="summary-row"><span>Shipping:</span><span class="free">${shipping === 0 ? "Free" : "${shipping.toFixed(2)} DA"}</span></div>
      <div class="summary-row"><span>Tax:</span><span>${tax.toFixed(2)} DA</span></div>
      <div class="summary-row total"><span>Total</span><span>${total.toFixed(2)} DA</span></div>`;
  }

  // Pre-fill from user profile
  const user = getUser();
  if (user) {
    if (user.email) document.getElementById("email").value = user.email;
    if (user.name) document.getElementById("fullname").value = user.name;
    if (user.address) {
      const a = user.address;
      if (a.street) document.getElementById("street").value = a.street;
      if (a.city) document.getElementById("city").value = a.city;
      if (a.state) document.getElementById("state").value = a.state;
      if (a.zip) document.getElementById("zip").value = a.zip;
      if (a.country) document.getElementById("country").value = a.country;
    }
  }
}

function placeOrder(e) {
  e.preventDefault();
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  const { total } = getCartTotal();
  const order = addOrder({
    items: cart,
    total,
    address: {
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      country: document.getElementById("country").value,
    },
    email: document.getElementById("email").value,
    name: document.getElementById("fullname").value,
  });

  // Simulate success (90%) or failure (10%)
  const success = Math.random() > 0.1;
  clearCart();

  if (success) {
    window.location.href = `order-success.html?id=${order.id}`;
  } else {
    window.location.href = `order-failed.html?id=${order.id}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }
  renderCheckoutSummary();
});
