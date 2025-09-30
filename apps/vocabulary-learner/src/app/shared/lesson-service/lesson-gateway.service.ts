import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@vocabulary-learner/core/models/apiResponse';
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

  addLesson(lesson: Lesson, folderId: number): Observable<ApiResponse<Lesson>> {
    const bodyRequest = {
      name: lesson.name,
      folderId: folderId
    };

    return this.http.post<ApiResponse<Lesson>>(`${this.baseUrl}/me`, bodyRequest);
  }

  getLessonsByIds(ids: number[]): Observable<Lesson[]> {
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });
    return this.http.get<Lesson[]>(`${this.baseUrl}/by-ids`, { params });
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/all`);
  }

  patchLessonName(lesson: Lesson, newName: string, folderId: number): Observable<ApiResponse<Lesson>> {
    return this.http.patch<ApiResponse<Lesson>>(`${this.baseUrl}/${lesson.id}`, { name: newName, folderId: folderId });
  }
 
  removeLesson(lesson: Lesson): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${lesson.id}`);
  }
}
