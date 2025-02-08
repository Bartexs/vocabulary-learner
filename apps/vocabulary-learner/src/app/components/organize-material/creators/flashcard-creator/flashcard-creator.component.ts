import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlashcardProficiency } from 'apps/vocabulary-learner/src/app/models/flashcard-proficiency';
import { Lesson } from 'apps/vocabulary-learner/src/app/models/lessons';
import { Flashcard } from 'apps/vocabulary-learner/src/app/models/flashcard';

@Component({
  selector: 'app-flashcard-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './flashcard-creator.component.html',
  styleUrl: './flashcard-creator.component.css',
})
export class FlashcardCreatorComponent {
  @Input() lesson!: Lesson;
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
          id: Math.floor(Math.random() * 1000000),
          lessonId: this.lesson.id,
          frontSide: front?.trim() || '', // Trim and handle missing front
          backSide: back?.trim() || '',    // Trim and handle missing back
          flashcardProficiency: flashcardProficiency
        };
      });
      this.emitFlashcards.emit(flashcards);
      this.userInput = '';
  }
}
