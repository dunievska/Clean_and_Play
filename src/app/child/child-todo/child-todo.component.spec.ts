import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChildTodoComponent } from './child-todo.component';

@Component({ selector: 'app-all-tasks', template: '' })
class AllTasksStubComponent {}

@Component({ selector: 'app-user-tasks', template: '' })
class UserTasksStubComponent {}

describe('ChildTodoComponent', () => {
  let component: ChildTodoComponent;
  let fixture: ComponentFixture<ChildTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChildTodoComponent,
        AllTasksStubComponent,
        UserTasksStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
