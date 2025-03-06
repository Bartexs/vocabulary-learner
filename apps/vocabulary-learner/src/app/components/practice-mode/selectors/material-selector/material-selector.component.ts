import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises } from 'apps/vocabulary-learner/src/app/models/exercise';
import { Lesson } from 'apps/vocabulary-learner/src/app/models/lessons';
import { LessonService } from 'apps/vocabulary-learner/src/app/services/lesson.service';
import { PracticeModeService } from '../../services/practice-mode.service';

@Component({
  selector: 'app-material-selector',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './material-selector.component.html',
  styleUrl: './material-selector.component.css',
})
export class MaterialSelectorComponent implements OnInit {
  lessonsAvailable: Lesson[] = [];
  exerciseAvailable: ExerciseType[] = [];
  selectedLessonsId: number[] = [];

  constructor(
    private lessonService: LessonService,
    private practiceModeService: PracticeModeService
  ) {

  }

  ngOnInit() {
    this.lessonsAvailable = this.lessonService.loadAllLessons();
    this.exerciseAvailable = getExercises();
  }

  toggleSelection(lessonId: number, isChecked: boolean) {
    if(isChecked) {
      this.selectedLessonsId.push(lessonId);
    } else {
      this.selectedLessonsId = this.selectedLessonsId.filter(id => id !== lessonId);
    }
    this.onSelectedLessonListUpdate();
  }

  onSelectedLessonListUpdate() {
    const config = this.practiceModeService.getPracticeModeConfig();
    config.lessonList = this.lessonService.getLessonsByID(this.selectedLessonsId);
    this.practiceModeService.setPracticeModeConfig(config);
  };
}
