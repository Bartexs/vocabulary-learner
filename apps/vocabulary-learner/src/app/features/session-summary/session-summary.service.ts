import { Injectable } from '@angular/core';
import { SessionSummary } from '../../core/models/session-summary';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { FlashcardProgressHistoryComparison } from '../../shared/models/flashcard-progress-history-comparison';
import { ExerciseType } from '../../core/models/exercise';
import { Flashcard } from '../../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class SessionSummaryService {
  private sessionSummary!: SessionSummary;

  setSessionSummary(sessionSummary: SessionSummary): void {
    this.sessionSummary = sessionSummary;
  }

  getSessionSummary(): SessionSummary {
    return this.sessionSummary;
  }

  addProficiencyComparison(exerciseSummary: ExerciseSummary, flashcardComparison: FlashcardProgressHistoryComparison): ExerciseSummary {
    if(!exerciseSummary.proficiencyComparison) exerciseSummary.proficiencyComparison = [];

    exerciseSummary.proficiencyComparison.push(flashcardComparison);

    return exerciseSummary;
  }

  initSummary(exerciseType: ExerciseType): ExerciseSummary {
    return {
      id: Date.now(),
      exercise: exerciseType,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalFlashcards: 0,
      correctFlashcards: [],
      wrongFlashcards: []
    }
  }

  modifySummary(flashcard: Flashcard, isCorrect: boolean, exerciseSummary: ExerciseSummary): ExerciseSummary {
    if(isCorrect) {
      return {
        ...exerciseSummary,
        correctAnswers: exerciseSummary.correctAnswers + 1,
        totalFlashcards: exerciseSummary.totalFlashcards + 1,
        correctFlashcards: [...exerciseSummary.correctFlashcards, flashcard]
      };
    } else {
      return {
        ...exerciseSummary,
        wrongAnswers: exerciseSummary.wrongAnswers + 1,
        totalFlashcards: exerciseSummary.totalFlashcards + 1,
        wrongFlashcards: [...exerciseSummary.wrongFlashcards, flashcard]
      };
    }
  }
}
