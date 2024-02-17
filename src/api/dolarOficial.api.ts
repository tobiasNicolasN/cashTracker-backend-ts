import { IDolar } from "../interfaces/dolar.interface";
import { instance } from "./base.api";

const endpoint = "oficial";

export const dolar = {
  getDolarValue: async (): Promise<IDolar> => {
    const response = await instance.get(endpoint);
    return response.data as IDolar;
  },
};

/**
 * Utiliza API del dolar en tiempo real para setear el valor en USD
 * @param amount El monto a ser transformado a USD
 * @returns El monto en USD
 */
export const calculateUSD = async (amount: number): Promise<number | null> => {
  try {
    const dolarValue: IDolar = await dolar.getDolarValue();

    let amountUSD: number = amount / dolarValue.compra;

    amountUSD = parseFloat(amountUSD.toFixed(2));

    return amountUSD;
  } catch (error) {
    console.error("Error al calcular el monto en dólares:", error);
    return null;
  }
};
