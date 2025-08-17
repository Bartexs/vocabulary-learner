import { Injectable } from '@angular/core';
import {  ExerciseType } from '../../core/models/exercise';
import { ExerciseSummary } from '../../core/models/exercise-Summary';
import { Flashcard } from '../../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  initializeExerciseSummary(exercise: ExerciseType): ExerciseSummary {
    const exerciseSummary: ExerciseSummary = {
      id: Date.now(),
      exercise: exercise,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalFlashcards: 0,
      correctFlashcards: [],
      wrongFlashcards: []
    }
    return exerciseSummary;
  }

  modifyExerciseSummary(flashcard: Flashcard, isCorrect: boolean, exerciseSummary: ExerciseSummary): ExerciseSummary {
    if(isCorrect) {
      return {
        ...exerciseSummary,
        correctAnswers: exerciseSummary.correctAnswers + 1,
        totalFlashcards: exerciseSummary.totalFlashcards + 1,
        correctFlashcards: [...exerciseSummary.correctFlashcards, flashcard]
      };
    } else {
      return {
        ...exerciseSummary,
        wrongAnswers: exerciseSummary.wrongAnswers + 1,
        totalFlashcards: exerciseSummary.totalFlashcards + 1,
        wrongFlashcards: [...exerciseSummary.wrongFlashcards, flashcard]
      };
    }
  }
}
