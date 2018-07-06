import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { RubroRespose } from '../../interfaces/rubros.inteface';
import { Rubro } from '../../modelos/rubro.model';

@Injectable()
export class RubrosService {

  token: string;

  constructor(private _http: HttpClient, private _usuarioService: UsuarioService) { 
    this.token = this._usuarioService.token;
  }

  getRubros( desde:number = 0 ){
    let url = BASE_URL + '/rubros?desde='+ desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<RubroRespose>( url, { headers } );
  }

  getRubro( id: string ){
    let url = BASE_URL + '/rubro/'+ id;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<RubroRespose>( url, { headers });
  }

  buscarRubros(termino: string, desde: number= 0){
    let url = BASE_URL + '/busqueda/rubros/'+ termino + '?desde=' + desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<RubroRespose>( url, { headers } );
  }

  createRubro( rubro: Rubro ){
    let url = BASE_URL + '/rubro';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.post<RubroRespose>( url, rubro, { headers });
  }

  updateRubro( rubro: Rubro ){
    let url = BASE_URL + '/rubro/'+ rubro._id;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.put<RubroRespose>( url, rubro, { headers });
  }

}
