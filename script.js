const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const card = document.getElementById("card");

noBtn.addEventListener("mouseenter", () => {
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
});

yesBtn.addEventListener("click", () => {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    startConfetti();
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

function randomColor() {
    const colors = ["#ff6fa5", "#ffd1dc", "#ffb6c1", "#ff85a2", "#ffc0cb"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            color: randomColor()
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach((piece) => {
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.x, piece.y, piece.size, piece.size);
    });
}

function updateConfetti() {
    confettiPieces.forEach((piece) => {
        piece.y += piece.speed;
        if (piece.y > canvas.height) {
            piece.y = -10;
            piece.x = Math.random() * canvas.width;
        }
    });
}

function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    createConfetti();
    animateConfetti();
}
