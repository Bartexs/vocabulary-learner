import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../models/exercise-Summary';
import { Flashcard } from '../../models/flashcard';

@Component({
  selector: 'app-dynamic-exercise',
  imports: [CommonModule],
  templateUrl: './dynamic-exercise.component.html',
  styleUrl: './dynamic-exercise.component.css',
})
export class DynamicExerciseComponent {
  @Input() flashcardList: Flashcard[] = [];
  @Output() dataEmitter = new EventEmitter<ExerciseSummary>();
}
