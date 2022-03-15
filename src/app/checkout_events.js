'use strict';
import isEmailValid from './emailValidation.js';

////////////// Agregando eventos y manipulación del DOM
///// Validación del form para la página de checkout

const form = document.getElementById('form');
const btnSubmit = document.getElementById('btn-submit');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const textInput = document.querySelectorAll('.value-text');
const telf = document.querySelector('#telf');
const checkbox = document.querySelector('#create-account');
const password = document.querySelector('#password');

// Evento submit para enviar formulario
/*form.addEventListener('submit', function (event) {
  validateForm();

  isFormValid() == true ? form.submit() : event.preventDefault();
});*/

btnSubmit.addEventListener('click', function (event) {
  validateForm();

  isFormValid() == true ? 
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'success',
      color: '#15161D',
      title: 'Registro exitoso!',
      confirmButtonColor: '#D10024',
      text: 'Sus datos han sido registrados',
    })
    : event.preventDefault();
});

// Dunción para verificar que los datos ingresados son válidos para el envío de formulario
function isFormValid() {
  const inputContainers = form.querySelectorAll('.form-group');
  let result = true;

  inputContainers.forEach(container => {
    if (container.classList.contains('error')) {
      result = false;
    }
  });

  return result;
}

// Función para validación de cada uno de los inputs del formulario
function validateForm() {
  // First Name
  if (firstName.value.trim() == '') {
    setError(firstName, 'Name can not be empty');
  } else if (
    firstName.value.trim().length < 5 ||
    firstName.value.trim().length > 15
  ) {
    setError(firstName, 'Name must be min 5 and max 15 characters');
  } else {
    setSuccess(firstName);
  }

  // Last Name
  if (lastName.value.trim() == '') {
    setError(lastName, 'Last Name can not be empty');
  } else if (
    lastName.value.trim().length < 5 ||
    lastName.value.trim().length > 15
  ) {
    setError(lastName, 'Last Name must be min 5 and max 15 characters');
  } else {
    setSuccess(lastName);
  }

  // Email
  if (emailInput.value.trim() == '') {
    setError(emailInput, 'Provide an email address');
  } else if (isEmailValid(emailInput.value)) {
    setSuccess(emailInput);
  } else {
    setError(emailInput, 'Provide a valid email address');
  }

  // Dirección, Ciudad, País y Código Postal

  textInput.forEach(element => {
    if (element.value.trim() == '') {
      setError(element, `El dato de su ${element.id} no puede estar vacío`);
    } else if (element.value.trim().length < 5) {
      setError(element, `Por favor provea un dato de ${element.id} válida`);
    } else {
      setSuccess(element);
    }
  });

  // Telf
  if (telf.value.trim() != parseInt(telf.value.trim())) {
    setError(telf, 'Coloque un número válido');
  } else if (telf.value.trim() < 2) {
    setError(telf, 'El teléfono deber ser mímino de 8 caracteres');
  } else {
    setSuccess(telf);
  }

  // Checkbox
  checkbox.addEventListener('change', validaCheckbox());
  function validaCheckbox() {
    let checked = checkbox.checked;
    if (checked) {
      if (password.value.trim() == '') {
        // Password
        setError(password, 'Pasword can not be empty');
      } else if (
        password.value.trim().length < 6 ||
        password.value.trim().length > 12
      ) {
        setError(password, 'Password min 6 and max 12 characters');
      } else {
        setSuccess(password);
      }
    }
  }
}

// Función para agregar los estilos en cada input en caso de que algún valor sea incorrecto y arrojar un error en el formulario
function setError(element, errorMessage) {
  const parent = element.parentElement;
  if (parent.classList.contains('success')) {
    parent.classList.remove('success');
  }
  parent.classList.add('error');

  const paragraph = parent.querySelector('p');
  paragraph.textContent = errorMessage;
}

// Función para agregar estilos de formulario válido
function setSuccess(element) {
  const parent = element.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
}

//////// Parte del botón de compra

const checkoutForm = document.getElementById('order-submit');
const ccName = document.getElementById('cc-name');
const ccNumber = document.getElementById('cc-number');
const ccExpiration = document.getElementById('cc-expiration');
const ccCode = document.getElementById('cc-cvv');
const terms = document.getElementById('terms');

checkoutForm.addEventListener('click', function(e) {
  let hasError = false;
  let radius = document.querySelector('input[name="payment"]:checked');

  if(!radius) {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Oops!',
      confirmButtonColor: '#D10024',
      text: 'Por favor coloque los datos de su tarjeta',
    });
    hasError = true;
  }
  
  if (radius) {
    if (ccName.value.trim() == '' || ccExpiration.value.trim() == '') { 
      setError(ccName, 'Coloque un nombre');
      setError(ccExpiration, 'Coloque la fecha de vencimiento');
      hasError = true;
    } else if (ccName.value.trim() != '') {
      setSuccess(ccName);
      setSuccess(ccExpiration);    } 
  }
    
  if (radius) {
    if (ccNumber.value.trim() != parseInt(ccNumber.value.trim()) ||
    ccCode.value.trim() != parseInt(ccCode.value.trim())) {
      setError(ccNumber, 'Coloque un número');
      setError(ccCode, 'Coloque el código de seguridad');
      hasError = true;
    } else {
      setSuccess(ccNumber);
      setSuccess(ccCode);
    }
  }
  
  if (!terms.checked){
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Oops!',
      confirmButtonColor: '#D10024',
      text: 'Por favor acepte la casilla de condiciones',
    });
    hasError = true;
  }
  
  if (!hasError) {
    
    
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'success',
      color: '#15161D',
      timer: 5000,
      showConfirmButton: true,
      title: 'Tu compra se realizo con éxito!',
      confirmButtonColor: '#D10024',
      text: 'Sus productos ya están en camino',
      
    });

    localStorage.clear();
    
    
  }
 
  if(hasError) e.preventDefault();
 
  
  checkoutForm.reset();
  
});