document.addEventListener("DOMContentLoaded", function() {
  // Seleccionamos el botón de hamburguesa y el menú
  const menuToggle = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu-list');

  // Aseguramos que los elementos existen antes de agregar el evento
  if (menuToggle && menuList) {
    // Añadimos un evento al botón para alternar la clase 'show' en el menú
    menuToggle.addEventListener('click', () => {
      menuList.classList.toggle('show');
    });
  }
});
