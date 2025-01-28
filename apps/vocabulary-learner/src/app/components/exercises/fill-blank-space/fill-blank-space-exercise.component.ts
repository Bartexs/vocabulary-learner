import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
