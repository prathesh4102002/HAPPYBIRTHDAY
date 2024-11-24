document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('imageGrid');
    const revealBtn = document.getElementById('revealBtn');
    const canvas = document.getElementById('confettiCanvas');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const ctx = canvas.getContext('2d');
  
    const rows = 10;
    const cols = 10;
    const imageUrl = 'FLOWER.jpg'; // Replace with your bouquet image URL
  
    let confetti = [];
    const confettiColors = ['#e63946', '#457b9d', '#ffb703', '#2a9d8f'];
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function createGrid() {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const block = document.createElement('div');
          block.classList.add('image-block');
          block.style.backgroundImage = `url(${imageUrl})`;
          block.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;
          grid.appendChild(block);
        }
      }
    }
  
    function revealImage() {
      const blocks = document.querySelectorAll('.image-block');
      blocks.forEach((block, index) => {
        setTimeout(() => {
          block.classList.add('revealed');
        }, index * 50);
      });
  
      startConfetti();
      setTimeout(stopConfetti, 10000);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'  // Smooth scrolling effect
      });
      
    }
  
    function createConfetti() {
      for (let i = 0; i < 100; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 5 + 2,
          dx: Math.random() * 2 - 1,
          dy: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10,
        });
      }
    }
  
    function updateConfetti() {
      confetti.forEach((particle) => {
        particle.y += particle.dy;
        particle.x += particle.dx;
        particle.rotation += particle.rotationSpeed;
  
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
      });
    }
  
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });
    }
  
    function startConfetti() {
      createConfetti();
      function animate() {
        updateConfetti();
        drawConfetti();
        requestAnimationFrame(animate);
      }
      animate();
    }
  
    function stopConfetti() {
      confetti = [];
    }
  
    // Add "No" button avoidance logic
    noBtn.addEventListener('mouseenter', () => {
        const offsetX = Math.random() * 250 - 245; // Random offset between -20px and 20px
        const offsetY = Math.random() * 250 - 245; // Random offset between -20px and 20px
        noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
  
    revealBtn.addEventListener('click', revealImage);
    window.addEventListener('resize', resizeCanvas);
  
    resizeCanvas();
    createGrid();
  });
  const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('closeLightbox');
noBtn.addEventListener('click', () => {
    location.reload(); // Refresh the page when "No" is clicked
  });
  

yesBtn.addEventListener('click', () => {
  lightbox.classList.remove('hidden'); // Show the lightbox
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden'); // Hide the lightbox
});
closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden'); // Hide the lightbox
    window.location.href = 'https://youtube.com'; // Redirect to a different page
  });
  

  