import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { BASE_URL } from '../../config/config';
import { ClienteResponse } from '../../respuestas/cliente.response';
import { Cliente } from '../../modelos/cliente.model';

@Injectable()
export class ClienteService {

  token: string;

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) { 
    this.token = this._usuarioService.token;
  }

  getClientes( desde:number= 0){
    let url = BASE_URL + '/clientes?desde=' + desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<ClienteResponse>(url, { headers });
  }

  getCliente( id:string ){
    let url = BASE_URL + '/cliente/'+ id;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<ClienteResponse>(url, { headers });
  }

  buscarClientes( termino: string, desde: number= 0 ){
    let url = BASE_URL+ '/busqueda/clientes/'+ termino + '?desde='+ desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<ClienteResponse>( url,{ headers } );
  }

  createCliente( cliente:Cliente ){
    let url = BASE_URL+ '/cliente';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.post<ClienteResponse>( url, cliente, { headers } );
  }

  updateCliente( cliente:Cliente ){
    let url = BASE_URL+ '/cliente';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.put<ClienteResponse>( url, cliente, { headers } );
  }

}
