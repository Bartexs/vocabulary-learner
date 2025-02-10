import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise } from '../../../models/exercise';
import { ExerciseService } from '../exercise.service';

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

  saveAnswer(isKnown: boolean) {
    this.exerciseService.modifyExerciseSummary(this.currentFlashcard, isKnown, this.exerciseSummary);
    this.nextFlashcard();
  }
}
