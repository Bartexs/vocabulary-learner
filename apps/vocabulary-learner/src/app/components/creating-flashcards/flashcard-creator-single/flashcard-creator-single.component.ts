import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { WritingExcerciseService } from '../../excercises/writing-excercise/writing-excercise.service';
import { FormsModule } from '@angular/forms';
import { Lesson } from '../../../models/lessons';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-flashcard-creator-single',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard-creator-single.component.html',
  styleUrl: './flashcard-creator-single.component.css',
})
export class FlashcardCreatorSingleComponent {
    frontSide = '';
    backSide = '';
  
    saveFlashcards() {
      if (!this.frontSide || !this.backSide) {
        alert('Please fill all fields before saving.');
        return;
      }

      const flashcard: Flashcard = {
        id: 0,
        frontSide: this.frontSide.trim(),
        backSide: this.backSide.trim(),
      };

      this.frontSide = '';
      this.backSide = '';
    }
}
