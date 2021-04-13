import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodosService } from 'src/app/shared/services/todos.service';

@Injectable()
export class ListService {
  page = 0;

  constructor(private todosService: TodosService) {}
  // Hot Observables

  private listSubject = new BehaviorSubject<Todo[]>([]);

  get list$(): Observable<Todo[]> {
    return this.listSubject.asObservable();
  }

  set list(value: Todo[]) {
    this.listSubject.next(value);
  }

  create(title: string) {
    this.todosService
      .create({ title })
      .subscribe((todo) => (this.list = [todo, ...this.listSubject.value]));
  }

  getList(page: number) {
    this.todosService.getList(page).subscribe((list) => {
      if (page === 0) {
        this.list = list;
      } else {
        this.list = [...this.listSubject.value, ...list];
      }
    });
  }

  /*     private _list!: Todo[]


    get list(): Todo[]{
        return this._list
    }

    set list(value: Todo[]){
        this._list = value
    } */
}
