import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { Flashcard } from '../../core/models/flashcard';
import { ExercisesData } from '../training-modes/practice/models/exercise-config';
import { SessionType } from '../../core/models/session-type';
import { PracticeService } from '../training-modes/practice/services/practice.service';
import { SessionSummaryService } from '../session-summary/session-summary.service';
import { ExerciseType } from '../../core/models/exercise';
import { LearningSessionConfig } from '../training-modes/practice/models/learning-session-config';
import { LearningSessionConfigService } from '@vocabulary-learner/shared/services/learning-session-config-service/learning-session-config.service';

@Component({
  selector: 'app-dynamic-exercise',
  imports: [CommonModule],
  templateUrl: './dynamic-exercise.component.html',
  styleUrl: './dynamic-exercise.component.css',
})
export abstract class DynamicExerciseComponent {
  protected abstract exerciseType: ExerciseType;
  
  @Output() dataEmitter = new EventEmitter<ExerciseSummary>();
  @Output() currentFlashcardChanged = new EventEmitter<boolean>();

  flashcardList!: Flashcard[];
  exercisesData!: ExercisesData;
  currentFlashcard!: Flashcard;
  currentFlashcardIndex = 0;
  sessionType!: SessionType;
  summary!: ExerciseSummary;
  sessionConfig!: LearningSessionConfig;

  constructor(
    protected practiceService: PracticeService,
    protected sessionSummary: SessionSummaryService,
    protected sessionConfigService: LearningSessionConfigService,
  ) {
    this.getSessionConfig();
  }

  // Initialize data
  private initalizeData() {
    this.flashcardList = this.sessionConfig.flashcards;
    this.sessionType = this.sessionConfig.learningSessionType;
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
  } 

  getSessionConfig() {
      this.sessionConfigService.getCompleteConfig().subscribe((cfg: LearningSessionConfig) => {
        this.sessionConfig = cfg;
        this.initalizeData();
      });
    }

  // Move to next flashcard
  moveToNextFlashcard() {
    this.currentFlashcardIndex++; // Increment index
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex]; // Update current flashcard
  }

  
  // Finish session
  finishExercise(): void {
    this.dataEmitter.emit(this.summary);
  }

  isLastFlashcard(): boolean {
    return this.currentFlashcardIndex + 1 >= this.flashcardList.length;
  }

  changeCurrentFlashcardIndex() {
    this.currentFlashcardChanged.emit(true);
  }
}
