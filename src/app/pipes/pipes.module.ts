import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    FilterPipe
  ],
  exports: [
    ImagenPipe,
    FilterPipe
  ]
})

export class PipesModule { }
