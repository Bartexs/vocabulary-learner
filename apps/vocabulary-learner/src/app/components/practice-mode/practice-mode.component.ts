import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flashcard } from '../../models/flashcard';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lessons';
import { WritingExerciseComponent } from "../exercises/writing/writing-exercise.component";

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule, WritingExerciseComponent],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent implements OnInit {
  lessonsID: number[] = [];
  flashcardList: Flashcard[] = [];

  constructor(
    private lessonService: LessonService
  ) {

  }

  ngOnInit(): void {
    this.setMaterialToPractice();
  }

  setMaterialToPractice() {
    this.lessonsID = this.lessonService.getMaterialToPractice(); // Retrieve the lesson
    if (this.lessonsID.length > 0) {
      const lessons: Lesson[] = this.lessonService.getLessonsByID(this.lessonService.getMaterialToPractice());
      this.flashcardList = lessons.flatMap(lesson => lesson.flashcards);
    } else {
      console.log("list is empty");
      // give option to practice today material or certain lessons 
    }
  }


  // userInput = '';
  // flashCardToCheck = 'something';
  // isCorrect!: boolean;
  // isFinished = false; 

  // public checkFlashcard(event: KeyboardEvent) {
  //   if (event.key !== 'Enter') return;
  //   this.isFinished = true;
  //   this.isCorrect = this.flashCardToCheck === this.userInput;
  // }
}
