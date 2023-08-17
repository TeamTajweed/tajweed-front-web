import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineStatisticalGraphicComponent } from './line-statistical-graphic.component';

describe('LineStatisticalGraphicComponent', () => {
  let component: LineStatisticalGraphicComponent;
  let fixture: ComponentFixture<LineStatisticalGraphicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineStatisticalGraphicComponent]
    });
    fixture = TestBed.createComponent(LineStatisticalGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
