import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  public userTasks: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTaskByOwner(1).subscribe((loadedTasks: Task[]) => {
      // in future add owner id, now is 1
      this.userTasks = loadedTasks;
    });
  }
}
