import { Component, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseType } from '../../../core/models/exercise';
import { ComponentRegistry } from '../../../core/models/exercise-registry';
import { ExerciseSummary } from '../../../core/models/exercise-Summary';
import { Flashcard } from '../../../core/models/flashcard';
import { LessonService } from '../../../core/services/lesson.service';
import { DynamicExerciseComponent } from '../../exercises/dynamic-exercise.component';
import { SessionSummaryService } from '../../session-summary/session-summary.service';
import { PracticeModeService } from '../services/practice-mode.service';

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent implements OnInit  {
  exerciseList: ExerciseType[] = [];
  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  flashcardList: Flashcard[] = [];
  currentExercise!: ExerciseType;
  currentExerciseIndex = 0;
  exerciseSummaryList: ExerciseSummary[] = [];

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private sessionSummaryService: SessionSummaryService,
    private practiceModeService: PracticeModeService,
  ) {

  }

  ngOnInit() {
    this.setExerciseList();
    this.setFlashcardList();
    this.setInitialExercise();
    this.loadExerciseComponent(this.currentExercise);
  }

  private setFlashcardList() {
    this.flashcardList = this.lessonService.getFlashcardsFromLessons(this.practiceModeService.getPracticeModeConfig().lessonList);
  }

  private setExerciseList() {
    this.exerciseList = this.practiceModeService.getPracticeModeConfig().exerciseList;
  }

  private setInitialExercise(): void {
    if (this.exerciseList.length > 0) {
      this.currentExercise = this.exerciseList[this.currentExerciseIndex];
    } else {
      console.warn('Exercise list is empty.');
    }
  }

  loadExerciseComponent(exercise: ExerciseType) {
    const exerciseComponent = ComponentRegistry[exercise.componentName];

    if (exerciseComponent) {
      this.loadComponent(exerciseComponent, this.flashcardList);
    }
  }

  loadComponent<T>(component: Type<T>, data: Flashcard[]) {
    // Clear previous components
    this.container.clear();

    // Create the component dynamically
    const componentRef = this.container.createComponent(component);

    const instance = componentRef.instance as DynamicExerciseComponent;

    instance.flashcardList = data;

    instance.dataEmitter.subscribe((emittedData: ExerciseSummary) => {
      this.receiveSummary(emittedData);
    });
  }

  receiveSummary(data: ExerciseSummary) {
    // push indivdual exercise results to session summary
    this.exerciseSummaryList.push(data);

    // if there is no more exercises, pass all exercises summary to its service and reroute
    if(this.exerciseList.length === this.currentExerciseIndex + 1) {
      this.sessionSummaryService.setExerciseSummaryList(this.exerciseSummaryList);
      this.router.navigate(['/session-summary']);
      return; 
    }

    this.nextExercise();
  }

  nextExercise() {
    this.currentExerciseIndex += 1;
    this.currentExercise = this.exerciseList[this.currentExerciseIndex];
    this.loadExerciseComponent(this.currentExercise);
  }
}
