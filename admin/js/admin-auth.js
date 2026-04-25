const ADMIN_KEY = "ec_admin";

function getAdminCreds() {
  return JSON.parse(localStorage.getItem("ec_admin_creds") || '{"email":"admin@admin.com","password":"admin123"}');
}

function adminLogin(email, password) {
  const creds = getAdminCreds();
  if (email === creds.email && password === creds.password) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ email, loggedIn: true, loginTime: Date.now() }));
    return true;
  }
  return false;
}

function isAdminLoggedIn() {
  const data = JSON.parse(localStorage.getItem(ADMIN_KEY) || "null");
  return data && data.loggedIn === true;
}

function adminLogout() {
  localStorage.removeItem(ADMIN_KEY);
  window.location.href = "index.html";
}

function requireAdminAuth() {
  if (!isAdminLoggedIn()) {
    window.location.href = "index.html";
  }
}

function adminToast(message, type = "info", duration = 3000) {
  let container = document.querySelector(".admin-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "admin-toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
