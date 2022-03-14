'use strict';
import isEmailValid from './emailValidation.js';
import localStorageUserName from './userLocalStorage.js';

const userName = document.querySelector('.input-user');
const userPassword = document.querySelector('.input-password');
const signUpBtn = document.querySelector('#signup-btn');
const formUser = document.querySelector('#form-user');


///// Función para extraer nombre de usuario para la cuenta
function getNameUser (userName) {
  const analizedEmail = /^([^]+)@(\w+).(\w+)$/.exec(userName);
  console.log(analizedEmail);
  
  const [, name, ,] = analizedEmail;
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
} 

///// Evento para validar la creación de la cuenta de usuario
signUpBtn.addEventListener('click', function(e){
  e.preventDefault();
  localStorage.setItem('user', JSON.stringify(getNameUser(userName.value)));

  if (userName.value.trim() == '' || userPassword.value.trim() == '') {
    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'error',
      iconColor: '#D10024',
      color: '#15161D',
      title: 'Oops!',
      confirmButtonColor: '#D10024',
      text: 'Por favor rellene las casilla de correo y contraseña',
    });
  } else if(isEmailValid(userName.value.trim()) && 
    userPassword.value.trim().length > 5 || 
    userPassword.value.trim().length < 8) {

    // eslint-disable-next-line no-undef
    Swal.fire({
      icon: 'success',
      color: '#15161D',
      title: 'Felicidades!',
      confirmButtonColor: '#D10024',
      text: `${getNameUser(userName.value)} has creado tu cuenta con éxito`,
    });
  }
  formUser.reset();
  localStorageUserName();
});

