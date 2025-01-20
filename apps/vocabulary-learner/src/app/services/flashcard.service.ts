import { Injectable } from '@angular/core';
import { Flashcard } from '../models/flashcard';
import { LessonService } from './lesson.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  constructor(private lessonService: LessonService) {

  }

  modifyFlashcard(flashcard: Flashcard): boolean {
    const lesson = this.lessonService.getLessonById(flashcard.lessonId);

    if (!lesson) {
      console.error(`Lesson with ID ${flashcard.lessonId} not found.`);
      return false;
    }
  
    // Find the flashcard by ID in the lesson's flashcards array
    const flashcardToUpdate = lesson.flashcards.find((fc) => fc.id === flashcard.id);
  
    if (!flashcardToUpdate) {
      console.error(`Flashcard with ID ${flashcard.id} not found in lesson ${lesson.id}.`);
      return false;
    }
  
    // Update the properties of the found flashcard
    Object.assign(flashcardToUpdate, flashcard);
  
    console.log(`Flashcard with ID ${flashcard.id} updated in lesson ${lesson.id}.`);

    this.lessonService.saveLesson(lesson);
    return true;
  }
}