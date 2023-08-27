export function convertirNumero(numero) {
  // Convertir el número a string
  let numeroString = numero.toString();

  // Verificar si el número tiene parte decimal
  if (numeroString.includes(',')) {
    // Dividir el número en parte entera y parte decimal
    let partes = numeroString.split('.');
    
    // Formatear la parte entera
    let parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combinar la parte entera formateada con la parte decimal
    let resultado = parteEntera + '.' + partes[1];
    
    return resultado;
  } else {
    // Formatear el número entero
    let numeroFormateado = numeroString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return numeroFormateado;
  }
}
