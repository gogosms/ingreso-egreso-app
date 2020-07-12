import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/modelos/ingreso-egreso.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'

})
export class EstadisticaComponent implements OnInit {

  ingresos = 0;
  egresos = 0;
  totalEgresos = 0;
  totalIngresos = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithIngreso>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({ Items }) => this.generarEstadisticas(Items));
  }

  generarEstadisticas(ingresosEgresos: IngresoEgreso[]) {
    this.resetValues();
    ingresosEgresos.filter(item => item.tipo === 'ingreso').forEach(item => {
      this.totalIngresos += item.monto;
      this.ingresos++;
    });

    ingresosEgresos.filter(item => item.tipo === 'egreso').forEach(item => {
      this.totalEgresos += item.monto;
      this.egresos++;
    });

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];

  }

  resetValues() {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }

}
