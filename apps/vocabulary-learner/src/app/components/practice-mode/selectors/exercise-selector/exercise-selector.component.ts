import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExerciseType, getExercises, getExercisesByNames } from '../../../../models/exercise';

@Component({
  selector: 'app-exercise-selector',
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './exercise-selector.component.html',
  styleUrl: './exercise-selector.component.css',
})
export class ExerciseSelectorComponent implements OnInit {
  @Output() exerciseListEmmiter = new EventEmitter<ExerciseType[]>();
  exerciseList: ExerciseType[] = [];
  selectedExercises: string[] = [];

  ngOnInit() {
    this.exerciseList = getExercises();
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
    this.exerciseListEmmiter.emit(updatedExerciseList);
  }
}
