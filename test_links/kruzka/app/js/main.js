
// Default Gallery (services, manufacture)

function Gallery(selector) {
    let galleryName = document.querySelector(selector),
        services = galleryName.querySelectorAll('.galleries__sub'),
        servicesList = services[1].parentElement,
        prevImg = galleryName.querySelector('.gallery__pagination--left'),
        nextImg = galleryName.querySelector('.gallery__pagination--right'),
        imgWrapper = galleryName.querySelector('.gallery__imgs-wrapper'),
        imgViewport = galleryName.querySelector('.gallery__view-port'),
        imgViewportSize = parseInt(getComputedStyle(imgViewport).width) + 1,
        imgWrapperWidth = Math.ceil(getComputedStyle(imgWrapper).width.slice(0,-2));


    let galleryItemAmount;

    let dataSet = function () {
        for (let i = 0; i < services.length; i++) {
            services[i].dataset.number = i + 1;
        }
    };

    let createImgs = function () {
        let elemArray = new Array(40);
        for (let i = 0; i < 40; i++) {
            elemArray[i] = document.createElement('img');
            elemArray[i].className = 'gallery__img  js-img';
            elemArray[i].alt='Картинка услуг';
            elemArray[i].src='img/gallery_' + selector.slice(12) + '/gallery_1/' + (i + 1) + '.jpg';
            imgWrapper.appendChild(elemArray[i]);
        }

    };

    let chooseGallery = function (e) {
        imgWrapper.style.left = '0px';

        let target = e.target,
            number = e.target.dataset.number;
        if (target.tagName !== 'LI') {
            return;
        }

        for (let j = 0; j < services.length; j++) {
            services[j].classList.remove('galleries__sub--active');
        }
        target.classList.add('galleries__sub--active');
        for (let i = 0; i < galleryImgs.length; i++) {
            galleryImgs[i].setAttribute('src', 'img/gallery_' + selector.slice(12) + '/gallery_' + number + '/' + (i + 1) + '.jpg');
        }
        galleryItemAmount = e.target.dataset.imgAmount;
    };

    let setNextImg = function (e) {
        if (parseInt(getComputedStyle(imgWrapper).left) % 250 !== 0) {
            return;
        }
        if (getComputedStyle(imgWrapper).left === -(galleryItemAmount - 1) * imgViewportSize + 'px') {

            return;
        }
        imgWrapper.style.left = (parseInt(getComputedStyle(imgWrapper).left, 10) - Math.ceil(imgWrapperWidth)) + 'px';
    };

    let setPrevImg = function (e) {
        if (getComputedStyle(imgWrapper).left === '0px') {
            return;
        }
        if (parseInt(getComputedStyle(imgWrapper).left) % 250 !== 0) {
            return;
        }
        imgWrapper.style.left = (parseInt(getComputedStyle(imgWrapper).left, 10) + Math.ceil(imgWrapperWidth)) + 'px';
    };

    dataSet();
    createImgs();

    let galleryImgs = galleryName.querySelectorAll('.gallery__img');

    servicesList.addEventListener('click', chooseGallery);
    nextImg.addEventListener('click', setNextImg);
    prevImg.addEventListener('click', setPrevImg);

}


    // For mobile

function GalleryForMobile(selector) {
    let galleryName = document.querySelector(selector),
        listBtn = galleryName.querySelector('.galleries__icon-wrapper'),
        activeLi = galleryName.querySelector('.galleries__sub--active'),
        listItems = galleryName.querySelectorAll('.galleries__sub'),
        list = galleryName.querySelector('.galleries__list'),
        activeLiHeight = parseInt(getComputedStyle(activeLi).height) + 8;


    listBtn.style.height = activeLiHeight + 'px';


    function showActiveItem(e) {
        e.target.classList.add('galleries__sub--visible');
        activeLiHeight = parseInt(getComputedStyle(e.target).height) + 8;
        listBtn.style.height = activeLiHeight + 'px';
    }

    function closeList(e) {
        if (e.target.classList.contains('galleries__sub') &&
            list.classList.contains('galleries__list--active')) {
            showActiveItem(e);
        }

        listItems.forEach(function (item, i) {
            item.classList.remove('galleries__sub--visible')  ;
        });
        list.classList.remove('galleries__list--active');
    }

    function showList(e) {
        if (e.target.classList.contains('galleries__sub--active')) {
            listItems.forEach(function (item, i) {
                item.classList.add('galleries__sub--visible')  ;
            });
            list.classList.add('galleries__list--active');
        }
    }

    window.addEventListener('click', closeList, true);
    list.addEventListener('click', showList, true);


}





// Main menu

function DropMenu(selector) {
    let menuName = document.querySelector(selector),
        menuIcon = menuName.querySelector('.navigation__icon'),
        menuMenu = menuName.querySelector('.navigation__menu'),
        menuIconWrapper = menuName.querySelector('.navigation__icon-wrapper');


    function rotateIcon() {
        menuIcon.classList.toggle('navigation__icon--transformed');
        menuIconWrapper.classList.toggle('navigation__icon-wrapper--transformed');
    }

    function renderMenu() {
        menuMenu.classList.toggle('navigation__menu--dis');
    }

    function closeMenuByClick(e) {
        if (!e.target.classList.contains('navigation__icon') && !e.target.classList.contains('navigation__icon-line')) {
            menuMenu.classList.add('navigation__menu--dis');
            menuIcon.classList.remove('navigation__icon--transformed');
            menuIconWrapper.classList.remove('navigation__icon-wrapper--transformed');
        }
    }

    menuIcon.addEventListener('click', rotateIcon);
    menuIcon.addEventListener('click', renderMenu);
    document.addEventListener('click', closeMenuByClick);

}

function ImgOpenner(selector) {
    let section = document.querySelector(selector);

    let closeFull = function () {
        let img = section.querySelector('.' + selector.slice(4).slice(0, -2) + '__img-full'),
            overlay = section.querySelector('.' + selector.slice(4).slice(0, -2) + '__img-overlay');


        section.removeChild(img);
        section.removeChild(overlay);
    };

    let openFull = function (e) {
        if (e.target.classList.contains('js-img')) {
            let elem = document.createElement('img'),
                overlay = document.createElement('div'),
                screenHeight = window.screen.height,
                screenWidth = window.screen.width;
            elem.src = e.target.src;
            // elem.src = e.target.src.slice(0, -6) + '.jpg';
            console.log(elem.src);
            elem.className = selector.slice(4).slice(0, -2) + '__img-full';
            overlay.className = selector.slice(4).slice(0, -2) + '__img-overlay';

            let imgHeight = elem.naturalHeight,
                imgWidth = elem.naturalWidth,
                imgRatio = imgHeight / imgWidth;

            console.log(imgHeight, imgWidth);

            if (imgHeight * 1.4 > screenHeight) {
                if (imgWidth * 1.4 > screenWidth) {
                    if (screenHeight * 0.95 / imgRatio > screenWidth * 0.95) {
                        elem.style.width = screenWidth * 0.95 + 'px';
                        elem.style.height = screenWidth * 0.95 * imgRatio + 'px';
                    }
                    else {
                        elem.style.width = screenHeight * 0.95 / imgRatio + 'px';
                        elem.style.height = screenHeight * 0.95 + 'px';
                    }
                }
                else {
                    elem.style.height = screenHeight * 0.95 + 'px';
                    elem.style.width = screenHeight * 0.95 / imgRatio + 'px';
                }
            }
            else {
                if (imgWidth * 1.4 > screenWidth) {
                    elem.style.width = screenWidth * 0.95 + 'px';
                    elem.style.height = screenWidth * 0.95 * imgRatio + 'px';
                }
                else {
                    elem.style.width = imgWidth * 1.4 + 'px';
                    elem.style.height = imgHeight * 1.4 + 'px';
                }
            }

            section.appendChild(overlay);
            section.appendChild(elem);

            elem.style.left = parseInt(getComputedStyle(elem).left, 10) - parseInt(elem.style.width, 10) / 2 + 'px';
            elem.style.top = parseInt(getComputedStyle(elem).top, 10) - parseInt(elem.style.height, 10) / 2 + 'px';

            overlay.addEventListener('click', closeFull)
        }
    };

    section.addEventListener('click', openFull);

}


new ImgOpenner('.js-admission-1');
new ImgOpenner('.js-galleries-1');
new ImgOpenner('.js-galleries-2');
new ImgOpenner('.js-galleries-3');

new Gallery('.js-gallery-1');
new Gallery('.js-gallery-2');
new Gallery('.js-gallery-3');

new GalleryForMobile('.js-gallery-1');
new GalleryForMobile('.js-gallery-2');
new GalleryForMobile('.js-gallery-3');
new DropMenu('.js-navigation');

















