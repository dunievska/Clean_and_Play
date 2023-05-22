import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

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
import { HeaderComponent } from './header/header.component';
import { ScheduleComponent } from './parent/schedule/schedule.component';
import { ReservationListComponent } from './parent/schedule/reservation-list/reservation-list.component';
import { ReservationAddComponent } from './parent/schedule/reservation-add/reservation-add.component';
import { ChildScheduleComponent } from './child/child-schedule/child-schedule.component';
import { AllReservationsComponent } from './child/child-schedule/all-reservations/all-reservations.component';
import { UserReservationsComponent } from './child/child-schedule/user-reservations/user-reservations.component';
import { ChildPointsComponent } from './child/child-points/child-points.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthComponent } from './auth/auth.component';

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
    HeaderComponent,
    ScheduleComponent,
    ReservationListComponent,
    ReservationAddComponent,
    ChildScheduleComponent,
    AllReservationsComponent,
    UserReservationsComponent,
    ChildPointsComponent,
    LoginPageComponent,
    AuthComponent,
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
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
