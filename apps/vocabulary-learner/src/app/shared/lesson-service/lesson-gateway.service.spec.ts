import { TestBed } from '@angular/core/testing';

import { LessonGatewayService } from './lesson-gateway.service';

describe('LessonGatewayService', () => {
  let service: LessonGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
