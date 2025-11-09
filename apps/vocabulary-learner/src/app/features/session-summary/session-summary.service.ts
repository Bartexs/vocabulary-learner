import { Injectable } from '@angular/core';
import { SessionSummary } from '@vocabulary-learner/core/models/session-summary';

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
}
