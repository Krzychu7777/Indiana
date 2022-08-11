var splide = new Splide( '.splide', {
        
    gap: 16,
    perMove: 1,
    perPage: 4,
    arrows: false,
    pagination: false,
    breakpoints: {
        768: {
            pagination: true,
        },

        660: {
            perPage: 3,
        },

        500: {
            perPage: 2,
        },

        390: {
            perPage: 1,
            gap: -130,
        },

        310: {
            gap: -91,
        }
    }
    
    } );

    splide.mount();