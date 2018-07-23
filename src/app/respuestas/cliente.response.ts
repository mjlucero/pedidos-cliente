import { Cliente } from '../modelos/cliente.model';

export interface ClienteResponse{
    ok: boolean,
    mensaje: string,
    cliente?: Cliente,
    clientes?: Cliente[],
    total?: number
}