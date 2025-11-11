import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicExerciseComponent } from '../../../features/exercises/dynamic-exercise.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fill-blank-space-exercise',
  imports: [CommonModule, FormsModule],
  templateUrl: './fill-blank-space-exercise.component.html',
  styleUrl: './fill-blank-space-exercise.component.css',
})
export class FillBlankSpaceExerciseComponent extends DynamicExerciseComponent {
  @ViewChildren('blankInput') blankInputs!: QueryList<ElementRef<HTMLInputElement>>;

  word = 'Hello Angular World';
  maskedWord = '';
  userInput: string[] = [];
  originalLetters: string[] = [];
  missingIndices: number[] = [];
  feedbackMessage = '';
  percentageOfMaskedLetter = 0.25; // 25% masking
  currentGlowIndex = -1;

  maskLetters() {
    this.feedbackMessage = '';
    this.userInput = [];

    const maskedResult = this.replaceWithUnderscores(this.word, this.percentageOfMaskedLetter);

    this.maskedWord = maskedResult.maskedWord;
    this.missingIndices = maskedResult.missingIndices;
    this.originalLetters = this.word.split('');
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

  checkAnswer() {
    const correct = this.missingIndices.every(
      (idx, i) => this.userInput[i]?.toLowerCase() === this.originalLetters[idx].toLowerCase()
    );

    this.feedbackMessage = correct ? '✅ Correct! Well done!' : '❌ Incorrect. Try again!';
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
}
