import { TestBed } from '@angular/core/testing';

import { QuranServiceService } from './quran-service.service';

describe('QuranServiceService', () => {
  let service: QuranServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuranServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
