import { Component, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseType } from '../../../../core/models/exercise';
import { ComponentRegistry } from '../../../../core/models/exercise-registry';
import { ExerciseSummary } from '../../../../core/models/exercise-Summary';
import { DynamicExerciseComponent } from '../../../exercises/dynamic-exercise.component';
import { SessionSummaryService } from '../../../session-summary/session-summary.service';
import { SessionSummary } from '../../../../core/models/session-summary';
import { SessionType } from '../../../../core/models/session-type';
import { LearningSessionConfigService } from '@vocabulary-learner/shared/services/learning-session-config-service/learning-session-config.service';
import { LearningSessionConfig } from '../models/learning-session-config';

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent implements OnInit  {
  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  currentExercise!: ExerciseType;
  currentExerciseIndex = 0;
  currentFlashcardIndex = 0;
  flashcardListSize = 0;
  sessionSummary!: SessionSummary;
  sessionConfig!: LearningSessionConfig;

  constructor(
    private router: Router,
    private sessionSummaryService: SessionSummaryService,
    private sessionConfigService: LearningSessionConfigService
  ) {
  }

  ngOnInit() {
    this.getSessionConfig();
  }

  getSessionConfig() {
      this.sessionConfigService.getCompleteConfig().subscribe((cfg: LearningSessionConfig) => {
        this.sessionConfig = cfg;

        this.sessionSummary = this.initSessionSummary();
        this.setInitialExercise();
        this.loadExerciseComponent(this.currentExercise);
      });
    }

  private setFlashcardList() {
    this.loadExerciseComponent(this.currentExercise);
  }

  private setInitialExercise(): void {
    if (this.sessionConfig.exerciseList.length > 0) {
      this.currentExercise = this.sessionConfig.exerciseList[this.currentExerciseIndex];
    } else {
      console.warn('Exercise list is empty.');
    }
  }

  private initSessionSummary(): SessionSummary {
    return {
      id: Date.now(),
      type: this.sessionConfig.learningSessionType,
      exercisesSummary: []
    }
  }

  loadExerciseComponent(exercise: ExerciseType) {
    const exerciseComponent = ComponentRegistry[exercise.componentName];

    if (exerciseComponent) {
      this.loadComponent(exerciseComponent);
    }
  }

  loadComponent<T>(component: Type<T>) {
    // Clear previous components
    this.container.clear();

    // Create the component dynamically
    const componentRef = this.container.createComponent(component);

    const instance = componentRef.instance as DynamicExerciseComponent;

    instance.exercisesData = {
      exerciseIndex: this.currentExerciseIndex + 1,
      exercisesTotal: this.sessionConfig.exerciseList.length,
      currentExercise: this.currentExercise
    }

    instance.dataEmitter.subscribe((emittedData: ExerciseSummary) => {
      this.receiveSummary(emittedData);
    });

    instance.currentFlashcardChanged.subscribe(() => {
      this.currentFlashcardIndex += 1;
    })
  }

  receiveSummary(data: ExerciseSummary) {
    this.sessionSummary.exercisesSummary.push(data);
    this.sessionSummaryService.setSessionSummary(this.sessionSummary);

    // if there is no more exercises, pass all exercises summary to its service and reroute
    if(this.sessionConfig.exerciseList.length === this.currentExerciseIndex + 1) {
      

      if(this.sessionConfig.learningSessionType === SessionType.EXAM) {
        this.router.navigate(['/session-summary/exam']);
      } else {
        this.router.navigate(['/session-summary']);
      }

      return; 
    }

    this.nextExercise();
  }

  nextExercise() {
    this.currentExerciseIndex += 1;
    this.currentExercise = this.sessionConfig.exerciseList[this.currentExerciseIndex];
    this.loadExerciseComponent(this.currentExercise);
  }
}
