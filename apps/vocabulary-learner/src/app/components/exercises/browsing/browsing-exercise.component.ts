import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { ExerciseSummary } from '../../../models/exercise-Summary';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';

@Component({
  selector: 'app-browsing-exercise',
  imports: [CommonModule],
  templateUrl: './browsing-exercise.component.html',
  styleUrl: './browsing-exercise.component.css',
})
export class BrowsingExerciseComponent extends DynamicExerciseComponent {
  // @Input() flashcardList: Flashcard[] = [];
  // @Output() dataEmitter = new EventEmitter<ExerciseSummary>();

  onClick() {
    const newSummary: ExerciseSummary = {
      id: 0,
    }
    this.dataEmitter.emit(newSummary);
  }
}
