export class Domicilio {
    constructor(
        public calle: string,
        public numero: number,
        public localidad: string,
        public latitud: number,
        public longitud: number,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
