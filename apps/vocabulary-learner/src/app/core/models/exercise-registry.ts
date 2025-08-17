import { Type } from '@angular/core';
import { AnswerChosingTimedComponent } from '@vocabulary-learner/features/exercises/answer-chosing-timed/answer-chosing-timed.component';
import { BrowsingExerciseComponent } from '@vocabulary-learner/features/exercises/browsing/browsing-exercise.component';
import { ConnectFlashcardSidesExerciseComponent } from '@vocabulary-learner/features/exercises/connect-sides/connect-flashcard-sides-exercise.component';
import { FillBlankSpaceExerciseComponent } from '@vocabulary-learner/features/exercises/fill-blank-space/fill-blank-space-exercise.component';
import { WritingExerciseComponent } from '@vocabulary-learner/features/exercises/writing/writing-exercise.component';


export const ComponentRegistry: Record<string, Type<any>> = {
  WritingExercise: WritingExerciseComponent,
  BrowsingExercise: BrowsingExerciseComponent,
  FillBlankSpaceExercise: FillBlankSpaceExerciseComponent,
  ConnectFlashcardSidesExercise: ConnectFlashcardSidesExerciseComponent,
  AnswerChosingTimedExercise: AnswerChosingTimedComponent
};