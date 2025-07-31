import { TestBed } from '@angular/core/testing';

import { FlashcardGatewayService } from './flashcard-gateway.service';

describe('FlashcardGatewayService', () => {
  let service: FlashcardGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
