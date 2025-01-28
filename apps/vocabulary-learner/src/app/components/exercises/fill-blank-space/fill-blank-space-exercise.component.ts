import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { ExerciseSummary } from '../../../models/exercise-Summary';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise } from '../../../models/exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-fill-blank-space-exercise',
  imports: [CommonModule],
  templateUrl: './fill-blank-space-exercise.component.html',
  styleUrl: './fill-blank-space-exercise.component.css',
})
export class FillBlankSpaceExerciseComponent extends DynamicExerciseComponent implements OnInit {
    private exerciseSummary!: ExerciseSummary;
  
    constructor(private exerciseService: ExerciseService) {
      super();
    }
  
    ngOnInit() {
      this.exerciseSummary = this.exerciseService.initializeExerciseSummary(Exercise.Browse);
    }
  
    onClick() {
      this.dataEmitter.emit(this.exerciseSummary);
    }
}
