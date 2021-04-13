import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodosService } from 'src/app/shared/services/todos.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-last-todos',
  templateUrl: './last-todos.component.html',
  styleUrls: ['./last-todos.component.css'],
})
export class LastTodosComponent implements OnInit {
  list!: Todo[];
  constructor(
    // private todosService: TodosService,
    private listService: ListService
  ) {}

  ngOnInit(): void {

    // concetrando apenas no service
    this.listService.getList(0);
    this.listService.list$
      .subscribe(list => this.list = list.slice(0, 10));

    // implementação com hot observables
/*     this.listService.list$.subscribe((list) => {
      if (!list || !list.length) {
        this.todosService
          .getList(0)
          .subscribe((list) => (this.listService.list = list));
      } else {
        this.list = list.slice(0, 10);
      }
    }); */

    // melhorando req com usuarios
    /* if(!this.listService.list){
      this.todosService.getList(0)
    .subscribe(list => {
      this.list = list;
      this.listService.list = list
    })
    } else {
      this.list = this.listService.list.slice(0, 10)
    } */
  }

  markAsDone(id: number) {}

  handleCreated(todo: Todo) {
    this.list = [todo, ...this.list];
  }
}
