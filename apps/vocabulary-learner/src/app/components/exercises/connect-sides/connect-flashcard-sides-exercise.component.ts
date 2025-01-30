import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise, ExerciseType } from '../../../models/exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-connect-flashcard-sides-exercise',
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './connect-flashcard-sides-exercise.component.html',
  styleUrl: './connect-flashcard-sides-exercise.component.css',
})
export class ConnectFlashcardSidesExerciseComponent extends DynamicExerciseComponent implements OnInit {
  exercise: ExerciseType = Exercise.ConnectFlashcardSides;
  frontSideContainer: string[] = [];
  backSideContainer: string[] = [];

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
      return flashcard.backSide;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    };
  }
}
