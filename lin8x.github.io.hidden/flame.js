document.addEventListener("DOMContentLoaded", function () {
    // Flame container
    const flameContainer = document.createElement('div');
    flameContainer.id = 'flame-container';
    document.body.appendChild(flameContainer);

    let flameColor = 'rgba(0, 255, 157, 0.8)'; // Default flame color
    let mouseX = 0, mouseY = 0;
    let flameX = 0, flameY = 0;
    const speed = 0.2; // Adjust speed for smoother trailing

    // Flame particle generation
    function createFlameParticle(x, y) {
        const particle = document.createElement('div');
        particle.classList.add('flame-particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = flameColor;
        particle.style.boxShadow = `0 0 20px ${flameColor}, 0 0 40px ${flameColor}`;
        flameContainer.appendChild(particle);

        // Remove the particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000); // Matches the animation duration
    }

    // Animate flame trailing
    function animateFlame() {
        flameX += (mouseX - flameX) * speed;
        flameY += (mouseY - flameY) * speed;

        createFlameParticle(flameX, flameY);
        requestAnimationFrame(animateFlame);
    }

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover effect for flame color change
    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach((target) => {
        target.addEventListener('mouseenter', () => {
            flameColor = 'rgba(255, 255, 255, 0.8)'; // White flame color
        });
        target.addEventListener('mouseleave', () => {
            flameColor = 'rgba(0, 255, 157, 0.8)'; // Green flame color
        });
    });

    animateFlame();
});
