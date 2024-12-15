// MENU

const hamMenu = document.querySelector(".hamMenu");
console.log(hamMenu);

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})