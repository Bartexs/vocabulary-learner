import { Injectable } from '@angular/core';
import { Flashcard } from '../core/models/flashcard';
import { LessonService } from './lesson.service';
import { Lesson } from '../core/models/lessons';
import { DateUtilsService } from './date-utils.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  constructor(
    private lessonService: LessonService,
    private dateUtilsService: DateUtilsService
  ) {

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

  getFlashcards(lessonID: number): Flashcard[] | undefined {
    return this.lessonService.getLessonById(lessonID)?.flashcards;
  }

  getNewFlashcards(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const flashcardsWithEmptyHistory = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardProficiency;
      return history.nextExamDate === undefined;
    });

    return flashcardsWithEmptyHistory;
  }

  getRepetitionMaterial(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const flashcardsForCurrentExam = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardProficiency
      return (
        !history.flashcardMastered && 
        history.nextExamDate != null &&
        this.dateUtilsService.isTestedToday(history.nextExamDate))
    });

    return flashcardsForCurrentExam;
  }

  isFlashcardNew(flashcard: Flashcard): boolean {
    return flashcard.flashcardProficiency.nextExamDate === undefined;
  }
}