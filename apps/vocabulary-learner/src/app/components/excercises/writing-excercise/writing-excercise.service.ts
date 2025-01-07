import { Injectable } from '@angular/core';
import { Flashcard } from '../../../models/flashcard';
import { FlashcardExamHistory } from '../../../models/flashcard-exam-history';

@Injectable({
  providedIn: 'root'
})
export class WritingExcerciseService {
  private flashcards: Flashcard[] = [];

  constructor() {
    this.flashcards = this.generateDefaultFlashcard();
  }

  generateDefaultFlashcard(): Flashcard[] {
    const flashcardExamHistory: FlashcardExamHistory = {
      correctExamAnswersDates: [],
      correctExamAnswersAmount: 0,
      flashcardMastered: false
    }

    const flashcards: Flashcard[] = [
      { id: 1, frontSide: 'What is Angular?', backSide: 'A front-end framework.', flashcardExamHistory },
      { id: 2, frontSide: 'What is TypeScript?', backSide: 'A superset of JavaScript.', flashcardExamHistory },
    ]
  
    return flashcards;
  }

  getFlashcard() {
    return this.flashcards;
  }

  saveFlashcard(userFlashcards: Flashcard[]) {
    this.flashcards = userFlashcards;
    console.log(this.flashcards);
  }
}
