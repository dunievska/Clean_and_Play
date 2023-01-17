import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private url: string = 'api/reservations';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public refreshReservationsRequired = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getAllReservations(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.url)
      .pipe(
        map((reservations: Reservation[]) =>
          this.sortReservationsByDate(reservations)
        )
      );
  }

  public getReservationsWithoutOwner(): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.url, {
        params: new HttpParams().set('hasOwner', false),
      })
      .pipe(
        map((reservations: Reservation[]) =>
          this.sortReservationsByDate(reservations)
        )
      );
  }

  public getReservationByOwner(ownerId: number): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.url, {
        params: new HttpParams().set('owner', ownerId),
      })
      .pipe(
        map((reservations: Reservation[]) =>
          this.sortReservationsByDate(reservations)
        )
      );
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http
      .put<Reservation>(
        this.url + '/' + reservation.id,
        reservation,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.refreshReservationsRequired.next();
        })
      );
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation).pipe(
      tap(() => {
        this.refreshReservationsRequired.next();
      })
    );
  }

  public deleteReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.delete<Reservation>(`${this.url}/${reservation.id}`).pipe(
      tap(() => {
        this.refreshReservationsRequired.next();
      })
    );
  }

  private sortReservationsByDate(res: Reservation[]): Reservation[] {
    return res.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }
}
