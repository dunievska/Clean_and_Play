import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ChildScheduleComponent } from './child-schedule.component';

@Component({ selector: 'app-all-reservations', template: '' })
class AllReservationsStubComponent {}

@Component({ selector: 'app-user-reservations', template: '' })
class UserReservationsStubComponent {}

describe('ChildScheduleComponent', () => {
  let component: ChildScheduleComponent;
  let fixture: ComponentFixture<ChildScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChildScheduleComponent,
        AllReservationsStubComponent,
        UserReservationsStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
