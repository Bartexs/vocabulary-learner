import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private exerciseList: string[] = [];

  constructor() {
    this.populateExerciseList();
  }

  populateExerciseList() {
    this.exerciseList.push("Writing");
  }

  getExerciseList() {
    return this.exerciseList;
  }
}
