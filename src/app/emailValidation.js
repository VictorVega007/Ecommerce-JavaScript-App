'use strict';

// Función para validar mediante regular expression el valor del input email
export default function isEmailValid(email) {
  const reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return reg.test(email);
}