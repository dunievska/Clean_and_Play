import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { UserService } from 'src/app/services/user.service';
import { ChildPointsComponent } from './child-points.component';

describe('ChildPointsComponent', () => {
  let component: ChildPointsComponent;
  let fixture: ComponentFixture<ChildPointsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChildPointsComponent],
      imports: [MatCardModule, RouterTestingModule, HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildPointsComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
