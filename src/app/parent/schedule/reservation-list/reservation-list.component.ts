import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation';
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
    this.scheduleService.getAllReservations().subscribe((loadedRes) => {
      this.reservations = this.sortReservationsByDate(loadedRes);
      this.restartEditMode();
    });
  }

  public getHowLong(reservation: Reservation) {
    const time =
      new Date(reservation.end).getTime() -
      new Date(reservation.start).getTime();
    return Math.floor(time / 1000 / 60);
  }

  public onEdit(selectedRes: Reservation, index: number) {
    this.editModeArr[index] = true;
  }

  private sortReservationsByDate(res: Reservation[]) {
    return res.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  }

  private restartEditMode(): void {
    this.editModeArr = this.editModeArr = new Array(
      this.reservations.length
    ).fill(false);
  }
}
