import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises, getExercisesByNames } from '../../../../../core/models/exercise';
import { PracticeService } from '../../services/practice.service';

@Component({
  selector: 'app-exercise-selector',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './exercise-selector.component.html',
  styleUrl: './exercise-selector.component.css',
})
export class ExerciseSelectorComponent implements OnInit {
  exerciseList: ExerciseType[] = [];
  selectedExercises: string[] = [];

  ngOnInit() {
    this.exerciseList = getExercises();
  }

  constructor(
    private practiceService: PracticeService,
  ) {

  }

  toggleSelection(exercise: string, isChecked: boolean): void {

    if (isChecked) {
      // add checked exercise to selected exercise list
      this.selectedExercises.push(exercise);
    } else {
      // remove unchecked exercise from selected exercise list
      this.selectedExercises = this.selectedExercises.filter(e => e !== exercise);
    }

    // search for exercise objects by exercise name (convert from string to ExerciseType)
    const updatedExerciseList = getExercisesByNames(this.selectedExercises);

    // update practice-mode component on changes
    this.updatePracticeModeConfig(updatedExerciseList);
  }

  updatePracticeModeConfig(data: ExerciseType[]) {
    const config = this.practiceService.getPracticeModeConfig();

    config.exerciseList = data;

    this.practiceService.setPracticeModeConfig(config);
  }
}
