import { Domicilio } from "./domicilio.model";

export class Cliente {
    constructor(
        public razonSocial: string,
        public cuit: number,
        public saldo: number,
        public domicilio?: Domicilio,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
