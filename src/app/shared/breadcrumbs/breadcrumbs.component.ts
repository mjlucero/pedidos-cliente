import { map, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  pagina: string = '';

  constructor( private _router: Router, public _title: Title) {
    
    this.getDataRoute().subscribe( data =>{
      this.pagina = data.titulo;
      this._title.setTitle( this.pagina );
    });
  }

  ngOnInit() {
    
  }

  getDataRoute(){
    return this._router.events.pipe(
            filter( evento => evento instanceof ActivationEnd),
            filter( (evento:ActivationEnd) => evento.snapshot.firstChild === null  ),
            map( (evento:ActivationEnd) => evento.snapshot.data ),);
  }

}
