import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  public freeTasks: Task[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTasksWithoutOwner().subscribe((loadedTasks) => {
      this.freeTasks = loadedTasks;
    });
    this.todoService.refreshTasksRequired.subscribe(() => {
      this.todoService.getTasksWithoutOwner().subscribe((loadedTasks) => {
        this.freeTasks = loadedTasks;
      });
    });
  }

  public onAdd(addedTask: Task) {
    addedTask.hasOwner = true;
    this.todoService.updateTask(addedTask);
    // add refreshing list of free tasks
  }
}
