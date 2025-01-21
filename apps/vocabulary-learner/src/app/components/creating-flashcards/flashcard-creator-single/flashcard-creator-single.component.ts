import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { FormsModule } from '@angular/forms';
import { FlashcardProficiency } from '../../../models/flashcard-proficiency';

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

      const flashcardProficiency: FlashcardProficiency = {
        flashcardMastered: false,
        masteryLevel: 0
      }

      const flashcard: Flashcard = {
        id: 0,
        lessonId: 0,
        frontSide: this.frontSide.trim(),
        backSide: this.backSide.trim(),
        flashcardProficiency: flashcardProficiency
      };

      this.frontSide = '';
      this.backSide = '';
    }
}
