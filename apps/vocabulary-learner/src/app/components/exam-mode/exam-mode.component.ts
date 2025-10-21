import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../core/models/flashcard';
import { Lesson } from '../../core/models/lessons';
import { DateUtilsService } from '../../core/services/date-utils.service';
import { LessonService } from '../../core/services/lesson.service';

@Component({
  selector: 'app-exam-mode',
  imports: [CommonModule],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css',
})
export class ExamModeComponent {
  repetitionMaterial: Flashcard[] = [];
  newMaterial: Flashcard[] = [];
  startExam = false;
  isLoading = true;
  modeType = "EXAM";

  constructor(
    private lessonService: LessonService,
    private dateUtilsService: DateUtilsService
    
  ) {

  }

  startExamMode() {
    this.startExam = true;
    console.log(this.repetitionMaterial);
    console.log(this.newMaterial);
  }
}
