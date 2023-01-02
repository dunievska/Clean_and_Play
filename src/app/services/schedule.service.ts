import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private url = 'api/reservations';

  constructor(private http: HttpClient) {}

  public addReservation(reservation: Reservation) {
    return this.http.post<Reservation>(this.url, reservation);
  }
}
