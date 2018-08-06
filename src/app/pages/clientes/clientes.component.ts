import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../modelos/cliente.model';
import { ClienteService } from '../../services/service.index';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: []
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  desde: number = 0;
  total: number = 0;

  cargando: boolean = true;

  terminoBusqueda: string = '';
  desdeBusqueda: number = 0;
  buscando: boolean = false;

  constructor( private _clienteService: ClienteService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes(){
    this.cargando = true;

    this._clienteService.getClientes( this.desde )
                        .subscribe( res =>{
                          this.clientes = res.clientes;
                          this.total = res.total;
                          this.cargando = false;
                        });
  }

  buscarClientes( termino:string ){

    if (termino.length <= 0) {
      this.terminoBusqueda = '';
      this.buscando = false;
      this.cargarClientes();
      return;
    }
    
    this.terminoBusqueda = termino;
    this.cargando = true;

    this._clienteService.buscarClientes( termino, this.desdeBusqueda )
                        .subscribe( res=>{
                          this.total = res.total;
                          this.buscando = true;
                          this.clientes = res.clientes;
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
      this.cargarClientes();

    } else {
      
      let desde = this.desdeBusqueda + valor;

      if ( desde >= this.total ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }

      this.desdeBusqueda += valor;
      this.buscarClientes( this.terminoBusqueda );
    }
  }
}
