import { Rubro } from "./rubro.model";

export class Articulo {
    constructor(
        public denominacion: string,
        public codigo: string,
        public precioCompra: number,
        public precioVenta: number,
        public iva: number,
        public rubro?: Rubro,
        public img?: string,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
