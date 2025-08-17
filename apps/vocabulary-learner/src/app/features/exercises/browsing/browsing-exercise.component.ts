import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { Exercise } from '../../../core/models/exercise';
import { ExerciseService } from '../../../features/exercises/exercise.service';

@Component({
  selector: 'app-browsing-exercise',
  imports: [CommonModule],
  templateUrl: './browsing-exercise.component.html',
  styleUrl: './browsing-exercise.component.css',
})
export class BrowsingExerciseComponent extends DynamicExerciseComponent implements OnInit {
  private exercise = Exercise.Browse;
  showCorrectAnswer = false;

  constructor(private exerciseService: ExerciseService) {
    super();
  }

  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
    this.exerciseSummary = this.exerciseService.initializeExerciseSummary(this.exercise);
  }

  toggleShowCorrectAnswer() {
    this.showCorrectAnswer =! this.showCorrectAnswer;
  }

  nextFlashcard() {
    if (this.isLastFlashcard()) {
        this.finishExercise();
        return;
    }
    this.moveToNextFlashcard();
  }

  override moveToNextFlashcard(): void {
    this.currentFlashcardIndex++; // Increment index
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex]; // Update current flashcard
    this.toggleShowCorrectAnswer(); // Toggle display logic
  }

  saveAnswer(isCorrect: boolean) {
    this.exerciseSummary = this.exerciseService.modifyExerciseSummary(this.currentFlashcard, isCorrect, this.exerciseSummary);
    this.nextFlashcard();
  }
}
