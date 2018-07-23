import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../modelos/articulo.model';
import { ArticuloService, UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare const swal:any;

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styles: []
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[];

  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  terminoBusqueda: string = '';
  desdeBusqueda: number = 0;
  buscando: boolean = false;

  constructor(private _articuloService: ArticuloService, private _modalUploadService: ModalUploadService, private _usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.cargarArticulos();

    this._modalUploadService.notificacion
                            .subscribe( res =>{
                              for (const articulo of this.articulos) {
                                if ( articulo._id === res.articulo._id) {
                                  articulo.img = res.img;
                                  swal(articulo.denominacion, 'Imagen actualizada correctamente', 'success');
                                  break;
                                }
                              }
                            });

  }

  cargarArticulos(){
    this.cargando = true;

    this._articuloService.getArticulos( this.desde )
                        .subscribe( res =>{
                          this.articulos = res.articulos;
                          this.total = res.total;
                          this.cargando = false;
                        });
  }

  cambiarDesde( valor:number ){
    if (!this.buscando) {

      let desde = this.desde + valor;

      if ( desde >= this.total ) {
        return;
      }

      if ( desde < 0) {
        return;
      }

      this.desde += valor;
      this.cargarArticulos();

    } else {
      
      let desde = this.desdeBusqueda + valor;

      if ( desde >= this.total ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }

      this.desdeBusqueda += valor;
      this.buscarArticulos( this.terminoBusqueda );
    }
  }

  buscarArticulos( termino:string ){

    if (termino.length <= 0) {
      this.terminoBusqueda = '';
      this.buscando = false;
      this.cargarArticulos();
      return;
    }
    
    this.terminoBusqueda = termino;
    this.cargando = true;

    this._articuloService.buscarArticulos( termino, this.desdeBusqueda )
                        .subscribe( res=>{
                          this.total = res.total;
                          this.buscando = true;
                          this.articulos = res.articulos;
                          this.cargando = false;
                        });
  }

  openModal( articulo: Articulo ){
    this._modalUploadService.showModal('articulos', articulo._id, articulo.img, this._usuarioService.token);
  }
}
