import { Articulo } from "./articulo.model";
import { Cliente } from './cliente.model';
import { Domicilio } from './domicilio.model';

export class Pedido {
    constructor(
        public detalles: Detalle[],
        public cliente: Cliente,
        public fechaEntregaEstimada: string,
        public domicilio: Domicilio,
        public gastoEnvio: number,
        public estado: string,
        public entregado: boolean,
        public fechaPedido: string,
        public numero: number,
        public subtotal: number,
        public total: number,
        public migrado: boolean,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}

class Detalle{
    constructor(
        public articulo: Articulo,
        public cantidad: number,
        public descuento: number,
        public subtotal: number,
    ) {}
}
