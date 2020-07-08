import { createReducer, on } from '@ngrx/store';
import * as Actions from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
   isLoading: false,
};

const _uiReducer = createReducer(initialState,

    on(Actions.isLoading, state => ({ ...state, isLoading: true})),
    on(Actions.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}
