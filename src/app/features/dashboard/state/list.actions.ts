import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/shared/models/todo.model';

export const loadListFromLastTodos = createAction('[Last Todos] Load List');

export const loadListFromList = createAction('[List] Load List');

export const loadListSuccess = createAction(
  '[API] Load List Success',
  props<{ entities: Todo[] }>()
);

export const loadListFailure = createAction('[API] Load List Failure');

export const loadMore = createAction('[List] Load More')