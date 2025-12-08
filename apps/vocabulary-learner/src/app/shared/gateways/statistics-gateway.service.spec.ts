import { TestBed } from '@angular/core/testing';

import { StatisticsGatewayService } from './statistics-gateway.service';

describe('StatisticsGatewayService', () => {
  let service: StatisticsGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
