import { createReducer, on } from '@ngrx/store';
import * as Actions from './ingreso-egreso.actions';
import { Usuario } from '../modelos/usuario.model';
import { IngresoEgreso } from '../modelos/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  Items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
  ingresosEgresos: IngresoEgresoState;
}

export const initialState: IngresoEgresoState = {
  Items: []
};

const _IngresoEgresoReducer = createReducer(initialState,

  on(Actions.setItems, (state, { items }) => ({ ...state, Items: [... items] })),
  on(Actions.unSetItems, state => ({ ...state, Items: [] })),

);

export function IngresoEgresoReducer(state, action) {
  return _IngresoEgresoReducer(state, action);
}
