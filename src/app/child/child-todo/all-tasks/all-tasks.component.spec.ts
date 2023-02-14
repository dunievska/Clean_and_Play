import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'src/app/services/error.service';
import { TodoService } from 'src/app/services/todo.service';

import { AllTasksComponent } from './all-tasks.component';

describe('TaskListComponent', () => {
  let component: AllTasksComponent;
  let fixture: ComponentFixture<AllTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTasksComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoService, ErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(AllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
