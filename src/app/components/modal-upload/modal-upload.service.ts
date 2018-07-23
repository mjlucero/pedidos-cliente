import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public token: string;
  public img: string;

  public hide: string = 'm-hide';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  hideModal(){
    this.id = null;
    this.tipo = null;
    this.token = null;
    this.hide = 'm-hide';
  }

  showModal( tipo:string, id: string, img:string ,token:string ){
    this.id = id;
    this.tipo = tipo;
    this.img = img;
    this.token = token;
    this.hide = '';
  }

}
