import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flashcard } from '../../../models/flashcard';
import { FormsModule } from '@angular/forms';
import { StudySessionResults } from '../../../models/studySessionResults';
import { Exercise } from '../../../models/exercise';

@Component({
  selector: 'app-writing-exercise',
  imports: [CommonModule, FormsModule],
  templateUrl: './writing-exercise.component.html',
  styleUrl: './writing-exercise.component.css',
})
export class WritingExerciseComponent implements OnInit {
  @Input() flashcards: Flashcard[] = [];
  @ViewChild('userInputRef') userInputRef!: ElementRef<HTMLInputElement>
  currentFlashcard!: Flashcard;
  currentFlashcardIndex = 0;
  userInput = '';
  isCorrect!: boolean;
  isFinished = false; 
  studySessionResults!: StudySessionResults;
  testingType = '';
  showResult = false;
  isListening = false;
  skipNextKeyPress = false;

  ngOnInit() {
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
    this.initializeStudySessionResults();
  }

  // When answer is input, user should press enter to 
  // proceed and show result of the answer, but HostListener 
  // didn't wait for another key press and immedietaly moved 
  // for next question instead of showing result and waiting for next key press, 
  // thats why we skip first keypress
  @HostListener('document:keydown', ['$event'])
  handleKeyPress(): void {
    if (this.isListening) {
      if (this.skipNextKeyPress) {
        this.skipNextKeyPress = false; // Skip the first key press after toggle
        this.nextFlashcard();
        this.toggleListening();
        return;
      }
      this.skipNextKeyPress = true;
    }
  }

  toggleListening(): void {
    this.isListening = !this.isListening;
  }

  initializeStudySessionResults() {
    const exercise: Exercise = {
      id: 0,
      name: 'writing'
    }

    this.studySessionResults = {
      exercise: exercise,
      correctAnswers: 0,
      wrongAnswers: 0,
      totalFlashcards: 0,      
    }
  }

  nextFlashcard() {
    this.currentFlashcardIndex += 1;
    this.resetFlashCardTest();
    this.currentFlashcard = this.flashcards[this.currentFlashcardIndex];
  }

  public checkFlashcard(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.showResult) return;
    this.isFinished = true;
    this.isCorrect = this.currentFlashcard.frontSide === this.userInput;

    this.studySessionResults = {
      ...this.studySessionResults,
      correctAnswers: this.studySessionResults.correctAnswers + (this.isCorrect ? 1 : 0),
      wrongAnswers: this.studySessionResults.wrongAnswers + (this.isCorrect ? 0 : 1),
      totalFlashcards: this.studySessionResults.totalFlashcards + 1,
    };

    if(this.currentFlashcardIndex + 1 === this.flashcards.length) {
      console.log("set is finished");
      console.log(this.studySessionResults);
    } else {
      this.showResult = true;
      this.toggleListening();
    }

    // set proficiency of the flashcard it should increase based on amount of correct answers
    if(this.testingType === 'EXAM') this.setProficiency();
  }

  setProficiency() {
    const flashcardTested = this.flashcards[this.currentFlashcardIndex];
    const history = flashcardTested.flashcardExamHistory;
    const dateNow = new Date();

    // -----TODO------- create if answer is correct or if answer is wrong 

    if (history.nextExamDate === undefined) {
      // Increment the correct answers amount
      history.correctExamAnswersAmount += 1;
  
      // Set the next exam date to 1 day after the current date
      const nextExamDate = new Date(dateNow);
      nextExamDate.setDate(dateNow.getDate() + 1);
      history.nextExamDate = nextExamDate;
    } else {
      // -----TODO------- create code if flashcard nextExamDate wasn't undefined
    }
  }

  resetFlashCardTest() {
    this.isFinished = false;
    this.isCorrect = false;
    this.showResult = false;
    this.clearInput();
  }

  clearInput() {
    this.userInput = '';
    this.userInputRef.nativeElement.value = '';
    this.userInputRef.nativeElement.blur();
    setTimeout(() => this.userInputRef.nativeElement.focus(), 0);
  }
}
