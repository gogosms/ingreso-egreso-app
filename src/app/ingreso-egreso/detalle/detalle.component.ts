import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgreso } from 'src/app/modelos/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'

})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription;
  constructor(private store: Store<AppStateWithIngreso>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSubs = this.store.select('ingresosEgresos')
    .subscribe(({Items}) => this.ingresosEgresos = Items);
  }

  ngOnDestroy(): void {
    this.ingresoSubs.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
    .then(() => Swal.fire('Borrado', 'Item Borrado', 'success'))
    .catch(err => Swal.fire('Error', err.message , 'error'));

  }

}
