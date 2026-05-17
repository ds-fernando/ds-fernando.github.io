const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");
const closeBtn = document.querySelector(".close-btn");

if (menuToggle && menuList) {
  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });
}

if (closeBtn && menuToggle && menuList) {
  closeBtn.addEventListener("click", () => {
    menuList.classList.remove("show");
    menuToggle.classList.remove("open");
  });
}

const toggle = document.getElementById("dark-mode-toggle");

const applyTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  document.documentElement.classList.toggle("dark", dark);
  if (toggle) toggle.textContent = dark ? "☀️" : "🌙";
};

const saved = localStorage.getItem("darkMode") === "true";
applyTheme(saved);

if (toggle) {
  toggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", !isDark);
    applyTheme(!isDark);
  });
}
