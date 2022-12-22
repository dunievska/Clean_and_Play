import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent {
  @Input() selectedTaskIndex!: number;
  @Output() onModeChange = new EventEmitter<boolean>();
  editMode!: boolean;

  constructor(private todoService: TodoService) {}

  public onSubmit(form: NgForm) {
    const newTaskName = form.value.name;
    const newTaskPoints = form.value.points;
    this.todoService.updateTask(
      this.selectedTaskIndex,
      newTaskName,
      newTaskPoints
    );
    this.editMode = false;
    this.onModeChange.emit(this.editMode);
  }
}
