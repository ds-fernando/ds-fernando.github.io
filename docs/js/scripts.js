// Seleccionamos el botón de hamburguesa, el menú y el botón de cerrar
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');
const closeBtn = document.querySelector('.close-btn');

// Añadimos un evento al botón para alternar la clase 'show' en el menú
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('show');
});

// Añadimos un evento al botón de cierre para ocultar el menú
closeBtn.addEventListener('click', () => {
  menuList.classList.remove('show');
});

menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('show');
  menuToggle.classList.toggle('open'); // Alternar la clase 'open' en el botón
});