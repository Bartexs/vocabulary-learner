import { Component, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseType } from '../../../../core/models/exercise';
import { ComponentRegistry } from '../../../../core/models/exercise-registry';
import { ExerciseSummary } from '../../../../core/models/exercise-Summary';
import { Flashcard } from '../../../../core/models/flashcard';
import { DynamicExerciseComponent } from '../../../exercises/dynamic-exercise.component';
import { SessionSummaryService } from '../../../session-summary/session-summary.service';
import { LessonService } from '../../../../shared/lesson-service/lesson.service';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { Lesson } from '../../../../core/models/lessons';
import { PracticeService } from '../services/practice.service';
import { SessionSummary } from '../../../../core/models/session-summary';
import { SessionType } from '../../../../core/models/session-type';

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
  currentFlashcardIndex = 0;
  flashcardListSize = 0;
  sessionType: SessionType;

  constructor(
    private lessonService: LessonService,
    private router: Router,
    private sessionSummaryService: SessionSummaryService,
    private flashcardService: FlashcardService,
    private practiceService: PracticeService
  ) {
    this.sessionType = this.practiceService.getPracticeModeConfig().learningSessionType;
  }

  ngOnInit() {
    this.setExerciseList();
    this.setInitialExercise();
    this.setFlashcardList();
    this.initSessionSummary();

  }

  private setFlashcardList() {
    this.flashcardList = this.practiceService.getPracticeModeConfig().flashcards;
    this.loadExerciseComponent(this.currentExercise);
  }

  private setExerciseList() {
    this.exerciseList = this.practiceService.getPracticeModeConfig().exerciseList;
  }

  private setInitialExercise(): void {
    if (this.exerciseList.length > 0) {
      this.currentExercise = this.exerciseList[this.currentExerciseIndex];
    } else {
      console.warn('Exercise list is empty.');
    }
  }

  private initSessionSummary(): void {
    const summary: SessionSummary = {
      id: 0,
      type: this.sessionType,
      exercisesSummary: []
    }

    this.sessionSummaryService.setSessionSummary(summary);
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

    instance.exercisesData = {
      exerciseIndex: this.currentExerciseIndex + 1,
      exercisesTotal: this.exerciseList.length,
      currentExercise: this.currentExercise
    }

    // Set flashcards list in instance of dynamic exercise parent component
    instance.flashcardList = data;

    // Set flashcards list size to show amount of total flashcards in current exercise - practice mode component shows it
    this.setFlashcardsListSize(data);

    instance.dataEmitter.subscribe((emittedData: ExerciseSummary) => {
      this.receiveSummary(emittedData);
    });

    instance.currentFlashcardChanged.subscribe(() => {
      this.currentFlashcardIndex += 1;
    })
  }

  setFlashcardsListSize(flashcards: Flashcard[]) {
    this.flashcardListSize = flashcards.length;
  }

  receiveSummary(data: ExerciseSummary) {
    // push indivdual exercise results to session summary
    this.exerciseSummaryList.push(data);

    // if there is no more exercises, pass all exercises summary to its service and reroute
    if(this.exerciseList.length === this.currentExerciseIndex + 1) {
      const sessionSummary: SessionSummary = this.sessionSummaryService.getSessionSummary();
      sessionSummary.exercisesSummary = this.exerciseSummaryList;
      this.sessionSummaryService.setSessionSummary(sessionSummary);

      if(this.sessionType === SessionType.EXAM) {
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
    this.currentExercise = this.exerciseList[this.currentExerciseIndex];
    this.loadExerciseComponent(this.currentExercise);
  }
}
