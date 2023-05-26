import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
  public completedTasks: Task[] = [];
  public notCompletedTasks: Task[] = [];
  public user: User | null = null;

  constructor(
    private todoService: TodoService,
    private userService: UserService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.userService.refeshUserRequired.subscribe(() => {
      this.user = this.userService.currentUser;
    });
    this.user &&
      this.todoService.getTaskByOwner(this.user.id).subscribe({
        next: (loadedTasks: Task[]) => {
          this.getCompletedTasks(loadedTasks);
          this.getNotCompletedTasks(loadedTasks);
        },
        error: () => this.errorService.displayAlertMessage(),
      });
    this.todoService.refreshTasksRequired.subscribe(() => {
      this.user &&
        this.todoService
          .getTaskByOwner(this.user.id)
          .subscribe((loadedTasks: Task[]) => {
            this.getCompletedTasks(loadedTasks);
            this.getNotCompletedTasks(loadedTasks);
          });
    });
  }

  public onDelete(deletedTask: Task) {
    deletedTask.hasOwner = false;
    deletedTask.owner = null;
    this.todoService.updateTask(deletedTask).subscribe(() => {
      this.notCompletedTasks = this.notCompletedTasks.filter(
        (t) => t !== deletedTask
      );
    });
  }

  public onCheck(completedTask: Task): void {
    completedTask.completed = true;
    this.todoService.updateTask(completedTask).subscribe(() => {
      this.completedTasks.push(completedTask);
      this.notCompletedTasks = this.notCompletedTasks.filter(
        (t) => t !== completedTask
      );
    });
    if (this.user) {
      this.user.points = this.user.points + completedTask.points;
      this.userService.updateUser(this.user).subscribe();
    }
  }

  private getCompletedTasks(tasks: Task[]): void {
    this.completedTasks = tasks.filter((t) => t.completed);
  }

  private getNotCompletedTasks(tasks: Task[]): void {
    this.notCompletedTasks = tasks.filter((t) => !t.completed);
  }
}
