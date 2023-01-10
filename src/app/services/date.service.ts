import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public setDateStart(form: NgForm): Date {
    const startHour = form.value.start;
    const hour = startHour.split(':');
    const day = form.value.day;
    return new Date(day.setHours(...hour));
  }

  public setDateEnd(form: NgForm): Date {
    const howLong = +form.value.time;
    const startHour = form.value.start;
    const hour = startHour.split(':');
    return new Date(form.value.day.setHours(...hour, howLong * 60));
  }
}
