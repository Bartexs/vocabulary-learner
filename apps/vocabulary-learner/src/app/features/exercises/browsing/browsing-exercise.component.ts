import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { Exercise } from '../../../core/models/exercise';
import { PracticeService } from '../../training-modes/practice/services/practice.service';
import { SessionSummaryService } from '../../session-summary/session-summary.service';

@Component({
  selector: 'app-browsing-exercise',
  imports: [CommonModule],
  templateUrl: './browsing-exercise.component.html',
  styleUrl: './browsing-exercise.component.css',
})
export class BrowsingExerciseComponent extends DynamicExerciseComponent implements OnInit {
  protected override exerciseType = Exercise.Browse;
  showCorrectAnswer = false;

  constructor(
    protected override practiceService: PracticeService,
    protected sessionSummaryService: SessionSummaryService,
  ) {
    super(practiceService, sessionSummaryService);
    this.summary = this.sessionSummary.initSummary(this.exerciseType);
  }

  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
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
    this.changeCurrentFlashcardIndex();
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex]; // Update current flashcard
    this.toggleShowCorrectAnswer(); // Toggle display logic
  }

  saveAnswer(isCorrect: boolean) {
    this.summary = this.sessionSummaryService.modifySummary(this.currentFlashcard, isCorrect, this.summary);
    this.nextFlashcard();
  }
}
