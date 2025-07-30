import { TestBed } from '@angular/core/testing';

import { FolderGatewayService } from './folder-gateway.service';

describe('FolderGatewayService', () => {
  let service: FolderGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
