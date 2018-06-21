import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class UploadService {

  constructor() { }

  uploadFile( file:File, tipo: string, id:string, token:string){
    let formData = new FormData();
    formData.append('image', file );

    // usuarios/5b08d54014ec4b26c0125f57
    let url = `${ BASE_URL}/upload/${ tipo }/${ id}`;

    let headers = new Headers({
      'Authorization': token
    });

    let request = new Request( url , {
          method: 'PUT',
          headers: headers,
          body: formData
    });

    return fetch( request );
  }
}
