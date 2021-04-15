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

  }

  markAsDone(id: number) {}

  handleCreated(todo: Todo) {

  }
}
