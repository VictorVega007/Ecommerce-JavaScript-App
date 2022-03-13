'use strict';

import { PRODUCTS } from './products.js';
import updateShoppingCart from './updateCart.js';

const checkoutCartContainer = document.getElementById('cart-checkout');
const emptyCartCheckout = document.getElementById('vaciar-carrito');
const totalOrder = document.getElementById('total-order');
let OrderTotalPrice = document.getElementById('total');

// Función para mostrar los productos en el carrito de la página de checkout de acuerdo a los productos guardados en el LocalStorage
let productsCheckoutCart = [];

const addProductstoCheckoutCart = () => {
  localStorage.getItem('products');
  productsCheckoutCart = JSON.parse(localStorage.getItem('products'));
  console.log(productsCheckoutCart);
  updateShoppingCart(productsCheckoutCart);

  productsCheckoutCart.forEach(p => {
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
    checkoutCartContainer.appendChild(div);

    const eliminateCheckoutProductByOne = () => {
      let eliminateButton = document.getElementById(`eliminate${id}`);

      eliminateButton.addEventListener('click', () => {
        eliminateButton.parentElement.remove();
        productsCheckoutCart = productsCheckoutCart.filter(e => e.id != p.id);

        updateShoppingCart(productsCheckoutCart);
      });
    };
    eliminateCheckoutProductByOne(productsCheckoutCart);

    //////////////////
    const emptyAllProductsFromCart = productsToEmpty => {
      while (productsToEmpty.firstChild) {
        productsToEmpty.removeChild(productsToEmpty.firstChild);
      }
      return false;
    };

    emptyCartCheckout.addEventListener('click', () => {
      emptyAllProductsFromCart(productsCheckoutCart);
      let emptyCart = productsCheckoutCart.splice(
        0,
        productsCheckoutCart.length
      );

      OrderTotalPrice.innerText = 0;

      updateShoppingCart(emptyCart);
      emptyAllProductsFromCart(checkoutCartContainer);
      emptyAllProductsFromCart(totalOrder);
    });
  });

  // función para mostrar resumen de orden

  const addOrderSummary = array => {
    array.forEach(product => {
      let { name, quantity, price, id } = product;
      let total = price * quantity;
      let divOrder = document.createElement('div');
      divOrder.classList.add('order-col');
      divOrder.innerHTML = `
      <div id= product-${id}> ${quantity} x ${name} </div>
      <div id= total-${id}> ${total} </div>
`;
      totalOrder.appendChild(divOrder);

      const renderTotalPrice = array => {
        OrderTotalPrice.innerText = array.reduce(
          (acc, el) => acc + el.quantity * el.price,
          0
        );
      };
      renderTotalPrice(productsCheckoutCart);

      let eliminateButton = document.getElementById(`eliminate${id}`);
      eliminateButton.addEventListener('click', () => {
        totalOrder.removeChild(divOrder);
        renderTotalPrice(productsCheckoutCart);
      });

      updateShoppingCart(productsCheckoutCart);
    });
  };

  addOrderSummary(productsCheckoutCart);
};

addProductstoCheckoutCart(PRODUCTS);
