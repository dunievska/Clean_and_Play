import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildScheduleComponent } from './child/child-schedule/child-schedule.component';
import { ChildTodoComponent } from './child/child-todo/child-todo.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { ScheduleComponent } from './parent/schedule/schedule.component';
import { TodoComponent } from './parent/todo/todo.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },

  { path: 'home', component: AuthComponent },
  {
    path: 'parent',
    component: ParentComponent,
    children: [
      { path: 'todo', component: TodoComponent },
      { path: 'reservations', component: ScheduleComponent },
    ],
  },
  {
    path: 'child',
    component: ChildComponent,
    children: [
      { path: 'todo', component: ChildTodoComponent },
      { path: 'reservations', component: ChildScheduleComponent },
    ],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
