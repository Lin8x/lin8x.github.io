// //creating a custom cursor
// /*references: https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/
//             https://codepen.io/ntenebruso/pen/QWLzVjY
// video references:
// https://www.youtube.com/watch?v=rfpRZ2t_BrQ
// */
// document.addEventListener("DOMContentLoaded", function() {

//     const cursor = document.querySelector('.custom-cursor');

//     // Ensure cursor exists
//     if (!cursor) {
//         console.error("Cursor element not found in DOM!");
//         return;
//     }

//     // Custom cursor movement
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//     });

//     let cursorX = 0, cursorY = 0;
//     let mouseX = 0, mouseY = 0;
//     const speed = 1.9;

//     function animateCursor() {
//         cursorX += (mouseX - cursorX) * speed;
//         cursorY += (mouseY - cursorY) * speed;

//         cursor.style.transform = `translate(-50%, -50%) translate(${cursorX}px, ${cursorY}px)`;

//         requestAnimationFrame(animateCursor);
//     }

//     // Hover effect for text elements
//     const textElements = document.querySelectorAll('.hover-target');
//     textElements.forEach(el => {
//         el.addEventListener('mouseover', () => cursor.classList.add('hovered'));
//         el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
//     });

//     // Show/hide cursor on viewport entry/exit
//     document.addEventListener('mouseenter', () => {
//         cursor.style.display = "block";
//     });

//     document.addEventListener('mouseleave', () => {
//         cursor.style.display = "none";
//     });

//     // Update mouse position
//     document.addEventListener('mousemove', (e) => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//     });

//     animateCursor();
//     // Call the functions on each page load
//         generateNavigation(window.location.pathname.split("/").pop());
//         generateFooter();
// });