import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../models/lessons';
import { LessonService } from '../../services/lesson.service';
import { WordsCreatorComponent } from "../words-creator/words-creator.component";
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../models/flashcard';

@Component({
  selector: 'app-create-flashcard',
  imports: [CommonModule, WordsCreatorComponent, FormsModule],
  templateUrl: './create-flashcard.component.html',
  styleUrl: './create-flashcard.component.css',
})
export class CreateFlashcardComponent {
    // lessons: Lesson[];
    selectedLessonId!: number;
    flashcards: Flashcard[] = [];
    frontSide = '';
    backSide = '';
    selectedLesson: {id: number; name: string} | null = null;

    constructor(
      private lessonService: LessonService
    ) {
      // this.lessons = this.lessonService.getLesson();
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
  
      this.flashcards.push(flashcard); // Save the object to the array
  
      // Clear the form inputs after saving
      this.frontSide = '';
      this.backSide = '';
      this.selectedLesson = null;
    }
}
