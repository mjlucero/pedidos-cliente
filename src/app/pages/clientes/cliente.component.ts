import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/service.index';
import { Cliente } from '../../modelos/cliente.model';
import { Domicilio } from '../../modelos/domicilio.model';
import { Router, ActivatedRoute } from '@angular/router';

declare const swal:any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  domicilio: Domicilio = new Domicilio('',0,'',0,0);
  cliente: Cliente = new Cliente('',this.domicilio,0,0);

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    private _clienteService: ClienteService,
    // private _rubroService: RubroService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { 
    activeRoute.params
              .subscribe( params =>{
                  let id = params['id'];
          
                  if ( id !== 'nuevo' ) {
                    this.cargarCliente(id);
                  }
              });
  }

  ngOnInit() {
  }

  cargarCliente( id: string){
    this._clienteService.getCliente( id )
                        .subscribe( res =>{
                          this.cliente = res.cliente;
                        });
  }

  guardarCliente( f:NgForm){
    if ( f.invalid ) {
      return;
    }

    this._clienteService.createCliente( this.cliente)
                        .subscribe( res =>{
                          swal(res.cliente.razonSocial, res.mensaje , 'success');
                          this.cliente = res.cliente
                        });
  }

}
