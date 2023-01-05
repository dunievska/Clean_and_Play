import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, tap } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public refeshUserRequired = new Subject<void>();
  private url: string = 'api/users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + `/${id}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(this.url + `/${user.id}`, user, this.httpOptions)
      .pipe(
        tap(() => {
          this.refeshUserRequired.next();
        })
      );
  }
}
