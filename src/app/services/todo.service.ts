import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private tasks: Task[] = [
    new Task('First task', false, 10, false),
    new Task('Another task', false, 20, false),
  ];

  getTasks() {
    return this.tasks.slice();
  }
}
