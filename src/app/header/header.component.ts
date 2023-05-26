import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  public onTasks(): void {
    this.router.navigate(['todo'], { relativeTo: this.route });
  }
  public onReservations(): void {
    this.router.navigate(['reservations'], { relativeTo: this.route });
  }

  public onLogout(): void {
    this.userService.currentUser = null;
    this.userService.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
