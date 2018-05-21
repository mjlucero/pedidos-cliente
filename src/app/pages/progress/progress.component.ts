import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso: number = 50;
  maximo: number = 100;
  minimo: number = 0;

  constructor() { }

  ngOnInit() {
  }

  changeValue( valor: number ){
    if ( this.progreso >= this.maximo && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= this.minimo && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
  }

}
