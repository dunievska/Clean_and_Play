import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public refreshTasksRequired = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`/api/tasks/${id}`);
  }

  public getTasksWithoutOwner(): Observable<Task[]> {
    return this.http.get<Task[]>(`/api/tasks?hasOwner=false`);
  }

  public getTaskByOwner(ownerId: number): Observable<Task[]> {
    return this.http.get<Task[]>('api/tasks', {
      params: new HttpParams().set('owner', ownerId),
    });
  }

  public addTask(task: Task) {
    this.http
      .post<Task>('/api/tasks', task)
      .pipe(
        tap(() => {
          this.refreshTasksRequired.next();
        })
      )
      .subscribe();
  }

  public updateTask(task: Task) {
    return this.http
      .put<Task>('/api/tasks/' + task.id, task, this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshTasksRequired.next();
        })
      );
  }

  public deleteTaskById(id: number) {
    return this.http.delete<Task>(`/api/tasks/${id}`);
  }
}
