import { Pipe, PipeTransform } from '@angular/core';
import { Rubro } from '../modelos/rubro.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rubros: Rubro[], rubroFilter: Rubro): Rubro[] {

    let rubrosFilter: Rubro[] = [];

    // console.log(rubros);
    // console.log(rubroFilter);
    if (rubroFilter) {
      rubros.forEach( r => {
        if (r._id !== rubroFilter._id) {
          if (r.padre) {
            if (rubroFilter._id !== r.padre._id) {
              rubrosFilter.push(r);
            }
          }else{
            rubrosFilter.push(r);
          }
        }
      });
    }
    
    return rubrosFilter;
  }

}
