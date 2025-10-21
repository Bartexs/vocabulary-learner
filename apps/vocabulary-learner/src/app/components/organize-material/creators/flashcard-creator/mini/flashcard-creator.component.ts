import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../../../../core/models/flashcard';
import { FlashcardProficiency } from '../../../../../core/models/flashcard-proficiency';
import { Lesson } from '../../../../../core/models/lessons';
import { LessonService } from '../../../../../core/services/lesson.service';

@Component({
  selector: 'app-flashcard-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: '././flashcard-creator.component.html',
  styleUrl: './flashcard-creator.component.css',
})
export class FlashcardCreatorComponent {
  @Input() lesson!: Lesson;
  @Output() emitFlashcards: EventEmitter<Flashcard[]> = new EventEmitter()
  userInput = '';

  constructor(private lessonService: LessonService) {}

  saveAsFlashcard() {
    const lines = this.userInput.split('\n');
  
    const flashcards = lines
      .filter(line => line.trim() !== '') // Skip empty lines
      .map(line => {
        const [front, back] = line.split('\t'); // Split by tab character
        return {
          id: Math.floor(Math.random() * 1000000),
          description: '',
          lessonId: this.lesson.id,
          front: front?.trim() || '', // Trim and handle missing front
          back: back?.trim() || '',    // Trim and handle missing back
        };
      });
      flashcards.every(flashcard => this.lesson.flashcards.push(flashcard));
      this.userInput = '';
      this.emitFlashcards.emit(flashcards);
  }
}
