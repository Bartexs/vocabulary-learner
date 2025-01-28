import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Flashcard } from '../../../models/flashcard';
import { Lesson } from '../../../models/lessons';
import { LessonService } from '../../../services/lesson.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseSelectorComponent } from "./exercise-selector/exercise-selector.component";
import { MaterialSelectorComponent } from "./material-selector/material-selector.component";
import { ExerciseType } from '../../../models/exercise';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { PracticeModeService } from '../services/practice-mode.service';

@Component({
  selector: 'app-practice-mode-selector',
  imports: [CommonModule, MatCheckboxModule, ExerciseSelectorComponent, MaterialSelectorComponent],
  templateUrl: './practice-mode-selector.component.html',
  styleUrl: './practice-mode-selector.component.css',
})
export class PracticeModeSelectorComponent implements OnInit {
  lessonsID: number[] = [];
  flashcardList: Flashcard[] = [];
  lessonsAndExerciseChosen = false;
  modeType = "PRACTICE";
  practiceModeConfig!: PracticeModeConfig

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private practiceModeService: PracticeModeService,
  ) {
  }

  ngOnInit(): void {
    this.setMaterialToPractice();
    this.practiceModeConfig = this.initializePracticeModeConfig();
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
    this.practiceModeService.setPracticeModeConfig(this.practiceModeConfig);
    this.router.navigate(['/practice']);
  }

  chosenExercisesChanged(data: ExerciseType[]) {
    this.practiceModeConfig = {
      ...this.practiceModeConfig,
      exerciseList: data
    };
  }

  initializePracticeModeConfig(): PracticeModeConfig {
    return {
      exerciseList: [],
      lessonList: []
    }
  }
}
