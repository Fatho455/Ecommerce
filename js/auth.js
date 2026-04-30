// ── Login ──
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // Check against stored users
  const users = JSON.parse(localStorage.getItem("ec_users") || "[]");
  const user = users.find(u => u.email === email);

  if (!user) {
    showToast("No account found with this email.", "error");
    return;
  }
  if (user.password !== btoa(password)) {
    showToast("Incorrect password.", "error");
    return;
  }

  setUser({ name: user.name, email: user.email });
  showToast("You have successfully logged in", "success");
  setTimeout(() => {
    const redirect = new URLSearchParams(window.location.search).get("redirect") || "account.html";
    window.location.href = redirect;
  }, 800);
}

// ── Signup ──
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  const users = JSON.parse(localStorage.getItem("ec_users") || "[]");
  if (users.find(u => u.email === email)) {
    showToast("An account with this email already exists.", "error");
    return;
  }

  users.push({ name, email, password: btoa(password) });
  localStorage.setItem("ec_users", JSON.stringify(users));

  setUser({ name, email });
  showToast("Account created successfully!", "success");
  setTimeout(() => { window.location.href = "account.html"; }, 800);
}

// ── Google (simulated) ──
function loginWithGoogle() {
  const mockUser = { name: "Google User", email: "user@gmail.com" };
  const users = JSON.parse(localStorage.getItem("ec_users") || "[]");
  if (!users.find(u => u.email === mockUser.email)) {
    users.push({ ...mockUser, password: btoa("google-auth") });
    localStorage.setItem("ec_users", JSON.stringify(users));
  }
  setUser(mockUser);
  showToast("Signed in with Google!", "success");
  setTimeout(() => { window.location.href = "account.html"; }, 800);
}

// ── Forgot Password ──
function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value.trim();
  const users = JSON.parse(localStorage.getItem("ec_users") || "[]");
  // Always show success (security best practice)
  showToast("Reset link sent! Check your inbox.", "success");
  setTimeout(() => { window.location.href = "login.html"; }, 1500);
}

// ── Reset Password ──
function handleResetPassword(e) {
  e.preventDefault();
  const newPass = document.getElementById("new-password").value;
  const confirmPass = document.getElementById("confirm-password").value;

  if (newPass !== confirmPass) {
    showToast("Passwords do not match.", "error");
    return;
  }
  showToast("Password reset successfully!", "success");
  setTimeout(() => { window.location.href = "login.html"; }, 1000);
}

// ── Redirect if already logged in ──
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();
  const authPages = ["login.html", "signup.html"];
  if (authPages.includes(page) && isLoggedIn()) {
    window.location.href = "account.html";
  }
});
