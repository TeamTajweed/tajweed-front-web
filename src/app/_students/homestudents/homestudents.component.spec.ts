import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomestudentsComponent } from './homestudents.component';

describe('HomestudentsComponent', () => {
  let component: HomestudentsComponent;
  let fixture: ComponentFixture<HomestudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomestudentsComponent]
    });
    fixture = TestBed.createComponent(HomestudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
