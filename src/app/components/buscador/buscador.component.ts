import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() emitTermino: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  buscar( termino:string){
    this.emitTermino.emit( termino );
  }
}
