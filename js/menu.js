// Hamburger menu
let menu = (function(options) {
    let menu = document.querySelector(options.menu);
    let buttonOpen = document.querySelector(options.buttonOpen);
    let buttonClose = document.querySelector(options.buttonClose);
    let body = document.querySelector('body');

    let _toggleMenu = function (e) {
        menu.classList.toggle('active');
        body.classList.toggle('hide');
    }

    let addListeners = function() {
        buttonOpen.addEventListener('click', function(e){
            e.preventDefault();
            _toggleMenu();
        });
        buttonClose.addEventListener('click', function(e){
            e.preventDefault();
            _toggleMenu();
        });

        menu.addEventListener('click', function(e) {
            
            target = e.target;
            if (target.classList == 'nav__link') {
                _toggleMenu();
            };
        })
    }

    return {
        openMenu: addListeners
    };

})({
    buttonOpen: '#hamburger-menu__link',
    buttonClose: '#hamburger-menu__close',
    menu: '#hamburger__menu'
});

menu.openMenu();


// Horizontal acco

let teamAccoJS = () => {
    let accoLink = document.querySelectorAll('.team-accordeon__trigger');

    accoLink.forEach(function(elementName) {
        elementName.addEventListener('click', function(e) {
            e.preventDefault();
            let activeElem = document.querySelector('.team-accordeon__item.active');

            if(activeElem) {
                let elemAccoDesc = activeElem.querySelector('.team-accordeon__desc')
                elemAccoDesc.style.height = "0px";
                activeElem.classList.remove('active');
            }

            if(!activeElem || activeElem.querySelector('.team-accordeon__trigger') !== e.target) {
                let currentElem = e.target.closest('.team-accordeon__item');
                currentElem.classList.add('active');

                let currentElemInfo = currentElem.querySelector('.team-accordeon__desc');
                currentElemInfo.style.height = currentElemInfo.scrollHeight + "px";
            }
        })
    })
};

teamAccoJS();

// Vertical acco 

let menuAccoJS = () => {

    let calculateWidth = () => {
        let windowWidth = window.innerWidth;

        let links = document.querySelectorAll('.menu-accordeon__trigger');
        let linksWidth = parseFloat(getComputedStyle(links[0]).width);
        // console.log(linksWidth);
        let reqWidth = windowWidth - linksWidth * links.length;

        return reqWidth > 550 ? 550 : reqWidth;
    };


    let accoLink = document.querySelectorAll('.menu-accordeon__trigger');

    accoLink.forEach(function(elementName) {
        elementName.addEventListener('click', function(e) {
            e.preventDefault();
            let activeElem = document.querySelector('.menu-accordeon__item.active');

            if(activeElem) {
                let elemAccoDesc = activeElem.querySelector('.menu-accordeon__desc')
                elemAccoDesc.style.width = "0px";
                activeElem.classList.remove('active');
            }

            if(!activeElem || activeElem.querySelector('.menu-accordeon__trigger') !== e.target) {
                let currentElem = e.target.closest('.menu-accordeon__item');
                currentElem.classList.add('active');

                let currentElemInfo = currentElem.querySelector('.menu-accordeon__desc');
                currentElemInfo.style.width = calculateWidth() + "px";
            }
        })
    })
};

menuAccoJS();


// Dropdown menu

let ingredients = document.querySelectorAll(".ingredients");
let buttonClose = document.querySelector(".ingredients__close");


for (let i = 0; i < ingredients.length; i++) {
    let drop = ingredients[i];
    drop.addEventListener('mouseenter', function(e){
        e.preventDefault();
        // console.log('mouseenter');
        drop.classList.add('ingredients--active');
    })

    drop.addEventListener('mouseleave', function(e){
        e.preventDefault();
        drop.classList.remove('ingredients--active');
    })

};

// buttonClose.addEventListener('click', function(e){
//     e.preventDefault();
//     ingredients.classList.remove('ingredients--active');
// })


// Slider

const slide = (function() {
    const left = document.querySelector('.arrow__btn-prev');
    const right = document.querySelector('.arrow__btn-next');
    const slider = document.querySelector('.burgers__list');
    const computed = getComputedStyle(slider);
// console.dir(computed);
    let sliderWidth = parseInt(computed.width);

    window.addEventListener('resize', function(){
        currentRight = 0;
        slider.style.right = currentRight;
        sliderWidth = parseInt(computed.width);
    }, true);

    var sliderItemsCounter = slider.children.length;
    // console.log(sliderItemsCounter);

    let moveSlide = function(direction) {
        direction.addEventListener("click", function(e){
            e.preventDefault();
            // console.log(direction);
            let currentRight = parseInt(computed.right);

            if(currentRight < (sliderItemsCounter-1)*sliderWidth && direction==right) {
                slider.style.right = currentRight + sliderWidth + "px";
            }

            if(currentRight > 0 && direction==left) {
                slider.style.right = currentRight - sliderWidth + "px";
            }

        });
    }

    let addListeners = function() {
        moveSlide(right);
        moveSlide(left);
    }

    return {init: addListeners}
})();

slide.init();


// Modal windows and AJAX

const overlay = (function () {
    let body = document.querySelector('body');
    let link = document.createElement('a');

    link.classList.add('modal__review-close');
    link.setAttribute('href', '#');

    let openOverlay = function (modalId, content) {
        let overlay = document.querySelector(modalId);
        let innerOverlay = overlay.querySelector('.modal__review-desc');

        if(content){
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);
        }

        overlay.classList.add('active');
        body.classList.add('hide');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeOverlay(modalId);
        })

        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target === overlay) {
                closeOverlay(modalId);
            }
        })
    }

    let closeOverlay = function (modalId) {
        let overlay = document.querySelector(modalId);

        overlay.classList.remove('active');
        body.classList.remove('hide');
    }

    let setContent = function (modalId, content) {
        let overlay = document.querySelector(modalId);
        let innerOverlay = document.querySelector('.modal__review-desc');

        if(content) {
            innerOverlay.innerHTML = content;
            innerOverlay.appendChild(link);
        }
    }

    return {
        open: openOverlay,
        close: closeOverlay,
        setContent: setContent
    }
})();

// Отправка формы 

var ajaxForm = function (form) {
    let formData = new FormData();
    formData.append('name', form.elements.name.value);
    formData.append('phone', form.elements.phone.value);
    formData.append('comment', form.elements.comment.value);
    formData.append('to', 'wildfaren@yandex.ru');

    let url = 'https://webdev-api.loftschool.com/sendmail';

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(formData);

    return xhr;
}

// Form

var submitForm = function (e) {
    e.preventDefault();
    var form = e.target;
    let request = ajaxForm(form);

    request.addEventListener('load', () => {
        if (request.status >= 400) {
            let content = 'Неполадки с сервером, попробуйте позже';

            overlay.open('#modal-review', `${content}. Ошибка ${request.status}`)
        } else {
            let content = request.response.message;
            overlay.open('#modal__review', content);
        }
    });
}

let myForm = document.querySelector('#form__order');
myForm.addEventListener('submit', submitForm);

// Open review

let reviewOpen = function(content) {
    let container = document.querySelector('.reviews__list');

    container.addEventListener('click', function (e) {
        e.preventDefault();
        let target = e.target;
        if(target.className === 'review__button') {
            overlay.open('#modal__review', content);
        }
    });
}
content = document.querySelector('#overlay-win').innerHTML;
reviewOpen(content);