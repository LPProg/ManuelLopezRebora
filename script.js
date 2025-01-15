let isMouseDown = false;
let lastClickTime = 0;
let clickThreshold = 300;
let lastMousePosition = { x: 0, y: 0 };

const cube = document.querySelector('.cube');
const infoPanel = document.querySelector('.info-panel');
let currentRotationX = 0;
let currentRotationY = 0;
let currentFace = '';

// Función para manejar la rotación del cubo con el mouse
function rotateCube(e) {
    if (!isMouseDown) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - lastMousePosition.x;
    const deltaY = mouseY - lastMousePosition.y;

    currentRotationX += deltaY * 0.5;
    currentRotationY -= deltaX * 0.5;

    // Mantener la rotación sin reiniciar
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) translateX(-50px)`;

    lastMousePosition = { x: mouseX, y: mouseY };
}

// Función para manejar clics en las caras
function handleClick(e, face) {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastClickTime;

    if (timeDifference < clickThreshold) {
        if (currentFace === face) {
            closePanel();
        } else {
            showContent(face);
        }
    }
    lastClickTime = currentTime;
}

// Mostrar contenido basado en la cara
function showContent(face) {
    const content = getContentForFace(face);

    // Aseguramos que el contenido dinámico sea correcto
    infoPanel.querySelector('.info-content').innerHTML = content;

    // Mostrar el panel
    infoPanel.classList.add('panel-active');
    infoPanel.classList.remove('panel-hidden');

    // Mover el cubo ligeramente para dar espacio al panel
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) translateX(-20%)`;

    // Actualizar la cara seleccionada
    currentFace = face;
}

// Cerrar el panel
function closePanel() {
    infoPanel.classList.remove('panel-active');
    infoPanel.classList.add('panel-hidden');
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg) translateX(0)`;
    currentFace = '';
}

// Obtener contenido según la cara
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
