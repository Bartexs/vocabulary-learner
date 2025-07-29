import { Injectable } from '@angular/core';
import { ExerciseSummary } from '../../core/models/exercise-Summary';

@Injectable({
  providedIn: 'root'
})
export class SessionSummaryService {
  private exerciseSummaryList: ExerciseSummary[] = [];

  setExerciseSummaryList(exerciseSummaryList: ExerciseSummary[]): void {
    this.exerciseSummaryList = exerciseSummaryList;
  }

  getSessionSummary(): ExerciseSummary[] {
    return this.exerciseSummaryList;
  }
}
