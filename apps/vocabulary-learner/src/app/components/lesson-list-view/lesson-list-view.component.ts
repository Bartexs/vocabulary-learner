import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessons';

@Component({
  selector: 'app-lesson-list-view',
  imports: [CommonModule],
  templateUrl: './lesson-list-view.component.html',
  styleUrl: './lesson-list-view.component.css',
})
export class LessonListViewComponent {
  lessons: Lesson[];

  constructor(
    private lessonService: LessonService
  ) {
    this.lessons = this.lessonService.getLesson();
  }
}
