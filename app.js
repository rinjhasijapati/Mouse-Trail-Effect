const DPI = window.devicePixelRatio;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function createCanvas(width, height) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * DPI);
    canvas.height = Math.floor(height * DPI);
    ctx.scale(DPI, DPI);
}



function background(color = 'black') {
    canvas.style.background = color;
}

const particleArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.01;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let mouseX = 0;
let mouseY = 0;

function updateMousePosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function initParticles(x, y, n) {
    for (let i = 0; i < n; i++) {
        particleArray.push(new Particle(x, y));
    }
}

function handleParticles() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();

        if (particleArray[i].size < 0.3) {
            particleArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// Add event listener for mousemove
canvas.addEventListener('mousemove', (e) => {
    updateMousePosition(e);
    initParticles(mouseX, mouseY, 1); // Create 1 particle right at the mouse position
});

createCanvas(1500, 700);

animate();