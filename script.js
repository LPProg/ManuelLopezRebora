document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarIcons = document.querySelector(".sidebar-icons");
    const mainContent = document.querySelector("main");

    // Al hacer clic en los iconos, mostrar/ocultar el sidebar
    sidebarIcons.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("active");
    });
});
