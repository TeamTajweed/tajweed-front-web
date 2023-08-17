import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularStatisticalGraphicComponent } from './circular-statistical-graphic.component';

describe('CircularStatisticalGraphicComponent', () => {
  let component: CircularStatisticalGraphicComponent;
  let fixture: ComponentFixture<CircularStatisticalGraphicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularStatisticalGraphicComponent]
    });
    fixture = TestBed.createComponent(CircularStatisticalGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
