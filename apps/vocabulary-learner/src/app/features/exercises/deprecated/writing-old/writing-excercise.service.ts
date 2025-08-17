import { Injectable } from '@angular/core';
import { Flashcard } from '../../../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class WritingExcerciseService {
  private flashcards: Flashcard[] = [];

  getFlashcard() {
    return this.flashcards;
  }

  saveFlashcard(userFlashcards: Flashcard[]) {
    this.flashcards = userFlashcards;
    console.log(this.flashcards);
  }
}
