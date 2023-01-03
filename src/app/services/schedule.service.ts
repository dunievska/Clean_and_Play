import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public updateReservation(reservation: Reservation) {
    return this.http.put<Reservation>(
      this.url + '/' + reservation.id,
      reservation,
      this.httpOptions
    );
  }

  public addReservation(reservation: Reservation) {
    return this.http.post<Reservation>(this.url, reservation);
  }

  public deleteReservation(reservation: Reservation) {
    return this.http.delete<Reservation>(`${this.url}/${reservation.id}`);
  }
}
