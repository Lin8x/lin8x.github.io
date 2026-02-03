document.addEventListener('DOMContentLoaded', () => {
    const background = document.createElement('div');
    background.id = 'background';
    document.body.appendChild(background);

    // Create multiple blurred circles
    for (let i = 0; i < 8; i++) {
        const circle = document.createElement('div');
        circle.classList.add('blur-circle');
        background.appendChild(circle);
    }
});
