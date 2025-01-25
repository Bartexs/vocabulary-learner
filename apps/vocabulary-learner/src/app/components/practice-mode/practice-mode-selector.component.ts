import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialSelectorComponent } from "../material-selector/material-selector.component";
import { ExerciseSelectorComponent } from "../exercise-selector/exercise-selector.component";
import { Router } from '@angular/router';
import { Flashcard } from '../../models/flashcard';
import { Lesson } from '../../models/lessons';
import { LessonService } from '../../services/lesson.service';
import { PracticeConfigService } from '../../services/practice-config.service';
import { StudySessionService } from '../../services/study-session.service';
import { WritingExerciseComponent } from "../exercises/writing/writing-exercise.component";
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-practice-mode-selector',
  imports: [CommonModule, MaterialSelectorComponent, ExerciseSelectorComponent, WritingExerciseComponent, MatCheckboxModule],
  templateUrl: './practice-mode-selector.component.html',
  styleUrl: './practice-mode-selector.component.css',
})
export class PracticeModeSelectorComponent implements OnInit {
  lessonsID: number[] = [];
  flashcardList: Flashcard[] = [];
  lessonsAndExerciseChosen = false;
  modeType = "PRACTICE";

  constructor(
    private lessonService: LessonService,
    private practiceConfigService: PracticeConfigService,
    private studySessionService: StudySessionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.setMaterialToPractice();
  }

  setMaterialToPractice() {
    this.lessonsID = this.lessonService.getMaterialToPractice(); // Retrieve the lesson
    if (this.lessonsID.length > 0) {
      const lessons: Lesson[] = this.lessonService.getLessonsByID(this.lessonService.getMaterialToPractice());
      this.flashcardList = lessons.flatMap(lesson => lesson.flashcards);
    } else {
      console.log("list is empty");
      // give option to practice today material or certain lessons 
    }
  }

  startPractice() {
    const config = this.practiceConfigService.getConfig();
    this.studySessionService.setStudySessionConfigByUsingPracticeConfig(config);
    // this.router.navigate(['/study-session']);
    this.router.navigate(['/practice']);
    this.lessonsAndExerciseChosen = true;
  }
}
