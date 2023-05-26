import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, tap } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public refeshUserRequired = new Subject<void>();
  public isLoggedIn = new Subject<boolean>();
  public currentUser: User | null = null;
  private url: string = 'api/users';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  public logout(): void {
    this.isLoggedIn.next(false);
    this.currentUser = null;
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + `/${id}`);
  }

  public getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + `?email=${email}`);
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
