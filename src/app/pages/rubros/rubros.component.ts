import { Component, OnInit } from '@angular/core';
import { Rubro } from '../../modelos/rubro.model';
import { RubroService } from '../../services/service.index';

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
  rubroSelected:Rubro;

  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  terminoBusqueda: string = '';
  desdeBusqueda: number = 0;
  buscando: boolean = false;

  constructor(private _rubroService:RubroService) { }

  ngOnInit() {
    this.cargarRubros();
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

    let index = this.rubros.findIndex(r => r._id ===  this.rubroSelected._id);
    
    this.rubros[index].padre = rubro;

    item.classList.add('list-group-item-info');
  }

  changePadre( rubro:Rubro){
    this.rubroSelected = rubro;
  }

  guardarRubro( rubro:Rubro ){
    this._rubroService.updateRubro(rubro)
                      .subscribe( res=>{
                        swal( res.rubro.denominacion , res.mensaje ,'success');
                      });
  }

  crearRubro( formulario:any ){
    console.log(formulario);
    
    let newRubro = new Rubro(formulario.codigo,formulario.denominacion,formulario.padre === "" ? null : formulario.padre );
    this._rubroService.createRubro(newRubro)
                      .subscribe( res =>{
                        swal(res.rubro.denominacion, res.mensaje ,'success');
                        this.rubros.push(res.rubro);
                      });
  }
}
