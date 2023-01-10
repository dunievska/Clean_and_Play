import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public onTasks(): void {
    this.router.navigate(['todo'], { relativeTo: this.route });
  }
  public onReservations(): void {
    this.router.navigate(['reservations'], { relativeTo: this.route });
  }
}
