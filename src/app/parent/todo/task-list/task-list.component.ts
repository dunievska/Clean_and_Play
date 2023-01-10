import { Component, OnInit } from '@angular/core';

import { TodoService } from 'src/app/services/todo.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public editModeArr: boolean[] = [];
  public tasks: Task[] = [];
  public selectedTask!: Task;
  public selectedTaskId!: number;
  public completedTasks: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTasks().subscribe((loadedTasks: Task[]) => {
      this.tasks = loadedTasks.filter((t) => !t.completed);
      this.completedTasks = loadedTasks.filter((t) => t.completed);
      this.restartEditMode();
    });
    this.todoService.refreshTasksRequired.subscribe(() => {
      this.todoService.getAllTasks().subscribe((loadedTasks: Task[]) => {
        this.tasks = loadedTasks.filter((t) => !t.completed);
        this.completedTasks = loadedTasks.filter((t) => t.completed);
        this.restartEditMode();
      });
    });
  }

  public onEdit(task: Task, index: number): void {
    this.restartEditMode();
    this.editModeArr[index] = true;
    this.todoService.getTaskById(task.id).subscribe((loadedTask: Task) => {
      if (loadedTask) this.selectedTask = loadedTask;
    });
  }

  public onDelete(task: Task): void {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.todoService.deleteTaskById(task.id).subscribe();
  }

  public changeMode(editModeArr: boolean[]): void {
    this.editModeArr = editModeArr;
  }

  private restartEditMode(): void {
    this.editModeArr = this.editModeArr = new Array(this.tasks.length).fill(
      false
    );
  }
}
