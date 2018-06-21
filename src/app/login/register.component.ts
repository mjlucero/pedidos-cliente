import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../modelos/usuario.model';
import { Router } from '@angular/router';

declare const swal:any;

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.formulario = new FormGroup({
      nombre: new FormControl( null, Validators.required  ),
      email: new FormControl( null, [Validators.required,Validators.email ]),
      pass: new FormControl( null, Validators.required ),
      pass2: new FormControl( null, Validators.required ),
      terminos: new FormControl( false )
    }, { validators: this.sameField('pass','pass2' )  } );
  }

  sameField( field1: string, field2: string){
    return (group: FormGroup)  =>{

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        equals: true
      };
    }
  }

  registrar(){
    if ( this.formulario.invalid ) {
      return;
    }

    if ( !this.formulario.value.terminos ) {
      swal('Importante','Debe de aceptar las condiciones','warning');
      return;
    }

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.email,
      this.formulario.value.pass,
    );

    this._usuarioService.crearUsuario( usuario )
                        .subscribe( resp => this._router.navigate(['/login']) );
  }

}
