import { Injectable } from '@angular/core';
import { LessonGatewayService } from './lesson-gateway.service';
import { Observable } from 'rxjs';
import { Lesson } from '@vocabulary-learner/core/models/lessons';

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
}
