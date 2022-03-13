'use strict';
import isEmailValid from './emailValidation.js';

///// Realizando un POST request para usar API de EmailJS

let newsletter = document.querySelector('.newsletter-btn');
let emailNewsletter = document.querySelector('.newsletter-email');

let data = {
  service_id: 'service_igd67jl',
  template_id: 'template_gp3pq6f',
  user_id: 'KJ4wkqSfv-Yt69Xqm',
  template_params: {
    username: 'Victorito',
  },
};

async function postData(url = '', data) { 
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),           
  });
  return response;
}

newsletter.addEventListener('click', function (e) {
  e.preventDefault();
  if (emailNewsletter.value.trim() == '' ) {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Oops!',
      confirmButtonColor: '#D10024',
      text: 'La casilla de correo eletrónico no puede estar vacía',
    });
  } else if (isEmailValid(emailNewsletter.value.trim())) {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'success',
      color: '#15161D',
      title: 'Felicidades!',
      confirmButtonColor: '#D10024',
      text: 'Te has suscrito a nuestro Newsletter!',
    });
    postData('https://api.emailjs.com/api/v1.0/email/send', data)
      .then(data => {    
        console.log(data); 
      });
  } else {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Oops!',
      confirmButtonColor: '#D10024',
      text: 'Por favor coloca una dirección de correo válida',
    });
  }
  
});