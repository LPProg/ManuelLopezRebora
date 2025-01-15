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

    // Mover el cubo a una posición aleatoria
    moveCubeRandomly();

    // Actualizar la cara seleccionada
    currentFace = face;
    openPanelOnOppositeSide();
}

// Cerrar el panel
function closePanel() {
    infoPanel.classList.remove('panel-active');
    infoPanel.classList.add('panel-hidden');

    // Restaurar el cubo a su posición original
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

// Función para obtener el tamaño del cubo considerando su rotación
function getCubeBoundingBox() {
    const cubeRect = cube.getBoundingClientRect();
    const computedStyle = getComputedStyle(cube);
    const width = parseFloat(computedStyle.width);
    const height = parseFloat(computedStyle.height);

    // Calcular las dimensiones del cubo considerando su rotación
    const angleX = currentRotationX * Math.PI / 180;
    const angleY = currentRotationY * Math.PI / 180;

    // Las dimensiones del cubo no solo dependen de su tamaño base, sino también de la rotación
    const rotatedWidth = width * Math.abs(Math.cos(angleY)) + height * Math.abs(Math.sin(angleY));
    const rotatedHeight = height * Math.abs(Math.cos(angleX)) + width * Math.abs(Math.sin(angleX));

    return { width: rotatedWidth, height: rotatedHeight };
}


// Mover el cubo a una posición aleatoria dentro de los límites de la escena sin que atraviese los bordes
// Mover el cubo a una posición aleatoria dentro de los límites de la escena sin que atraviese los bordes
function moveCubeRandomly() {
    const sceneRect = document.querySelector('.scene').getBoundingClientRect(); // Obtener los límites de la escena
    const cubeSize = getCubeBoundingBox(); // Obtener el tamaño del cubo (considerando su rotación)
    
    // Calcular el máximo valor X y Y para la posición del cubo
    const maxX = sceneRect.width - cubeSize.width;
    const maxY = sceneRect.height - cubeSize.height;

    // Asegurarse de que el cubo no se salga de los límites de la escena
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Aplicar la posición aleatoria al cubo
    cube.style.position = 'absolute';
    cube.style.left = `${randomX}px`;
    cube.style.top = `${randomY}px`;

    // Actualizamos la posición del cubo
    cubePosition = { x: randomX, y: randomY };
}


// Abrir el panel en el lado contrario al cubo, separado a 20px
function openPanelOnOppositeSide() {
    const panelWidth = infoPanel.offsetWidth;
    const panelHeight = infoPanel.offsetHeight;

    let panelLeft = 0;
    let panelTop = 0;

    // Determinar la posición del cubo para saber dónde colocar el panel
    if (cubePosition.x < window.innerWidth / 2) {
        panelLeft = cubePosition.x + getCubeBoundingBox().width + 20; // El panel va a la derecha del cubo
    } else {
        panelLeft = cubePosition.x - panelWidth - 20; // El panel va a la izquierda del cubo
    }

    if (cubePosition.y < window.innerHeight / 2) {
        panelTop = cubePosition.y + getCubeBoundingBox().height + 20; // El panel va abajo del cubo
    } else {
        panelTop = cubePosition.y - panelHeight - 20; // El panel va arriba del cubo
    }

    // Asegurarse de que el panel no se desborde fuera de la ventana
    if (panelLeft + panelWidth > window.innerWidth) {
        panelLeft = window.innerWidth - panelWidth - 20;
    }
    if (panelTop + panelHeight > window.innerHeight) {
        panelTop = window.innerHeight - panelHeight - 20;
    }

    // Evitar que el panel se desborde por la izquierda o la parte superior
    if (panelLeft < 0) {
        panelLeft = 20; // Asegurar que el panel no se desborde por la izquierda
    }
    if (panelTop < 0) {
        panelTop = 20; // Asegurar que el panel no se desborde por la parte superior
    }

    // Establecer la posición final del panel
    infoPanel.style.left = `${panelLeft}px`;
    infoPanel.style.top = `${panelTop}px`;
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
