import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation.model';
import { DateService } from 'src/app/services/date.service';
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
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.scheduleService
      .getAllReservations()
      .subscribe((loadedRes: Reservation[]) => {
        this.reservations = loadedRes;
        this.restartEditMode();
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
    form.reset();
  }

  private restartEditMode(): void {
    this.editModeArr = this.editModeArr = new Array(
      this.reservations.length
    ).fill(false);
  }
}
