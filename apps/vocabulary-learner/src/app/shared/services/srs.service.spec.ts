import { TestBed } from '@angular/core/testing';

import { SRSService } from './srs.service';

describe('SRSService', () => {
  let service: SRSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SRSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
