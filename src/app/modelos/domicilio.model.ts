export class Domicilio {
    constructor(
        public direccion: string,
        public latitud: number,
        public longitud: number,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
