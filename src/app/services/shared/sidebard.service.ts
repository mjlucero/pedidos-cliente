import { Injectable } from '@angular/core';

@Injectable()
export class SidebardService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'Dashboard', url: '/dashboard'}
      ]
    },
    {
      titulo: 'Administracion',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        { titulo: 'Usuarios', url: '/usuarios'},
        { titulo: 'Clientes', url: '/clientes'},
        { titulo: 'Articulos', url: '/articulos'},
        { titulo: 'Rubros', url: '/rubros'},
        { titulo: 'Pedidos', url: '/pedidos'},
      ]
    }
  ];

  constructor() { }

}
