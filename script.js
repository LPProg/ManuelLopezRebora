let isMouseDown = false;
let lastClickTime = 0;
let clickThreshold = 300;
let lastMousePosition = { x: 0, y: 0 };

const cube = document.querySelector('.cube');
const infoPanel = document.querySelector('.info-panel');
let currentRotationX = 0;
let currentRotationY = 0;
let currentFace = '';
let cubePosition = { x: 0, y: 0 };
let isFaceExpanded = false; // Controla si la cara está expandida

// Función para manejar la rotación del cubo con el mouse
function rotateCube(e) {
    if (!isMouseDown) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - lastMousePosition.x;
    const deltaY = mouseY - lastMousePosition.y;

    currentRotationX += deltaY * 0.5;
    currentRotationY -= deltaX * 0.5;

    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) translateX(-50px)`;

    lastMousePosition = { x: mouseX, y: mouseY };
}

// Función para manejar clics en las caras
function handleClick(e, face) {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime;

    if (timeDifference < clickThreshold) {
        if (currentFace === face) {
            if (isFaceExpanded) {
                flipFace(face); // Si la cara está expandida, hacer el flip y mostrar contenido
            }
        } else {
            expandFace(face); // Expandir la cara seleccionada
        }
    }
    lastClickTime = currentTime;
}

// Expandir la cara seleccionada
function expandFace(face) {
    const faceElement = document.querySelector(`.cube .face.${face}`);
    faceElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    faceElement.style.transform = 'scale(1.75) translate(-50%, -50%)'; // Ampliar al 75% y centrar
    faceElement.style.position = 'fixed';
    faceElement.style.top = '50%';
    faceElement.style.left = '50%';
    faceElement.style.width = '75%';
    faceElement.style.height = '75%';
    faceElement.style.zIndex = '100'; // Asegurar que esté encima

    // Ocultar las otras caras
    document.querySelectorAll('.cube .face').forEach(otherFace => {
        if (otherFace !== faceElement) {
            otherFace.style.opacity = '0';
        }
    });

    currentFace = face;
    isFaceExpanded = true;
}

// Flip de la cara seleccionada
function flipFace(face) {
    const faceElement = document.querySelector(`.cube .face.${face}`);
    faceElement.style.transition = 'transform 0.6s ease';
    faceElement.style.transform = 'rotateY(180deg)'; // Girar la cara

    // Mostrar contenido después del flip
    setTimeout(() => {
        showContent(face);
    }, 300);
}

// Mostrar contenido dinámico de la cara
function showContent(face) {
    const content = getContentForFace(face);
    infoPanel.querySelector('.info-content').innerHTML = content;

    infoPanel.classList.add('panel-active');
    infoPanel.classList.remove('panel-hidden');
}

// Cerrar la cara seleccionada
function closeFace() {
    const faceElement = document.querySelector(`.cube .face.${currentFace}`);
    faceElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    faceElement.style.transform = ''; // Volver a la escala y posición originales
    faceElement.style.position = '';
    faceElement.style.top = '';
    faceElement.style.left = '';
    faceElement.style.width = '';
    faceElement.style.height = '';
    faceElement.style.zIndex = '';

    // Restaurar las otras caras
    document.querySelectorAll('.cube .face').forEach(otherFace => {
        otherFace.style.opacity = '1';
        otherFace.style.transform = '';
    });

    isFaceExpanded = false;
    currentFace = '';
}

// Función para obtener el contenido de cada cara
function getContentForFace(face) {
    switch (face) {
        case 'front':
            return '<h2>Frente</h2><p>Información sobre la sección frontal.</p>';
        case 'right':
            return '<h2>Derecha</h2><p>Información sobre la sección derecha.</p>';
        case 'back':
            return '<h2>Atrás</h2><p>Información sobre la sección de atrás.</p>';
        case 'left':
            return '<h2>Izquierda</h2><p>Información sobre la sección izquierda.</p>';
        case 'top':
            return '<h2>Arriba</h2><p>Información sobre la sección superior.</p>';
        case 'bottom':
            return '<h2>Abajo</h2><p>Información sobre la sección inferior.</p>';
        default:
            return '<h2>Información</h2><p>Seleccione una cara del cubo.</p>';
    }
}

// Manejo del mouse
function handleMouseDown(e) {
    isMouseDown = true;
    lastMousePosition = { x: e.clientX, y: e.clientY };
}

function handleMouseUp() {
    isMouseDown = false;
}

function handleMouseMove(e) {
    rotateCube(e);
}

// Eventos
document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', e => handleClick(e, face.classList[1]));
});

document.querySelector('.scene').addEventListener('mousedown', handleMouseDown);
document.querySelector('.scene').addEventListener('mouseup', handleMouseUp);
document.querySelector('.scene').addEventListener('mousemove', handleMouseMove);

infoPanel.addEventListener('click', closeFace); // Cerrar la cara al hacer clic en el panel
