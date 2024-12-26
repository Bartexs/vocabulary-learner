import { Injectable } from '@angular/core';
import { Flashcard } from '../../../models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class WritingExcerciseService {
  private flashcards: Flashcard[] = [
    { id: 1, frontSide: 'What is Angular?', backSide: 'A front-end framework.' },
    { id: 2, frontSide: 'What is TypeScript?', backSide: 'A superset of JavaScript.' },
  ]

  getFlashcard() {
    return this.flashcards;
  }

  saveFlashcard(userFlashcards: Flashcard[]) {
    this.flashcards = userFlashcards;
    console.log(this.flashcards);
  }
}
