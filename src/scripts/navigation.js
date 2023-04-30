const menuButtonContainer = document.querySelector('.menu-button');
const menuButton = menuButtonContainer.querySelector('svg');
const menu = document.querySelector('.menu');
const firstMenuItem = menu.querySelector('a');

const toggleMenu = () => {
  menuButtonContainer.classList.toggle('opened');
  menu.classList.toggle('opened');
  if (menuButtonContainer.classList.contains('opened')) {
    menuButton.setAttribute('aria-expanded', true);
    menuButton.setAttribute('aria-label', 'Close navigation menu');
  } else {
    menuButton.setAttribute('aria-expanded', false);
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }
  firstMenuItem.focus();
};

menuButtonContainer.addEventListener('click', () => {
  toggleMenu();
});

menuButtonContainer.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggleMenu();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuButtonContainer.classList.remove('opened');
    menu.classList.remove('opened');
  }
});