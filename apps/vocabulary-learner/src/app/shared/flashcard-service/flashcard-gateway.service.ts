import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '@vocabulary-learner/core/models/flashcard';
import { FlashcardDTO } from '@vocabulary-learner/core/models/flashcardDTO';
import { Lesson } from '@vocabulary-learner/core/models/lessons';
import { environment } from 'apps/vocabulary-learner/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashcardGatewayService {
  private baseUrl = `${environment.apiUrl}/api/flashcards`;

  constructor(
    private http: HttpClient,
  ) { }

  getFlashcardsByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.baseUrl}/by-lesson/${lessonId}`);
  }


  getFlashcardDTOsByLessonId(lessonId: number): Observable<FlashcardDTO[]> {
    return this.http.get<FlashcardDTO[]>(`${this.baseUrl}/by-lesson/${lessonId}`);
  }

  addFlashcards(lessonId: number, flashcards: FlashcardDTO[]): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.baseUrl}/${lessonId}/flashcards`, flashcards);
  }
}
