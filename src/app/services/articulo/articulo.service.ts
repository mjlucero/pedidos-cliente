import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { BASE_URL } from '../../config/config';
import { ArticuloResponse } from '../../respuestas/articulo.response';
import { Articulo } from '../../modelos/articulo.model';
import { UploadService } from '../upload/upload.service';


@Injectable()
export class ArticuloService {

  token: string;

  constructor(
    private _http: HttpClient, 
    private _usuarioService: UsuarioService,
    private _uploadService: UploadService
  ) { 
    this.token = this._usuarioService.token;
  }

  getArticulos( desde:number = 0){
    let url = BASE_URL + '/articulos?desde=' + desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<ArticuloResponse>( url, { headers });
  }

  getArticulo( id:string ){
    let url = BASE_URL+'/articulo/'+id;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<ArticuloResponse>( url,{ headers} );
  }

  buscarArticulos( termino: string, desde: number= 0 ){
    let url = BASE_URL+ '/busqueda/articulos/'+ termino + '?desde='+ desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<ArticuloResponse>( url,{ headers } );
  }

  createArticulo( articulo:Articulo ){
    let url = BASE_URL+ '/articulo';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.post<ArticuloResponse>( url, articulo, { headers } );
  }

  updateArticulo( articulo:Articulo ){
    let url = BASE_URL+ '/articulo';

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.put<ArticuloResponse>( url, articulo, { headers } );
  }

  changeImage( file:File, id:string){
    return this._uploadService.uploadFile( file, 'articulos', id, this.token );
  }

}
