import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { DateService } from 'src/app/services/date.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ReservationAddComponent } from './reservation-add.component';

describe('ReservationAddComponent', () => {
  let component: ReservationAddComponent;
  let fixture: ComponentFixture<ReservationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationAddComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [ScheduleService, DateService],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
