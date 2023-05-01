const menuButtonContainer = document.querySelector('.menu-button');
const menuButton = menuButtonContainer.querySelector('svg');
const menu = document.querySelector('.menu');
const firstMenuItem = menu.querySelector('a');

/**
 * Toggles the navigation menu.
 * */
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

/**
 * Toggles the navigation menu when the menu button is clicked.
 * */
menuButtonContainer.addEventListener('click', () => {
  toggleMenu();
});

/**
 * Toggles the navigation menu when the menu button is activated with
 * the keyboard.
 * */
menuButtonContainer.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggleMenu();
  }
});

/* TODO: close the navigation menu when clicking outside of it */

/**
 * Closes the navigation menu when the user resizes the window to
 * desktop size.
 */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menuButtonContainer.classList.remove('opened');
    menu.classList.remove('opened');
  }
});