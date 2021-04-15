import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TodosService } from 'src/app/shared/services/todos.service';
import * as fromListActions from './list.actions';

@Injectable()
export class ListEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  loadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromListActions.loadListFromLastTodos,
        fromListActions.loadListFromList
      ),
      mergeMap(() =>
        this.todosService.getList(0).pipe(
          map((entities) => fromListActions.loadListSuccess({ entities })),
          catchError(() => of(fromListActions.loadListFailure()))
        )
      )
    )
  );
}
