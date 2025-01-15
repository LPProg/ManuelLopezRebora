let isMouseDown = false; // Controla si el mouse está presionado para arrastrar el cubo
let lastClickTime = 0; // Almacena el tiempo del último clic
let clickThreshold = 300; // Límite de tiempo para considerar un doble clic (en ms)
let lastMousePosition = { x: 0, y: 0 }; // Almacena la última posición del ratón

const cube = document.querySelector('.cube');
const infoPanel = document.querySelector('.info-panel');
let currentRotationX = 0;
let currentRotationY = 0;
let currentFace = ''; // Rastrear la cara seleccionada

// Ocultar el panel inicialmente
infoPanel.style.transform = 'translateX(100%)';
infoPanel.style.transition = 'transform 0.5s ease';
cube.style.transition = 'transform 0.5s ease';

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
        if (currentFace === face) {
            // Si ya está abierta la misma cara, cerramos el panel
            closePanel();
        } else {
            // Mostrar el contenido en el panel
            showContent(face);
        }
    }

    // Guardamos el tiempo del clic actual
    lastClickTime = currentTime;
}

// Función que muestra el contenido relacionado con la cara seleccionada
function showContent(face) {
    const content = getContentForFace(face);

    // Mostrar contenido en el panel
    infoPanel.querySelector('.info-content').innerHTML = content;

    // Mover el cubo hacia la izquierda y el panel a la derecha
    cube.style.transform = 'translateX(-50%)';
    infoPanel.style.transform = 'translateX(0)'; // Asegura que el panel esté visible

    // Actualizamos la cara seleccionada
    currentFace = face;
}

// Función que obtiene el contenido de acuerdo a la cara seleccionada
function getContentForFace(face) {
    let content = '';
    switch (face) {
        case 'front':
            content = '<h2>Frente</h2><p>Información sobre la sección frontal.</p>';
            break;
        case 'right':
            content = '<h2>Derecha</h2><p>Información sobre la sección derecha.</p>';
            break;
        case 'back':
            content = '<h2>Atrás</h2><p>Información sobre la sección de atrás.</p>';
            break;
        case 'left':
            content = '<h2>Izquierda</h2><p>Información sobre la sección izquierda.</p>';
            break;
        case 'top':
            content = '<h2>Arriba</h2><p>Información sobre la sección superior.</p>';
            break;
        case 'bottom':
            content = '<h2>Abajo</h2><p>Información sobre la sección inferior.</p>';
            break;
        default:
            content = '<h2>Información</h2><p>Seleccione una cara del cubo.</p>';
    }
    return content + '<button class="close-btn" onclick="closePanel()">Cerrar</button>';
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

// Función para cerrar el panel de información y restaurar el cubo
function closePanel() {
    infoPanel.style.transform = 'translateX(100%)'; // Esconde el panel
    cube.style.transform = 'translateX(0)'; // Restaura la posición del cubo
    currentFace = ''; // Reinicia la cara seleccionada
}

// Asignamos los eventos de mouse para cada cara
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', (e) => {
        handleClick(e, face.classList[1]); // Usamos la clase para saber cuál cara es
    });
});

// Asignamos los eventos de arrastre
document.querySelector('.scene').addEventListener('mousedown', handleMouseDown);
document.querySelector('.scene').addEventListener('mouseup', handleMouseUp);
document.querySelector('.scene').addEventListener('mousemove', handleMouseMove);
