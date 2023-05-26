import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  getErrorEmail(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword(): string {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  onLogin(): void {
    const email = this.email.value;
    const password = this.password.value;
    if (email && password) {
      this.userService.getUserByEmail(email).subscribe((data) => {
        const [user] = data;
        console.log(user);
        if (user.password === password) {
          this.userService.isLoggedIn.next(true);
          this.userService.currentUser = user;
          this.router.navigate(['/home']);
        }
      });
    }
  }
}
