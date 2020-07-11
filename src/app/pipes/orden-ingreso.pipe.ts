import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((item: IngresoEgreso) => {
      if (item.tipo === 'ingreso') {
        return -1;
      }
      else {
        return 1;
      }
    });
  }

}
