import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url: string = '/api/tasks';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public refreshTasksRequired = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  public getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`);
  }

  public getTasksWithoutOwner(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url, {
      params: new HttpParams().set('hasOwner', false),
    });
  }

  public getTaskByOwner(ownerId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.url, {
      params: new HttpParams().set('owner', ownerId),
    });
  }

  public addTask(task: Task): void {
    this.http
      .post<Task>(this.url, task)
      .pipe(
        tap(() => {
          this.refreshTasksRequired.next();
        })
      )
      .subscribe();
  }

  public updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(this.url + '/' + task.id, task, this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshTasksRequired.next();
        })
      );
  }

  public deleteTaskById(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${id}`);
  }
}
