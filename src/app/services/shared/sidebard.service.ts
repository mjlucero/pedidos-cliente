import { Injectable } from '@angular/core';

@Injectable()
export class SidebardService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'Progress', url: '/progress'},
        { titulo: 'Graficas', url: '/graficas'},
      ]
    }
  ];

  constructor() { }

}
