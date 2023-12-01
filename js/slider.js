import { data } from './pets.js';

const leftControl = document.querySelector('.left-control');
const rightControl = document.querySelector('.right-control');
const sliderLine = document.querySelector('.slider__line');
const prevSet = document.querySelector('.slider__prevSet');
const currSet = document.querySelector('.slider__currSet');
const nextSet = document.querySelector('.slider__nextSet');
let currSetNum = getRandomSetNum();
let prevSetNum = getRandomSetNum(currSetNum);
let nextSetNum = getRandomSetNum(currSetNum);


function getPetCard(elem, num) {
  let card = `<div class="slider__card card">
    <img class="card__image" alt="${data[num].type}" src="${data[num].img}">
    <div class="card__title">${data[num].name}</div>
    <button class="card__button button">Learn more</button>
    </div>`

  elem.insertAdjacentHTML('beforeend', card)
}

function getRandomSetNum(arr) {
  let newArr = [];
  if (!arr) {
    arr = new Array(3)
  }
  function isNumInArr(num) {
    for (let i = 0; i < arr.length; i++) {
      if ((num === newArr[i]) || (num === arr[i])) {
        return true
      }
    }
  }

  while (newArr.length < 3) {
    let num = getRandomNum()
    if (!isNumInArr(num)) {
      newArr.push(num)
    }
  }
  return newArr
}

function getRandomNum() {
  return (Math.floor(Math.random() * 8));
}

function createSlider() {
  createSet(currSet, currSetNum);
  createSet(prevSet, prevSetNum);
  createSet(nextSet, nextSetNum);
}

createSlider()

function createSet(set, arr) {
  set.innerHTML = '';
  for (let i in arr) {
    getPetCard(set, arr[i])
  }
}


function moveSliderLeft() {
  nextSetNum = currSetNum;
  currSetNum = prevSetNum;
  prevSetNum = getRandomSetNum(currSetNum);
  createSlider()
}

function moveSliderRight() {
  prevSetNum = currSetNum;
  currSetNum = nextSetNum;
  nextSetNum = getRandomSetNum(currSetNum);
  createSlider()
}

//slider animation

function moveLeft() {
  sliderLine.classList.add('transition-left');
  leftControl.removeEventListener('click', moveLeft);
  rightControl.removeEventListener('click', moveRight);
}

function moveRight() {
  sliderLine.classList.add('transition-right');
  leftControl.removeEventListener('click', moveLeft);
  rightControl.removeEventListener('click', moveRight);
}

leftControl.addEventListener('click', moveLeft);
rightControl.addEventListener('click', moveRight);

sliderLine.addEventListener('animationend', (event) => {
  if (event.animationName === 'move-left') {
    moveSliderLeft()
  } else {
    moveSliderRight()
  }
  sliderLine.classList.remove('transition-left');
  sliderLine.classList.remove('transition-right');
  leftControl.addEventListener('click', moveLeft);
  rightControl.addEventListener('click', moveRight);
})
