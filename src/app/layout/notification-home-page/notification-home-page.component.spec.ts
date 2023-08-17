import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHomePageComponent } from './notification-home-page.component';

describe('NotificationHomePageComponent', () => {
  let component: NotificationHomePageComponent;
  let fixture: ComponentFixture<NotificationHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationHomePageComponent]
    });
    fixture = TestBed.createComponent(NotificationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
