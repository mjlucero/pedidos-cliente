import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

declare const swal:any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  imageTemp: any;

  constructor( private _uploadService: UploadService, public _modalUploadService: ModalUploadService ) {}

  ngOnInit() {
  }

  getImage( file: File ){
    if ( !file ){
      this.imageUpload = null;
      this.imageTemp = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imageUpload = null;
      this.imageTemp = null;
      return;
    }
  
    this.imageUpload = file;

    let reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onloadend = ()=> this.imageTemp = reader.result;
  }

  uploadImage(){
    this._uploadService.uploadFile( this.imageUpload, this._modalUploadService.tipo, this._modalUploadService.id, this._modalUploadService.token  )
        .then( res =>{
          return res.json();
        })
        .then( data =>{
          this._modalUploadService.notificacion.emit( data );
          this.closeModal();
        })
        .catch( res =>{
          console.log(res);
        });
  }

  closeModal(){
    this.imageTemp = null;
    this.imageUpload = null;
    this._modalUploadService.hideModal();
  }

}
