import { Pedido } from '../modelos/pedido.model';

export interface PedidoResponse{
    ok: boolean,
    mensaje: string,
    pedido?: Pedido,
    pedidos?: Pedido[],
    total?: number
}