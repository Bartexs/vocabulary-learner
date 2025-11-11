import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionSummaryService } from './session-summary.service';
import { SessionSummary } from '../../core/models/session-summary';

@Component({
  selector: 'app-session-summary-exam',
  imports: [CommonModule],
  templateUrl: './session-summary-exam.component.html',
  styleUrl: './session-summary-exam.component.css',
})
export class SessionSummaryExamComponent {
    sessionSummary: SessionSummary;
  
    constructor(
      private sessionSummaryService: SessionSummaryService
    ) {
      this.sessionSummary = this.sessionSummaryService.getSessionSummary();
    }
}
