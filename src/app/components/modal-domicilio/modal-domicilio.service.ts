import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Domicilio } from '../../modelos/domicilio.model';

@Injectable({
  providedIn: 'root'
})
export class ModalDomicilioService {

  // public domicilio: Domicilio = new Domicilio('',0,0);
  public hide: string = 'm-hide';

  public notificacion = new EventEmitter<any>();
  public newData = new EventEmitter<Domicilio>();

  constructor() { }

  hideModal(){
    this.hide = 'm-hide';
  }

  showModal( _domicilio: Domicilio ){
    if(_domicilio){
      this.newData.emit( _domicilio);
    }
    
    this.hide = '';
  }
}
