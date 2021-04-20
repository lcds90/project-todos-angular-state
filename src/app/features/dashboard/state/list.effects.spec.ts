import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from "rxjs"
import { Action } from '@ngrx/store';
import { ListEffects } from "./list.effects";
import { listInitialState } from "./list.reducer";
import { TodosService } from "src/app/shared/services/todos.service";
import { Todo } from "src/app/shared/models/todo.model";
import { cold, hot } from "jasmine-marbles";

import * as fromListActions from './list.actions';


describe("ListEffects", ()=> {
    let actions$: Observable<Action>;
    let effects: ListEffects;
    let store: MockStore<any>;
    let service: TodosService;



    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            ListEffects,
            provideMockActions(() => actions$),
            provideMockStore({ initialState: { list: listInitialState } }),
            {
              provide: TodosService,
              useValue: {
                getList: () => {},
              },
            },
          ],
        });
    
        effects = TestBed.inject(ListEffects);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(TodosService);
      });

      describe("Load Lists", ()=> {
          it("should return #loadListSuccess", () => {
              spyOn(service, 'getList').and.returnValue(of([]))

              actions$ = hot("a", {a: fromListActions.loadListFromLastTodos})
              const expected = cold("b", {b: fromListActions.loadListSuccess({entities: []})})

              expect(effects.loadList$).toBeObservable(expected)
          })

          it("should return #loadListFailure", () => {
              spyOn(service, 'getList').and.returnValue(throwError({}))

              actions$ = hot("a", {a: fromListActions.loadListFromLastTodos})
              const expected = cold("b", {b: fromListActions.loadListFailure()})

              expect(effects.loadList$).toBeObservable(expected)
          })
      })
})