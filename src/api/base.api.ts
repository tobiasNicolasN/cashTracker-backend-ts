import axios from "axios";

const BASE_URL = "https://dolarapi.com/v1/dolares";

/**
 * Crea una instancia de Axios con una URL base predeterminada
 */

export const instance = axios.create({
  baseURL: BASE_URL,
});
