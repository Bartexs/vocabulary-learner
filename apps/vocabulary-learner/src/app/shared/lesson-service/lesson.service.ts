import { Injectable } from '@angular/core';
import { LessonGatewayService } from './lesson-gateway.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../core/models/lessons';
import { Flashcard } from '../../core/models/flashcard';
import { ApiResponse } from '../../core/models/apiResponse';

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

  addLesson(lesson: Lesson, folderId: number): Observable<ApiResponse<Lesson>> {
    return this.lessonGateway.addLesson(lesson, folderId);
  }

  getLessonsByIds(ids: number[]): Observable<Lesson[]> {
    return this.lessonGateway.getLessonsByIds(ids);
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.lessonGateway.getAllLessons();
  }

  patchLessonName(lesson: Lesson, newName: string, folderId: number): Observable<ApiResponse<Lesson>> {
    return this.lessonGateway.patchLessonName(lesson, newName, folderId);
  }

  removeLesson(lesson: Lesson): Observable<void> {
    return this.lessonGateway.removeLesson(lesson);
  }
   
}
