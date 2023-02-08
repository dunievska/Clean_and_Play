import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let linkDes: any;
  let routerLinks: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, RouterLinkDirectiveStub],
      imports: [MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkDirectiveStub)
    );
    routerLinks = linkDes.map((de: any) =>
      de.injector.get(RouterLinkDirectiveStub)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get RouterLinks from template', () => {
    expect(routerLinks.length).withContext('should have 2 routerLinks').toBe(2);
    expect(routerLinks[0].linkParams).toBe('/child/todo');
    expect(routerLinks[1].linkParams).toBe('/parent/todo');
  });

  it('should navigate to the child route when clicking on the child link', () => {
    const childLinkDe = linkDes[0];
    const childLink = routerLinks[0];

    expect(childLink.navigatedTo)
      .withContext('should not have navigated yet')
      .toBeNull();

    childLinkDe.triggerEventHandler('click');
    fixture.detectChanges();

    expect(childLink.navigatedTo).toBe('/child/todo');
  });

  it('should navigate to the parent route when clicking on the parent link', () => {
    const parentLinkDe = linkDes[1];
    const parentLink = routerLinks[1];

    expect(parentLink.navigatedTo)
      .withContext('should not have navigated yet')
      .toBeNull();

    parentLinkDe.triggerEventHandler('click');
    fixture.detectChanges();

    expect(parentLink.navigatedTo).toBe('/parent/todo');
  });
});
