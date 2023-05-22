import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-child-points',
  templateUrl: './child-points.component.html',
  styleUrls: ['./child-points.component.scss'],
})
export class ChildPointsComponent implements OnInit {
  public user: User | null = null;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;
  }
  // this.userService.refeshUserRequired.subscribe(() =>
  //   this.userService.getUserById(1).subscribe((loadedUser: User) => {
  //     this.user = loadedUser;
  //   })
  // );
}
