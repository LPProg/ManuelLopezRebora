let isMouseDown = false; // Controla si el mouse está presionado para arrastrar el cubo
let lastClickTime = 0; // Almacena el tiempo del último clic
let clickThreshold = 300; // Límite de tiempo para considerar un doble clic (en ms)

const cube = document.querySelector('.cube');
let currentRotationX = 0;
let currentRotationY = 0;

// Función para manejar la rotación del cubo con el mouse
function rotateCube(e) {
    if (!isMouseDown) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculamos la diferencia con la posición inicial
    const deltaX = mouseX - lastMousePosition.x;
    const deltaY = mouseY - lastMousePosition.y;

    // Actualizamos la rotación del cubo
    currentRotationX += deltaY * 0.5; // Controlar la velocidad de rotación
    currentRotationY -= deltaX * 0.5; // Controlar la velocidad de rotación

    // Aplicamos la rotación en 3D
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    // Actualizamos la posición inicial del mouse
    lastMousePosition = { x: mouseX, y: mouseY };
}

// Función que se activa al hacer clic sobre una cara
function handleClick(e, face) {
    // Obtenemos el tiempo actual del clic
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastClickTime;

    // Si el tiempo entre clics es menor que el umbral, es un doble clic
    if (timeDifference < clickThreshold) {
        // Realizamos el flip
        flipCard(face);
    }

    // Guardamos el tiempo del clic actual
    lastClickTime = currentTime;
}

// Función que maneja el flip de las caras
function flipCard(face) {
    const allFaces = document.querySelectorAll('.face');
    
    // Primero, ocultamos el contenido de todas las caras
    allFaces.forEach(face => {
        face.classList.remove('active');
    });

    // Luego, activamos la cara seleccionada
    const selectedFace = document.querySelector(`.${face}`);
    selectedFace.classList.add('active');
}

// Función para manejar el inicio del arrastre
function handleMouseDown(e) {
    isMouseDown = true;
    lastMousePosition = { x: e.clientX, y: e.clientY };
}

// Función para manejar el fin del arrastre
function handleMouseUp() {
    isMouseDown = false;
}

// Función para manejar el movimiento del mouse (solo cuando se está arrastrando)
function handleMouseMove(e) {
    rotateCube(e);
}

// Asignamos los eventos de mouse
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', (e) => {
        handleClick(e, face.classList[1]); // Usamos la clase para saber cuál cara es
    });
});

document.querySelector('.scene').addEventListener('mousedown', handleMouseDown);
document.querySelector('.scene').addEventListener('mouseup', handleMouseUp);
document.querySelector('.scene').addEventListener('mousemove', handleMouseMove);
