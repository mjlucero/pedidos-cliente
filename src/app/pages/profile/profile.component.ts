import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare const swal:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imageUpload: File;
  imageTemp: File;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario){
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario( this.usuario, false )
                        .subscribe();
  }

  getImage( file: File ){
    
    if ( !file ){
      this.imageUpload = null;
      this.imageTemp = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imageUpload = null;
      this.imageTemp = null;
      return;
    }
  
    this.imageUpload = file;

    let reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = ()=> this.imageTemp = reader.result;
  }

  uploadImage(){
    this._usuarioService.changeImage( this.imageUpload, this.usuario._id);
  }

}
