import { Rubro } from "../modelos/rubro.model";

export interface RubroRespose{
    ok: boolean,
    mensaje: string,
    rubro?: Rubro,
    rubros?: Rubro[],
    total?: number
}