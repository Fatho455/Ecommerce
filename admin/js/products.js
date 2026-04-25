const PAGE_SIZE = 8;
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let deleteTargetId = null;

const DEFAULT_PRODUCTS = [
  { id: "black-tee", name: "Raw Black T-Shirt Lineup", sku: "47514501", price: 3000, stock: "In Stock", category: "T-shirt, Men", image: "https://i.pinimg.com/1200x/94/f5/a0/94f5a0c9f1cbe18c186c0329d2e99ea8.jpg" },
  { id: "Block-Round", name: "Block Round Neck Tee", sku: "47514501", price: 3500, stock: "In Stock", category: "T-shirt, Men", image: "https://i.pinimg.com/1200x/7c/69/74/7c6974f728649407513b2d821dbb9d09.jpg" },
  { id: "athletic-shirt", name: "Athletic Shirt", sku: "47514501", price: 3500, stock: "In Stock", category: "T-shirt", image: "https://i.pinimg.com/736x/6a/2e/25/6a2e2542940ca69bf1b9861a06ad15c7.jpg" },
  { id: "essential-neutrals", name: "Essential Neutrals", sku: "47514501", price: 2000, stock: "In Stock", category: "T-shirt, Raw", image: "https://i.pinimg.com/736x/b1/44/b1/b144b16ae18e9a0d47df53b4a7fbc959.jpg" },
  { id: "ultranet-black", name: "UTRAANET Black", sku: "47514501", price: 3000, stock: "In Stock", category: "T-shirt, Trend", image: "https://i.pinimg.com/736x/7d/61/b5/7d61b52c030b0e2c097f9ff6e873f1bd.jpg" },
  { id: "elegant-ebony", name: "Elegant Ebony Sweatshirts", sku: "47514501", price: 3000, stock: "In Stock", category: "T-shirt", image: "https://i.pinimg.com/1200x/f2/cf/f1/f2cff143a07e663d292a9133913eb0a3.jpg" },
  { id: "sleek-cozy", name: "Sleek and Cozy Black", sku: "47514501", price: 5000, stock: "In Stock", category: "Hoodie", image: "https://i.pinimg.com/736x/8e/60/90/8e609035bace0110e49d743b03b46344.jpg" },
  { id: "mockup-black", name: "MOCKUP Black", sku: "47514501", price: 2500, stock: "In Stock", category: "T-shirt", image: "https://i.pinimg.com/736x/9b/62/c7/9b62c786e9a42844313f15cbde0cc046.jpg" },
];

function loadProducts() {
  const stored = localStorage.getItem("ec_admin_products");
  allProducts = stored ? JSON.parse(stored) : [...DEFAULT_PRODUCTS];
  if (!stored) saveProducts();
}

function saveProducts() {
  localStorage.setItem("ec_admin_products", JSON.stringify(allProducts));
}

function searchProducts(q) {
  const query = q.toLowerCase();
  filteredProducts = query
    ? allProducts.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    : [...allProducts];
  currentPage = 1;
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("products-tbody");
  const start = (currentPage - 1) * PAGE_SIZE;
  const paged = filteredProducts.slice(start, start + PAGE_SIZE);

  if (paged.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="admin-no-results">No products found.</td></tr>`;
  } else {
    tbody.innerHTML = paged.map(p => `
      <tr>
        <td><img class="admin-table-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/38x38/f3f3f3/aaa?text=T'"/></td>
        <td style="font-weight:500;">${p.name}</td>
        <td style="color:var(--admin-gray-500);">${p.sku}</td>
        <td style="font-weight:600;">${p.price.toFixed(2)}DA</td>
        <td><span style="color:var(--admin-success);font-weight:600;font-size:12px;">${p.stock}</span></td>
        <td style="color:var(--admin-gray-500);">${p.category}</td>
        <td>
          <div style="position:relative;display:inline-block;">
            <button class="admin-action-btn" onclick="toggleActionMenu(this, '${p.id}')">···</button>
            <div class="action-menu" id="menu-${p.id}" style="display:none;position:absolute;right:0;top:100%;background:white;border:1px solid var(--admin-gray-200);border-radius:6px;box-shadow:var(--shadow);z-index:10;min-width:130px;padding:6px;">
              <a href="add-product.html?edit=${p.id}" style="display:block;padding:8px 12px;font-size:13px;color:var(--admin-gray-700);border-radius:4px;" onmouseover="this.style.background='var(--admin-gray-50)'" onmouseout="this.style.background=''">Edit</a>
              <button onclick="openDeleteModal('${p.id}')" style="display:block;width:100%;text-align:left;padding:8px 12px;font-size:13px;color:var(--admin-error);border-radius:4px;" onmouseover="this.style.background='var(--admin-gray-50)'" onmouseout="this.style.background=''">Delete</button>
            </div>
          </div>
        </td>
      </tr>`).join("");
  }
  renderAdminPagination("products-pagination", filteredProducts.length, PAGE_SIZE, currentPage, "goToPage");
}

function goToPage(page) {
  const pages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  if (page < 1 || page > pages) return;
  currentPage = page;
  renderTable();
}

function toggleActionMenu(btn, id) {
  document.querySelectorAll(".action-menu").forEach(m => { if (m.id !== `menu-${id}`) m.style.display = "none"; });
  const menu = document.getElementById(`menu-${id}`);
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function openDeleteModal(id) {
  deleteTargetId = id;
  document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
  document.getElementById("delete-modal").classList.add("open");
}

function closeDeleteModal() {
  deleteTargetId = null;
  document.getElementById("delete-modal").classList.remove("open");
}

function confirmDelete() {
  if (!deleteTargetId) return;
  allProducts = allProducts.filter(p => p.id !== deleteTargetId);
  filteredProducts = filteredProducts.filter(p => p.id !== deleteTargetId);
  saveProducts();
  closeDeleteModal();
  renderTable();
  adminToast("Product deleted.", "success");
}

// Close menus on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".admin-action-btn") && !e.target.closest(".action-menu")) {
    document.querySelectorAll(".action-menu").forEach(m => m.style.display = "none");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  requireAdminAuth();
  seedAdminData();
  document.getElementById("sidebar-placeholder").innerHTML = renderAdminSidebar("products");
  document.getElementById("topbar-placeholder").innerHTML = renderAdminTopbar("Products");
  loadProducts();
  filteredProducts = [...allProducts];
  renderTable();
});
