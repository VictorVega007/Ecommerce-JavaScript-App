'use strict';
import { PRODUCTS } from './products.js';
import updateShoppingCart from './updateCart.js';

///////////////////////////Función global para adherir, eliminar y repetir productos en el carrito

export default function printShoppingCart(productID) {
  const productContainer = document.getElementById('lista-carrito');
  const emptyCart = document.getElementById('vaciar-carrito');
  let repeatProduct = shoppingCart.find(product => product.id == productID);

  const addRepeatProduct = repeatProduct => {
    if (repeatProduct) {
      repeatProduct.quantity++;
      document.querySelector(`#qty${repeatProduct.id}`).innerHTML = `
      <span id=qty${repeatProduct.id} > ${repeatProduct.quantity} x </span>`;
      updateShoppingCart(shoppingCart);
    } else {
      addProductToCart(productID);
    }
  };

  const addProductToCart = productID => {
    let singleProduct = PRODUCTS.find(product => product.id == productID);
    shoppingCart.push(singleProduct);
    let { name, quantity, img, id, price } = singleProduct;

    quantity = 1;

    let row = document.createElement('div');
    row.classList.add('product-widget');
    row.innerHTML = `
                
                  <div class="product-img">
                      <img src="${img} " alt="" />
                  </div>
                  <div class="product-body">
                      <h3 class="product-name">
                        ${name}
                      </h3>
                      <h4 class="product-price">
                      <span id=qty${id} > ${quantity} x </span>${price}
                      </h4>
                  </div>
                  <button class="delete " id=eliminate${id}>
                      <a href="#" class="borrar-producto fa fa-close" ></a>
                  </button>
                
    `;
    productContainer.appendChild(row);
    updateShoppingCart(shoppingCart);
  };

  const eliminateProduct = productID => {
    let eliminateButton = document.getElementById(`eliminate${productID}`);

    eliminateButton.addEventListener('click', () => {
      eliminateButton.parentElement.remove();
      shoppingCart = shoppingCart.filter(e => e.id != productID);

      updateShoppingCart(shoppingCart);
    });
  };

  const emptyAllProductsFromCart = () => {
    while (productContainer.firstChild) {
      productContainer.removeChild(productContainer.firstChild);
    }
    return false;
  };

  emptyCart.addEventListener('click', () => {
    emptyAllProductsFromCart(shoppingCart);
    let empty = shoppingCart.splice(0, shoppingCart.length);
    updateShoppingCart(empty);
  });

  addRepeatProduct(repeatProduct);
  eliminateProduct(productID);
}

/// Función para dirigir al cliente a la página de Checkout si existen productos en el carrito

let shoppingCart = [];

const processOrder = shoppingCart => {
  if (shoppingCart.length === 0) {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Vaya!',
      confirmButtonColor: '#D10024',
      text: 'No has elegido ningún producto',
    });
  } else {
    location.href = 'checkout.html';
  }
};

let order = document.getElementById('order');
order.addEventListener('click', () => {
  processOrder(shoppingCart);
});
