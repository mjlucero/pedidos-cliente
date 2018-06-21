import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor( private _usuarioService: UsuarioService, private _router: Router) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if( this.email.length > 1){
      this.recuerdame = true;
    }
  }

  ingresar( f: NgForm){
    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    let usuario = new Usuario(null, f.value.email, f.value.pass);

    this._usuarioService.login( usuario, (f.value.recuerdame === "" ? false : true )  )
                        .subscribe( res => this._router.navigate(['/dashboard']));
  }

}
