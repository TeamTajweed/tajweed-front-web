import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarStatistiqueComponent } from './vertical-bar-statistique.component';

describe('VerticalBarStatistiqueComponent', () => {
  let component: VerticalBarStatistiqueComponent;
  let fixture: ComponentFixture<VerticalBarStatistiqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalBarStatistiqueComponent]
    });
    fixture = TestBed.createComponent(VerticalBarStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
