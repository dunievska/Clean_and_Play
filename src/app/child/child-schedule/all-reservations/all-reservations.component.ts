import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { User } from 'src/app/models/user.model';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-reservations',
  templateUrl: './all-reservations.component.html',
  styleUrls: ['./all-reservations.component.scss'],
})
export class AllReservationsComponent implements OnInit {
  public freeReservations: Reservation[] = [];
  public user!: User;

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.scheduleService.getReservationsWithoutOwner().subscribe({
      next: (loadedRes) => {
        this.freeReservations = loadedRes;
      },
      error: () => this.errorService.displayAlertMessage(),
    });
    this.scheduleService.refreshReservationsRequired.subscribe(() => {
      this.scheduleService
        .getReservationsWithoutOwner()
        .subscribe(
          (loadedRes: Reservation[]) => (this.freeReservations = loadedRes)
        );
    });
    this.userService.getUserById(1).subscribe((loadedUser: User) => {
      this.user = loadedUser;
    });
  }

  onAdd(addedReservation: Reservation): void {
    if (this.user.points && this.getHowLong(addedReservation) <= this.user.points) {
      addedReservation.owner = this.user.id;
      addedReservation.hasOwner = true;
      this.scheduleService.updateReservation(addedReservation).subscribe(() => {
        this.freeReservations = this.freeReservations.filter(
          (r) => r !== addedReservation
        );
      });
      this.user.points = this.user.points - this.getHowLong(addedReservation);
      this.userService.updateUser(this.user).subscribe();
    } else {
      this.errorService.displayAlertMessage(`You don't have enough points`);
    }
  }

  public getHowLong(reservation: Reservation): number {
    const time =
      new Date(reservation.end).getTime() -
      new Date(reservation.start).getTime();
    return Math.floor(time / 1000 / 60);
  }
}
