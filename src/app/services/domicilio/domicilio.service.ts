import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { BASE_URL } from '../../config/config';
import { DomicilioResponse } from '../../respuestas/domicilio.response';
import { Domicilio } from '../../modelos/domicilio.model';


@Injectable()
export class DomicilioService {

  token: string;

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) { 
    this.token = this._usuarioService.token;
  }

  getDomicilios( desde:number= 0){
    let url = BASE_URL + '/domicilios?desde=' + desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<DomicilioResponse>(url, { headers });
  }

  getDomicilio( id:string ){
    let url = BASE_URL + '/domicilio/'+ id;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<DomicilioResponse>(url, { headers });
  }

  buscarDomicilios( termino: string, desde: number= 0 ){
    let url = BASE_URL+ '/busqueda/domicilios/'+ termino + '?desde='+ desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.get<DomicilioResponse>( url,{ headers } );
  }

  createDomicilio( domicilio:Domicilio ){
    let url = BASE_URL+ '/domicilio';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.post<DomicilioResponse>( url, domicilio, { headers } );
  }

  updateDomicilio( domicilio:Domicilio ){
    let url = BASE_URL+ '/domicilio';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this.http.put<DomicilioResponse>( url, domicilio, { headers } );
  }

}
