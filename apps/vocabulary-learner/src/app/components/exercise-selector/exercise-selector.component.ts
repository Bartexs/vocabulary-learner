import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PracticeModeService } from '../../services/practice-mode.service';
import { PracticeConfigService } from '../../services/practice-config.service';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise-selector',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './exercise-selector.component.html',
  styleUrl: './exercise-selector.component.css',
})
export class ExerciseSelectorComponent implements OnInit {
  exerciseList: Exercise[] = [];
  selectedExercises: string[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private practiceConfigService: PracticeConfigService
  ) {
    
  }

  ngOnInit() {
    this.exerciseList = this.exerciseService.getExerciseList();
  }

  toggleSelection(exercise: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedExercises.push(exercise);
    } else {
      this.selectedExercises = this.selectedExercises.filter(e => e !== exercise);
    }
  }

  onSubmit(): void {
    // this.practiceConfigService.setExercises(this.selectedExercises);
    console.log('Selected Exercises:', this.selectedExercises);
  }
}
