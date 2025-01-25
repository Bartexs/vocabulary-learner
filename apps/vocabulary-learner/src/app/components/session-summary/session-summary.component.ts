import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudySessionService } from '../../services/study-session.service';

@Component({
  selector: 'app-session-summary',
  imports: [CommonModule],
  templateUrl: './session-summary.component.html',
  styleUrl: './session-summary.component.css',
})
export class SessionSummaryComponent {

  constructor(
    private studySessionService: StudySessionService
  ) {
    console.log(this.studySessionService);
  }

}
