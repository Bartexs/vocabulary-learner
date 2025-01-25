import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { ExerciseSummary } from '../../../models/exercise-Summary';

@Component({
  selector: 'app-fill-blank-space-exercise',
  imports: [CommonModule],
  templateUrl: './fill-blank-space-exercise.component.html',
  styleUrl: './fill-blank-space-exercise.component.css',
})
export class FillBlankSpaceExerciseComponent {
  @Input() flashcardList: Flashcard[] = [];
  // @Output() dataEmmiter = new EventEmitter<ExerciseSummary>();

  
}
