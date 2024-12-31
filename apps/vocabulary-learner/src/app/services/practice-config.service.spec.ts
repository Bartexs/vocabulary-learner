import { TestBed } from '@angular/core/testing';

import { PracticeConfigService } from './practice-config.service';

describe('PracticeConfigService', () => {
  let service: PracticeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
