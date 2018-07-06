export class Rubro {
    constructor(
        public codigo: string,
        public denominacion: string,
        public padre?: Rubro,
        public fechaAlta?: string,
        public fechaBaja?: string,
        public _id?: string
    ) {}
}
