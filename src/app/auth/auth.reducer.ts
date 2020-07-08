import { createReducer, on } from '@ngrx/store';
import * as Actions from './auth.actions';
import { Usuario } from '../modelos/usuario.model';

export interface UserState {
  user: Usuario;
}

export const initialState: UserState = {
  user: null,
};

const _authReducer = createReducer(initialState,

  on(Actions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(Actions.unSetUser, state => ({ ...state, user: null })),

);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
