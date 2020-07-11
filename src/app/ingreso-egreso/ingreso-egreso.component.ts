import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as Ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo = 'ingreso';
  uiSubscription: Subscription;
  loading = false;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]

    });


    this.uiSubscription = this.store.select('ui')
    .subscribe(ui => this.loading = ui.isLoading);

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  public guardar() {

    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(Ui.isLoading());

    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then((ref) => {
        this.store.dispatch(Ui.stopLoading());
        this.ingresoForm.reset();
        Swal.fire('Registro creado.', descripcion, 'success');
      }).catch(err => {
        this.store.dispatch(Ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}
