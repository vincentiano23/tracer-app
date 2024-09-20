const canvas = document.getElementById('tracerCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Variables to track mouse position
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for mouse events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    ctx.closePath();
});

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
