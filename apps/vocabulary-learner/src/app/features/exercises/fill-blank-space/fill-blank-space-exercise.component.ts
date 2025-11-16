import { Component, ViewChildren, QueryList, ElementRef, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { FormsModule } from '@angular/forms';
import { PracticeService } from '../../training-modes/practice/services/practice.service';
import { SessionSummaryService } from '../../session-summary/session-summary.service';
import { Exercise } from '../../../core/models/exercise';
import { LearningSessionConfigService } from '@vocabulary-learner/shared/services/learning-session-config-service/learning-session-config.service';

@Component({
  selector: 'app-fill-blank-space-exercise',
  imports: [CommonModule, FormsModule],
  templateUrl: './fill-blank-space-exercise.component.html',
  styleUrl: './fill-blank-space-exercise.component.css',
})
export class FillBlankSpaceExerciseComponent extends DynamicExerciseComponent implements OnInit {
  protected override exerciseType = Exercise.FillBlankSpots;
  @ViewChildren('blankInput') blankInputs!: QueryList<ElementRef<HTMLInputElement>>;
  isFinished = false;

  maskedWord = '';
  userInput: string[] = [];
  originalLetters: string[] = [];
  missingIndices: number[] = [];
  feedbackMessage = '';
  percentageOfMaskedLetter = 0.25; // 25% masking
  currentGlowIndex = -1;
  roundCounter = 1;

  constructor(
    protected override practiceService: PracticeService,
    protected override sessionConfigService: LearningSessionConfigService,
    protected sessionSummaryService: SessionSummaryService,
  ) {
    super(practiceService, sessionSummaryService, sessionConfigService);
    this.summary = this.sessionSummaryService.initSummary(this.exerciseType);
  }

  ngOnInit(  ) {
    this.maskLetters();
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (this.feedbackMessage) {
      this.nextFlashcard();
    } else {
      this.checkAnswer();
    }
  }


  maskLetters() {
    this.feedbackMessage = '';
    this.userInput = [];
    const word = this.currentFlashcard.front;

    const maskedResult = this.replaceWithUnderscores(word, this.percentageOfMaskedLetter);

    this.maskedWord = maskedResult.maskedWord;
    this.missingIndices = maskedResult.missingIndices;
    this.originalLetters = word.split('');
    this.userInput = Array(this.missingIndices.length).fill('');

    // Auto-focus the first blank input after view updates
    setTimeout(() => {
      if (this.blankInputs.first) {
        this.blankInputs.first.nativeElement.focus();
        this.currentGlowIndex = 0;
        setTimeout(() => (this.currentGlowIndex = -1), 300);
      }
    });
  }

  replaceWithUnderscores(word: string, percentage: number) {
    const letters = word.split('');
    const missingIndices: number[] = [];

    const letterIndices = letters
      .map((char, index) => (char !== ' ' ? index : -1))
      .filter((i) => i !== -1);

    const totalToReplace = Math.ceil(letterIndices.length * percentage);

    while (missingIndices.length < totalToReplace) {
      const randIndex = letterIndices[Math.floor(Math.random() * letterIndices.length)];
      if (!missingIndices.includes(randIndex)) missingIndices.push(randIndex);
    }

    missingIndices.sort((a, b) => a - b);
    missingIndices.forEach((i) => (letters[i] = '_'));

    return { maskedWord: letters.join(''), missingIndices };
  }

  onInput(event: InputEvent, idx: number) {
    const inputEl = event.target as HTMLInputElement;
    const currentPos = this.missingIndices.indexOf(idx);

    if (inputEl.value && currentPos < this.blankInputs.length - 1) {
      const nextInput = this.blankInputs.toArray()[currentPos + 1].nativeElement;

      // Trigger glow on next input
      this.currentGlowIndex = currentPos + 1;
      setTimeout(() => (this.currentGlowIndex = -1), 300);

      nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, idx: number) {
    const currentPos = this.missingIndices.indexOf(idx);

    if (event.key === 'Backspace' && !this.userInput[currentPos] && currentPos > 0) {
      const prevInput = this.blankInputs.toArray()[currentPos - 1].nativeElement;

      // Trigger glow on previous input
      this.currentGlowIndex = currentPos - 1;
      setTimeout(() => (this.currentGlowIndex = -1), 300);

      prevInput.focus();
    }
  }

  checkAnswer() {
    const correct = this.missingIndices.every(
      (idx, i) => this.userInput[i]?.toLowerCase() === this.originalLetters[idx].toLowerCase()
    );
    this.summary = this.sessionSummaryService.modifySummary(this.currentFlashcard, correct, this.summary);

    this.feedbackMessage = correct ? '✅ Correct! Well done!' : '❌ Incorrect. Try again!';
  }

  nextFlashcard() {
    const maxRounds = 3;

    if (this.isLastFlashcard()) {
      if (this.roundCounter >= maxRounds) {
        this.finishExercise();
        return;
      }

      this.nextRound();
    }

    this.moveToNextFlashcard();
    this.maskLetters();
  }

  nextRound() {
    this.roundCounter++;
    this.setMissingLettersPercentage(this.roundCounter);
    this.currentFlashcardIndex = 0;
    this.currentFlashcard = this.flashcardList[this.currentFlashcardIndex];
  }

  setMissingLettersPercentage(round: number) {
    switch (round) {
      case 1:
        this.percentageOfMaskedLetter = 0.25;
        break;
      case 2:
        this.percentageOfMaskedLetter = 0.50;
        break;
      case 3:
        this.percentageOfMaskedLetter = 0.80;
        break;
      default:
        this.percentageOfMaskedLetter = 0.25;
    }
  }
}
