
// Default Gallery (services, manufacture)

function Gallery(selector) {
    let galleryName = document.querySelector(selector),
        services = galleryName.querySelectorAll('.galleries__sub'),
        servicesList = services[1].parentElement,
        galleryImgs = galleryName.querySelectorAll('.gallery__img'),
        prevImg = galleryName.querySelector('.gallery__pagination--left'),
        nextImg = galleryName.querySelector('.gallery__pagination--right'),
        imgWrapper = galleryName.querySelector('.gallery__imgs-wrapper');


    let dataSet = function () {
        for (let i = 0; i < services.length; i++) {
            services[i].dataset.number = i + 1;
        }
    };

    let chooseGallery = function (e) {
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
            galleryImgs[i].setAttribute('src', 'img/gallery_1/gallery_' + number + '/' + (i + 1) + '_s.jpg');
        }
    };

    let setNextImg = function (e) {
        if (parseInt(getComputedStyle(imgWrapper).left) % 500 !== 0) {
            return;
        }
        imgWrapper.style.left = (parseInt(getComputedStyle(imgWrapper).left, 10) - 500) + 'px';
    };

    let setPrevImg = function (e) {
        if (getComputedStyle(imgWrapper).left === '0px') {
            return;
        }
        if (parseInt(getComputedStyle(imgWrapper).left) % 500 !== 0) {
            return;
        }
        imgWrapper.style.left = (parseInt(getComputedStyle(imgWrapper).left, 10) + 500) + 'px';
    };

    dataSet();
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



new Gallery('.js-gallery-1');
new Gallery('.js-gallery-2');
new Gallery('.js-gallery-3');

new GalleryForMobile('.js-gallery-1');
new GalleryForMobile('.js-gallery-2');
new GalleryForMobile('.js-gallery-3');
new DropMenu('.js-navigation');

// if (window.matchMedia("(min-width: 768px)").matches) {
//
//
// } else {
//
// }















