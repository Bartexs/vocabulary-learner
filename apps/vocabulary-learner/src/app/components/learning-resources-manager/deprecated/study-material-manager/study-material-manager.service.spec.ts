import { TestBed } from '@angular/core/testing';

import { StudyMaterialManagerService } from './study-material-manager.service';

describe('StudyMaterialManagerService', () => {
  let service: StudyMaterialManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyMaterialManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
