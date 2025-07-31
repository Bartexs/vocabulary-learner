import { Injectable } from '@angular/core';
import { Flashcard } from '@vocabulary-learner/core/models/flashcard';
import { Observable } from 'rxjs';
import { FlashcardGatewayService } from './flashcard-gateway.service';
import { FlashcardDTO } from '@vocabulary-learner/core/models/flashcardDTO';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(
    private flashcardGateway: FlashcardGatewayService,
  ) { }

  getFlashcardsByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.flashcardGateway.getFlashcardsByLessonId(lessonId);
  }

  getFlashcardDTOsByLessonId(lessonId: number): Observable<FlashcardDTO[]> {
    return this.flashcardGateway.getFlashcardDTOsByLessonId(lessonId);
  }
}
