import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPointsComponent } from './child-points.component';

describe('ChildPointsComponent', () => {
  let component: ChildPointsComponent;
  let fixture: ComponentFixture<ChildPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
