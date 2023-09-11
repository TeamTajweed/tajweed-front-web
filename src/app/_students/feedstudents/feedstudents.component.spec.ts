import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedstudentsComponent } from './feedstudents.component';

describe('FeedstudentsComponent', () => {
  let component: FeedstudentsComponent;
  let fixture: ComponentFixture<FeedstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedstudentsComponent]
    });
    fixture = TestBed.createComponent(FeedstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
