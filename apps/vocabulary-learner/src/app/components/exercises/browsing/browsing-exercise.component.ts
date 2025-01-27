import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../../models/exercise-Summary';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise } from '../../../models/exercise';

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
      exercise: Exercise.Browse,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalFlashcards: 0,
      correctFlashcards: [],
      wrongFlashcards: []
    }
    this.dataEmitter.emit(newSummary);
  }
}
