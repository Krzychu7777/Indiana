const selectFilterInput = document.querySelectorAll('.filter-input'),
    selectFilterList = document.querySelectorAll('.filters-list'),
    selectFilterListItem = document.querySelectorAll('.filters-list input[type="checkbox"]'),
    removeFilterButton = document.querySelector('.category-filter-container'),
    sortingInput = document.querySelector('.sorting-input'),
    sortingList = document.querySelector('.sorting-list'),
    sortingListItem = document.querySelectorAll('.sorting-list li'),
    clearFiltersBtn = document.getElementById('clear-filter'),
    bikeCategoryButtons = document.querySelectorAll('.bike-icon-square');
let actualFilters = ["Rowery Cross"];


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


//add and clear fliter block

const addFilterBlock = () => {
    const actualFiltersContainer = document.querySelector('.category-filter-container');
    actualFiltersContainer.innerHTML = "";

    actualFilters.forEach((filter) => {
        let actualFilterBlock = `
            <div class="category-filter" data-name="${filter}">
                <p>${filter}</p>
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
        actualFilterIndex = actualFilters.indexOf(newFilterBlock);
        
    if(currentItem.checked) {
        actualFilters.push(newFilterBlock);
    } else {
        actualFilters = actualFilters.filter((el, index) => {
            return index !== actualFilterIndex;
        });
    }

    addFilterBlock();
}

const removeFilter = e => {
    const currentItem = e.target,
    removeButtons = document.querySelectorAll('.clear-filter-info img'),
    actualBtnIndex = [...removeButtons].indexOf(currentItem),
    allDisplayFilter = document.querySelectorAll('.category-filter');

    if(currentItem.tagName === "IMG") {
        actualFilters = actualFilters.filter((item, index) => {
                return index !== actualBtnIndex;
        });

        allDisplayFilter.forEach((item) => {
                selectFilterListItem.forEach((checkbox) => {
                    if(currentItem.parentNode.parentNode.dataset.name === checkbox.dataset.filter) {
                        checkbox.checked = false;
                    } 
                })
        });
    } 

    addFilterBlock();
};

const clearFilters = () => {
    const checkedFilters = [...selectFilterListItem].filter((item) => {
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
            return item !== `Rowery ${button.dataset.bikes}`;
        });
    });

    item.classList.add('bicycle-category--active');

    actualFilters.push(`Rowery ${item.dataset.bikes}`);

    addFilterBlock();
};

selectFilterListItem.forEach((item) => {
    item.addEventListener('change', renderFilter);
});

removeFilterButton.addEventListener('click', removeFilter);

clearFiltersBtn.addEventListener('click', () => {
    actualFilters = [];

    bikeCategoryButtons.forEach((button) => {
        button.classList.remove('bicycle-category--active');
    });
    clearFilters();
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


//close by body 

main.addEventListener('click', (e) => {
    const currentItem = e.target;
    
    if(currentItem.contains(sortingInput) && currentItem !== sortingInput) {
        sortingList.classList.remove('sorting-list--active');
        sortingInput.classList.remove('sorting-input--active');
    }

    selectFilterInput.forEach((item, index) => {
        if(currentItem.contains(item) && currentItem !== item) {
            item.classList.remove('filter-input--active');
            selectFilterList[index].classList.remove('filters-list--active');
        }
    });
})
