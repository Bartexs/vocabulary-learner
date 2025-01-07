import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WritingExerciseComponent } from "../exercises/writing/writing-exercise.component";
import { LessonService } from '../../services/lesson.service';
import { Flashcard } from '../../models/flashcard';
import { Lesson } from '../../models/lessons';

@Component({
  selector: 'app-exam-mode',
  imports: [CommonModule, WritingExerciseComponent],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css',
})
export class ExamModeComponent implements OnInit {
  repetitionMaterial: Flashcard[] = [];
  newMaterial: Flashcard[] = [];
  startExam = false;

  constructor(private lessonService: LessonService) {
    
  }

  ngOnInit() {
    this.getExamMaterial();
  }

  getExamMaterial() {
    this.repetitionMaterial = this.getRepetitionMaterial();
    this.newMaterial = this.getNewMaterial();
  }

  getNewMaterial(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const flashcardsWithEmptyHistory = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardExamHistory;
      return history.nextExamDate === undefined;
    });

    return flashcardsWithEmptyHistory;
  }

  getRepetitionMaterial(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const nowDate = new Date(); 
    const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate(); 

    const flashcardsForCurrentExam = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardExamHistory
      
      return (
        !history.flashcardMastered && 
        history.nextExamDate != null && 
        history.nextExamDate.toDateString() >= date)
    });

    return flashcardsForCurrentExam;
  }
}
