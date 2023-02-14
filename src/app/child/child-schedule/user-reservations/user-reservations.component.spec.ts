import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserReservationsComponent } from './user-reservations.component';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';

describe('UserReservationsComponent', () => {
  let component: UserReservationsComponent;
  let fixture: ComponentFixture<UserReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReservationsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ScheduleService, UserService, ErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
