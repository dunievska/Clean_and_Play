import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss'],
})
export class UserReservationsComponent implements OnInit {
  public userReservations: Reservation[] = [];
  public user: User | null = null;

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
    this.userService.refeshUserRequired.subscribe(() => {
      this.user = this.userService.currentUser;
    });
    this.user &&
      this.scheduleService.getReservationByOwner(this.user.id).subscribe({
        next: (loadedRes: Reservation[]) => {
          this.userReservations = loadedRes;
        },
        error: () => this.errorService.displayAlertMessage(),
      });
    this.scheduleService.refreshReservationsRequired.subscribe(() => {
      this.user &&
        this.scheduleService
          .getReservationByOwner(this.user.id)
          .subscribe((loadedRes: Reservation[]) => {
            this.userReservations = loadedRes;
          });
    });
  }

  public onDelete(deletedReservation: Reservation): void {
    if (this.user?.points)
      this.user.points =
        this.user?.points + this.getHowLong(deletedReservation);
    this.user && this.userService.updateUser(this.user).subscribe();
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
}
