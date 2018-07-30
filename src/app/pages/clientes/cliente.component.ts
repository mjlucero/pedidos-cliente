import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ClienteService } from '../../services/service.index';
import { Cliente } from '../../modelos/cliente.model';
import { Domicilio } from '../../modelos/domicilio.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';



declare const swal:any;
declare var google: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  domicilio: Domicilio = new Domicilio('',0,'',0,0);
  cliente: Cliente = new Cliente('',this.domicilio,0,0);

  searchControl: FormControl;
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 15;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private _clienteService: ClienteService,
    // private _rubroService: RubroService,
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
                  }
              });
  }

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

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
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });

  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  cargarCliente( id: string){
    this._clienteService.getCliente( id )
                        .subscribe( res =>{
                          this.cliente = res.cliente;
                        });
  }

  guardarCliente( f:NgForm){
    if ( f.invalid ) {
      return;
    }

    this._clienteService.createCliente( this.cliente)
                        .subscribe( res =>{
                          swal(res.cliente.razonSocial, res.mensaje , 'success');
                          this.cliente = res.cliente
                        });
  }

}
