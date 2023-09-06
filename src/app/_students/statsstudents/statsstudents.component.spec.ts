import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsstudentsComponent } from './statsstudents.component';

describe('StatsstudentsComponent', () => {
  let component: StatsstudentsComponent;
  let fixture: ComponentFixture<StatsstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsstudentsComponent]
    });
    fixture = TestBed.createComponent(StatsstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
