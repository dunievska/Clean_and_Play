import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss'],
})
export class UserReservationsComponent implements OnInit {
  public userReservations: Reservation[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getReservationByOwner(1).subscribe((loadedRes) => {
      this.userReservations = this.sortReservationsByDate(loadedRes);
    });
    this.scheduleService.refreshReservationsRequired.subscribe(() => {
      this.scheduleService.getReservationByOwner(1).subscribe((loadedRes) => {
        this.userReservations = this.sortReservationsByDate(loadedRes);
      });
    });
  }

  public onDelete(deletedReservation: Reservation): void {
    deletedReservation.hasOwner = false;
    deletedReservation.owner = null;
    this.scheduleService.updateReservation(deletedReservation).subscribe(() => {
      this.userReservations = this.userReservations.filter(
        (r) => r !== deletedReservation
      );
    });
  }

  public getHowLong(reservation: Reservation): number {
    const time =
      new Date(reservation.end).getTime() -
      new Date(reservation.start).getTime();
    return Math.floor(time / 1000 / 60);
  }

  private sortReservationsByDate(res: Reservation[]): Reservation[] {
    return res.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }
}
