import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummary } from '../../../models/exercise-Summary';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { Exercise } from '../../../models/exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-browsing-exercise',
  imports: [CommonModule],
  templateUrl: './browsing-exercise.component.html',
  styleUrl: './browsing-exercise.component.css',
})
export class BrowsingExerciseComponent extends DynamicExerciseComponent implements OnInit {
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
