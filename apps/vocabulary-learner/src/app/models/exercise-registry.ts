import { Type } from '@angular/core';
import { BrowsingExerciseComponent } from '../components/exercises/browsing/browsing-exercise.component';
import { FillBlankSpaceExerciseComponent } from '../components/exercises/fill-blank-space/fill-blank-space-exercise.component';
import { WritingExerciseComponent } from '../components/exercises/writing/writing-exercise.component';
import { ConnectFlashcardSidesExerciseComponent } from '../components/exercises/connect-sides/connect-flashcard-sides-exercise.component';

export const ComponentRegistry: Record<string, Type<any>> = {
  WritingExercise: WritingExerciseComponent,
  BrowsingExercise: BrowsingExerciseComponent,
  FillBlankSpaceExercise: FillBlankSpaceExerciseComponent,
  ConnectFlashcardSidesExercise: ConnectFlashcardSidesExerciseComponent
};