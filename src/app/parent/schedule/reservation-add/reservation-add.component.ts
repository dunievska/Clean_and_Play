import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss'],
})
export class ReservationAddComponent {
  public onSubmit(form: NgForm) {
    const start = this.setDateStart(form);
    const end = this.setDateEnd(form);
    const newReservation = new Reservation(start, end);
  }

  private setDateStart(form: NgForm) {
    const startHour = form.value.start;
    const hour = startHour.split(':');
    const day = form.value.day;
    return new Date(day.setHours(...hour));
  }

  private setDateEnd(form: NgForm) {
    const howLong = +form.value.time;
    const startHour = form.value.start;
    const hour = startHour.split(':');
    return new Date(form.value.day.setHours(...hour, howLong * 60));
  }
}
