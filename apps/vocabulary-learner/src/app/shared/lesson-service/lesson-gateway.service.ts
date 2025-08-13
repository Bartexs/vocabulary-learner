import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '@vocabulary-learner/core/models/lessons';
import { environment } from 'apps/vocabulary-learner/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonGatewayService {
  private baseUrl = `${environment.apiUrl}/api/lessons`;

  constructor(
    private http: HttpClient
  ) { 

  }

  getLessonsByFolderId(folderId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/by-folder/${folderId}`);
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${lessonId}`);
  }

  addLesson(lesson: Lesson, folderId: number): Observable<Lesson> {
    const bodyRequest = {
      name: lesson.name,
      folderId: folderId
    };

    return this.http.post<Lesson>(`${this.baseUrl}/me`, bodyRequest);
  }
}
