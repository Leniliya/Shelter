const burgerIconButton = document.querySelector('.burger-menu__icon');
const burgerMenu = document.querySelector('.nav');
const burgerMenuContent = document.querySelector('.nav__list');
const body = document.querySelector('body');

function toggleBurgerMenu() {
  burgerIconButton.classList.toggle('burger-menu__icon_open')
  burgerMenu.classList.toggle('hidden')
  burgerMenuContent.classList.toggle('shifted')
  body.classList.toggle('lock')
}


function closeBurgerMenu() {
  burgerIconButton.classList.remove('burger-menu__icon_open')
  burgerMenu.classList.add('hidden')
  burgerMenuContent.classList.add('shifted')
  body.classList.remove('lock')
}

burgerIconButton.addEventListener('click', () => {
  toggleBurgerMenu()
})

burgerMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('nav') || event.target.classList.contains('nav__link')) {
    closeBurgerMenu()
  }
})
