'use strict';

import { PRODUCTS } from './products.js';
import showProducts from './showProducts.js';
import searchProduct from './searchProduct.js';

document.addEventListener('DOMContentLoaded', () => {
  showProducts(PRODUCTS);
  searchProduct('.search', '.card_container');
});
/*
let data = {
  service_id: 'service_igd67jl',
  template_id: 'template_gp3pq6f',
  user_id: 'KJ4wkqSfv-Yt69Xqm',
  template_params: {
    username: 'Victorito',
  },
};

// emailjs.send(data.service_id, data.template_id, data.template_params, data.user_id)
//   .then((response) => {
//     console.log('Exito! ', response.status, response.text);
//   }, (error) => {
//     console.log('Error', error);
//   });
///// Realizando un POST request para usar API de EmailJS

async function postData(url = '', data) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response;
}

await postData('https://api.emailjs.com/api/v1.0/email/send', data).then(data => {
  console.log(data);
});
*/
