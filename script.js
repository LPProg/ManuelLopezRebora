// Selecciona el cubo
const cube = document.querySelector('.cube');

// Variables para almacenar la rotación
let rotationX = 0; // Eje X
let rotationY = 0; // Eje Y
let isDragging = false; // Estado para verificar si el usuario está arrastrando
let lastX = 0; // Última posición del ratón en X
let lastY = 0; // Última posición del ratón en Y

// Maneja el clic y el arrastre
cube.addEventListener('mousedown', (event) => {
    isDragging = true; // Comienza el arrastre
    lastX = event.clientX; // Guarda la posición inicial X
    lastY = event.clientY; // Guarda la posición inicial Y

    // Desactiva la transición cuando se empieza a arrastrar
    cube.style.transition = 'none';
});

// Maneja el movimiento del ratón mientras se arrastra
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return; // Solo se ejecuta si se está arrastrando el ratón

    // Calcula el cambio en la posición del ratón
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;

    // Actualiza la rotación del cubo en función del movimiento del ratón
    rotationY += deltaX * 0.2; // Controla la velocidad del giro en Y
    rotationX -= deltaY * 0.2; // Controla la velocidad del giro en X

    // Actualiza la transformación del cubo
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    // Actualiza la última posición del ratón
    lastX = event.clientX;
    lastY = event.clientY;
});

// Detiene el arrastre cuando se suelta el ratón
document.addEventListener('mouseup', () => {
    isDragging = false; // Termina el arrastre
    cube.style.transition = 'transform 0.3s ease-out'; // Restaura la transición suave al detener
});

function flipCard(face) {
    const cube = document.querySelector('.cube');
    const allFaces = document.querySelectorAll('.face');
    
    // Primero, ocultamos el contenido de todas las caras
    allFaces.forEach(face => {
        face.classList.remove('active');
    });

    // Luego, activamos la cara seleccionada
    const selectedFace = document.querySelector(`.${face}`);
    selectedFace.classList.add('active');
    
    // El cubo hace flip hacia la cara seleccionada
    switch(face) {
        case 'front':
            cube.style.transform = 'rotateY(0deg)';
            break;
        case 'right':
            cube.style.transform = 'rotateY(-90deg)';
            break;
        case 'back':
            cube.style.transform = 'rotateY(-180deg)';
            break;
        case 'left':
            cube.style.transform = 'rotateY(90deg)';
            break;
        case 'top':
            cube.style.transform = 'rotateX(90deg)';
            break;
        case 'bottom':
            cube.style.transform = 'rotateX(-90deg)';
            break;
        default:
            break;
    }
}
