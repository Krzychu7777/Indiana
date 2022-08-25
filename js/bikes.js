const selectFilterInput = document.querySelectorAll('.filter-input'),
    selectFilterList = document.querySelectorAll('.filters-list'),
    selectFilterListItem = document.querySelectorAll('.filters-list li'),
    selectFilterListCheckbox = document.querySelectorAll('.filters-list input[type="checkbox"]'),
    removeFilterButton = document.querySelector('.category-filter-container'),
    sortingInput = document.querySelector('.sorting-input'),
    sortingList = document.querySelector('.sorting-list'),
    sortingListItem = document.querySelectorAll('.sorting-list li'),
    clearFiltersBtn = document.getElementById('clear-filter'),
    bikeCategoryButtons = document.querySelectorAll('.bike-icon-square'),
    sortText = document.getElementById('sort-type'),
    sortValue = document.getElementById('sort-type-value'),
    sortItemText = document.querySelectorAll('.sorting-list li p'),
    bikeProductCard = document.querySelectorAll('.bike-product-card'),
    bikePageCotainers = document.querySelectorAll('.bike-cards-container'),
    paginationButtons = document.querySelectorAll('.pagination-btn'),
    findPage = document.querySelector('.find-page'),
    productCardSection = document.getElementById('bike-products');
let activeArrayItems = document.querySelectorAll('[data-active="1"]'),
    urlLink = window.location.search,
    urlParams = new URLSearchParams(urlLink);

let actualFilters = [
    {
        filterName: "Rowery Cross",
        dataFilter: "Cross",
    },
];
let pageFilters = [];

//functions

//hide pagination buttons

const hiddenPaginationBtn = (activeClass) => {
    const pagBtn2 = document.querySelector('[data-page="2"]'),
        pagBtn3 = document.querySelector('[data-page="3"]');
        
        activeClass.length > 12 ? pagBtn3.style.display = "" : pagBtn3.style.display = "none";
    
        activeClass.length > 6 ? pagBtn2.style.display = "" : pagBtn2.style.display = "none";

    paginationButtons.forEach((button) => {
         button.classList.remove('btn-pag-active');
    
        if(button.dataset.page === "1") button.classList.add('btn-pag-active');
    });
};

// filter product cards

const cardFiltering = () => {
    const productsAmount = document.getElementById('products-amount'),
        findProduct = document.querySelector('.find-product');

        let activeCards = document.querySelectorAll('.bike-product-card');

        activeCards.forEach((item) => {
            item.dataset.active = 1;
            item.classList.add('bike-product-card--active');
        }); 

        pageFilters = [];

        selectFilterList.forEach((select) => {
            activeCards = document.querySelectorAll('[data-active="1"]');

            let activCheck = select.querySelectorAll('input[type="checkbox"]:checked');
            let dataFilter = [];

            if(activCheck.length) {
                activCheck.forEach((checkbox) => {
                    dataFilter.push(checkbox.dataset.filter);
                });


                activeCards.forEach((card) => {
                    let dataFilters = card.dataset[`${select.id}`].split(',');

                    card.dataset.active = 0;
                    card.classList.remove('bike-product-card--active');
            
                    dataFilters.forEach((item) => {
                        if(dataFilter.includes(item)) {
                            card.dataset.active = 1;
                            card.classList.add('bike-product-card--active');
                            }
                    });
                });
            }
        });

        findProduct.style.display = "none";

        const activeProductsCount = [...bikeProductCard].filter((item) => {
            return item.classList.contains('bike-product-card--active');
        });

        activeArrayItems = activeProductsCount;

        activeProductsCount.forEach((item, index) => {
            item.style.display = "none";

            if(index < 6) item.style.display = "";
        });

        hiddenPaginationBtn(activeProductsCount);

        if(activeProductsCount.length === 0) findProduct.style.display = "block";
    
        productsAmount.innerHTML = activeProductsCount.length;
};

// sorting product cards

const sortToLower = (array, dataset) => {
    array.sort(function(a, b) {
        return b.getAttribute(`data-${dataset}`) - a.getAttribute(`data-${dataset}`);
    });
};

const sortToUpper = (array, dataset) => {
    array.sort(function(a, b) {
        return a.getAttribute(`data-${dataset}`) - b.getAttribute(`data-${dataset}`);
    });
};

const sortAlfabetically = (array, dataset) => {
    array.sort(function(a, b) {
        return a.getAttribute(`data-${dataset}`).localeCompare(b.getAttribute(`data-${dataset}`));
    });
};

const sortReverseAlfabetically = (array, dataset) => {
    array.sort(function(a, b) {
        return b.getAttribute(`data-${dataset}`).localeCompare(a.getAttribute(`data-${dataset}`));
    });
};

const changeSortValue = (e, item) => {
    const currentSortType = e.currentTarget.querySelector('p');

    sortItemText.forEach((item) => {
        item.classList.remove('current-sort-type');
    });

    sortText.textContent = currentSortType.textContent;
    sortValue.value = currentSortType.textContent;

    currentSortType.classList.add('current-sort-type');

    let activeCardsForSort = [...activeArrayItems];

    if(item.dataset.sort === "najdroższe") {
        sortToLower(activeCardsForSort, 'price');
    } else if(item.dataset.sort === "najtańsze") {
        sortToUpper(activeCardsForSort, 'price');
    } else if(item.dataset.sort.toLowerCase() === 'a-z') {
        sortAlfabetically(activeCardsForSort, 'letter');
    } else if(item.dataset.sort.toLowerCase() === 'z-a') {
        sortReverseAlfabetically(activeCardsForSort, 'letter');
    }

    activeCardsForSort.forEach((item, index) => {
        item.style.order = index;
        item.style.zIndex = activeArrayItems.length - index;
        item.style.display = "none";
        if(index < 6) item.style.display = "";
    });

    if(item.dataset.sort === "sortowanie-domyślne") {
        bikeProductCard.forEach((item, index) => {
            item.style.order = "";
            item.style.display = "none"
            if(index < 6) item.style.display = "";
        });
    }

    paginationButtons.forEach((button) => {
        button.classList.remove('btn-pag-active');

        if(button.dataset.page === "1") button.classList.add('btn-pag-active');
    });
};

// url interactions

const assignUrlFilters = () => {
    const urlValues = urlParams.entries();

    for(const key of urlValues) {
        selectFilterListCheckbox.forEach((checkbox) => {
                if(changeCharacters(checkbox.name.toLowerCase()) === changeCharacters(key[0].toLowerCase()) && changeCharacters(checkbox.dataset.filter.toLowerCase()) === changeCharacters(key[1].toLowerCase())) {
                    checkbox.checked = true;
                    
                    const currentInput = checkbox.parentNode.parentNode.parentNode;

                    countSelectedFilters(currentInput);
                }

                
            });

        sortingListItem.forEach((item) => {
            if(changeCharacters(key[0].toLowerCase()) === 'sort' && changeCharacters(key[1].toLowerCase()) === changeCharacters(item.dataset.sort.toLowerCase())) {
                const currentItemText = item.querySelector('p');
                
                sortText.textContent = currentItemText.textContent;
                sortValue.value = currentItemText.textContent;

                currentItemText.classList.add('current-sort-type');
            }
        });

        cardFiltering();

        let activeCards = document.querySelectorAll('[data-active="1"]');

        if(changeCharacters(key[1]) === changeCharacters("najdroższe")) {
            sortToLower(activeArrayItems, 'price');
        } else if(changeCharacters(key[1]) === changeCharacters("najtańsze")) {
            sortToUpper(activeArrayItems, 'price');
        }
    
        activeArrayItems.forEach((item, index) => {
            item.style.order = index;
            item.style.zIndex = activeArrayItems.length - index;
            item.style.display = "none";
            if(index < 6) item.style.display = "";
        });

        paginationButtons.forEach((button) => {
            button.style.display = ""; 
            if(activeArrayItems.length === 0) button.style.display = "none";
        });

        hiddenPaginationBtn(activeArrayItems);
        
        if(key[0] === 'page') {
            activeArrayItems.forEach((card, index) => {
                card.style.display = "none";

                if(key[1] === "1") {
            
                    if(index < 6) card.style.display = "";
                        
                } else if(key[1] === "2") {
            
                    if(index > 5 && index < 12) card.style.display = "";
            
                } else if(key[1] === "3") {
            
                    if(index > 11 && index < 18) card.style.display = "";

                } else {
                    card.style.display = "none";
                    findPage.style.display = "block"; 

                    paginationButtons.forEach((button) => {
                        button.classList.remove('btn-pag-active');
                        button.style.display = "none";
                    });
                }
            });
        }

        paginationButtons.forEach((button) => {
            if(key[0].toLowerCase() === "page") {
                button.classList.remove('btn-pag-active');
            }

            if(key[1] === button.dataset.page) {
                button.classList.add('btn-pag-active');
            }
        });

    }
};

const changeUrlValue = () => {
    window.history.replaceState(null, null, window.location.pathname);

    const newUrl = new URL(window.location.href);

    paginationButtons.forEach((button) => {
        if(button.classList.contains('btn-pag-active')) {
            newUrl.searchParams.append('page', button.dataset.page);
        }
    });
       
    sortItemText.forEach((item, index) => {
        if(item.classList.contains('current-sort-type')) {
            if(sortingListItem[index].dataset.sort !== "sortowanie-domyślne") {
                newUrl.searchParams.append('sort', changeCharacters(sortingListItem[index].dataset.sort.toLowerCase()));
            }
        }
    });
    
    const checkedFilters = [...selectFilterListCheckbox].filter((checkbox) => {
        return checkbox.checked;
    });

    checkedFilters.forEach((checked) => {
        newUrl.searchParams.append(checked.name, changeCharacters(checked.dataset.filter.toLowerCase()));
    });

    window.history.pushState(null, null, decodeURI(newUrl));
};

//open select rectangle

const openFiltersList = e => {
    const currentSelect = e.currentTarget,
            currentList = currentSelect.querySelector('.filters-list');

            sortingList.classList.remove('sorting-list--active');
            sortingInput.classList.remove('sorting-input--active');

        selectFilterList.forEach((item, index) => {
            if(currentList != item) item.classList.remove('filters-list--active');
            if(currentSelect != selectFilterInput[index]) selectFilterInput[index].classList.remove('filter-input--active');
        });

        currentSelect.classList.toggle('filter-input--active');
        currentList.classList.toggle('filters-list--active');
};

//add and clear fliter block

const countSelectedFilters = (currentFilterText) => {
        const mainFilterDesc = currentFilterText.querySelector('.filter-desc'),
            filterCountText = currentFilterText.querySelector('.filters-count'),
            currentListCheckboxs = currentFilterText.querySelectorAll('.filters-list input[type="checkbox"]'),
            selectedFiltersCount = currentFilterText.querySelector('.count-checkbox');

    const checkboxChecked = [...currentListCheckboxs].filter((item) => {
        return item.checked;
    });

    selectedFiltersCount.innerHTML = checkboxChecked.length;

    if(checkboxChecked.length != '') {
        mainFilterDesc.classList.remove('filter--active');
        filterCountText.classList.add('filter--active');
    } else {
        mainFilterDesc.classList.add('filter--active');
        filterCountText.classList.remove('filter--active');
    }
}

const addFilterBlock = () => {
    const actualFiltersContainer = document.querySelector('.category-filter-container');
    actualFiltersContainer.innerHTML = "";

    actualFilters.forEach((filter) => {
        let actualFilterBlock = `
            <div class="category-filter" data-name="${filter.dataFilter}">
                <p>${filter.filterName}</p>
                    <div class="clear-filter-info">
                    <img src="img/remove-button.svg" alt="przycisk usuwania filtru" width="14" height="14"> 
                    </div>                            
            </div>`

            actualFiltersContainer.innerHTML += actualFilterBlock;
    });
};

const renderFilter = e => {
    const currentItem = e.target,
        newFilterBlock = currentItem.dataset.filter,
        actualText = currentItem.parentNode.querySelector('.filter-text-container p');

    const newFilter = {
        filterName: actualText.textContent,
        dataFilter: newFilterBlock,
    }

    if(currentItem.checked) {
        actualFilters.push(newFilter);
    } else {
        actualFilters = actualFilters.filter((el, index) => {
            return el.dataFilter !== newFilter.dataFilter;
        });
    }


    addFilterBlock();

    if(actualFilters.length === 0) {
        clearFiltersBtn.style.display = "none";
    } else {
        clearFiltersBtn.style.display = "block";
    }
}

const removeFilter = e => {
    const currentItem = e.target,
    removeButtons = document.querySelectorAll('.clear-filter-info img'),
    actualBtnIndex = [...removeButtons].indexOf(currentItem),
    allDisplayFilter = document.querySelectorAll('.category-filter');


    if(currentItem.tagName === "IMG") {

        bikeCategoryButtons.forEach((button) => {
            if(currentItem.parentNode.parentNode.dataset.name === `Rowery ${button.dataset.bikes}`) {
               const currentIndex =  actualFilters.indexOf(currentItem.parentNode.parentNode.dataset.name),
                    bikeFilterItem = actualFilters[currentIndex].split(" ");

                if(bikeFilterItem[1] === button.dataset.bikes) {
                    button.classList.remove('bicycle-category--active');
                }
            }    
        });

        actualFilters = actualFilters.filter((item, index) => {
                return index !== actualBtnIndex;
        });

       
            selectFilterListCheckbox.forEach((checkbox) => {
                    if(currentItem.parentNode.parentNode.dataset.name === checkbox.dataset.filter) {
                        checkbox.checked = false;

                        const filterInputElement = checkbox.parentNode.parentNode.parentNode,
                            currentListCheckboxs = checkbox.parentNode.parentNode.querySelectorAll('input[type="checkbox"]'),
                            coutCheckbox = filterInputElement.querySelector('.count-checkbox'),
                            mainFilterDesc = filterInputElement.querySelector('.filter-desc'),
                            filterCountText = filterInputElement.querySelector('.filters-count');

                        const currentCheckboxChecked = [...currentListCheckboxs].filter((item) => {
                            return item.checked;
                        });

                        coutCheckbox.innerHTML = currentCheckboxChecked.length;

                        if(currentCheckboxChecked.length != '') {
                            mainFilterDesc.classList.remove('filter--active');
                            filterCountText.classList.add('filter--active');
                        } else {
                            mainFilterDesc.classList.add('filter--active');
                            filterCountText.classList.remove('filter--active');
                        }
                    } 
                });
       

        if(actualFilters.length === 0) {
            clearFiltersBtn.style.display = "none";
        }
    } 

   setTimeout(() => {
    paginationButtons.forEach((button) => {
        button.style.display = ""; 
        if(activeArrayItems.length === 0) button.style.display = "none";
    });
    
    hiddenPaginationBtn(activeArrayItems);
   });

    addFilterBlock();
    cardFiltering();
};

const clearFilters = () => {
    const mainDescTexts = document.querySelectorAll('.filter-desc'),
        filterCountTexts = document.querySelectorAll('.filters-count');


    mainDescTexts.forEach((item, index) => {
        filterCountTexts[index].classList.remove('filter--active');
        item.classList.add('filter--active');
    });

    actualFilters = [];

     selectFilterListCheckbox.forEach((item) => {
        item.checked = false;
    });

    changeUrlValue();

    bikeCategoryButtons.forEach((button) => {
        button.classList.remove('bicycle-category--active');
    });

    setTimeout(() => {
        paginationButtons.forEach((button) => {
            button.style.display = ""; 
            if(activeArrayItems.length === 0) button.style.display = "none";
        });
        
        hiddenPaginationBtn(activeArrayItems);
       });

    addFilterBlock();

    clearFiltersBtn.style.display = "none";

    cardFiltering();
};

const chooseBikeType = (item) => {
    bikeCategoryButtons.forEach((button) => {
        button.classList.remove('bicycle-category--active');

        actualFilters = actualFilters.filter((item) => {
            return item.dataFilter !== button.dataset.bikes;
        });
    });

    item.classList.add('bicycle-category--active');

    const newCategory = {
        filterName: `Rowery ${item.dataset.bikes}`,
        dataFilter: item.dataset.bikes,
    }

    actualFilters.push(newCategory);

    addFilterBlock();

    clearFiltersBtn.style.display = "block";
};

//sorting

const openSortList = () => {
    selectFilterList.forEach((item, index) => {
        if(item.classList.contains('filters-list--active')) item.classList.remove('filters-list--active');
        if(selectFilterInput[index].classList.contains('filter-input--active')) selectFilterInput[index].classList.remove('filter-input--active');
    });

    sortingList.classList.toggle('sorting-list--active');
    sortingInput.classList.toggle('sorting-input--active');
};

//change characters

function changeCharacters(character) {

    return character.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace('+', '');
};

// choose product color

const chooseProductOptions = e => {
    const currentCardItem = e.target,
            currentCard = e.currentTarget,
            colorCircles = currentCard.querySelectorAll('.color-circle'),
            bikeImages = currentCard.querySelectorAll('.top-product-panel img'),
            sizeCircle = currentCard.querySelectorAll('.product-size'),
            wheelSizeValue = currentCard.querySelector('input[name="wheel-size"]'),
            productColorvalue = currentCard.querySelector('input[name="product-color"]');

        if(currentCardItem.classList.contains('color-circle')) {
            colorCircles.forEach((circle) => {
                circle.classList.remove('color-circle--active');
            });
            currentCardItem.classList.add('color-circle--active');

            bikeImages.forEach((image) => {
                image.style.display = "none";

                if(currentCardItem.classList.contains('color-circle--active')) {
                    if(image.dataset.color === currentCardItem.dataset.color) {
                        image.style.display = "block";
                    }
                }
            });

            if(currentCardItem.classList.contains('color-circle--active')) productColorvalue.value = currentCardItem.dataset.color;
        }

        if(currentCardItem.classList.contains('product-size')) {
            sizeCircle.forEach((size) => {
                size.classList.remove('product-size--active');
            })

            currentCardItem.classList.add('product-size--active');

            if(currentCardItem.classList.contains('product-size--active')) wheelSizeValue.value = currentCardItem.textContent;
        }
};

//page pagination

const divideCards = e => {
    //const activeBikeCards = document.querySelectorAll('[data-active="1"]');
    const currentPagBtn = e.currentTarget;

    activeArrayItems.forEach((card, index) => {
        card.style.display = "none";

        if(currentPagBtn.dataset.page === "1") {

            if(index < 6) card.style.display = "";
            
        } else if(currentPagBtn.dataset.page === "2") {

            if(index > 5 && index < 12) card.style.display = "";

        } else if(currentPagBtn.dataset.page === "3") {

            if(index > 11 && index < 18) card.style.display = "";
        }

        hiddenPaginationBtn(activeArrayItems);

        window.scrollTo(0, productCardSection.offsetTop);
    });

    paginationButtons.forEach((button) => {
        button.classList.remove('btn-pag-active');
    });

    currentPagBtn.classList.add('btn-pag-active');
};

//set scroll center

const setScrolCenter = () => {
    const bikeCategoryScroll = document.querySelector('.scroll-wrapper');

    const scrollCenterValue = (bikeCategoryScroll.scrollWidth - bikeCategoryScroll.clientWidth) / 2;

    bikeCategoryScroll.scrollLeft = scrollCenterValue;
};

// events 

selectFilterInput.forEach((select) => {
    select.addEventListener('click', openFiltersList);
});

sortingInput.addEventListener('click', openSortList);

sortingListItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        changeSortValue(e, item);
        changeUrlValue();
    });
});

selectFilterListCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
        const currentFilterText = e.currentTarget.parentNode.parentNode.parentNode;

        cardFiltering();

        renderFilter(e);
        changeUrlValue();
        countSelectedFilters(currentFilterText);

        paginationButtons.forEach((button) => {
            button.style.display = ""; 
            if(activeArrayItems.length === 0) button.style.display = "none";
        });

        hiddenPaginationBtn(activeArrayItems);
    });
});

removeFilterButton.addEventListener('click', (e) => {
    removeFilter(e);
    changeUrlValue();
});

clearFiltersBtn.addEventListener('click', clearFilters);

bikeCategoryButtons.forEach((item) => {
    item.addEventListener('click', () => {
        chooseBikeType(item);
    });
});

bikeProductCard.forEach((item) => {
    item.addEventListener('click', chooseProductOptions);
});

paginationButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
        divideCards(e);
        changeUrlValue();
        findPage.style.display = "none";
    });
});

window.addEventListener('load', () => {
    actualFilters.splice(1, actualFilters.length);

    selectFilterListCheckbox.forEach((item) => {
        item.checked = false;
    });

    bikeProductCard.forEach((card, index) => {
        card.style.display = "none";

        if(index < 6) card.style.display = "";
    });

    assignUrlFilters();

    selectFilterListCheckbox.forEach((item) => {
        const currentCheckboxText = item.parentNode.querySelector('.filter-text-container p');

        if(item.checked) {
            const newFilter = {
                filterName: currentCheckboxText.textContent,
                dataFilter: item.dataset.filter,
            };
    
            actualFilters.push(newFilter);
        }
    });

    addFilterBlock();

    setScrolCenter();
});

//close by body 

main.addEventListener('click', (e) => {
    const currentItem = e.target;

    if(!sortingInput.contains(currentItem)) {
        sortingList.classList.remove('sorting-list--active');
        sortingInput.classList.remove('sorting-input--active');
    }

    selectFilterInput.forEach((item, index) => {
        if(!item.contains(currentItem)) {
            item.classList.remove('filter-input--active');
            selectFilterList[index].classList.remove('filters-list--active');
        }
    });
});


