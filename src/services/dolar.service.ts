import { IDolar, IDolarHistory } from "../interfaces/dolar.interface";
import axios from "axios";

const DOLAR_NOW_API_URL = "https://dolarapi.com/v1/dolares"; // Base para buscar el valor de un dolar en especifico en este momento
const DOLLAR_HISTORY_API_URL =
  "https://api.argentinadatos.com/v1/cotizaciones/dolares"; // Todos los valores del dolar registrados desde 2011

/** Crea una instancia de Axios con una URL base predeterminada */
export const instanceDolarNow = axios.create({
  baseURL: DOLAR_NOW_API_URL,
});

export const dolar = {
  getCurrentDollarValue: async (usd: string): Promise<IDolar> => {
    const response = await instanceDolarNow.get(usd);
    return response.data as IDolar;
  },
  getDollarHistoryValue: async (
    usd: string,
    date: Date
  ): Promise<IDolarHistory> => {
    const response = await axios.get(DOLLAR_HISTORY_API_URL, {
      timeout: 10000,
    });
    const data: IDolarHistory[] = response.data;

    const isoDate = date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const casa = usd.split("-")[0];

    const dollarValue = data.filter(
      (dollar) => dollar.fecha === isoDate && dollar.casa === casa
    );
    
    return dollarValue[0];
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
  usd: string,
  date?: Date
): Promise<number | null> => {
  if (!usd) {
    console.error("No se encontró el tipo de dólar:", usd);
    return null;
  }

  const usdArray: string[] = usd.split("-");

  try {
    const dolarValue: IDolar | IDolarHistory = !date
      ? await dolar.getCurrentDollarValue(usdArray[0])
      : await dolar.getDollarHistoryValue(usd, date);

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
