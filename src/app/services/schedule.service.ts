import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private url = 'api/reservations';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url);
  }

  public getReservationsWithoutOwner(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url, {
      params: new HttpParams().set('hasOwner', false),
    });
  }

  public getReservationByOwner(ownerId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url, {
      params: new HttpParams().set('owner', ownerId),
    });
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(
      this.url + '/' + reservation.id,
      reservation,
      this.httpOptions
    );
  }

  public addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.url, reservation);
  }

  public deleteReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.delete<Reservation>(`${this.url}/${reservation.id}`);
  }
}
