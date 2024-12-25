import { Injectable } from '@angular/core';
import { Lesson } from '../models/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonKeyBeginning = 'lesson_';

  generateLessonId(): number {
    return Date.now();
  }

  saveLesson(lessonToSave: Lesson) {
    const lessonKey = this.lessonKeyBeginning + lessonToSave.id;
    localStorage.setItem(lessonKey, JSON.stringify(lessonToSave));
    alert('Lesson saved to localStorage!');
  }

  deleteLesson(lessonID: number) {
    localStorage.removeItem(this.lessonKeyBeginning + lessonID);
  }

  loadAllLessons() {
    const lessons: Lesson[] = [];
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if(key && key.startsWith(this.lessonKeyBeginning)) {
        const lessonData = localStorage.getItem(key);
        if(lessonData) {
          try {
            const lesson: Lesson = JSON.parse(lessonData);
            lessons.push(lesson);
          } catch(error) {
            console.error(`Error parsing lesson data for key: ${key}`, error);
          }
        }
      }
    }
    return lessons;
  }
  

  loadLesson(id: number) {
    // Retrieve lesson from localStorage
    const savedLesson = localStorage.getItem(this.lessonKeyBeginning + id);
    if (savedLesson) {
      alert('Lesson loaded from localStorage!');
      return JSON.parse(savedLesson);
    } else {
      alert('No lesson found in localStorage.');
    }
  }
}
