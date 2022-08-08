const desktopNavLinks = document.querySelectorAll('.links-nav-desktop li'),
    menuCardsDesk = document.querySelectorAll('.menu-card-dt'),
    mobileNavLinks = document.querySelectorAll('.mobile-link'),
    arrowsNavLink = document.querySelectorAll('.links-arrow'),
    menuToggler = document.querySelector('.menu-toggler'),
    mobileMenuBody = document.querySelector('.menu-card-mobile'),
    hamburger = document.querySelector('.hamburger-menu'),
    dropdownBtn = document.querySelectorAll('.drop-down-btn'),
    openSearchBtn = document.querySelector('.search-iceon-desktop'),
    searchItemSection = document.querySelector('.search-console-section'),
    searchConsole = document.querySelector('.search-container'),
    closeSearchBtn = document.querySelector('.close-search-button'),
    goSearchBtn = document.querySelector('.go-search-btn'),
    popularSearches = document.querySelectorAll('.popular-searches li'),
    menuCardLinks = document.querySelectorAll('.card-item'),
    main = document.querySelector('body'),
    openSearchMobile = document.querySelector('.menu-search');

const openMenuCardsDesktop = e => {
    const currentLink = e.currentTarget,
        desktopLinkArrow = currentLink.querySelector('.links-arrow'),
        menuCard = currentLink.querySelector('.menu-card-dt');

    dropdownBtn.forEach((item) => {
        if(item != currentLink) item.classList.remove('drop-down-btn--active');
    });

    menuCardsDesk.forEach((card) => {
        if(card != menuCard) {
            card.classList.remove('menu-card-container--active');
        }
    });
    arrowsNavLink.forEach((arrow) => {
        if(arrow != desktopLinkArrow) arrow.classList.remove('links--active');
    });

    if(menuCard) {
    menuCard.classList.toggle('menu-card-container--active');
    desktopLinkArrow.classList.toggle('links--active');
    currentLink.classList.toggle('drop-down-btn--active');
    }
    
}

const mobileMenuFunc = e => {
    const currentMobileLink = e.currentTarget,
            menuCategory = currentMobileLink.querySelector('.menu-mobile-category'),
            navMobileText = document.querySelector('.category-nav-bar p'),
            backBtnMobile = document.querySelector('.back-btn'),
            menuCloseBtn = document.querySelector('.close-btn-category'),
            categoryNavBar = document.querySelector('.category-nav-bar');

        if(menuCategory) {
            menuCategory.classList.add('menu-mobile-category--active');
            categoryNavBar.style.display = "flex";
            navMobileText.innerHTML = currentMobileLink.dataset.name;

            backBtnMobile.addEventListener('click', () => {
                categoryNavBar.style.display = "none";
                menuCategory.classList.remove('menu-mobile-category--active');
            });

            menuCloseBtn.addEventListener('click', () => {
                categoryNavBar.style.display = "none";
                menuCategory.classList.remove('menu-mobile-category--active');
                hamburger.classList.remove('hamburger--active');

                setTimeout(() => {
                    mobileMenuBody.classList.remove('menu-card-mobile--active');
                }, 200);
            });
        }
}

desktopNavLinks.forEach((item) => {
    item.addEventListener('click', openMenuCardsDesktop);
});

mobileNavLinks.forEach((item) => {
    item.addEventListener('click', mobileMenuFunc);
});

menuToggler.addEventListener('click', () => {
    mobileMenuBody.classList.toggle('menu-card-mobile--active');
    hamburger.classList.toggle('hamburger--active');
});

//hover banner menu

// const changeBanner1 = (item, classes) => {
//     classes.forEach((banner) => {
//         banner.style.display = "none";
//         if(item.dataset.link === banner.dataset.banner) {
//             banner.style.display = "block";
//         }
//     });
// };

const changeBanner = (item, array, activeClass) => {
    array.forEach((banner) => {
        banner.classList.remove(activeClass);
        if(item.dataset.link === banner.dataset.banner) {
            banner.classList.add(activeClass);
        }
    });
};

menuCardLinks.forEach((item) => {
    item.addEventListener('mouseover', () => {
        const scooterBanner = document.querySelectorAll('.scooters-banner'),
            supportBanner = document.querySelectorAll('.item-image-nav'),
            bikeBanner = document.querySelectorAll(".city-bk");

        // const menuBanners = document.querySelectorAll('.menu-banner');
        // const curentLink = e.currentTarget.parentNode;
        // if(curentLink.dataset.list === item.dataset.type) {
        //     menuBanners.forEach((banner) => {
        //         banner.style.display = "none";
        //         if(item.dataset.link === banner.dataset.banner) {
        //             banner.style.display = "block";
        //         }
        //     });
        // }


        if (item.classList.contains('support-item')) changeBanner(item, supportBanner, 'support-banner--active');

        if (item.classList.contains('scooter-item')) changeBanner(item, scooterBanner, 'scooters-image--active');

        if(item.classList.contains('bike-items')) changeBanner(item, bikeBanner, 'bike-image--active');

    });
});

//search pop up

const openSearchConsole = (section, console) => {
    section.classList.add('search-console-section--active');

    setTimeout(() => {
        console.classList.add('search-container--active');
    }, 10);
}

const closeSearchConsole = (section, console) => {
    console.classList.remove('search-container--active');

    setTimeout(() => {
        section.classList.remove('earch-console-section--active');
    }, 10);
};

closeSearchBtn.addEventListener('click', () => {
    closeSearchConsole(searchItemSection, searchConsole);
})

openSearchBtn.addEventListener('click', () => {
    openSearchConsole(searchItemSection, searchConsole);
});

goSearchBtn.addEventListener('click', () => {
    closeSearchConsole(searchItemSection, searchConsole);
});

popularSearches.forEach((item) => {
    item.addEventListener('click', () => {
        const popularSearchesText = document.querySelector('input[name="search-text"]');
        
        popularSearchesText.value = item.textContent;
    });
});

openSearchMobile.addEventListener('click', () => {
    openSearchConsole(searchItemSection, searchConsole);
});

//main

main.addEventListener('click', (e) => {
    const mainTarget = e.target,
        header = document.querySelector('header');

    if(!searchConsole.contains(mainTarget)) {
        closeSearchConsole(searchItemSection, searchConsole);
    }

    if(!header.contains(mainTarget)) {
        dropdownBtn.forEach((item) => {
            item.classList.remove('drop-down-btn--active');
        });
    
        menuCardsDesk.forEach((card) => {
            card.classList.remove('menu-card-container--active');
        });
    
        arrowsNavLink.forEach((arrow) => {
            arrow.classList.remove('links--active');
        });
    }
});