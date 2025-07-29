import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicExerciseComponent } from '../dynamic-exercise.component';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../../../core/models/exercise';
import { DateUtilsService } from '../../../core/services/date-utils.service';
import { FlashcardService } from '../../../core/services/flashcard.service';

@Component({
  selector: 'app-writing-exercise',
  imports: [CommonModule, FormsModule],
  templateUrl: './writing-exercise.component.html',
  styleUrl: './writing-exercise.component.css',
})
export class WritingExerciseComponent extends DynamicExerciseComponent implements OnInit  {
  // @Input() flashcards: Flashcard[] = [];
  @Input() modeType = '';
  @ViewChild('userInputRef') userInputRef!: ElementRef<HTMLInputElement>
  exercise = Exercise.Writing;
  userInput = '';
  isCorrect!: boolean;
  isFinished = false; 
  showResult = false;
  isListening = false;
  skipNextKeyPress = false;

  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
    this.exerciseSummary = this.exerciseService.initializeExerciseSummary(this.exercise);
  }

  constructor(
    private flashcardService: FlashcardService,
    private dateUtilsService: DateUtilsService,
    private exerciseService: ExerciseService
  ) {
    super();
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

  nextFlashcard() {
    this.currentFlashcardIndex += 1;
    this.resetFlashCardTest();
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
  }

  public checkFlashcard(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.showResult) return;
    
    this.isFinished = true;
    this.isCorrect = this.currentFlashcard.frontSide === this.userInput;

    this.exerciseSummary = this.exerciseService.modifyExerciseSummary(this.currentFlashcard, this.isCorrect, this.exerciseSummary);
    
    if(this.modeType === 'EXAM') this.setProficiency(this.isCorrect);

    if(this.currentFlashcardIndex + 1 === this.flashcardList.length) {
      this.finishExercise()
    } else {
      this.showResult = true;
      this.toggleListening();
    }
  }

  setProficiency(isCorrect: boolean) {
    const flashcardTested = this.flashcardList[this.currentFlashcardIndex];
    const history = flashcardTested.flashcardProficiency;

    if(isCorrect) {
      if(history.nextExamDate === undefined) {
        const date = this.dateUtilsService.getTodayDate();
        history.nextExamDate = this.dateUtilsService.getDateWithOffsetFromDate(date, 1, 'yyyy-MM-dd');
        history.masteryLevel = 1;
        flashcardTested.flashcardProficiency = history;
      } else {
        const date = history.nextExamDate;

        switch (flashcardTested.flashcardProficiency.masteryLevel) {
          case 1:
            history.nextExamDate = this.dateUtilsService.getDateWithOffsetFromDate(date, 3, 'yyyy-MM-dd');
            history.masteryLevel = 2;
            break;
          case 2:
            history.nextExamDate = this.dateUtilsService.getDateWithOffsetFromDate(date, 5, 'yyyy-MM-dd');
            history.masteryLevel = 3;
            break;
        }

        flashcardTested.flashcardProficiency = history;
      }
    } else {
      history.nextExamDate = undefined;
    }
    this.flashcardService.modifyFlashcard(flashcardTested);
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
