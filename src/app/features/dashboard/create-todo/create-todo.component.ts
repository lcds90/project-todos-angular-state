import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodosService } from 'src/app/shared/services/todos.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent {
  @Output() created = new EventEmitter();
  titleControl = new FormControl('');

  list!: Todo[];

  constructor(
    // private todosService: TodosService,
    private listService: ListService
  ) {
    listService.list$.subscribe(list => this.list = list);
  }

  save() {
    this.listService.create(this.titleControl.value)
  }
}
