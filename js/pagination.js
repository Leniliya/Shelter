import { data } from './pets.js';

const Array = getFullArr();
const pagination = document.querySelector('.pagination');
const firstPageButton = document.querySelector('.first-page-button');
const prevPageButton = document.querySelector('.prev-page-button');
const currPageButton = document.querySelector('.curr-page-button');
const nextPageButton = document.querySelector('.next-page-button');
const lastPageButton = document.querySelector('.last-page-button');
let numOfCards;
let currPageNum = +(currPageButton.innerHTML);
let firstIndex;
let lastIndex;

if (window.innerWidth > 1229) {
  numOfCards = 8;
  showFirstPage()
} else if (window.innerWidth > 698) {
  numOfCards = 6;
  showFirstPage()
} else {
  numOfCards = 3;
  showFirstPage()
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 1229) {
    numOfCards = 8;
    let page = +(currPageButton.innerHTML);
    if (page === 1) {
      showFirstPage();
    } else if ((page === (Array.length / numOfCards)) || (page > (Array.length / numOfCards))) {
      showLastPage();
    } else {
      setAll()
      lastIndex = page * numOfCards;
      firstIndex = lastIndex - numOfCards;
      createPage(Array.slice(firstIndex, lastIndex))
    }
  } else if (window.innerWidth > 698) {
    numOfCards = 6;
    let page = +(currPageButton.innerHTML);
    if (page === 1) {
      showFirstPage();
    } else if ((page === (Array.length / numOfCards)) || (page > (Array.length / numOfCards))) {
      showLastPage();
    } else {
      setAll()
      lastIndex = page * numOfCards;
      firstIndex = lastIndex - numOfCards;
      createPage(Array.slice(firstIndex, lastIndex));
    }
  } else {
    numOfCards = 3;
    let page = +(currPageButton.innerHTML);
    if (page === 1) {
      showFirstPage();
    } else if (page === (Array.length / numOfCards)) {
      showLastPage();
    } else {
      setAll()
      lastIndex = page * numOfCards;
      firstIndex = lastIndex - numOfCards;
      createPage(Array.slice(firstIndex, lastIndex));
    }
  }
})

function setAll() {
  nextPageButton.classList.remove('pagination__controls_inactive');
  lastPageButton.classList.remove('pagination__controls_inactive');
  firstPageButton.classList.remove('pagination__controls_inactive');
  prevPageButton.classList.remove('pagination__controls_inactive');
  nextPageButton.addEventListener('click', showNextPage);
  lastPageButton.addEventListener('click', showLastPage);
  prevPageButton.addEventListener('click', showPrevPage);
  firstPageButton.addEventListener('click', showFirstPage);
}

function getRandomArr() {
  let newArr = [];

  function isNumInArr(num) {
    for (let i = 0; i < newArr.length; i++) {
      if (num === newArr[i]) {
        return true
      }
    }
  }

  while (newArr.length < 8) {
    let num = getRandomNum();
    if (!isNumInArr(num)) {
      newArr.push(num)
    }
  }
  return newArr
}

function getFullArr() {
  let fullArr = [];

  function isSuitArr(arr) {
    let testArr = fullArr.concat(arr).join('');
    let j = 0;
    let i = 6;
    while (i < testArr.length) {
      let str = testArr.substring(j, i)
      let set = new Set(str.split(''))
      if (str.length !== set.size) {
        return false
      }
      j += 6;
      i += 6;
    }
    return true
  }

  while (fullArr.length < 48) {
    let arr = getRandomArr();
    if (isSuitArr(arr)) {
      fullArr = fullArr.concat(arr)
    }
  }

  return fullArr
}

function getRandomNum() {
  return (Math.floor(Math.random() * 8));
}

function getPetCard(num) {
  let card = `<div class="slider__card card">
    <img class="card__image" alt="${data[num].type}" src="${data[num].img}">
    <div class="card__title">${data[num].name}</div>
    <button class="card__button button">Learn more</button>
    </div>`

  pagination.insertAdjacentHTML('beforeend', card)
}

function createPage(arr) {
  pagination.innerHTML = '';
  for (let i of arr) {
    getPetCard(i)
  }
}

function createNextPage() {
  firstIndex += numOfCards;
  lastIndex += numOfCards;
  createPage(Array.slice(firstIndex, lastIndex))
}

function createPrevPage() {
  firstIndex -= numOfCards;
  lastIndex -= numOfCards;
  createPage(Array.slice(firstIndex, lastIndex))
}

function disableNextButtons() {
  nextPageButton.classList.add('pagination__controls_inactive');
  lastPageButton.classList.add('pagination__controls_inactive');
}

function disablePrevButtons() {
  firstPageButton.classList.add('pagination__controls_inactive');
  prevPageButton.classList.add('pagination__controls_inactive');
}

function enableNextButtons() {
  nextPageButton.classList.remove('pagination__controls_inactive');
  lastPageButton.classList.remove('pagination__controls_inactive');
}

function enablePrevButtons() {
  firstPageButton.classList.remove('pagination__controls_inactive');
  prevPageButton.classList.remove('pagination__controls_inactive');
}

function showNextPage() {
  createNextPage()
  currPageNum += 1;
  currPageButton.innerHTML = currPageNum;
  if (currPageNum == 2) {
    enablePrevButtons();
    prevPageButton.addEventListener('click', showPrevPage);
    firstPageButton.addEventListener('click', showFirstPage);
  }
  if (currPageNum == (Array.length / numOfCards)) {
    disableNextButtons();
    nextPageButton.removeEventListener('click', showNextPage);
    lastPageButton.removeEventListener('click', showLastPage)
  }
}

function showPrevPage() {
  createPrevPage();
  currPageNum -= 1;
  currPageButton.innerHTML = currPageNum;
  if ((currPageNum + 1) == (Array.length / numOfCards)) {
    enableNextButtons()
    nextPageButton.addEventListener('click', showNextPage);
    lastPageButton.addEventListener('click', showLastPage);
  }
  if (currPageNum == 1) {
    disablePrevButtons()
    prevPageButton.removeEventListener('click', showPrevPage);
    firstPageButton.removeEventListener('click', showFirstPage);
  }
}

function showLastPage() {
  currPageNum = (Array.length / numOfCards);
  firstIndex = (Array.length - numOfCards);
  lastIndex = Array.length;
  currPageButton.innerHTML = currPageNum;
  createPage(Array.slice(firstIndex, lastIndex));
  disableNextButtons();
  enablePrevButtons()
  nextPageButton.removeEventListener('click', showNextPage);
  lastPageButton.removeEventListener('click', showLastPage);
  prevPageButton.addEventListener('click', showPrevPage);
  firstPageButton.addEventListener('click', showFirstPage);
}

function showFirstPage() {
  currPageNum = 1;
  firstIndex = 0;
  lastIndex = numOfCards;
  currPageButton.innerHTML = currPageNum;
  createPage(Array.slice(firstIndex, lastIndex));
  disablePrevButtons()
  enableNextButtons()
  prevPageButton.removeEventListener('click', showPrevPage);
  firstPageButton.removeEventListener('click', showFirstPage);
  nextPageButton.addEventListener('click', showNextPage);
  lastPageButton.addEventListener('click', showLastPage);
}

nextPageButton.addEventListener('click', showNextPage);
prevPageButton.addEventListener('click', showPrevPage);
lastPageButton.addEventListener('click', showLastPage);
firstPageButton.addEventListener('click', showFirstPage);
