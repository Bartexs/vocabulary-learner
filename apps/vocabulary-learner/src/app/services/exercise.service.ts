import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseList: Exercise[] = [];

  constructor() {
    this.populateExerciseList();
  }

  populateExerciseList() {
    this.exerciseList = [
      { id: 0, name: 'Writing', componentName: 'WritingExercise' },
      { id: 1, name: 'Browse', componentName: 'BrowsingExercise' },
      { id: 2, name: 'FillBlankSpots', componentName: 'FillBlankSpaceExercise' },
    ];
  }

  getExerciseList() {
    return this.exerciseList;
  }
}
