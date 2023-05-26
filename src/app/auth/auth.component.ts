import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn && this.userService.currentUser != null) {
      this.userService?.currentUser.type === 'parent'
        ? this.router.navigate(['/parent/todo'])
        : this.router.navigate(['/child/todo']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
