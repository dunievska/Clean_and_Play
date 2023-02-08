import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TodoComponent } from './todo.component';

@Component({ selector: 'app-task-add', template: '' })
class TaskAddStubComponent {}

@Component({ selector: 'app-task-list', template: '' })
class TaskListStubComponent {}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoComponent,
        TaskAddStubComponent,
        TaskListStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
