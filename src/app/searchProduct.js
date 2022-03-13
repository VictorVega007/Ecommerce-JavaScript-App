'use strict';
///////////// Evento para la bienvenida del usuario a la página

/////////// Modal de bienvenida

const modalClose = document.querySelector('.modal-close');
const containerGreet = document.querySelector('.greet-container');
const inputName = document.querySelector('.input-name');
const btnName = document.querySelector('.btn-name');
let modal = document.querySelector('.modal-bg-1');

const closeModal = selector => {
  if (selector.value === '') {
    let div = document.createElement('div');
    div.className = 'greetings';
    div.innerHTML = `
                <div class="col-md-12">
                  <h1>Hola! Bienvenid@ a nuestra tienda</h1>
                  <p>Puedes comprar los productos de tu preferencia</p>
                </div>
          `;
    containerGreet.appendChild(div);
    modal.classList.remove('bg-active');
  }
};

const renderModal = inputName => {
  if (inputName.value !== '') {
    let div = document.createElement('div');
    div.className = 'greetings';
    div.innerHTML = `
                <div class="col-md-12">
                  <h1 id='title'>Hola ${
  inputName.value[0].toUpperCase() + inputName.value.slice(1)
}! Bienvenid@ a nuestra tienda</h1>
                  <p>Puedes comprar los productos de tu preferencia</p>
                </div>
          `;
    containerGreet.appendChild(div);
    modal.classList.remove('bg-active');
  }
  localStorage.setItem('client', JSON.stringify(inputName.value));
};

document.addEventListener('DOMContentLoaded', function () {
  modal.classList.add('bg-active');
  getNameFromStorage(userNameStorage);
});

btnName.addEventListener('click', function () {
  renderModal(inputName);
  closeModal(inputName);
});

modalClose.addEventListener('click', function () {
  closeModal(inputName);
});

//////////// LocalStorage para el usuario inicial

let userNameStorage = [];

const getNameFromStorage = () => {
  localStorage.getItem('client');
  userNameStorage = JSON.parse(localStorage.getItem('client'));
  if (userNameStorage) {
    modal.classList.remove('bg-active');
    let div = document.createElement('div');
    div.className = 'greetings';
    div.innerHTML = `
                <div class="col-md-12">
                  <h1 id='title'>Hola ${
  userNameStorage[0].toUpperCase() + userNameStorage.slice(1)
}! Bienvenido a nuestra tienda</h1>
                  <p>Puedes comprar los productos de tu preferencia</p>
                </div>
          `;
    containerGreet.appendChild(div);
  }
};

/////////// Función para filtar los productos según categoría

export default function searchProduct(input, selector) {
  document.addEventListener('keyup', element => {
    if (element.target.matches(input)) {
      document.querySelectorAll(selector).forEach(e => {
        e.textContent.toLowerCase().includes(element.target.value)
          ? e.classList.remove('filter')
          : e.classList.add('filter');
      });
    }
  });
}
