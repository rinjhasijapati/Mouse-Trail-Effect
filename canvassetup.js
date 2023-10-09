const DPI = window.devicePixelRatio;

const canvas = document.getElementById('canvas'); // Corrected getElementById
const ctx = canvas.getContext('2d');

function createCanvas(width, height) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * DPI);
    canvas.height = Math.floor(height * DPI);
    ctx.scale(DPI, DPI);
}

createCanvas(800, 600);

function background(color = 'black') {
    canvas.style.background = color;
}
