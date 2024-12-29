import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessons';
import { FormsModule } from '@angular/forms';
import { LessonDetailsViewComponent } from "./lesson-details-view.component";
import { Flashcard } from '../../models/flashcard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-lessons',
  imports: [CommonModule, FormsModule, LessonDetailsViewComponent],
  templateUrl: './browse-lessons.component.html',
  styleUrl: './browse-lessons.component.css',
})
export class BrowseLessonsComponent {
  lessonList: Lesson[] = [];
  showAddLessonButton = false;
  userInput = '';
  viewLessonDetailsToggle = false;
  lessonDetails!: Lesson;

  constructor(
    private lessonService: LessonService,
    private router: Router
  ) {
    this.lessonList = this.lessonService.loadAllLessons();
  }

  viewLessonDetails(lessonID: number) {
    this.lessonDetails = this.lessonService.loadLesson(lessonID);
    console.log(this.lessonDetails);
    this.viewLessonDetailsToggle = true;
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

  practiceLesson(id: number) {
    const idList = [];
    idList.push(id);
    this.lessonService.setMaterialToPractice(idList);
    this.router.navigate(['/practice']);
  }
}
