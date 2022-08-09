const activeSlide = document.querySelectorAll('.product-image-slider-container .splide__list li'),
    sliderArrows = document.querySelectorAll('.main-slider-arrow'),
    sizeButtons = document.querySelectorAll('.circle'),
    colorButtons = document.querySelectorAll('.circle-color'),
    form = document.querySelector('form'),
    bookmarkButtons = document.querySelectorAll('.bookmark'); 

const formItems = {
    wheelSize: document.querySelector('input[name="wheel-size"]'),
    frameSize: document.querySelector('input[name="frame-size"]'),
    colorType: document.querySelector('input[name="color-type"]'),
};


// change active image

sliderArrows.forEach((item) => {
    item.addEventListener('click', () => {
        const mainImage = document.querySelector('.main-product-image-container img');
        const lightboxMainImage = document.getElementById('main-image-lightbox');

        setTimeout(() => {
            const activeElement = [...activeSlide].filter((element) => {
                return element.classList.contains('is-active');
            });
        
            const activeImage = activeElement[0].querySelector('div img');

            mainImage.src = activeImage.src;
            lightboxMainImage.href = activeImage.src;

            refreshFsLightbox();
        }, 500);
    });
});

//product card choose

const chooseSize = e => {
    const currentSizeButton = e.currentTarget,
            frameSizeButtons = document.querySelectorAll('.circle-frame-size'),
            wheelSizeButtons = document.querySelectorAll('.circle-wheel-size');

        if(currentSizeButton.classList.contains('circle-wheel-size')) {
            wheelSizeButtons.forEach((wheel) => {
                wheel.classList.remove('circle--active');
            });

            currentSizeButton.classList.add('circle--active');
            formItems.wheelSize.value = currentSizeButton.dataset.wheel;
        }

        if(currentSizeButton.classList.contains('circle-frame-size')) {
            frameSizeButtons.forEach((frame) => {
                frame.classList.remove('circle--active');
            });

            currentSizeButton.classList.add('circle--active');
            formItems.frameSize.value = currentSizeButton.dataset.frame;
        }
};

const chooseColor = (item) => {
    colorButtons.forEach((color) => {
        color.classList.remove('circle-color--active');
    });

    item.classList.add('circle-color--active');
    formItems.colorType.value = item.dataset.color;
};

sizeButtons.forEach((item) => {
    item.addEventListener('click', chooseSize);
});

colorButtons.forEach((item) => {
    item.addEventListener('click', () => {
        chooseColor(item);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(formItems.wheelSize.value !== '' && formItems.frameSize.value !== '' && formItems.colorType.value !== '') {
        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            wheelSize: formItems.wheelSize.value,
            frameSize: formItems.frameSize.value,
            colorType: formItems.colorType.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
    } else {
        console.log('Zaznacz wybory');
    }
});

//bookmarks

// bookmarkButtons.forEach((item) => {
//     item.addEventListener('click', () => {
//         const productSections = document.querySelectorAll('.product-inf-section');

//         productSections.forEach((section) => {
//             section.style.order = "1";

//             if(item.dataset.bookmark === section.dataset.section) {
//                 section.style.order = "0";
//             }
//         });

//         bookmarkButtons.forEach((button) => {
//             button.classList.remove('bookmark--active');
//         });

//         item.classList.add('bookmark--active');
//     });
// });

//sticky button

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

        if(currentScroll < 550) {
            form.classList.add('product-fixed');
            
        } else {
            if(form.classList.contains('product-fixed')) {
                form.classList.remove('product-fixed');
            }
        }
    
});

//splide 

var splide = new Splide( '#more-products', {
    gap: 32,
    perPage: 3,
    perMove: 1,
    rewind : true,
    pagination: false,
    drag: false,
    breakpoints: {
        992: {
            perPage: 2,
            pagination: true,
            arrows: false,
            drag: true,
        },
        630: {
            perPage: 1,
        }
    }
    } );

    splide.mount();

    var splide = new Splide( '#desktop-product-slider', {
    type: 'loop',
    perMove: 1,
    perPage: 3,
    gap: 32,
    direction: 'ttb',
    height   : '574px',
    pagination: false,
    drag: false,
    breakpoints: {
        1150: {
            direction: 'ltr',
            height   : 'auto',
            gap: 16,
        }
    }
    } );

    splide.mount();

    var splide = new Splide( '#mobile-product-slider', {
    type: "loop",
    perPage: 1,
    arrows: false,
    } );

    splide.mount();