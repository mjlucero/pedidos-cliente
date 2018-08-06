import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ClienteService } from '../../services/service.index';
import { Cliente } from '../../modelos/cliente.model';
import { Domicilio } from '../../modelos/domicilio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { DomicilioService } from '../../services/domicilio/domicilio.service';
declare const swal:any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  edit: boolean = true;

  domicilios: Domicilio[] = [];
  domicilio: Domicilio = new Domicilio('',0,0);
  cliente: Cliente = new Cliente('',0,0);
  domicilioSelected: string = '';

  searchControl: FormControl;
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private _clienteService: ClienteService,
    private _domicilioService: DomicilioService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone

  ) { 
    activeRoute.params
              .subscribe( params =>{
                  let id = params['id'];
          
                  if ( id !== 'nuevo' ) {
                    this.cargarCliente(id);
                  }else{
                    this.edit = false;
                  }
              });
  }

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    this._domicilioService.getDomicilios()
                          .subscribe(res=>{
                            this.domicilios = res.domicilios;
                          });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentPosition();

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.domicilio.latitud = place.geometry.location.lat();
          this.domicilio.longitud = place.geometry.location.lng();

          this.getGeoLocation();
        });
      });
    });

  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.domicilio.latitud = position.coords.latitude;
        this.domicilio.longitud = position.coords.longitude;

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

            delete this.domicilio._id;
            delete this.domicilio.fechaAlta;
            delete this.domicilio.fechaBaja;

            this.domicilio.direccion = results[0].formatted_address;
            this.searchElementRef.nativeElement.value = this.domicilio.direccion;
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

  cargarCliente( id: string){
    this._clienteService.getCliente( id )
                        .subscribe( res =>{
                          this.cliente = res.cliente;
                        });
  }

  changeDomicilio(){
    console.log('Cambio!!!', this.domicilioSelected);
    this.domicilio = this.domicilios.find( d => d._id === this.domicilioSelected);
    console.log('Domicilio actualizado', this.domicilio);
  }

  guardarCliente( f:NgForm){
    if ( f.invalid ) {
      return;
    }

    if (this.edit) {
      this._clienteService.updateCliente( this.cliente )
                          .subscribe(res=>{
                            swal(res.cliente.razonSocial, res.mensaje , 'success');
                            this.cliente = res.cliente
                          });
    } else {
      this._clienteService.createCliente( this.cliente)
                        .subscribe( res =>{
                          swal(res.cliente.razonSocial, res.mensaje , 'success');
                          this.router.navigate(['/cliente', res.cliente._id]);
                        });
    }
  }

}
