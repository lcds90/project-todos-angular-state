import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LastTodosComponent } from './last-todos/last-todos.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ListComponent } from './list/list.component';

import { ListService } from './services/list.service';

import { listReducer } from './state/list.reducer';
import { ListEffects } from './state/list.effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
    ]),
    StoreModule.forFeature('list', listReducer),
    EffectsModule.forFeature([ListEffects]),
  ],
  declarations: [
    DashboardComponent,
    LastTodosComponent,
    ListComponent,
    CreateTodoComponent,
  ],
  providers: [ListService],
})
export class DashboardModule {}
