import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@vocabulary-learner/core/models/apiResponse';
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

  patchFlashcard(flashcardId: number, newFlashcardValues: Partial<Flashcard>): Observable<ApiResponse<Flashcard>> {
    return this.http.patch<ApiResponse<Flashcard>>(`${environment.apiUrl}/api/flashcards/${flashcardId}`, newFlashcardValues);
  }

  getFlashcardsByLessonsIds(lessons: Lesson[]): Observable<Flashcard[]> {
    const ids = lessons.map(l => l.id);
    let params = new HttpParams();
    ids.forEach(id => params = params.append('lessonId', id));

    return this.http.get<Flashcard[]>(`${this.baseUrl}/flashcards`, { params });
  }

  getFlashcardsByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.baseUrl}/by-lesson/${lessonId}`);
  }

  // fix flashcard objects to more unified and remove it
  getFlashcardsByLessonIdDTO(lessonId: number): Observable<FlashcardDTO[]> {
    return this.http.get<FlashcardDTO[]>(`${this.baseUrl}/by-lesson/${lessonId}`);
  }


  getFlashcardDTOsByLessonId(lessonId: number): Observable<FlashcardDTO[]> {
    return this.http.get<FlashcardDTO[]>(`${this.baseUrl}/by-lesson/${lessonId}`);
  }

  addFlashcards(lessonId: number, flashcards: FlashcardDTO[]): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.baseUrl}/${lessonId}/flashcards`, flashcards);
  }

  getAllFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.baseUrl}`);
  }

  removeFlashcard(lesson: Lesson, flashcard: Flashcard): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${lesson.id}/flashcards/${flashcard.id}`);
  }

  getFlashcardsWithProficiencyByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.baseUrl}/flashcards/proficiency/by-lesson${lessonId}`);
  }
}
