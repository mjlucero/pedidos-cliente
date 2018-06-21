import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuard implements CanActivate {

  constructor( private _usuarioService: UsuarioService, private _router: Router ){}
  
  canActivate(): boolean {
    if ( this._usuarioService.isLogin() ) {
      return true;
    }else{
      this._router.navigate(['/login']);
      return false;
    }
  }
}
