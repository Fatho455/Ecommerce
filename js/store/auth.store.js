const USER_KEY = "ec_user";

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY)) || null;
}

function setUser(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify({ ...userData, isLoggedIn: true }));
}

function logout() {
  localStorage.removeItem(USER_KEY);
  window.location.href = "login.html";
}

function isLoggedIn() {
  const user = getUser();
  return user !== null && user.isLoggedIn === true;
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
}

function updateUserField(fields) {
  const user = getUser();
  if (user) {
    setUser({ ...user, ...fields });
  }
}