'use strict';

import printShoppingCart from './shoppingcart.js';

const productContainer = document.getElementById('lista-productos');

const showData = fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      let div = document.createElement('div');
      div.classList.add('card_container');
      div.innerHTML += `
      <div class="col-md-4 col-xs-6">
      <div class="product">
      <div class="product-img">
        <img src="${product.img}" alt="" />
        <div class="product-label">
        </div>
      </div>
      <div class="product-body">
        <p class="product-category category">${product.category}</p>
        <h3 class="product-name">
         ${product.name}
        </h3>
        <h4 class="product-price">CLP ${product.price}</h4>
        <div class="product-rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="product-btns">
          <button class="add-to-wishlist">
            <i class="fa fa-heart-o"></i
            ><span class="tooltipp">añadir a favoritos</span>
          </button>
          <button class="add-to-compare">
            <i class="fa fa-exchange"></i
            ><span class="tooltipp">comparar</span>
          </button>
          <button class="quick-view">
            <i class="fa fa-eye"></i
            ><span class="tooltipp">vista rápida</span>
          </button>
        </div>
      </div>
      <div class="add-to-cart">
        <button class="add-to-cart-btn agregar-carrito" id=product_${product.id}>
          <i class="fa fa-shopping-cart"></i>
          comprar
        </button>
      </div>
    </div>
  </div>
    `;

      productContainer.append(div);

      let button = document.getElementById(`product_${product.id}`);

      button.addEventListener('click', () => {
        printShoppingCart(product.id);
      });
    });
  });

export default showData;
