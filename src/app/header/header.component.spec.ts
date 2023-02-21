import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let buttons: NodeListOf<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatCardModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Testing button Change profile
  it('should display the correct text for the "Change profile" button', () => {
    expect(buttons[0].textContent).toContain('Change profile');
  });

  // Testing button Tasks

  it('should display the correct text for the "Tasks" button', () => {
    expect(buttons[1].textContent).toContain('Tasks');
  });

  it('should call onTasks when button is clicked', () => {
    spyOn(component, 'onTasks');
    buttons[1].click();
    expect(component.onTasks).toHaveBeenCalled();
  });

  it('should navigate to "todo" when onTasks method is called', () => {
    spyOn(router, 'navigate');
    component.onTasks();
    expect(router.navigate).toHaveBeenCalledWith(['todo'], {
      relativeTo: route,
    });
  });

  // Testing button Reservations

  it('should display the correct text for the "Reservations" button', () => {
    expect(buttons[2].textContent).toContain('Reservations');
  });

  it('should call onReservations when button is clicked', () => {
    spyOn(component, 'onReservations');
    buttons[2].click();

    expect(component.onReservations).toHaveBeenCalled();
  });

  it('should navigate to "reservations" when onReservations method is called', () => {
    spyOn(router, 'navigate');
    component.onReservations();
    expect(router.navigate).toHaveBeenCalledWith(['reservations'], {
      relativeTo: route,
    });
  });
});
