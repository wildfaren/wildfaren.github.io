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
// let container = document.querySelector('.burgers__list');
// let ingredients = document.querySelector('.ingredients');

// container.addEventListener('mouseover', function(e){ 
//     var target = e.target;
//     console.log(target.className);
//     if(target.className == 'ingredients') {
//         ingredients.classList.add('ingredients--active');
//     }
// });

// container.addEventListener('mouseout', function(){
//     ingredients.classList.remove('ingredients--active');
// })



let block = document.querySelector('.burgers__list');
let ingredients = document.querySelectorAll(".ingredients");
let buttonClose = document.querySelectorAll(".ingredients__close");


for (let i = 0; i < ingredients.length; i++) {
    let drop = ingredients[i];
    drop.addEventListener('mouseenter', function(e){
        e.preventDefault();
        // console.log('mouseenter');
        drop.classList.add('ingredients--active');
    });

    drop.addEventListener('mouseleave', function(e){
        e.preventDefault();
        drop.classList.remove('ingredients--active');
    });
};


// Slider

$(function () {

    var moveSlide = function (container, slideNum) {
        var items = container.find('.burgers__item'),
        activeSlide = items.filter('.active'),
        reqItem = items.eq(slideNum),
        reqIndex = reqItem.index(),
        list = container.find('.burgers__list'),
        duration = 500;

        if (reqItem.length) {
            list.animate({
                'left' : -reqIndex * 100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active');
                reqItem.addClass('active');
            });
        }
    }

    $('.arrow__btn').on('click', function(e){
        e.preventDefault();

        var $this = $(this),
        container = $this.closest('.burgers__wrap'),
        items = $('.burgers__item', container),
        activeItem = items.filter('.active'),
        existedItem, edgeItem, reqItem;

        if($this.hasClass('arrow__btn-next')) {
            existedItem = activeItem.next();
            edgeItem = items.first();
        } 

        if($this.hasClass('arrow__btn-prev')) {
            existedItem = activeItem.prev();
            edgeItem = items.last();
        } 

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(container, reqItem);
    });
})

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


// OPS

const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const switchActiveScroll = menuItemIndex => {
    $('.scroll__item')
    .eq(menuItemIndex)
    .addClass('active')
    .siblings()
    .removeClass('active');
};

const performTransition = sectionEq => {
    if(inscroll) return;

    const transitionDuration = 1000;
    const endOfInertion = 300;

    inscroll = true;
    const position = `${sectionEq * -100}%`;
    
    sections
        .eq(sectionEq)
        .addClass('active')
        .siblings()
        .removeClass('active');

    display.css({
        transform: `translateY(${position})`
    });

    setTimeout(() => {
        inscroll = false
    }, transitionDuration + endOfInertion);
    
    setTimeout(() => {
        switchActiveScroll(sectionEq);
    }, 300);
};

const scrollToSestion = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if(direction === "next" && nextSection.length) {
        performTransition(nextSection.index());
    }

    if(direction === "prev" && prevSection.length) {
        performTransition(prevSection.index());
    }
}

$('.wrapper').on({
    wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";

    scrollToSestion(direction);
    },

    touchmove: e => e.preventDefault()

});

$(document).on('keydown', e => {
    switch (e.keyCode) {
        case 38:
            scrollToSestion("prev");
            break;
        case 40:
            scrollToSestion("next");
            break;
    }
});

$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const target = $(e.currentTarget).attr('data-scroll-to');

    performTransition(target);
});

// Touch 



if(isMobile) {
    $(window).swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          const nextOrPrev = direction === "up" ? "next" : "prev"; 
    
          scrollToSestion(nextOrPrev);
        }
    });
}


// Player 

let video;
let durationControl; 
let soundControl;
let intervalId;

$().ready(function(){

    video = document.getElementById("player"); 

    video.addEventListener('click', playStop);

    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    durationControl = document.getElementById("durationLevel");  
    durationControl.addEventListener('mousedown', stopInterval);   
    // durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('mouseup', setVideoDuration); 

    durationControl.min = 0;
    durationControl.value = 0;    

    soundControl = document.getElementById("micLevel");    
    // soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume); 

    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;

    video.addEventListener('ended', function () {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
    }, false);
});


function playStop(){
    $(".video__player-img").toggleClass("video__player-img--active");  
    durationControl.max = video.duration;

    if (video.paused){
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        
    }else{
        video.pause();  
        clearInterval(intervalId);
        
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}


function setVideoDuration(){
    if (video.paused){
        video.play();
    }else{
        video.pause();  
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}


function updateDuration(){    
    durationControl.value = video.currentTime;
}


function soundOf(){    
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

function changeSoundVolume(){
    video.volume = soundControl.value/10; 
    console.log(video.volume) 
}


// Map 

ymaps.ready(function init(){ 
  var myMap = new ymaps.Map("map", {
      center: [59.938480, 30.312480],
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    }),

    burger1 = new ymaps.Placemark([59.938480, 30.312480], {
      hintContent: 'Магазин бургеров №1',
      balloonContent: 'Бургерная 1'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [40, 52],
      iconImageOffset: [-5, -38]
    }),

    burger2 = new ymaps.Placemark([59.90, 30.36], {
      hintContent: 'Магазин бургеров №2',
      balloonContent: 'Бургерная 2'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [40, 52],
      iconImageOffset: [-5, -38]
    }),

    burger3 = new ymaps.Placemark([59.96, 30.32], {
      hintContent: 'Магазин бургеров №3',
      balloonContent: 'Бургерная 3'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [40, 52],
      iconImageOffset: [-5, -38]
    }),

    burger4 = new ymaps.Placemark([59.94, 30.27], {
      hintContent: 'Магазин бургеров №4',
      balloonContent: 'Бургерная 4'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [40, 52],
      iconImageOffset: [-5, -38]
    });
  myMap.behaviors.disable('scrollZoom');
  myMap.geoObjects
    .add(burger1)
    .add(burger2)
    .add(burger3)
    .add(burger4);
});    