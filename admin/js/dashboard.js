document.addEventListener("DOMContentLoaded", () => {
  requireAdminAuth();
  seedAdminData();
  document.getElementById("sidebar-placeholder").innerHTML = renderAdminSidebar("dashboard");
  document.getElementById("topbar-placeholder").innerHTML = renderAdminTopbar("Dashboard");
  renderDashboard();
});

function renderDashboard() {
  const orders = JSON.parse(localStorage.getItem("ec_orders") || "[]");
  const users = JSON.parse(localStorage.getItem("ec_users") || "[]");
  const settings = JSON.parse(localStorage.getItem("ec_settings") || '{"monthlyGoal":1000}');
  const goal = settings.monthlyGoal || 1000;

  const totalSales = orders.reduce((s, o) => s + (o.total || 0), 0);
  const totalOrders = orders.length;
  const ordersLeft = Math.max(0, goal - totalOrders);
  const progressPct = Math.min(100, Math.round((totalOrders / goal) * 100));

  // Bar chart data (simulate monthly sales)
  const barHeights = [30,45,35,60,50,70,55,80,65,75,60,85,70,90,75,85,80,95,70,88,76,92,68,84,78,88,72,95,80,100];

  // Line chart SVG
  const linePoints = [60,40,55,35,50,45,30,55,40,60,35,50,45,55,40].map((y, i) => `${i * 18},${y}`).join(" ");

  // Best selling
  const bestItems = [
    { name: "Block Round Neck Tee", sales: 70000 },
    { name: "Sleek and Cozy Black", sales: 65000 },
    { name: "Athletic Shirt", sales: 52500 },
  ];
  const bestTotal = bestItems.reduce((s, i) => s + i.sales, 0);

  // Donut chart via SVG
  const colors = ["#2563eb", "#60a5fa", "#bfdbfe"];
  let offset = 0;
  const r = 48, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  const donutSegments = bestItems.map((item, i) => {
    const pct = item.sales / bestTotal;
    const dash = pct * circ;
    const gap = circ - dash;
    const seg = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="14"
      stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})" />`;
    offset += dash;
    return seg;
  }).join("");

  const content = document.getElementById("dashboard-content");
  content.innerHTML = `
    <!-- Stats Row -->
    <div class="dashboard-stats">
      <!-- Total Sales -->
      <div class="stat-card">
        <div class="stat-card-header">
          <div>
            <div class="stat-card-label">Total Sales</div>
            <div class="stat-card-sub">This Month</div>
          </div>
        </div>
        <div class="stat-card-value">${totalSales.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 2 })}DA</div>
        <div class="stat-chart">
          ${barHeights.map(h => `<div class="stat-bar" style="height:${h}%"></div>`).join("")}
        </div>
      </div>

      <!-- Customers -->
      <div class="stat-card">
        <div class="stat-card-header">
          <div>
            <div class="stat-card-label">Customers</div>
            <div class="stat-card-sub">This Month</div>
          </div>
        </div>
        <div class="stat-card-value">${(2571).toLocaleString()}</div>
        <svg class="stat-line-chart" viewBox="0 0 252 70" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%">
          <polyline points="${linePoints}" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Orders -->
      <div class="stat-card">
        <div class="stat-card-header">
          <div>
            <div class="stat-card-label">Orders</div>
            <div class="stat-card-sub">Monthly Goals : ${goal.toLocaleString()}</div>
          </div>
        </div>
        <div class="stat-card-value">${totalOrders}</div>
        <div class="stat-progress-wrap">
          <div style="font-size:13px;color:var(--admin-gray-500);">${ordersLeft} Left</div>
          <div class="stat-progress-bar">
            <div class="stat-progress-fill" style="width:${progressPct}%"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="dashboard-bottom">
      <!-- Best Selling -->
      <div class="best-selling-card">
        <h3>Best Selling</h3>
        <div class="sub">This Month</div>
        <hr style="border:none;border-top:1px solid var(--admin-gray-100);margin-bottom:16px;">
        <div class="best-selling-total">${bestTotal.toLocaleString()} DA<span>— Total Sales</span></div>
        <div class="best-selling-items">
          ${bestItems.map(item => `
            <div class="best-selling-item">
              ${item.name} — <strong>${item.sales.toLocaleString()} DA</strong>
            </div>`).join("")}
        </div>
        <div class="donut-chart-wrap">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" fill="none" stroke="var(--admin-gray-100)" stroke-width="14"/>
            ${donutSegments}
          </svg>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="recent-orders-card">
        <div class="recent-orders-header">
          <h3>Recent Orders</h3>
          <a href="orders.html" class="view-all-btn">View All</a>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width:auto;">Item</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${orders.slice(0, 5).map(o => `
              <tr>
                <td>${o.items[0]?.name || "—"}</td>
                <td style="color:var(--admin-gray-500);">${o.date}</td>
                <td style="font-weight:600;">${o.total.toFixed(2)}DA</td>
                <td><span class="status-badge ${(o.status || "").toLowerCase()}">${o.status}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
