import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss'],
})
export class AllReservationsComponent implements OnInit {
  public freeReservations: Reservation[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService
      .getReservationsWithoutOwner()
      .subscribe((loadedRes) => {
        this.freeReservations = this.sortReservationsByDate(loadedRes);
      });
  }

  private sortReservationsByDate(res: Reservation[]) {
    return res.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }

  public getHowLong(reservation: Reservation) {
    const time =
      new Date(reservation.end).getTime() -
      new Date(reservation.start).getTime();
    return Math.floor(time / 1000 / 60);
  }
}
