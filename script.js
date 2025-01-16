let isMouseDown = false;
let lastMousePosition = { x: 0, y: 0 };
const cube = document.querySelector('.cube');
let currentRotationX = 0;
let currentRotationY = 0;
let currentFace = 'right';
let isFaceExpanded = false;

// Función para manejar la rotación del cubo con el mouse
function rotateCube(e) {
    if (!isMouseDown || isFaceExpanded) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - lastMousePosition.x;
    const deltaY = mouseY - lastMousePosition.y;

    currentRotationX += deltaY * 1.0;
    currentRotationY -= deltaX * 1.0;

    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

    lastMousePosition = { x: mouseX, y: mouseY };
}

// Mostrar el contenido dentro del panel cuando se hace clic en una cara
function handleClick(event, face) {
    const panel = document.querySelector('.info-panel');
    const content = document.querySelector('.info-content');
    
    panel.classList.add('show');
    
    content.innerHTML = getContentForFace(face);
}

// Función para expandir la cara seleccionada
function expandFace(face) {
    const faceElement = document.querySelector(`.cube .face.${face}`);
    document.querySelector('.info-panel').classList.add('show');
    const infoContent = document.querySelector('.info-content');
    infoContent.innerHTML = getContentForFace(face);
    currentFace = face;
}

// Cerrar el panel
function closePanel() {
    const panel = document.querySelector('.info-panel');
    panel.classList.remove('show');
}

// Obtener el contenido correspondiente a cada cara
function getContentForFace(face) {
    switch (face) {
        case 'front':
            return '<h2>Fullstack Engineer</h2><p>Continous learning to improve myself.</p>';
        case 'right':
            return '<h2>About Me</h2><p>Hi! I’m Manuel López Rébora, a passionate developer from Málaga...</p>';
        case 'back':
            return '<h2>Projects</h2><p>Explora mis proyectos.</p>';
        case 'left':
            return '<h2>Experience</h2><p>Mis empleos.</p>';
        case 'top':
            return '<h2>Photo</h2><p>Foto mia.</p>';
        case 'bottom':
            return '<h2>Contact</h2><p>Contactame.</p>';
        default:
            return '<h2>Información</h2><p>Selecciona una cara del cubo.</p>';
    }
}

// Event listeners para la rotación del cubo
document.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    lastMousePosition = { x: e.clientX, y: e.clientY };
});;

document.addEventListener('mousemove', rotateCube);

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});;