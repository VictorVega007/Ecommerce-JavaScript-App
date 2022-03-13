'use strict';

import { PRODUCTS } from './products.js';
import showProducts from './showProducts.js';
import searchProduct from './searchProduct.js';

document.addEventListener('DOMContentLoaded', () => {
  showProducts(PRODUCTS);
  searchProduct('.search', '.card_container');
});