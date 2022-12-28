import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './parent/todo/todo.component';
import { TaskListComponent } from './parent/todo/task-list/task-list.component';
import { TaskAddComponent } from './parent/todo/task-add/task-add.component';
import { TaskEditComponent } from './parent/todo/task-list/task-edit/task-edit.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { UserTasksComponent } from './child/child-todo/user-tasks/user-tasks.component';
import { ChildTodoComponent } from './child/child-todo/child-todo.component';
import { AllTasksComponent } from './child/child-todo/all-tasks/all-tasks.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TaskListComponent,
    TaskAddComponent,
    TaskEditComponent,
    ParentComponent,
    ChildComponent,
    ChildTodoComponent,
    UserTasksComponent,
    AllTasksComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
