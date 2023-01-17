import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation.model';
import { DateService } from 'src/app/services/date.service';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  public reservations: Reservation[] = [];
  public editModeArr: boolean[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private dateService: DateService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.scheduleService.getAllReservations().subscribe({
      next: (loadedRes: Reservation[]) => {
        this.reservations = loadedRes;
        this.restartEditMode();
      },
      error: () => this.errorService.displayAlertMessage(),
    });
    this.scheduleService.refreshReservationsRequired.subscribe(() => {
      this.scheduleService
        .getAllReservations()
        .subscribe((loadedRes: Reservation[]) => {
          this.reservations = loadedRes;
          this.restartEditMode();
        });
    });
  }

  public getHowLong(reservation: Reservation): number {
    const time =
      new Date(reservation.end).getTime() -
      new Date(reservation.start).getTime();
    return Math.floor(time / 1000 / 60);
  }

  public onDelete(deletedRes: Reservation): void {
    this.scheduleService.deleteReservation(deletedRes).subscribe(() => {
      this.reservations = this.reservations.filter((r) => r !== deletedRes);
    });
  }

  public onEdit(index: number): void {
    this.editModeArr[index] = true;
  }

  public onCancel(): void {
    this.restartEditMode();
  }

  public onSubmit(editedRes: Reservation, form: NgForm): void {
    editedRes.start = this.dateService.setDateStart(form);
    editedRes.end = this.dateService.setDateEnd(form);
    this.scheduleService.updateReservation(editedRes).subscribe();
    this.restartEditMode();
    form.resetForm();
  }

  private restartEditMode(): void {
    this.editModeArr = this.editModeArr = new Array(
      this.reservations.length
    ).fill(false);
  }
}
