import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  @Input() selectedTask!: Task;
  @Input() index!: number;
  @Input() editModeArr: boolean[] = [];
  @Output() onModeChange = new EventEmitter<boolean[]>();

  constructor(private todoService: TodoService) {}

  public onSubmit(form: NgForm): void {
    const newTaskName = form.value.name;
    const newTaskPoints = +form.value.points;
    const updateTask = new Task(
      this.selectedTask.id,
      newTaskName,
      false,
      newTaskPoints,
      false
    );
    this.todoService.updateTask(updateTask);
    this.editModeArr[this.index] = false;
    this.onModeChange.emit(this.editModeArr);
  }
}
