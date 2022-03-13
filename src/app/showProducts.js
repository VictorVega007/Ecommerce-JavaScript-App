'use strict';
import printShoppingCart from './shoppingcart.js';
import updateShoppingCart from './updateCart.js';
import showData from './showData.js';

//const productContainer = document.getElementById('lista-productos');

let productsLocalStorage = [];

export default function showProducts() {
  if (localStorage.getItem('products')) {
    productsLocalStorage = JSON.parse(localStorage.getItem('products'));
    productsLocalStorage.forEach(p => {
      printShoppingCart(p.id);
      let quantity = document.getElementById(`qty${p.id}`);
      quantity.innerHTML = `<span id=qty${p.id} > ${p.quantity}x</span>`;
      updateShoppingCart(productsLocalStorage);
    });
  }

  return showData;
}
