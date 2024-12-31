import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-writing-exercise',
  imports: [CommonModule, FormsModule],
  templateUrl: './writing-exercise.component.html',
  styleUrl: './writing-exercise.component.css',
})
export class WritingExerciseComponent implements OnInit {
  @Input() flashcards: Flashcard[] = [];
  currentFlashcard!: Flashcard;
  currentFlashcardIndex = 0;
  userInput = '';
  isCorrect!: boolean;
  isFinished = false; 

  ngOnInit() {
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
  }

  nextFlashcard() {
    this.currentFlashcardIndex += 1;
    this.resetFlashCardTest();
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
  }

  public checkFlashcard(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    this.isFinished = true;
    this.isCorrect = this.currentFlashcard.backSide === this.userInput;

    if(this.currentFlashcardIndex + 1 === this.flashcards.length) {
      console.log("set is finished");
    } else {
      this.nextFlashcard();
    }
  }

  resetFlashCardTest() {
    this.isFinished = false;
    this.isCorrect = false;
    this.userInput = '';
  }
}
