import { Articulo } from '../modelos/articulo.model';

export interface ArticuloResponse{
    ok: boolean,
    mensaje: string,
    articulo?: Articulo,
    articulos?: Articulo[],
    total?: number
}