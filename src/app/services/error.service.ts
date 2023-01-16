import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public displayAlertMessage(
    message: string = 'Something goes wrong. Please try later'
  ) {
    alert(message);
  }
}
