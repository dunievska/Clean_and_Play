import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTodoComponent } from './child-todo.component';

describe('ChildTodoComponent', () => {
  let component: ChildTodoComponent;
  let fixture: ComponentFixture<ChildTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildTodoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
