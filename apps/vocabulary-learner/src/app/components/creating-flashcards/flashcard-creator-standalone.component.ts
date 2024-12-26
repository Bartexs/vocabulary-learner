import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../models/flashcard';
import { Lesson } from '../../models/lessons';
import { LessonService } from '../../services/lesson.service';
import { FormsModule } from '@angular/forms';
import { FlashcardCreatorBundleComponent } from "./flashcard-creator-bundle/flashcard-creator-bundle.component";
import { FlashcardCreatorSingleComponent } from "./flashcard-creator-single/flashcard-creator-single.component";

@Component({
  selector: 'app-flashcard-creator-standalone',
  imports: [CommonModule, FormsModule, FlashcardCreatorBundleComponent, FlashcardCreatorSingleComponent],
  templateUrl: './flashcard-creator-standalone.component.html',
  styleUrl: './flashcard-creator-standalone.component.css',
})
export class FlashcardCreatorStandaloneComponent {
  lessons: Lesson[];
  selectedLessonId!: number;
  // flashcards: Flashcard[] = [];
  frontSide = '';
  backSide = '';
  selectedLesson: {id: number; name: string} | null = null;

  constructor(
    private lessonService: LessonService
  ) {
    this.lessons = this.lessonService.loadAllLessons();
  }

  saveFlashcards() {
    if (!this.frontSide || !this.backSide || !this.selectedLesson) {
      alert('Please fill all fields before saving.');
      return;
    }

    this.selectedLessonId = this.selectedLesson.id;

    const flashcard: Flashcard = {
      id: 0,
      frontSide: this.frontSide.trim(),
      backSide: this.backSide.trim(),
    };

    // this.flashcards.push(flashcard); // Save the object to the array

    // Clear the form inputs after saving
    this.frontSide = '';
    this.backSide = '';
    this.selectedLesson = null;
  }

  flashcardsBundle() {
    console.log("here");
    const lesson: Lesson = this.lessonService.loadLesson(this.selectedLessonId);
    const flashcardListFromLesson: Flashcard[] = lesson.flashcards
    // flashcardListFromLesson.push(flashcard);
    lesson.flashcards = flashcardListFromLesson;
    this.lessonService.updateLesson(lesson);
    console.log(this.lessonService.loadLesson);
  }
}
