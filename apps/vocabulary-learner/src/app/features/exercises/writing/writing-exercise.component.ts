import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { ExerciseService } from '../../../features/exercises/exercise.service';
import { Exercise } from '../../../core/models/exercise';
import { DateUtilsService } from '../../../core/services/date-utils.service';
import { PracticeService } from '../../training-modes/practice/services/practice.service';
import { FlashcardService } from '../../../shared/flashcard-service/flashcard.service';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { switchMap } from 'rxjs';
import { SRSService } from '../../../shared/services/srs.service';
import { FlashcardProficiency } from '../../../core/models/flashcard-proficiency';
import { FlashcardProgressHistoryComparison } from '../../../shared/models/flashcard-progress-history-comparison';
import { SessionSummaryService } from '../../session-summary/session-summary.service';
import { Flashcard } from '../../../core/models/flashcard';
import { SessionType } from '../../../core/models/session-type';

@Component({
  selector: 'app-writing-exercise',
  imports: [CommonModule, FormsModule, MatIcon, MatTooltip],
  templateUrl: './writing-exercise.component.html',
  styleUrl: './writing-exercise.component.css',
})
export class WritingExerciseComponent extends DynamicExerciseComponent implements OnInit  {
  // @Input() flashcards: Flashcard[] = [];
  modeType = '';
  @ViewChild('userInputRef') userInputRef!: ElementRef<HTMLInputElement>
  exercise = Exercise.Writing;
  userInput = '';
  isCorrect!: boolean;
  isFinished = false; 
  showResult = false;
  isListening = false;
  skipNextKeyPress = false;
  comment = '';
  isExamMode = false;
  originalProficiency?: FlashcardProficiency;
  updatedProficiency?: FlashcardProficiency;

  ngOnInit() {
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
    this.exerciseSummary = this.exerciseService.initializeExerciseSummary(this.exercise);
    this.modeType = this.practiceService.getPracticeModeConfig().learningSessionType;
    this.isExamMode = this.modeType === "Exam";
  }

  constructor(
    private dateUtilsService: DateUtilsService,
    private exerciseService: ExerciseService,
    private practiceService: PracticeService,
    private flashcardService: FlashcardService,
    private srsService: SRSService,
    private sessionSummaryService: SessionSummaryService
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

  checkIfInputValid(): boolean {
    if (this.userInput.trim().length === 0) {
      this.comment = "Input your answer or press skip button";
      return false;
    }
    this.comment = "";
    return true;
  }

  nextFlashcard() {
    this.currentFlashcardIndex += 1;

    // Infoms practice mode flashcard counter
    this.changeCurrentFlashcardIndex();
    
    this.resetFlashCardTest();
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
  }

  continueToNextFlashcard() {
      this.nextFlashcard();
      this.toggleListening();
  }

  public checkFlashcard(event: KeyboardEvent) {
    if (event.key !== 'Enter' || this.showResult) return;
    if (!this.checkIfInputValid()) return; 

    this.isFinished = true;
    this.checkResult();
    this.setExerciseSummaryAndProficiency()

    if(this.currentFlashcardIndex + 1 === this.flashcardList.length) {
      this.finishExercise()
    } else {
      this.showResult = true;
      this.toggleListening();
    } 
  }

  checkFlashcardMouseClick() {
    if (!this.checkIfInputValid()) return; 

    this.isFinished = true;
    this.checkResult();
    this.setExerciseSummaryAndProficiency()

    if(this.currentFlashcardIndex + 1 === this.flashcardList.length) {
      this.finishExercise()
    } else {
      this.showResult = true;
      this.toggleListening();
      this.skipNextKeyPress = true;
    }
  }

  checkResult() {
    this.isCorrect = this.currentFlashcard.front === this.userInput;
  }
  
  setExerciseSummaryAndProficiency() {
    this.exerciseSummary = this.exerciseService.modifyExerciseSummary(this.currentFlashcard, this.isCorrect, this.exerciseSummary);
    
    if(this.modeType === SessionType.EXAM) this.setProficiency(this.isCorrect);
  }

  showCorrectAnswer() {
    this.isFinished = true;
    this.checkResult();
    this.setExerciseSummaryAndProficiency() 

    if(this.currentFlashcardIndex + 1 === this.flashcardList.length) {
      this.finishExercise()
    } else {
      this.showResult = true;
      this.toggleListening();
      this.skipNextKeyPress = true;
      this.comment = '';
    }
  }

  setProficiency(isCorrect: boolean) {
    const flashcardTested = this.flashcardList[this.currentFlashcardIndex];

    const quality: number = isCorrect ? 5 : 0;

    this.flashcardService.getFlashcardProficiencyByFlashcardId(flashcardTested).pipe((
      switchMap(flashcardProf => {
        this.originalProficiency = flashcardProf;

        const updatedProficiency = this.srsService.updateFlashcardProficiency(flashcardProf, quality);

        return this.flashcardService.patchFlashcardProficiency(updatedProficiency);
      })
    )).subscribe({
      next: (updatedFlashcardProf) => {
        this.updatedProficiency = updatedFlashcardProf;    
        this.updateSessionSummaryComparison(flashcardTested);
      },
      error: (err) => console.error(err),
    });
  }

  private updateSessionSummaryComparison(flashcard: Flashcard) {
    if(this.originalProficiency && this.updatedProficiency) {
      const flashcardComparison: FlashcardProgressHistoryComparison = {
        flashcard: flashcard,
        originalFlashcardProficiency: this.originalProficiency,
        updatedFlashcardProficiency: this.updatedProficiency,
      }
      this.exerciseSummary = this.sessionSummaryService.addProficiencyComparison(this.exerciseSummary, flashcardComparison);
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
