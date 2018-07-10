import { Domicilio } from "./domicilio.model";

export class Cliente {
    constructor(
        public razonSocial: string,
        public domicilio: Domicilio,
        public cuit: number,
        public saldo: number,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
