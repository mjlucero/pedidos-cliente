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
        { titulo: 'Articulos', url: '/articulos'},
        { titulo: 'Clientes', url: '/clientes'},
        { titulo: 'Domicilios', url: '/domicilios'},
        { titulo: 'Pedidos', url: '/pedidos'},
        { titulo: 'Rubros', url: '/rubros'},
        { titulo: 'Usuarios', url: '/usuarios'}
      ]
    }
  ];

  constructor() { }

}
