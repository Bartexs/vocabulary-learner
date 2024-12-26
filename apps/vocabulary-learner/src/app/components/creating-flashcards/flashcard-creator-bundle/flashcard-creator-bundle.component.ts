import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingExcerciseService } from '../../excercises/writing-excercise/writing-excercise.service';
import { FormsModule } from '@angular/forms';

import { Flashcard } from '../../../models/flashcard';

@Component({
  selector: 'app-flashcard-creator-bundle',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard-creator-bundle.component.html',
  styleUrl: './flashcard-creator-bundle.component.css',
})
export class FlashcardCreatorBundleComponent {
  @Output() emitFlashcards: EventEmitter<Flashcard[]> = new EventEmitter()
  userInput = '';
  
  saveAsFlashcard() {
    const lines = this.userInput.split('\n');
  
    const flashcards = lines
      .filter(line => line.trim() !== '') // Skip empty lines
      .map(line => {
        const [front, back] = line.split('\t'); // Split by tab character
        return {
          id: 0,
          frontSide: front?.trim() || '', // Trim and handle missing front
          backSide: back?.trim() || ''    // Trim and handle missing back
        };
      });
      this.emitFlashcards.emit(flashcards);
      this.userInput = '';
  }
}
