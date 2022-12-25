import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`/api/tasks/${id}`);
  }

  public addTask(task: Task) {
    this.http.post('/api/tasks', task).subscribe();
  }

  public updateTask(task: Task) {
    return this.http
      .put('/api/tasks/' + task.id, task, this.httpOptions)
      .subscribe();
  }

  public deleteTaskById(id: number) {
    return this.http.delete<Task>(`/api/tasks/${id}`);
  }
}
