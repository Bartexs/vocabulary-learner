import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { Exercise } from '../../../core/models/exercise';
import { SessionSummaryService } from '../../session-summary/session-summary.service';
import { PracticeService } from '../../training-modes/practice/services/practice.service';

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
  protected override exerciseType = Exercise.ConnectFlashcardSides;
  frontSideContainer: string[] = [];
  backSideContainer: BackSideWithCorrectIndex[] = [];
  showAnswer = false;

  constructor(
    protected override practiceService: PracticeService,
    protected sessionSummaryService: SessionSummaryService,
  ) {
    super(practiceService, sessionSummaryService);
    this.summary = this.sessionSummary.initSummary(this.exerciseType);
  }

  ngOnInit() {
    this.setContainers();
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
    let helper = this.summary;

    // Compare flashcard index in first array (array stays the same) with current index in second array (array changes)
    this.backSideContainer.map((f) => {
      const flashcard = this.flashcardList[f.correctIndex];

      const isCorrect = f.correctIndex === this.backSideContainer.findIndex(x => x.word === f.word);

      helper = this.sessionSummary.modifySummary(flashcard, isCorrect, helper);
    }) 

    this.summary = helper;
  }
}
