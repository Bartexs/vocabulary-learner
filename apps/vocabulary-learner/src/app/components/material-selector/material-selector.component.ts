import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../models/lessons';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LessonService } from '../../services/lesson.service';
import { ExerciseService } from '../../services/exercise.service';
import { PracticeConfigService } from '../../services/practice-config.service';

@Component({
  selector: 'app-material-selector',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './material-selector.component.html',
  styleUrl: './material-selector.component.css',
})
export class MaterialSelectorComponent implements OnInit {
  lessonsAvailable: Lesson[] = [];
  exerciseAvailable: string[] = [];
  selectedLessonsId: number[] = [];

  constructor(
    private lessonService: LessonService,
    private exerciseService: ExerciseService,
    private practiceModeConfigService: PracticeConfigService
  ) {

  }

  ngOnInit() {
    this.lessonsAvailable = this.lessonService.loadAllLessons();
    this.exerciseAvailable = this.exerciseService.getExerciseList();
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
