import { TestBed } from '@angular/core/testing';

import { FillBlankSpaceExerciseService } from './fill-blank-space-exercise.service';

describe('FillBlankSpaceExerciseService', () => {
  let service: FillBlankSpaceExerciseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillBlankSpaceExerciseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
