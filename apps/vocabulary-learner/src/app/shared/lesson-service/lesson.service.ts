import { Injectable } from '@angular/core';
import { LessonGatewayService } from './lesson-gateway.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../core/models/lessons';
import { Flashcard } from '../../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  
  constructor(
     private lessonGateway: LessonGatewayService,
  ) {
   
  }

  getLessonsByFolderId(folderId: number): Observable<Lesson[]> {
    return this.lessonGateway.getLessonsByFolderId(folderId);
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.lessonGateway.getLessonById(lessonId);
  }

  mapToLesson(folderId: number, lessonName: string, flashcardList: Flashcard[]): Lesson {
    return {
      id: this.generateLessonId(),
      folderId: folderId,
      name: lessonName,
      flashcards: flashcardList
    }
  }

  generateLessonId(): number {
    return Date.now();
  }

  addLesson(lesson: Lesson, folderId: number): Observable<Lesson> {
    return this.lessonGateway.addLesson(lesson, folderId);
  }

  getLessonsByIds(ids: number[]): Observable<Lesson[]> {
    return this.lessonGateway.getLessonsByIds(ids);
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.lessonGateway.getAllLessons();
  }
  
}
