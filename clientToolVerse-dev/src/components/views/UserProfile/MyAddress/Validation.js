const zipCodeRegex = /^[0-9]+$/;
const addressRegex = /^[a-zA-Z0-9\s]+$/;
const countryRegex = /^[a-zA-Z\s]+$/;

export function validateForm(country, state, city, address, postalCode) {
  let error = "";

  if (!country || !state || !city || !address || !postalCode) {
    error =
      "Todos los campos son obligatorios. Por favor, completa todos los campos.";
  } else if (country.length < 2 || country.length > 50) {
    error = "El país debe tener entre 2 y 50 caracteres.";
  } else if (state.length < 2 || state.length > 50) {
    error = "El estado debe tener entre 2 y 50 caracteres.";
  } else if (city.length < 2 || city.length > 50) {
    error = "La ciudad debe tener entre 2 y 50 caracteres.";
  } else if (
    !countryRegex.test(country) ||
    !countryRegex.test(state) ||
    !countryRegex.test(city)
  ) {
    error = "País, ciudad y estado solo deben contener letras y espacios.";
  } else if (!zipCodeRegex.test(postalCode)) {
    error = "Ingresa solo números para el código postal";
  } else if (!addressRegex.test(address)) {
    error = "Ingresa solo letras y números para la dirección.";
  }

  return error;
}
