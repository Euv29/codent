// filepath: /opt/lampp/htdocs/codent/backgound.js
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const comets = [];

class Star {
    constructor(x, y, radius, speed, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        if (this.x - this.radius > canvas.width) {
            this.x = -this.radius;
        } else if (this.x + this.radius < 0) {
            this.x = canvas.width + this.radius;
        }

        if (this.y - this.radius > canvas.height) {
            this.y = -this.radius;
        } else if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius;
        }

        this.draw();
    }
}

class Comet {
    constructor(x, y, length, speed, color) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        if (this.x > canvas.width || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = -this.length;
        }
        this.draw();
    }
}

function init() {
    // Create stars
    for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 1.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 0.2 + 0.1; // Decrease speed
        const dx = Math.random() * 2 - 1; // Random direction x
        const dy = Math.random() * 2 - 1; // Random direction y
        stars.push(new Star(x, y, radius, speed, dx, dy));
    }

    // Create comets
    for (let i = 0; i < 3; i++) {
        const length = Math.random() * 50 + 50;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 2 + 1;
        const color = 'white';
        comets.push(new Comet(x, y, length, speed, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.update());
    comets.forEach(comet => comet.update());
    requestAnimationFrame(animate);
}

init();
animate();