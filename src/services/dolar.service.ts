import { IDolar } from "../interfaces/dolar.interface";
import axios from "axios";

const BASE_URL = "https://dolarapi.com/v1/dolares";

/** Crea una instancia de Axios con una URL base predeterminada */
export const instance = axios.create({
  baseURL: BASE_URL,
});

export const dolar = {
  getDolarValue: async (usd: string): Promise<IDolar> => {
    const response = await instance.get(usd);
    return response.data as IDolar;
  },
};

/**
 * Utiliza DolarApi.com en tiempo real para setear el valor en USD
 * @param amount El monto a ser transformado a USD
 * @param usd Recibe el tipo de dolar "blue-compra"
 * @returns El monto en USD
 */

export const calculateUSD = async (
  amount: number,
  usd: string
): Promise<number | null> => {
  if (!usd) {
    console.error("No se encontró el tipo de dólar:", usd);
    return null;
  }

  const usdArray: string[] = usd.split("-");

  try {
    const dolarValue: IDolar = await dolar.getDolarValue(usdArray[0]);

    let amountUSD: number;

    usdArray[1] === "compra"
      ? (amountUSD = amount / dolarValue.compra)
      : (amountUSD = amount / dolarValue.venta);

    amountUSD = parseFloat(amountUSD.toFixed(2));

    return amountUSD;
  } catch (error) {
    console.error("Error al calcular el monto en dólares:", error);
    return null;
  }
};
