'use strict';

import { PRODUCTS } from './products.js';
import updateShoppingCart from './updateCart.js';

const sessionCartContainer = document.getElementById('cart-checkout');
const emptySessionCartCheckout = document.getElementById('vaciar-carrito');

let sessionCart = [];

const addProductstoSessionCart = () => {
  localStorage.getItem('products');
  sessionCart = JSON.parse(localStorage.getItem('products'));
  console.log(sessionCart);
  updateShoppingCart(sessionCart);

  sessionCart.forEach(p => {
    let { name, img, id, quantity, price } = p;
    let div = document.createElement('div');
    div.classList.add('product-widget');
    div.innerHTML = `
                
                  <div class="product-img">
                      <img src="${img} " alt="" />
                  </div>
                  <div class="product-body">
                      <h3 class="product-name">
                        ${name}
                      </h3>
                      <h4 class="product-price">
                      <span id=qty${id} > ${quantity}x</span>${price}
                      </h4>
                  </div>
                  <button class="delete " id=eliminate${id}>
                      <a href="#" class="borrar-producto fa fa-close" ></a>
                  </button>
                
    `;
    sessionCartContainer.appendChild(div);

    const eliminateCheckoutProductByOne = () => {
      let eliminateButton = document.getElementById(`eliminate${id}`);
  
      eliminateButton.addEventListener('click', () => {
        eliminateButton.parentElement.remove();
        sessionCart = sessionCart.filter(e => e.id != p.id);
  
        updateShoppingCart(sessionCart);
      });
    };
    eliminateCheckoutProductByOne(sessionCart);

    const emptyAllProductsFromCart = productsToEmpty => {
      while (productsToEmpty.firstChild) {
        productsToEmpty.removeChild(productsToEmpty.firstChild);
      }
      return false;
    };
  
    emptySessionCartCheckout.addEventListener('click', () => {
      emptyAllProductsFromCart(sessionCart);
      let emptyCart = sessionCart.splice(
        0,
        sessionCart.length
      );
  
      updateShoppingCart(emptyCart);
      emptyAllProductsFromCart(sessionCartContainer);
    });
  });
};

addProductstoSessionCart(PRODUCTS);

let order = document.getElementById('order');
order.addEventListener('click', () => {
  location.href = 'checkout.html';
});