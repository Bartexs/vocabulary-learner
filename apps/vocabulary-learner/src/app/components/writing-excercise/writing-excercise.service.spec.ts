import { TestBed } from '@angular/core/testing';

import { WritingExcerciseService } from './writing-excercise.service';

describe('WritingExcerciseService', () => {
  let service: WritingExcerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WritingExcerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
