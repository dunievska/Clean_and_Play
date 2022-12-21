import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  constructor(private todoService: TodoService) {}

  public onSubmit(form: NgForm): void {
    const newTask = new Task(form.value.name, false, form.value.points, false);
    this.todoService.addTask(newTask);
    form.reset();
  }
}
