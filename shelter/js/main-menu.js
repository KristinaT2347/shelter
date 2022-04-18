const burgerBtn = document.querySelector('.btn-burger');
const overlay = document.querySelector('.overlay');
const links = document.querySelectorAll('.main-menu a');

burgerBtn.addEventListener('click', () => {
  document.body.classList.toggle('is-menu-open');
});

window.addEventListener('resize', () => {
  hideMenu();
});

overlay.addEventListener('click', (e) => {
  hideMenu();
});

for (const link of links) {
  link.addEventListener('click', () => {
    hideMenu();
  });
}

function hideMenu() {
  document.body.classList.remove('is-menu-open');
}
