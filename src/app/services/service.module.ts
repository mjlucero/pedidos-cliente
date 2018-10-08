import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedService, 
  SidebardService, 
  UsuarioService, 
  LoginGuard, 
  UploadService, 
  RubroService,
  ClienteService,
  ArticuloService,
  DomicilioService,
  PedidoService,
  VerificaTokenGuard,
  ModalUploadService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService, 
    SidebardService,
    UsuarioService,
    LoginGuard,
    UploadService,
    RubroService,
    ClienteService,
    ArticuloService,
    DomicilioService,
    PedidoService,
    VerificaTokenGuard,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
