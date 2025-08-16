import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { PracticeModeService } from '../services/practice-mode.service';
import { ExerciseType } from '../../../../core/models/exercise';
import { Flashcard } from '../../../../core/models/flashcard';
import { Lesson } from '../../../../core/models/lessons';
import { LessonService } from '../../../../core/services/lesson.service';
import { ExerciseSelectorComponent } from '../resources-configurators/exercise-selector/exercise-selector.component';
import { MaterialSelectorComponent } from '../resources-configurators/material-selector/material-selector.component';

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
  practiceModeConfig!: PracticeModeConfig;
  isShowAdvancedSettings = false;

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private practiceModeService: PracticeModeService,
  ) {
  }

  ngOnInit(): void {
    this.setMaterialToPractice();
    this.practiceModeConfig = this.practiceModeService.initializePracticeModeConfig();
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
}
