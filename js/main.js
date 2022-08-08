const selectList = document.querySelector('.option-list');
const gender = document.querySelectorAll('.gender-type-item');
const selectionItem = document.querySelector('.options-select');


//select options

const toggleSelecionItem = e => {
    const currentItem = e.target;
    
    if(!selectList.contains(currentItem)) {
    selectList.classList.toggle('option-list--active');
    selectionItem.classList.toggle('options-select--active');
    }
}

selectionItem.addEventListener('click', toggleSelecionItem);


//get value from gender type

const chooseGender = (e, item) => {
    const genderType = document.querySelector('input[name="gender-type-value"]');

        gender.forEach((gender) => {
            if(gender != e.currentTarget) gender.classList.remove('active-gender');
        });
        
        genderType.value = item.dataset.gender;
        item.classList.toggle('active-gender');
}

gender.forEach((item) => {
    item.addEventListener('click', (e) => {
        chooseGender(e, item);
    });
});


//main section

main.addEventListener('click', (e) => {
    const mainTarget = e.target;

    if(!selectionItem.contains(mainTarget)) {
        selectList.classList.remove('option-list--active');
        selectionItem.classList.remove('options-select--active')
    }
});


//get value form range

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: 82,
    connect: 'lower',
    step: 1,
    tooltips: true,
    range: {
        'min': 0,
        'max': 164
    }
});

slider.addEventListener('click', () => {
    const sliderRangeValue = slider.noUiSlider.get(),
        legLengthInput = document.querySelector('input[name="leg-length-value"]');
            
    legLengthInput.value = sliderRangeValue;
});


//splide

var splide = new Splide( '#home-page', {
    type   : 'fade',
    rewind: true,
    autoplay: true,
    interval: 5000,
    breakpoints: {
        992: {
            arrows: false,
        }
    }

    } );

    splide.mount();

    var splide = new Splide( '#bikes', {
    type   : 'loop',
    perPage: 4,
    gap: -335,
    pagination: false,
    speed: 1000,
    breakpoints: {
        1220: {
            arrows: false,
        },

        992: {
            perPage: 2,
            pagination: true,
            gap: 32,
        },

        574: {
            perPage: 2,
            gap: 16
        }
    }
    } );

    splide.mount();


    var splide = new Splide( '#guides', {
    perPage: 3,
    pagination: false,
    gap: 32,
    arrows: false,
    drag: false,
    breakpoints: {
        1220: {
            arrows: false,
        },
        992: {
            perPage: 2,
            drag: true,
            gap:16,
            pagination: true,
        },
        576: {
            perPage: 1,
        }
    }
    } );

    splide.mount();

    var splide = new Splide( '#news', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
    pagination: false,
    gap: 31,
    breakpoints: {
        992: {
            perPage: 2,
            gap:16,
            pagination: true,
        },
        576: {
            perPage: 1,
        }
    }


    } );

    splide.mount();

    var splide = new Splide( '#scooters', {
    type   : 'loop',
    perPage: 3,
    arrows: false,
    pagination: false,
    gap: 32,
    perMove: 1,
    drag: false,
    breakpoints: {
        992: {
            perPage: 2,
            drag: true,
            gap:16,
            pagination: true,
        },
        576: {
            perPage: 2,
        }
    }
    } );

splide.mount();
