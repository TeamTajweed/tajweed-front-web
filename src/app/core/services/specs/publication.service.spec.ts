import { TestBed } from '@angular/core/testing';

import { PublicationService } from '../publication.service';

describe('EntityService', () => {
  let publication: PublicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    publication = TestBed.inject(PublicationService);
  });

  it('should be created', () => {
    expect(publication).toBeTruthy();
  });
});
