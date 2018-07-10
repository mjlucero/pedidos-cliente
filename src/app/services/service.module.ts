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
  PedidoService } from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



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
    ModalUploadService,
    RubroService,
    ClienteService,
    ArticuloService,
    DomicilioService,
    PedidoService
  ],
  declarations: []
})
export class ServiceModule { }
