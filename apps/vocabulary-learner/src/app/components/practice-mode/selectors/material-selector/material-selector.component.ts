import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises } from 'apps/vocabulary-learner/src/app/models/exercise';
import { Lesson } from 'apps/vocabulary-learner/src/app/models/lessons';
import { LessonService } from 'apps/vocabulary-learner/src/app/services/lesson.service';
import { PracticeConfigService } from 'apps/vocabulary-learner/src/app/services/practice-config.service';

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
    private practiceModeConfigService: PracticeConfigService
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
  }

  onSubmit(): void {
    // to be used when i want to give to practice congif lessons instead of lessonsID
    // const selectedLessons = this.lessonsAvailable.filter(lesson => 
    //   this.selectedLessonsId.includes(lesson.id)
    // );

    this.practiceModeConfigService.setLessonsID(this.selectedLessonsId);
  }
}
