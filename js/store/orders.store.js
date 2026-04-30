const ORDERS_KEY = "ec_orders";

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
}

function addOrder(orderData) {
  const orders = getOrders();
  const order = {
    id: "ORD-" + Date.now(),
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    status: "Processing",
    ...orderData,
  };
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
}

function getOrderById(id) {
  return getOrders().find((o) => o.id === id) || null;
}

function updateOrderStatus(id, status) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
}
