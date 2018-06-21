import { Component, OnInit } from '@angular/core';

import { SidebardService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../modelos/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor( public _sidebar: SidebardService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
