import { TestBed } from '@angular/core/testing';

import { StudySessionService } from './study-session.service';

describe('StudySessionService', () => {
  let service: StudySessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudySessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
