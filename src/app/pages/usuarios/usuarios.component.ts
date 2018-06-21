import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare const swal:any;
import * as moment from 'moment';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  constructor(private _usuarioService: UsuarioService, private _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe( res => this.cargarUsuarios());
  }

  cargarUsuarios(){
    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe( res=>{
                          this.total = res.total;
                          this.usuarios = res.usuarios;
                          this.cargando = false;
                        });
  }

  cambiarDesde( valor:number){
    let desde = this.desde +valor;

    if ( desde >= this.total ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios()
  }

  buscarUsuario( termino: string){
    console.log( termino );

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
        .subscribe( res =>{
          console.log( res.usuarios );
          this.cargando = false;
        });
  }

  bajaUsuario( usuario:Usuario ){
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('Error!', 'No se puede darse de baja a si mismo', 'error');
      return;
    }

    swal({
      title: "Esta seguro?",
      text: "Esta a punto de dar de baja a "+ usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(( baja ) => {

      if (baja) {
        usuario.fechaBaja = moment().format('DD-MM-YYYY');

        this._usuarioService.actualizarUsuario( usuario, true )
            .subscribe();
      }
    });
  }

  guardarUsuario( usuario:Usuario ){
    this._usuarioService.actualizarUsuario( usuario, false )
          .subscribe();
  }

  openModal( id: string ){
    this._modalUploadService.showModal('usuarios',id, this._usuarioService.token );
  }

}
