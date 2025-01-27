import { Injectable } from '@angular/core';
import { PracticeConfig } from '../models/practiceConfig';
import { ExerciseType } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class PracticeConfigService {
  private practiceConfig!: PracticeConfig;

  constructor() {
    this.createEmptyPracticeConfig();
  }

  private createEmptyPracticeConfig() {
    this.practiceConfig = {
      exerciseList: [],
      lessonsID: [],
    }
  }

  setLessonsID(lessonsID: number[]) {
    this.practiceConfig.lessonsID = lessonsID;
  }

  setExercises(exercises: ExerciseType[]) {
    this.practiceConfig.exerciseList = exercises;
  }

  getConfig(): PracticeConfig {
    return this.practiceConfig;
  }

  
}
