import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent {
  public pointsOptions: number[] = [10, 20, 30];
  constructor(private todoService: TodoService) {}

  public onSubmit(form: NgForm): void {
    const newTask = new Task(
      this.drawId(),
      form.value.name,
      false,
      +form.value.points,
      false,
      null
    );
    this.todoService.addTask(newTask);
    form.resetForm();
  }

  private drawId(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
