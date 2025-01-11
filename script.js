// Detecta si el ratón está encima del sidebar
const sidebar = document.getElementById("sidebar");

// Para que el sidebar se oculte cuando el ratón no está encima
let timer;
sidebar.addEventListener('mouseenter', () => {
  clearTimeout(timer);
  sidebar.style.left = '0';  // Mostrar sidebar
});

sidebar.addEventListener('mouseleave', () => {
  timer = setTimeout(() => {
    sidebar.style.left = '-250px';  // Ocultar sidebar después de unos segundos
  }, 1000); // Tiempo de espera antes de ocultar
});
