'use strict';

let shoppingCartCounter = document.getElementById('cart-counter');
let productsQuantity = document.getElementById('products-quantity');
let totalPrice = document.getElementById('total-price');

/// Función para actualizar carrito
export default function updateShoppingCart(shoppingCart) {
  const counter = productsCounter => {
    productsCounter.innerText = shoppingCart.reduce(
      (acc, el) => acc + el.quantity,
      0
    );
  };

  counter(shoppingCartCounter);
  counter(productsQuantity);

  totalPrice.innerText = shoppingCart.reduce(
    (acc, el) => acc + el.quantity * el.price,
    0
  );

  localStorage.setItem('products', JSON.stringify(shoppingCart));
}
