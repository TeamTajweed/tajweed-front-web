import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarstudentsComponent } from './navbarstudents.component';

describe('NavbarstudentsComponent', () => {
  let component: NavbarstudentsComponent;
  let fixture: ComponentFixture<NavbarstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarstudentsComponent]
    });
    fixture = TestBed.createComponent(NavbarstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
