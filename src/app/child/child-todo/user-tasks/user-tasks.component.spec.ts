import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'src/app/services/error.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

import { UserTasksComponent } from './user-tasks.component';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  let fixture: ComponentFixture<UserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTasksComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoService, UserService, ErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
