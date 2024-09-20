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

const downloadButton = document.getElementById('downloadButton');

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 1.0); // Save as JPEG
    link.download = 'canvas_drawing.jpg';
    link.click();
});
const eraserButton = document.getElementById('eraserButton');

eraserButton.addEventListener('click', () => {
    ctx.strokeStyle = '#FFFFFF'; // White color for erasing
    ctx.lineWidth = 10; // Adjust eraser size if needed
});
let strokes = [];
let undoButton = document.getElementById('undoButton');

canvas.addEventListener('mousedown', () => {
    strokes.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

undoButton.addEventListener('click', () => {
    if (strokes.length > 0) {
        ctx.putImageData(strokes.pop(), 0, 0);
    }
});
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'tracer_drawing.png';
    link.click();
});
const brushSize = document.getElementById('brushSize');
ctx.lineWidth = brushSize.value;

brushSize.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

const colorPicker = document.getElementById('colorPicker');
ctx.strokeStyle = colorPicker.value;

colorPicker.addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});
