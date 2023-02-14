import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ScheduleComponent } from './schedule.component';

@Component({ selector: 'app-reservation-add', template: '' })
class ReservationAddStubComponent {}

@Component({ selector: 'app-reservation-list', template: '' })
class ReservationListStubComponent {}

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ScheduleComponent,
        ReservationListStubComponent,
        ReservationAddStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
