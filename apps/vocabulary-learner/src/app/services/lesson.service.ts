import { Injectable } from '@angular/core';
import { Lesson } from '../models/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  lesson: Lesson[] = []

constructor() {
  this.createLessons()
}

   addLesson(newLesson: Lesson) {
    this.lesson.push(newLesson);
   }

  getLesson() {
    return this.lesson;
  }

   private createLessons() {
    const lessonFirst: Lesson = {
      id: 0,
      name: 'German Lesson 1',
      flashcards: []
    }

    this.addLesson(lessonFirst);

    const lessonSecond: Lesson = {
      id: 0,
      name: 'German Lesson 2',
      flashcards: []
    }

    this.addLesson(lessonSecond);
   }

  saveToLocalStorage(lessonToSave: Lesson) {
    localStorage.setItem('selectedLesson', JSON.stringify(lessonToSave));
    alert('Lesson saved to localStorage!');
  }

  loadFromLocalStorage() {
    // Retrieve lesson from localStorage
    const savedLesson = localStorage.getItem('selectedLesson');
    if (savedLesson) {
      alert('Lesson loaded from localStorage!');
      return JSON.parse(savedLesson);
    } else {
      alert('No lesson found in localStorage.');
    }
  }
}
