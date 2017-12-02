// Services Gallery

let services = document.querySelectorAll('.galleries__sub'),
    servicesList = services[1].parentElement,
    galleryImgs = document.querySelectorAll('.gallery__img'),
    prevImg = document.querySelector('.gallery__pagination--left'),
    nextImg = document.querySelector('.gallery__pagination--right'),
    imgWrapper = document.querySelector('.gallery__imgs-wrapper');

console.log(servicesList);




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

    for (let i = 0; i < galleryImgs.length; i++) {
        galleryImgs[i].setAttribute('src', 'img/gallery_'+ number + '/' + (i + 1) + '_s.jpg');
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


