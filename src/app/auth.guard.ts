import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    if (this.userService.isLoggedIn && this.userService.currentUser != null) {
      this.userService?.currentUser.type === 'parent'
        ? this.router.navigate(['/parent'])
        : this.router.navigate(['/child']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
