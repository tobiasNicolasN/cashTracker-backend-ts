export interface IDolar {
    compra : number,
    venta : number,
    casa : string,
    nombre : string,
    moneda : string,
    fechaActualizacion : string
}

export interface IDolarHistory {
    casa: string,
    compra: number,
    venta: number,
    fecha: string
}

export enum DolarType {
    OFICIAL_COMPRA = "oficial-compra",
    OFICIAL_VENTA = "oficial-venta",
    BLUE_COMPRA = "blue-compra",
    BLUE_VENTA = "blue-venta",
    MEP_COMPRA = "bolsa-compra",
    MEP_VENTA = "bolsa-venta",
    CCL_COMPRA = "contadoconliqui-compra",
    CCL_VENTA = "contadoconliqui-venta",
    TARJETA_COMPRA = "tarjeta-compra",
    TARJETA_VENTA = "tarjeta-venta",
    MAYORISTA_COMPRA = "mayorista-compra",
    MAYORISTA_VENTA = "mayorista-venta",
    CRIPTO_COMPRA = "cripto-compra",
    CRIPTO_VENTA = "cripto-venta",
}
