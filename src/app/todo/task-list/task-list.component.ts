import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/services/todo.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  public editMode: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.tasks = this.todoService.getTasks();
    this.todoService.tasksChanged.subscribe(
      (tasks: Task[]) => (this.tasks = tasks)
    );
  }

  onEdit() {}

  onDelete(index: number): void {
    this.todoService.deleteTask(index);
  }
}
