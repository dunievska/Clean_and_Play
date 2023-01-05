import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
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
  public user!: User;

  constructor(
    private todoService: TodoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.todoService.getTaskByOwner(1).subscribe((loadedTasks: Task[]) => {
      // in future add owner id, now is 1
      this.getCompletedTasks(loadedTasks);
      this.getNotCompletedTasks(loadedTasks);
    });
    this.todoService.refreshTasksRequired.subscribe(() => {
      this.todoService.getTaskByOwner(1).subscribe((loadedTasks: Task[]) => {
        // in future add owner id, now is 1
        this.getCompletedTasks(loadedTasks);
        this.getNotCompletedTasks(loadedTasks);
      });
    });
    this.userService.getUserById(1).subscribe((loadedUser: User) => {
      this.user = loadedUser;
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
    this.user.points = this.user.points + completedTask.points;
    this.userService.updateUser(this.user).subscribe();
  }

  private getCompletedTasks(tasks: Task[]): void {
    this.completedTasks = tasks.filter((t) => t.completed);
  }

  private getNotCompletedTasks(tasks: Task[]): void {
    this.notCompletedTasks = tasks.filter((t) => !t.completed);
  }
}
