import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-lessons',
  imports: [CommonModule, FormsModule],
  templateUrl: './browse-lessons.component.html',
  styleUrl: './browse-lessons.component.css',
})
export class BrowseLessonsComponent {
  lessonList: Lesson[] = [];
  showAddLessonButton = false;
  userInput = '';

  constructor(
    private lessonService: LessonService
  ) {
    this.lessonList = this.lessonService.loadAllLessons();
  }

  createLesson() {
    const lesson: Lesson = {
      id: this.lessonService.generateLessonId(),
      name: this.userInput,
      flashcards: []
    }

    this.lessonService.saveLesson(lesson);

    this.userInput = ''
    this.lessonList = this.lessonService.loadAllLessons();
  }

  removeLesson(id: number) {
    this.lessonService.deleteLesson(id);
    this.lessonList = this.lessonService.loadAllLessons();
  }
}
