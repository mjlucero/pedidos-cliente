import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Domicilio } from '../../modelos/domicilio.model';
import { FormControl } from '@angular/forms';
import { DomicilioService } from '../../services/domicilio/domicilio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';

declare const swal:any;

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styles: []
})
export class DomicilioComponent implements OnInit {

  domicilio: Domicilio = new Domicilio('',0,0);

  searchControl: FormControl;
  lat: number = 0;
  lng: number = 0;
  zoom: number = 15;
  edit: boolean = true;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
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
                    this.cargarDomicilio(id);
                  }else{
                    this.edit = false;
                  }
              });
  }

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      
      if (!this.edit) {
        this.setCurrentPosition();
      }
      
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

  cargarDomicilio(id:string){
    this._domicilioService.getDomicilio(id)
                          .subscribe(res=>{
                            this.domicilio = res.domicilio;
                            this.searchElementRef.nativeElement.value = this.domicilio.direccion;                 
                          });
  }

  saveDomicilio(){
    if (this.edit) {
      this._domicilioService.updateDomicilio(this.domicilio)
                            .subscribe(res=>{
                              swal('Correcto!', res.mensaje , 'success');
                            });
    }else{
      this._domicilioService.createDomicilio(this.domicilio)
                            .subscribe(res=>{
                              swal('Correcto!', res.mensaje , 'success');
                              this.router.navigate(['/domicilio', res.domicilio._id]);
                            });
    }
  }
}
