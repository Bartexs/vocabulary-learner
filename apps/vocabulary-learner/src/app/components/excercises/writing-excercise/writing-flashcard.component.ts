import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../models/flashcard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-writing-flashcard',
  imports: [CommonModule, FormsModule],
  templateUrl: './writing-flashcard.component.html',
  styleUrl: './writing-flashcard.component.css',
})
export class WritingFlashcardComponent {
  @Input() flashcard!: Flashcard;
  @Output() answerCorrect = new EventEmitter<boolean>();
  
  userInput = '';
  isCorrect!: boolean;
  isFinished = false; 
  
  public checkFlashcard(event: KeyboardEvent) {
    if (this.isFinished === true) {
      this.emitAnswerStatus();
    } else {
      if (event.key !== 'Enter') return;
      this.isFinished = true;
      this.isCorrect = this.flashcard.backSide === this.userInput;
    }
  }

  emitAnswerStatus() {
    this.answerCorrect.emit(this.isCorrect);
    this.resetFlashCardTest();
  }

  resetFlashCardTest() {
    this.isFinished = false;
    this.isCorrect = false;
    this.userInput = '';
  }
}



