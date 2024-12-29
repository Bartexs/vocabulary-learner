import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../models/lessons';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LessonService } from '../../services/lesson.service';
import { ExerciseService } from '../../services/exercise.service';

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
    private exerciseService: ExerciseService
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
    const selectedLessons = this.lessonsAvailable.filter(lesson => 
      this.selectedLessonsId.includes(lesson.id)
    );
    console.log('Selected lessons:', selectedLessons);
  }
}
