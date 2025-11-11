import { Injectable } from '@angular/core';
import { SessionSummary } from '../../core/models/session-summary';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { FlashcardProgressHistoryComparison } from '../../shared/models/flashcard-progress-history-comparison';

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
}
