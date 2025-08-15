import { Injectable } from '@angular/core';
import { Flashcard } from '@vocabulary-learner/core/models/flashcard';
import { Observable } from 'rxjs';
import { FlashcardGatewayService } from './flashcard-gateway.service';
import { Lesson } from '@vocabulary-learner/core/models/lessons';
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
  
  addFlashcards(lessonId: number, flashcards: Flashcard[]): Observable<Lesson> {

    const flashcardsDTO: FlashcardDTO[] = [];

    flashcards.forEach(flashcard => {
      const f: FlashcardDTO = {
        id: 0,
        front: flashcard.frontSide,
        back: flashcard.backSide
      }

      flashcardsDTO.push(f);
    })

    return this.flashcardGateway.addFlashcards(lessonId, flashcardsDTO);
  }
}
