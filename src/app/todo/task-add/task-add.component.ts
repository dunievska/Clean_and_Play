import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent {
  constructor(private todoService: TodoService) {}

  public onSubmit(form: NgForm): void {
    const newTask = new Task(
      this.drawId(),
      form.value.name,
      false,
      +form.value.points,
      false
    );
    this.todoService.addTask(newTask);
    form.reset();
  }

  private drawId() {
    return Math.floor(Math.random() * 100000000);
  }
}
