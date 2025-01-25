import { Component, Input, ViewChild, ViewContainerRef, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../../models/exercise';
import { Flashcard } from '../../models/flashcard';
import { BrowsingExerciseComponent } from '../exercises/browsing/browsing-exercise.component';
import { LessonService } from '../../services/lesson.service';
import { ExerciseSummary } from '../../models/exercise-Summary';

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent implements OnInit  {
  @Input() exerciseList: Exercise[] = [];
  @ViewChild('dynamicHost', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  flashcardList: Flashcard[] = [];

  constructor(
    private lessonService: LessonService,
  ) {

  }

  ngOnInit() {
    this.flashcardList = this.lessonService.getFlashcardsFromLessons(this.lessonService.loadAllLessons());
    this.loadComponent(BrowsingExerciseComponent, this.flashcardList);
  }

  loadComponent<T>(component: Type<T>, data: Flashcard[]) {
    // Clear previous components
    this.container.clear();

    // Create the component dynamically
    const componentRef = this.container.createComponent(component);

    const instance = componentRef.instance as BrowsingExerciseComponent;

    instance.flashcardList = data;

    instance.dataEmitter.subscribe((emittedData: ExerciseSummary) => {
      this.receiveSummary(emittedData);
    });
  }

  receiveSummary(data: ExerciseSummary) {
    console.log("gotta");
    console.log(data);
  }

}
