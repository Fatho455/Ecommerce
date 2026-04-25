const ORD_PAGE_SIZE = 8;
let allOrders = [];
let filteredOrders = [];
let ordPage = 1;

function loadOrders() {
  allOrders = JSON.parse(localStorage.getItem("ec_orders") || "[]");
  filteredOrders = [...allOrders];
}

function searchOrders(q) {
  const query = q.toLowerCase();
  filteredOrders = query
    ? allOrders.filter(o => (o.items[0]?.name || "").toLowerCase().includes(query) || o.id.toLowerCase().includes(query))
    : [...allOrders];
  ordPage = 1;
  renderOrders();
}

function renderOrders() {
  const tbody = document.getElementById("orders-tbody");
  const start = (ordPage - 1) * ORD_PAGE_SIZE;
  const paged = filteredOrders.slice(start, start + ORD_PAGE_SIZE);

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="admin-no-results">No orders found.</td></tr>`;
  } else {
    tbody.innerHTML = paged.map(o => `
      <tr>
        <td><img class="admin-table-img" src="${o.items[0]?.image || "https://placehold.co/38x38/f3f3f3/aaa?text=?"}"
          alt="order" onerror="this.src='https://placehold.co/38x38/f3f3f3/aaa?text=?'"/></td>
        <td>
          <div style="font-weight:500;">${o.items[0]?.name || "Order"}</div>
          <div style="font-size:12px;color:var(--admin-gray-400);">${o.id}</div>
        </td>
        <td style="color:var(--admin-gray-500);">${o.date}</td>
        <td style="font-weight:600;">$${(o.total || 0).toFixed(2)}</td>
        <td>
          <select onchange="updateOrderStatus('${o.id}', this.value)"
            style="padding:4px 8px;border:1.5px solid var(--admin-gray-200);border-radius:20px;font-size:12px;font-weight:600;background:white;cursor:pointer;">
            <option value="Processing" ${o.status === "Processing" ? "selected" : ""}>Processing</option>
            <option value="Completed" ${o.status === "Completed" ? "selected" : ""}>Completed</option>
            <option value="Cancelled" ${o.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
            <option value="Failed" ${o.status === "Failed" ? "selected" : ""}>Failed</option>
          </select>
        </td>
        <td><button class="admin-action-btn">···</button></td>
      </tr>`).join("");
  }
  renderAdminPagination("orders-pagination", filteredOrders.length, ORD_PAGE_SIZE, ordPage, "ordGoToPage");
}

function ordGoToPage(page) {
  const pages = Math.ceil(filteredOrders.length / ORD_PAGE_SIZE);
  if (page < 1 || page > pages) return;
  ordPage = page;
  renderOrders();
}

function updateOrderStatus(id, status) {
  const orders = JSON.parse(localStorage.getItem("ec_orders") || "[]");
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    localStorage.setItem("ec_orders", JSON.stringify(orders));
    allOrders = orders;
    filteredOrders = filteredOrders.map(o => o.id === id ? { ...o, status } : o);
    adminToast(`Order status updated to ${status}`, "success");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  requireAdminAuth();
  seedAdminData();
  document.getElementById("sidebar-placeholder").innerHTML = renderAdminSidebar("orders");
  document.getElementById("topbar-placeholder").innerHTML = renderAdminTopbar("Orders");
  loadOrders();
  renderOrders();
});
