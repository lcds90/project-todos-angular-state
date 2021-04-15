import { Action, createReducer, on } from "@ngrx/store"
import { Todo } from "src/app/shared/models/todo.model"
import * as fromListActions from "./list.actions"

export interface ListState {
    entities: Todo[],
    loading: boolean,
    error: boolean
}

export const listInitialState: ListState = {
    entities: [],
    loading: false,
    error: false
}

export const reducer = createReducer(
    listInitialState,
    on(fromListActions.loadListFromLastTodos, fromListActions.loadListFromList, state => ({
        ...state,
        loading: true
    })),
    on(fromListActions.loadListSuccess, (state, {entities}) => ({
        ...state,
        entities,
        loading:false
    })),
    on(fromListActions.loadListFailure, (state) => ({
        ...state,
        loading:false,
        error: true
    })),
)

export function listReducer(state: ListState | undefined, action: Action): ListState {
    return reducer(state, action)
}