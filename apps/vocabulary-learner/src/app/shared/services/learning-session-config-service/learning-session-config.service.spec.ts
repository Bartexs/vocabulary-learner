import { TestBed } from '@angular/core/testing';

import { LearningSessionConfigService } from './learning-session-config.service';

describe('LearningSessionConfigService', () => {
  let service: LearningSessionConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningSessionConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
