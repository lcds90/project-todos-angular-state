import { Action, createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";
import * as fromAppActions from './app.actions'

export interface AppState {
    user: User
}

export const initialState: AppState = {
    user: {name: '', email: ''}
}

const appStateReducer = createReducer(
    initialState,
    on(fromAppActions.doLoginSuccess, (state, { user }) => ({
        /*  com spread operator, ele atualiza o estado atual, junto com a informação nova
            pois caso haja, novos parametros no appState, não há necessidade de declarar novamente */
        ...state,
            user
    }))
);

export function reducer(state: AppState | undefined, action: Action): AppState {
    return appStateReducer(state, action);
}