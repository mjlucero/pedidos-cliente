import { Usuario } from '../modelos/usuario.model';

export interface UsuarioRespose{
    ok: boolean,
    mensaje: string,
    usuario?: Usuario,
    usuarios?: Usuario[],
    total?: number,
    token?: string,
    id?: string
}