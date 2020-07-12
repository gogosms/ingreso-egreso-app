import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
// Charts JS
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as ingresoEgreso from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgreso.IngresoEgresoReducer),
    RouterModule,
    DashboardRoutesModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
  ]
})
export class IngresoEgresoModule { }
