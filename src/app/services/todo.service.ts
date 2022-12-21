import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public tasksChanged = new Subject<Task[]>();

  private tasks: Task[] = [
    new Task('First task', false, 10, false),
    new Task('Another task', false, 20, false),
  ];

  public getTasks() {
    return this.tasks.slice();
  }

  public addTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }
}
