import { Component, OnInit } from '@angular/core';
import { Domicilio } from '../../modelos/domicilio.model';
import { DomicilioService } from '../../services/service.index';
import { ModalDomicilioService } from '../../components/modal-domicilio/modal-domicilio.service';

@Component({
  selector: 'app-domicilos',
  templateUrl: './domicilios.component.html',
  styles: []
})
export class DomiciliosComponent implements OnInit {

  domicilios: Domicilio[];

  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  terminoBusqueda: string = '';
  desdeBusqueda: number = 0;
  buscando: boolean = false;

  constructor( 
    private _domicilioService: DomicilioService,
    private _modalDomicilioService: ModalDomicilioService
  ) { }

  ngOnInit() {
    this.cargarDomicilios();
  }

  cargarDomicilios(){
    this.cargando = true;

    this._domicilioService.getDomicilios( this.desde )
                        .subscribe( res =>{
                          this.domicilios = res.domicilios;
                          this.total = res.total;
                          this.cargando = false;
                        });
  }

  buscarDomicilios( termino:string ){

    if (termino.length <= 0) {
      this.terminoBusqueda = '';
      this.buscando = false;
      this.cargarDomicilios();
      return;
    }
    
    this.terminoBusqueda = termino;
    this.cargando = true;

    this._domicilioService.buscarDomicilios( termino, this.desdeBusqueda )
                        .subscribe( res=>{
                          this.total = res.total;
                          this.buscando = true;
                          this.domicilios = res.domicilios;
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
      this.cargarDomicilios();

    } else {
      
      let desde = this.desdeBusqueda + valor;

      if ( desde >= this.total ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }

      this.desdeBusqueda += valor;
      this.buscarDomicilios( this.terminoBusqueda );
    }
  }

  createDomicilio(){
    let domicilio = new Domicilio('',0,0);
    this._modalDomicilioService.showModal(domicilio);
  }

  editDomicilio( domicilio: Domicilio){
    this._modalDomicilioService.showModal(domicilio);
  }
}
