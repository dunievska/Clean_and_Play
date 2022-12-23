import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TaskListComponent } from './todo/task-list/task-list.component';
import { TaskAddComponent } from './todo/task-add/task-add.component';
import { FormsModule } from '@angular/forms';
import { TaskEditComponent } from './todo/task-list/task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskListComponent,
    TaskAddComponent,
    TaskEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
