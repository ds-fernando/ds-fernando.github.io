// Seleccionamos el botón de hamburguesa, el menú y el botón de cerrar
const menuToggle = document.querySelector(".menu-toggle");
const menuList = document.querySelector(".menu-list");
const closeBtn = document.querySelector(".close-btn");

// Añadimos un evento al botón para alternar la clase 'show' en el menú
menuToggle.addEventListener("click", () => {
  menuList.classList.toggle("show");
  menuToggle.classList.toggle("open"); // Alternar la clase 'open' en el botón de hamburguesa
});

// Añadimos un evento al botón de cierre para ocultar el menú
closeBtn.addEventListener("click", () => {
  menuList.classList.remove("show");
  menuToggle.classList.remove("open"); // Aseguramos que la clase 'open' se remueva al cerrar
});

const toggle = document.getElementById("dark-mode-toggle");

const applyTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  toggle.textContent = dark ? "☀️" : "🌙";
};

const saved = localStorage.getItem("darkMode") === "true";
applyTheme(saved);

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", !isDark);
  applyTheme(!isDark);
});
