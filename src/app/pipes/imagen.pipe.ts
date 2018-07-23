import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = `${ BASE_URL}/imagen/`;

    if ( !img ) {
      return url + 'usuarios/xxx';
    }
    
    switch (tipo) {
      case 'usuarios':
        url += 'usuarios/'+ img;
      break;

      case 'articulos':
        url += 'articulos/'+ img;  
      break;

      default:
        url += 'usuarios/xxx';
    }

    return url;
  }

}
