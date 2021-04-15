import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from 'src/app/shared/models/todo.model';

import { AppState } from 'src/app/state/app.reducer';
import * as fromListAction from "../state/list.actions"
import * as fromListSelectors from "../state/list.selectors"
@Component({
  selector: 'app-last-todos',
  templateUrl: './last-todos.component.html',
  styleUrls: ['./last-todos.component.css'],
})
export class LastTodosComponent implements OnInit {
  list$!: Observable<Todo[]>;
  loading$!: Observable<boolean>;
  constructor(private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromListAction.loadListFromLastTodos());
    this.list$ = this.store.pipe(select(fromListSelectors.selectListEntites))
    this.loading$ = this.store.pipe(select(fromListSelectors.selectListLoading))
  }

  markAsDone(id: number) {}

  handleCreated(todo: Todo) {

  }
}
