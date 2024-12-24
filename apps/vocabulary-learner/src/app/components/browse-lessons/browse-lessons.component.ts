import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessons';

@Component({
  selector: 'app-browse-lessons',
  imports: [CommonModule],
  templateUrl: './browse-lessons.component.html',
  styleUrl: './browse-lessons.component.css',
})
export class BrowseLessonsComponent {
  lessonList: Lesson[] = [];

  constructor(
    private lessonService: LessonService
  ) {
    this.lessonList = this.lessonService.getLesson();
  }
}
