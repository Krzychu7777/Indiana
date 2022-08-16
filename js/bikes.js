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
    urlLink = window.location.search,
    urlParams = new URLSearchParams(urlLink);

let actualFilters = [
    {
        filterName: "Rowery Cross",
        dataFilter: "Cross",
    },
];

const assignUrlFilters = () => {
    const urlValues = urlParams.entries();

    for(const key of urlValues) {
        selectFilterListCheckbox.forEach((checkbox) => {
                if(changeCharacters(checkbox.name.toLowerCase()) === changeCharacters(key[0].toLowerCase()) && changeCharacters(checkbox.dataset.filter.toLowerCase()) === changeCharacters(key[1].toLowerCase())) {
                    checkbox.checked = true;
                }
            });
    }
}

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
}

selectFilterInput.forEach((select) => {
    select.addEventListener('click', openFiltersList);
});

//sorting

const openSortList = () => {
    selectFilterList.forEach((item, index) => {
        if(item.classList.contains('filters-list--active')) item.classList.remove('filters-list--active');
        if(selectFilterInput[index].classList.contains('filter-input--active')) selectFilterInput[index].classList.remove('filter-input--active');
    });

    sortingList.classList.toggle('sorting-list--active');
    sortingInput.classList.toggle('sorting-input--active');
};

const changeSortValue = e => {
    const currentSortType = e.currentTarget.querySelector('p'),
        sortText = document.getElementById('sort-type'),
        sortValue = document.getElementById('sort-type-value');

    sortText.textContent = currentSortType.textContent;
    sortValue.value = currentSortType.textContent;
};

sortingInput.addEventListener('click', openSortList);

sortingListItem.forEach((item) => {
    item.addEventListener('click', changeSortValue);
});

//change value

const changeUrlValue = () => {
    window.history.pushState(null, document.title, '?');

    const newUrl = new URL(window.location.href);
        
    const checkedFilters = [...selectFilterListCheckbox].filter((checkbox) => {
        return checkbox.checked;
    });

    checkedFilters.forEach((checked) => {
        newUrl.searchParams.append(checked.name, changeCharacters(checked.dataset.filter.toLowerCase()));
    });

    window.history.pushState(null, null, decodeURI(newUrl));
}

//add and clear fliter block

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

        allDisplayFilter.forEach((item) => {
            selectFilterListCheckbox.forEach((checkbox) => {
                    if(currentItem.parentNode.parentNode.dataset.name === checkbox.dataset.filter) {
                        checkbox.checked = false;
                    } 
                })
        });

        if(actualFilters.length === 0) {
            clearFiltersBtn.style.display = "none";
        }
    } 

    addFilterBlock();
};

const clearFilters = () => {
    const checkedFilters = [...selectFilterListCheckbox].filter((item) => {
        return item.checked;
    });

    checkedFilters.forEach((item) => {
        item.checked = false;
    });

    addFilterBlock();
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

    console.log(actualFilters);

    addFilterBlock();

    clearFiltersBtn.style.display = "block";
};

removeFilterButton.addEventListener('click', (e) => {
    removeFilter(e);
    changeUrlValue();
});

clearFiltersBtn.addEventListener('click', () => {
    actualFilters = [];

    window.history.pushState(null, document.title, 'bikes.html?');

    bikeCategoryButtons.forEach((button) => {
        button.classList.remove('bicycle-category--active');
    });
    
    clearFilters();

    clearFiltersBtn.style.display = "none";
});

window.addEventListener('load', () => {
    actualFilters.splice(1, actualFilters.length);
    clearFilters();
});

bikeCategoryButtons.forEach((item) => {
    item.addEventListener('click', () => {
        chooseBikeType(item);
    });
});

//checked url checkbox

window.addEventListener('load', () => {
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
});

selectFilterListCheckbox.forEach((item) => {
    item.addEventListener('change', (e) => {
        renderFilter(e);
        changeUrlValue();
    });
});

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
}


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
