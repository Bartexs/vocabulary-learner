import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionSummaryService } from './session-summary.service';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-summary',
  imports: [CommonModule, RouterLink],
  templateUrl: './session-summary.component.html',
  styleUrl: './session-summary.component.css',
})
export class SessionSummaryComponent {
  sessionSummary: ExerciseSummary[];

  constructor(
    private sessionSummaryService: SessionSummaryService
  ) {
    this.sessionSummary = this.sessionSummaryService.getSessionSummary();
  }

}
