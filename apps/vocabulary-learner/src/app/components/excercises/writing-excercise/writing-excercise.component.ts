import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingExcerciseService } from './writing-excercise.service';
import { WritingFlashcardComponent } from "./writing-flashcard.component";
import { Flashcard } from '../../../models/flashcard';

@Component({
  selector: 'app-writing-excercise',
  imports: [CommonModule, WritingFlashcardComponent],
  templateUrl: './writing-excercise.component.html',
  styleUrl: './writing-excercise.component.css',
})
export class WritingExcerciseComponent {
  flashcardList: Flashcard[];
  flashcardToTrain: Flashcard;
  correctAnswersCount = 0;

  constructor(
    private writingExcerciseService: WritingExcerciseService
  ) {
    this.flashcardList = this.writingExcerciseService.getFlashcard()
    this.flashcardToTrain = this.flashcardList[0];
  }

  receiveAnswerStatus(isCorrect: boolean) {
    if(isCorrect) {
      this.correctAnswersCount = this.correctAnswersCount + 1
    } else {
      this.correctAnswersCount = this.correctAnswersCount + 0
    }
    this.flashcardToTrain = this.flashcardList[1];
  }
}
