import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation.model';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss'],
})
export class ReservationListComponent implements OnInit {
  public reservations: Reservation[] = [];
  public editModeArr: boolean[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService
      .getAllReservations()
      .subscribe((loadedRes: Reservation[]) => {
        this.reservations = this.sortReservationsByDate(loadedRes);
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
    editedRes.start = this.setDateStart(form);
    editedRes.end = this.setDateEnd(form);
    this.scheduleService.updateReservation(editedRes).subscribe();
    this.restartEditMode();
    form.reset();
  }

  private sortReservationsByDate(res: Reservation[]): Reservation[] {
    return res.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }

  private restartEditMode(): void {
    this.editModeArr = this.editModeArr = new Array(
      this.reservations.length
    ).fill(false);
  }

  private setDateStart(form: NgForm): Date {
    const startHour = form.value.start;
    const hour = startHour.split(':');
    const day = form.value.day;
    return new Date(day.setHours(...hour));
  }

  private setDateEnd(form: NgForm): Date {
    const howLong = +form.value.time;
    const startHour = form.value.start;
    const hour = startHour.split(':');
    return new Date(form.value.day.setHours(...hour, howLong * 60));
  }
}
