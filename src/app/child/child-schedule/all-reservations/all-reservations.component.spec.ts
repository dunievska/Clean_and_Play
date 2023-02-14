import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from 'src/app/services/error.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

import { AllReservationsComponent } from './all-reservations.component';

describe('AllReservationsComponent', () => {
  let component: AllReservationsComponent;
  let fixture: ComponentFixture<AllReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllReservationsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ScheduleService, UserService, ErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(AllReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
