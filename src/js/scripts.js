// Seleccionamos el botón de hamburguesa y el menú
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

// Añadimos un evento al botón para alternar la clase 'show' en el menú
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('show');
});
