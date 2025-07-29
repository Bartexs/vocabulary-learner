import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise, ExerciseType } from '../../../core/models/exercise';
import { ExerciseService } from '../exercise.service';

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
      return flashcard.frontSide;
    })

    this.backSideContainer = this.flashcardList.map(flashcard => {
      return {
        word: flashcard.backSide,
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

  checkAnswer() {
    this.showAnswer =! this.showAnswer;
  }

  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() })) // Assign a random sort key
      .sort((a, b) => a.sort - b.sort) // Sort based on the random key
      .map(({ value }) => value); // Extract values
  }
}
