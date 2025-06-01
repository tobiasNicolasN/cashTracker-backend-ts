import Users from "../models/user.model";

/** Retorna la moneda de cambio seleccionada por el usuario en su cuenta
 * @param uid - User ID
 */
export const getExchange = async (uid: string): Promise<string | undefined> => {
  const user = await Users.findById({ _id: uid });

  if (!user) {
    console.error("[expenses.getExchange] No se encontro el usuario.");
    return undefined;
  }

  const exchange = user.exchange;

  if (!exchange) {
    console.error(
      "[expenses.getExchange] No se encontro la moneda de cambio selecciona por el usuario."
    );
    return undefined;
  }

  return exchange;
};
