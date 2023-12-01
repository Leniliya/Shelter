import { data } from './pets.js';

const popupBackground = document.querySelector('.popup__background');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupBox = document.querySelector('.popup-box');
const body = document.querySelector('body');

function createPopup(name) {
  let num;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      num = i;
    }
  }
  let card = `<div class="popup__content">
    <img src="${data[num].img}" alt="${data[num].type}" class="popup__img">
    <div class="popup__text-content">
      <div class="popup__title">${data[num].name}</div>
      <div class="popup__subtitle">${data[num].type} - ${data[num].breed}</div>
      <div class="popup__description">${data[num].description}</div>
      <ul class="popup__detail-list">
        <li class="popup__detail-item"><span class="popup__detail-title">Age:</span> ${data[num].age}</li>
        <li class="popup__detail-item"><span class="popup__detail-title">Inoculations:</span> ${data[num].inoculations}</li>
        <li class="popup__detail-item"><span class="popup__detail-title">Diseases:</span> ${data[num].diseases}</li>
        <li class="popup__detail-item"><span class="popup__detail-title">Parasites:</span> ${data[num].parasites}</li>
      </ul>
    </div>
  </div>`;
  popup.innerHTML = card;
}

function showPopup(name) {
  createPopup(name);
  body.classList.add('lock');
  popupBackground.classList.remove('popup__hidden');
}

function closePopup() {
  body.classList.remove('lock');
  popupBackground.classList.add('popup__hidden');
}

popupCloseButton.addEventListener('click', () => {
  closePopup();
})

popupBackground.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__background')) {
    closePopup()
  }
})

popupBox.addEventListener('click', (event) => {
  if (event.target.closest('.card')) {
    showPopup(event.target.closest('.card').children[1].innerText)
  }
})
