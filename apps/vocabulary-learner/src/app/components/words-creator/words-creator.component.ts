import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../models/flashcard';
import { WritingExcerciseService } from '../writing-excercise/writing-excercise.service';

@Component({
  selector: 'app-words-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './words-creator.component.html',
  styleUrl: './words-creator.component.css',
})
export class WordsCreatorComponent {
  userInput = '';
  flashcards: Flashcard[] = [];

  constructor(private writingExcerciseService: WritingExcerciseService) {
    
  }

  saveAsFlashcard() {
    const lines = this.userInput.split('\n');

    this.flashcards = lines
      .filter(line => line.trim() !== '') // Skip empty lines
      .map(line => {
        const [front, back] = line.split('\t'); // Split by tab character
        return {
          id: 0,
          frontSide: front?.trim() || '', // Trim and handle missing front
          backSide: back?.trim() || ''    // Trim and handle missing back
        };
      });
      this.writingExcerciseService.saveFlashcard(this.flashcards);
  }
}
