import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../../models/flashcard';
import { FlashcardProficiency } from '../../../models/flashcard-proficiency';

@Component({
  selector: 'app-flashcard-creator-bundle',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard-creator-bundle.component.html',
  styleUrl: './flashcard-creator-bundle.component.css',
})
export class FlashcardCreatorBundleComponent {
  @Input() lessonID!: number;
  @Output() emitFlashcards: EventEmitter<Flashcard[]> = new EventEmitter()
  userInput = '';
  
  saveAsFlashcard() {
    const lines = this.userInput.split('\n');

    const flashcardProficiency: FlashcardProficiency = {
      flashcardMastered: false,
      masteryLevel: 0
    }
  
    const flashcards = lines
      .filter(line => line.trim() !== '') // Skip empty lines
      .map(line => {
        const [front, back] = line.split('\t'); // Split by tab character
        return {
          id: Date.now(),
          lessonId: this.lessonID,
          frontSide: front?.trim() || '', // Trim and handle missing front
          backSide: back?.trim() || '',    // Trim and handle missing back
          flashcardProficiency: flashcardProficiency
        };
      });
      this.emitFlashcards.emit(flashcards);
      this.userInput = '';
  }
}
