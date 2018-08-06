import { Domicilio } from '../modelos/domicilio.model';

export interface DomicilioResponse{
    ok: boolean,
    mensaje: string,
    domicilio?: Domicilio,
    domicilios?: Domicilio[],
    total?: number
}