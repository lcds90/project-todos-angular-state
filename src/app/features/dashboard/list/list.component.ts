import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodosService } from 'src/app/shared/services/todos.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list!: Todo[];

  constructor(private todosService: TodosService, private listService: ListService) { }

  ngOnInit(): void {
    this.listService.list$
    .subscribe(list => this.list = list);
  }

  markAsDone(id: number){
    this.todosService.toggleDone(id)
    .subscribe(todo => {
      this.list = this.list.map(item => item.id === todo.id ? todo : item)
    })
  }

  onDelete(id: number){
    this.todosService.remove(id)
    .subscribe(()=> this.list = this.list.filter(item => item.id !== id))
  }

  loadMore(){
    this.listService.page++;
    this.todosService.getList(this.listService.page)
    .subscribe(list => {
      this.listService.list = [...this.list, ...list];
    });
  }

}
