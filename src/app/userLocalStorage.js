'use strict';

let accountUser = document.querySelector('.account-user');

document.addEventListener('DOMContentLoaded', function() {
  localStorageUserName();
});
  
///// Guardar nombre de usuario en LocalStorage
  
let signUpUserName = [];
  
export default function localStorageUserName () {
  localStorage.getItem('user');
  signUpUserName = JSON.parse(localStorage.getItem('user'));
  if (signUpUserName) {
    return accountUser.innerText = `${signUpUserName.toUpperCase()}`;
  }
}