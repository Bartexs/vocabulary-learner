import { Type } from '@angular/core';
import { WritingExcerciseComponent } from '../components/excercises/writing-excercise/writing-excercise.component';
import { BrowsingExerciseComponent } from '../components/exercises/browsing/browsing-exercise.component';
import { FillBlankSpaceExerciseComponent } from '../components/exercises/fill-blank-space/fill-blank-space-exercise.component';

export const ComponentRegistry: Record<string, Type<any>> = {
  WritingExercise: WritingExcerciseComponent,
  BrowsingExercise: BrowsingExerciseComponent,
  FillBlankSpaceExercise: FillBlankSpaceExerciseComponent,
};