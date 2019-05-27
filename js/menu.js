const body = document.querySelector('body');
const button = document.querySelector('#hamburger-menu__link');
const menu = document.querySelector('#hamburger__menu');
const close = document.querySelector('#hamburger-menu__close');

button.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.add('active');
    body.classList.add('hide');
});

close.addEventListener('click', function(c){
    c.preventDefault();
    menu.classList.remove('active');
    body.classList.remove('hide');
})