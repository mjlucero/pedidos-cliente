import { Component, OnInit } from '@angular/core';
import { Rubro } from '../../modelos/rubro.model';
import { RubrosService } from '../../services/service.index';

declare const swal:any;
declare const $:any;
import * as moment from 'moment'; 

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styles: []
})
export class RubrosComponent implements OnInit {
  
  rubros:Rubro[];
  rubrosDisponibles:Rubro[] = [];
  editing:number;

  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  terminoBusqueda: string = '';
  desdeBusqueda: number = 0;
  buscando: boolean = false;

  constructor(private _rubroService:RubrosService) { }

  ngOnInit() {
    this.cargarRubros();

    let self = this;

    $('#modalRubros').on('show.bs.modal', function (event) {
      let button = $(event.relatedTarget);
      let recipient = button.data('rubro');
      let items:any = $('.rubro-items');

      for (const i of items) {
        i.classList.remove('list-group-item-info');
        i.classList.remove('disabled');
        i.classList.remove('pointer');
        i.classList.remove('not-allowed');
      }

      let rubro:Rubro;

      let index = self.rubros.findIndex((item) => item._id === recipient);
      self.editing = index;

      rubro = self.rubros[index];

 
        for (const i of items) {
          let idHtmlItem = $(i).data('rubro');
          
          if (idHtmlItem === rubro._id) {
            i.classList.add('disabled');
            i.classList.remove('pointer');
            i.classList.add('not-allowed');
          }else{
            i.classList.add('pointer');
          }

          if ( rubro.padre ) {
            if ( idHtmlItem === rubro.padre._id) {
              i.classList.add('list-group-item-info');
            }
          }
        }
      
    });
  }

  cargarRubros(){
    this.cargando = true;

    this._rubroService.getRubros( this.desde )
                      .subscribe( res =>{
                        this.total = res.total;
                        this.rubros = res.rubros;
                        this.cargando = false;
                      });

                      
  }

  cambiarDesde( valor:number){
    if (!this.buscando) {

      let desde = this.desde + valor;

      if ( desde >= this.total ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }

      this.desde += valor;
      this.cargarRubros();
      
    }else{
      let desde = this.desdeBusqueda + valor;

      if ( desde >= this.total ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }

      this.desdeBusqueda += valor;
      this.buscarRubro( this.terminoBusqueda );
    }
  }

  buscarRubro( termino: string){
    if (termino.length <= 0) {
      this.terminoBusqueda = '';
      this.buscando = false;
      this.cargarRubros();
      return;

    }
    
    this.terminoBusqueda = termino;
    this.cargando = true;

    this._rubroService.buscarRubros( termino, this.desdeBusqueda )
        .subscribe( res =>{
          this.total = res.total;
          this.buscando = true;
          this.rubros = res.rubros
          this.cargando = false;
        });
  }

  selectRubro(rubro:Rubro, item:any){
    let items:any = document.getElementsByClassName('rubro-items');

    for (const i of items) {
      i.classList.remove('list-group-item-info');
    }
    
    this.rubros[this.editing].padre = rubro;

    item.classList.add('list-group-item-info');
  }

  guardarRubro( rubro:Rubro ){
    console.log(rubro);
    
    this._rubroService.updateRubro(rubro)
                      .subscribe( res=>{
                        console.log(res);
                      });
  }
}
