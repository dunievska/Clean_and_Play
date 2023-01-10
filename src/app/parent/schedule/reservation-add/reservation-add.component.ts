import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation.model';
import { DateService } from 'src/app/services/date.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss'],
})
export class ReservationAddComponent {
  constructor(
    private scheduleService: ScheduleService,
    private dateService: DateService
  ) {}

  public onSubmit(form: NgForm): void {
    const start = this.dateService.setDateStart(form);
    const end = this.dateService.setDateEnd(form);
    const id = this.drawId();
    const newReservation = new Reservation(id, start, end, false, null);
    this.scheduleService.addReservation(newReservation).subscribe();
    form.reset();
  }

  private drawId(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
