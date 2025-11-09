import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { SessionSummaryService } from './session-summary.service';

@Component({
  selector: 'app-session-summary-exam',
  imports: [CommonModule],
  templateUrl: './session-summary-exam.component.html',
  styleUrl: './session-summary-exam.component.css',
})
export class SessionSummaryExamComponent {
    sessionSummary: ExerciseSummary[];
  
    constructor(
      private sessionSummaryService: SessionSummaryService
    ) {
      this.sessionSummary = this.sessionSummaryService.getSessionSummary();
    }
}
