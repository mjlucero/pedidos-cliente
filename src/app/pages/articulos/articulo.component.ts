import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../modelos/articulo.model';
import { ArticuloService, RubroService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Rubro } from '../../modelos/rubro.model';
import { Router, ActivatedRoute } from '@angular/router';

declare const swal:any;

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styles: []
})
export class ArticuloComponent implements OnInit {
  
  rubro: Rubro = new Rubro('','');
  articulo: Articulo = new Articulo('','',0,0,0, this.rubro);
  rubros: Rubro[] = [];

  imageUpload: File;
  imageTemp: File;

  constructor(
    private _articuloService: ArticuloService,
    private _rubroService: RubroService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
     activeRoute.params.subscribe( params =>{
        let id = params['id'];

        if ( id !== 'nuevo' ) {
          this.cargarArticulo(id);
        }
     });
   }

  ngOnInit() {
    this._rubroService.getRubros(0)
                      .subscribe( res => this.rubros = res.rubros);
  }

  cargarArticulo( id:string){
    this._articuloService.getArticulo( id )
                         .subscribe( res =>{
                           this.articulo = res.articulo;
                         });
  }

  guardarArticulo( f:NgForm){
    if ( f.invalid ) {
      return;
    }

    this._articuloService.createArticulo( this.articulo)
                        .subscribe( res =>{
                          swal(res.articulo.denominacion, res.mensaje , 'success');
                          this.articulo = res.articulo
                        });
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
    this._articuloService.changeImage( this.imageUpload, this.articulo._id)
                          .then( res =>{
                            return res.json();
                          })
                          .then( data =>{
                            this.articulo.img = data.img
                            swal( 'Imagen Actualizada', this.articulo.denominacion ,'success');
                          })
                          .catch( res =>{
                            console.log(res);
                          });
  }

}
