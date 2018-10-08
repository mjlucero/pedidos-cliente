import { Component, OnInit } from '@angular/core';
import { ModalDomicilioService } from './modal-domicilio.service';
import { DomicilioService } from '../../services/service.index';
import { Domicilio } from '../../modelos/domicilio.model';

declare const swal:any;

@Component({
  selector: 'app-modal-domicilio',
  templateUrl: './modal-domicilio.component.html',
  styleUrls: []
})
export class ModalDomicilioComponent implements OnInit {

  domicilio: Domicilio = new Domicilio('',0,0);
  zoom: number = 15;

  constructor(
    public _domicilioService: DomicilioService,
    public _modalDomicilioService: ModalDomicilioService
  ) { 
  }

  ngOnInit() {
    
    this._modalDomicilioService.newData.subscribe( domicilio =>{
      if (!domicilio._id) {
        this.setCurrentPosition();
      }else{
        this.domicilio = domicilio;
      }
    });
      
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.domicilio.latitud = position.coords.latitude;
        this.domicilio.longitud = position.coords.longitude;

        console.log(this.domicilio);

        this.getGeoLocation();
      });
    }
  }

  getGeoLocation() {
    if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
        let latlng: google.maps.LatLng  = new google.maps.LatLng(this.domicilio.latitud, this.domicilio.longitud);
        let request: google.maps.GeocoderRequest =  { location: latlng} ;
    
        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {    
            this.domicilio.direccion = results[0].formatted_address;
          }
        });
    }
  }

  setDomicilio(e){
    let { lat, lng } = e.coords;

    this.domicilio.latitud = lat;
    this.domicilio.longitud = lng;
    
    this.getGeoLocation();
  }

  saveDomicilio(){

    if ( this.domicilio._id ) {
      this._domicilioService.updateDomicilio( this.domicilio )
                            .subscribe(res=>{
                              swal('Correcto!', res.mensaje , 'success');
                            });
    }else{
      this._domicilioService.createDomicilio( this.domicilio )
                            .subscribe(res=>{
                              swal('Correcto!', res.mensaje , 'success');
                            });
    }

    this.closeModal();
  }

  closeModal(){
    this.domicilio = new Domicilio('',0,0);
    this._modalDomicilioService.hideModal();
  }

}
