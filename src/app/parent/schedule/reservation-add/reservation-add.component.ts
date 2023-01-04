import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss'],
})
export class ReservationAddComponent {
  constructor(private scheduleService: ScheduleService) {}

  public onSubmit(form: NgForm) {
    const start = this.setDateStart(form);
    const end = this.setDateEnd(form);
    const id = this.drawId();
    const newReservation = new Reservation(id, start, end, false, null);
    this.scheduleService.addReservation(newReservation).subscribe();
    form.reset();
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

  private drawId() {
    return Math.floor(Math.random() * 100000000);
  }
}
