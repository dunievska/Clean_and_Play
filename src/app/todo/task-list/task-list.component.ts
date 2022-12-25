import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';

import { TodoService } from 'src/app/services/todo.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  public editModeArr: boolean[] = [];
  public tasks: Task[] = [];
  public selectedTask!: Task;
  public selectedTaskId!: number;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTasks().subscribe((loadedTasks) => {
      this.tasks = loadedTasks;
      this.restartEditMode();
    });
    this.todoService.refreshTasksRequired.subscribe((response) => {
      this.todoService.getAllTasks().subscribe((loadedTasks) => {
        this.tasks = loadedTasks;
        this.restartEditMode();
      });
    });
  }

  public onEdit(task: Task, index: number): void {
    this.restartEditMode();
    this.editModeArr[index] = true;
    this.todoService.getTaskById(task.id).subscribe((loadedTask) => {
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
