import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../services/lesson.service';
import { Flashcard } from '../../models/flashcard';
import { Lesson } from '../../models/lessons';
import { DateUtilsService } from '../../services/date-utils.service';

@Component({
  selector: 'app-exam-mode',
  imports: [CommonModule],
  templateUrl: './exam-mode.component.html',
  styleUrl: './exam-mode.component.css',
})
export class ExamModeComponent implements OnInit {
  repetitionMaterial: Flashcard[] = [];
  newMaterial: Flashcard[] = [];
  startExam = false;
  isLoading = true;
  modeType = "EXAM";

  constructor(
    private lessonService: LessonService,
    private dateUtilsService: DateUtilsService
    
  ) {

  }

  ngOnInit() {
    this.getExamMaterial();
  }

  startExamMode() {
    this.startExam = true;
    console.log(this.repetitionMaterial);
    console.log(this.newMaterial);
  }

  getExamMaterial() {
    this.repetitionMaterial = this.getRepetitionMaterial();
    this.newMaterial = this.getNewMaterial();
  }

  // to be removed, functionality moved to flashcard service
  getNewMaterial(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const flashcardsWithEmptyHistory = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardProficiency;
      return history.nextExamDate === undefined;
    });

    return flashcardsWithEmptyHistory;
  }

  // to be removed, functionality moved to flashcard service
  getRepetitionMaterial(): Flashcard[] {
    const allLessons: Lesson[] = this.lessonService.loadAllLessons();
    const allFlashcards: Flashcard[] = this.lessonService.getFlashcardsFromLessons(allLessons);

    const flashcardsForCurrentExam = allFlashcards.filter(flashcard => {
      const history = flashcard.flashcardProficiency
      return (
        !history.flashcardMastered && 
        history.nextExamDate != null &&
        this.dateUtilsService.isTestedToday(history.nextExamDate))
    });

    return flashcardsForCurrentExam;
  }
}
