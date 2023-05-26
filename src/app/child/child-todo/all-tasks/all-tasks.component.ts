import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { ErrorService } from 'src/app/services/error.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  public freeTasks: Task[] = [];

  constructor(
    private todoService: TodoService,
    private errorService: ErrorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.todoService.getTasksWithoutOwner().subscribe({
      next: (loadedTasks) => {
        this.freeTasks = loadedTasks;
      },
      error: () => this.errorService.displayAlertMessage(),
    });
    this.todoService.refreshTasksRequired.subscribe(() => {
      this.todoService.getTasksWithoutOwner().subscribe((loadedTasks) => {
        this.freeTasks = loadedTasks;
      });
    });
  }

  public onAdd(addedTask: Task) {
    addedTask = {
      ...addedTask,
      hasOwner: true,
      owner: this.userService.currentUser && this.userService.currentUser.id,
    };

    this.todoService.updateTask(addedTask).subscribe(() => {
      this.freeTasks = this.freeTasks.filter((f) => f !== addedTask);
    });
  }
}
