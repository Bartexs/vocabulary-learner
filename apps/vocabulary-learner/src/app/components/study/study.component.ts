import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudySessionService } from '../../services/study-session.service';
import { StudySessionConfig } from '../../models/studySessionConfig';
import { WritingExerciseComponent } from "../exercises/writing/writing-exercise.component";
import { LessonService } from '../../services/lesson.service';
import { Flashcard } from '../../models/flashcard';

@Component({
  selector: 'app-study',
  imports: [CommonModule, WritingExerciseComponent],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css',
})
export class StudyComponent implements OnInit {
  studySessionConfig!: StudySessionConfig;
  flashcardList!: Flashcard[];

  constructor(
    private studySessionService: StudySessionService,
    private lessonService: LessonService,
  ) {
    
  }

  ngOnInit() {
    this.setSessionData();
    console.log(this.studySessionConfig);
    this.flashcardList = this.lessonService.getFlashcardsFromLessons(this.studySessionConfig.lessonList);
    console.log(this.flashcardList);
  }

  setSessionData() {
    try {
      this.studySessionConfig = this.studySessionService.getConfig();
      console.log(this.studySessionConfig);
    } catch (error: unknown) {
      console.error();
      // this.handleMissingConfig();
    }
  }
}
