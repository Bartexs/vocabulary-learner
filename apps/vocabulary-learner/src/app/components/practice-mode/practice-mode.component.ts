import { Component, Input, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../models/flashcard';
import { LessonService } from '../../services/lesson.service';
import { ExerciseSummary } from '../../models/exercise-Summary';
import { ComponentRegistry } from '../../models/exercise-registry';
import { DynamicExerciseComponent } from '../exercises/dynamic-exercise.component';
import { Exercise, ExerciseType, getExercises } from '../../models/exercise';

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent implements OnInit  {
  @Input() exerciseList: ExerciseType[] = [];
  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  flashcardList: Flashcard[] = [];
  currentExercise!: ExerciseType;
  currentExerciseIndex = 0;

  constructor(
    private lessonService: LessonService,
  ) {

  }

  ngOnInit() {
    this.exerciseList = getExercises();
    this.flashcardList = this.lessonService.getFlashcardsFromLessons(this.lessonService.loadAllLessons());
    this.setInitialExercise();
    this.loadExerciseComponent(this.currentExercise);
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
    console.log("gotta");
    console.log(data);
  }

  nextExercise() {
    this.currentExerciseIndex += 1;
    this.currentExercise = this.exerciseList[this.currentExerciseIndex];
    this.loadExerciseComponent(this.currentExercise);
  }
}
