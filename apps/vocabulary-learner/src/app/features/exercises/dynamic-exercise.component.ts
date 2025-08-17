import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { Flashcard } from '../../core/models/flashcard';

@Component({
  selector: 'app-dynamic-exercise',
  imports: [CommonModule],
  templateUrl: './dynamic-exercise.component.html',
  styleUrl: './dynamic-exercise.component.css',
})
export class DynamicExerciseComponent {
  @Input() flashcardList: Flashcard[] = [];
  @Output() dataEmitter = new EventEmitter<ExerciseSummary>();
  @Output() currentFlashcardChanged = new EventEmitter<boolean>();
  exerciseSummary!: ExerciseSummary;
  currentFlashcard!: Flashcard;
  currentFlashcardIndex = 0;

  finishExercise(): void {
    this.dataEmitter.emit(this.exerciseSummary);
  }

  isLastFlashcard(): boolean {
    return this.currentFlashcardIndex + 1 >= this.flashcardList.length;
  }

    moveToNextFlashcard() {
    this.currentFlashcardIndex++; // Increment index
    
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex]; // Update current flashcard
  }

  changeCurrentFlashcardIndex() {
    this.currentFlashcardChanged.emit(true);
  }
}
