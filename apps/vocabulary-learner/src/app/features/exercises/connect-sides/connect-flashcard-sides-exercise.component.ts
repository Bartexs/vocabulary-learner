import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { Exercise, ExerciseType } from '../../../core/models/exercise';
import { ExerciseService } from '../../../features/exercises/exercise.service';

export interface BackSideWithCorrectIndex {
  word: string,
  correctIndex: number,
}

@Component({
  selector: 'app-connect-flashcard-sides-exercise',
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './connect-flashcard-sides-exercise.component.html',
  styleUrl: './connect-flashcard-sides-exercise.component.css',
})

export class ConnectFlashcardSidesExerciseComponent extends DynamicExerciseComponent implements OnInit {
  exercise: ExerciseType = Exercise.ConnectFlashcardSides;
  frontSideContainer: string[] = [];
  backSideContainer: BackSideWithCorrectIndex[] = [];
  showAnswer = false;

  constructor(private exerciseService: ExerciseService) {
    super();
  }

  ngOnInit() {
    this.setContainers();
    this.exerciseSummary = this.exerciseService.initializeExerciseSummary(this.exercise);
  }

  setContainers() {
    this.frontSideContainer = this.flashcardList.map(flashcard => {
      return flashcard.front;
    })

    this.backSideContainer = this.flashcardList.map(flashcard => {
      return {
        word: flashcard.back,
        correctIndex: this.flashcardList.indexOf(flashcard),
      }
    });

    this.backSideContainer = this.shuffleArray(this.backSideContainer);
  }

  drop(event: CdkDragDrop<BackSideWithCorrectIndex[]>) {
    if (event.previousIndex !== event.currentIndex) {
      // Swap elements instead of moving them
      [this.backSideContainer[event.previousIndex], this.backSideContainer[event.currentIndex]] = 
      [this.backSideContainer[event.currentIndex], this.backSideContainer[event.previousIndex]];
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() })) // Assign a random sort key
      .sort((a, b) => a.sort - b.sort) // Sort based on the random key
      .map(({ value }) => value); // Extract values
  }

  // Methods handling check process and later 
  checkAnswer() {
    this.showAnswer =! this.showAnswer;
  }

  continueToSummary() {
    this.setExerciseSummary();
    this.finishExercise();
  }

  setExerciseSummary() {
    let helper = this.exerciseSummary;

    // Compare flashcard index in first array (array stays the same) with current index in second array (array changes)
    this.backSideContainer.map((f) => {
      const flashcard = this.flashcardList[f.correctIndex];

      const isCorrect = f.correctIndex === this.backSideContainer.findIndex(x => x.word === f.word);

      helper = this.exerciseService.modifyExerciseSummary(flashcard, isCorrect, helper);
    }) 

    this.exerciseSummary = helper;
  }
}
