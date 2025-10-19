import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises } from 'apps/vocabulary-learner/src/app/core/models/exercise';
import { Lesson } from 'apps/vocabulary-learner/src/app/core/models/lessons';
import { PracticeService } from '../../services/practice.service';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';

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
    private practiceService: PracticeService
  ) {

  }

  ngOnInit() {
    this.getLessonsAvailable();
    this.exerciseAvailable = getExercises();
  }

  getLessonsAvailable() {
    this.practiceService.folderId$.subscribe((id) => {
        this.lessonService.getLessonsByFolderId(id!).subscribe({
        next: (l) => this.lessonsAvailable = l,
        error: (err) => console.error(err)
      });
    })
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
    const config = this.practiceService.getPracticeModeConfig();

    this.lessonService.getLessonsByIds(this.selectedLessonsId).subscribe({
      next: (lessons) => config.lessonList = lessons,
      error: (err) => console.error(err),
    });

    this.practiceService.setPracticeModeConfig(config);
  };
}
