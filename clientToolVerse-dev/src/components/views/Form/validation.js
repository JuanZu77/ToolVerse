export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegex = /^[0-9]{10}$/;
export const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export function validateForm(firstName, lastName, email, phone, password, confirmPassword) {
  const errors = {};

  if (!firstName) {
    errors.firstName = "El nombre es obligatorio.";
  } else if (firstName.length < 2 || firstName.length > 50) {
    errors.firstName = "El nombre debe tener entre 2 y 50 caracteres.";
  } else if (!lettersOnlyRegex.test(firstName)) {
    errors.firstName = "El nombre solo debe contener letras y espacios.";
  }

  if (!lastName) {
    errors.lastName = "El apellido es obligatorio.";
  } else if (lastName.length < 2 || lastName.length > 50) {
    errors.lastName = "El apellido debe tener entre 2 y 50 caracteres.";
  } else if (!lettersOnlyRegex.test(lastName)) {
    errors.lastName = "El apellido solo debe contener letras y espacios.";
  }

  if (!/^[a-zA-Z\s]+$/.test(firstName) || !/^[a-zA-Z\s]+$/.test(lastName)) {
    errors.nameFormat = "El nombre y el apellido solo deben contener letras y espacios.";
  }

  if (!email) {
    errors.email = "El email es obligatorio.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Ingresa una dirección de correo electrónico válida.";
  }

  if (!phone) {
    errors.phone = "El número de teléfono es obligatorio.";
  } else if (!phoneRegex.test(phone)) {
    errors.phone = "Ingresa un número de teléfono válido (10 dígitos sin espacios ni caracteres especiales).";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirma tu contraseña.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden. Por favor, asegúrate de que las contraseñas sean iguales.";
  }

  return errors;
}
