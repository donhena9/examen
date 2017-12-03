// Default Gallery (services, manufacture)

function Gallery(selector) {
    let galleryName = document.querySelector(selector),
        services = galleryName.querySelectorAll('.galleries__sub'),
        servicesList = services[1].parentElement,
        galleryImgs = galleryName.querySelectorAll('.gallery__img'),
        prevImg = galleryName.querySelector('.gallery__pagination--left'),
        nextImg = galleryName.querySelector('.gallery__pagination--right'),
        imgWrapper = galleryName.querySelector('.gallery__imgs-wrapper');


    dataSet = function () {
        for (let i = 0; i < services.length; i++) {
            services[i].dataset.number = i + 1;
        }
    };

    chooseGallery = function (e) {
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
            galleryImgs[i].setAttribute('src', 'img/gallery_1/gallery_'+ number + '/' + (i + 1) + '_s.jpg');
        }
    };

    setNextImg = function (e) {
        if (parseInt(getComputedStyle(imgWrapper).left) % 500 !== 0) {
            return;
        }
        imgWrapper.style.left = (parseInt(getComputedStyle(imgWrapper).left, 10) - 500) + 'px';
    };

    setPrevImg = function (e) {
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

new Gallery('.js-gallery-1');
new Gallery('.js-gallery-2');
new Gallery('.js-gallery-3');







