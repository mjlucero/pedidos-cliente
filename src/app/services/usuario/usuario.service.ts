import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { UsuarioRespose } from '../../interfaces/usuario.interface';
import "rxjs/add/operator/map";
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';

declare const swal:any;

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _uploadService: UploadService
  ) { 
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario){
    let url = BASE_URL + '/usuario';

    return this._http.post<UsuarioRespose>( url, usuario )
                     .map( res =>{
                        swal( res.mensaje , res.usuario.email, 'success');
                        return res.usuario;
                     });
  }

  login( usuario: Usuario, recordar:boolean = false ){
    let url = BASE_URL + '/login';

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }else{
      localStorage.removeItem('email');
    }

    return this._http.post<UsuarioRespose>( url, usuario)
                     .map( res =>{

                      this.actualizarStorage(res.id, res.token, res.usuario);
                      return true;

                     });
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  actualizarStorage( id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage(){
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  isLogin(){
    return ( this.token.length > 5 ) ? true : false;
  }

  actualizarUsuario( usuario: Usuario, baja: boolean ){
    let url = BASE_URL +'/usuario/' + usuario._id ;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.put<UsuarioRespose>(url, usuario, { headers } )
                     .map( res =>{
                        
                      if (!baja) {

                        if ( usuario._id === this.usuario._id ) {
                          this.actualizarStorage( res.usuario._id, this.token, res.usuario);
                        }
                        
                        swal(res.mensaje, res.usuario.nombre, 'success');
                        return true;
                        
                      }else{
                        swal(res.usuario.nombre, 'Se dio de baja correctamente' ,'success');
                      }
                     });
  }

  cargarUsuarios( desde:number = 0){
    let url = BASE_URL + '/usuarios?desde=' + desde;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<UsuarioRespose>( url, { headers } );
  }

  buscarUsuarios(termino: string, desde: number= 0){
    let url = BASE_URL + '/busqueda/usuarios/'+ termino + '?desde=' + desde;
    
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    return this._http.get<UsuarioRespose>( url, { headers } );
  }

  changeImage( file:File, id:string){
    this._uploadService.uploadFile( file, 'usuarios', id, this.token )
        .then( res =>{
          return res.json();
        })
        .then( data =>{
          this.usuario.img = data.img
          swal( 'Imagen Actualizada', this.usuario.nombre ,'success');
          this.actualizarStorage( id, this.token, this.usuario );
        })
        .catch( res =>{
          console.log(res);
        });
  }

}
