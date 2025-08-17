import { Component } from '@angular/core';
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
  word = 'Hello Angular World';
  maskedWord = '';
  userInput: string[] = [];
  originalLetters: string[] = [];
  missingIndices: number[] = [];
  feedbackMessage = '';

  maskLetters() {
    this.feedbackMessage = '';
    this.userInput = [];
    const maskedResult = this.replaceWithUnderscores(this.word, 0.25); // 25% masking
    this.maskedWord = maskedResult.maskedWord;
    this.missingIndices = maskedResult.missingIndices;
    this.originalLetters = this.word.split('');
  }

  replaceWithUnderscores(word: string, percentage: number) {
    if (!word) return { maskedWord: '', missingIndices: [] };

    const letters = word.split('');
    const letterIndices = letters
      .map((char, index) => (char !== ' ' ? index : -1))
      .filter(index => index !== -1);

    const totalToReplace = Math.ceil(letterIndices.length * percentage);
    const missingIndices: number[] = [];

    while (missingIndices.length < totalToReplace) {
      const randIndex = letterIndices[Math.floor(Math.random() * letterIndices.length)];
      if (!missingIndices.includes(randIndex)) {
        missingIndices.push(randIndex);
      }
    }

    missingIndices.forEach(index => {
      letters[index] = '_';
    });

    return { maskedWord: letters.join(''), missingIndices };
  }

  checkAnswer() {
    let correct = true;
    for (let i = 0; i < this.missingIndices.length; i++) {
      const index = this.missingIndices[i];
      if (this.userInput[i]?.toLowerCase() !== this.originalLetters[index].toLowerCase()) {
        correct = false;
        break;
      }
    }

    this.feedbackMessage = correct ? '✅ Correct! Well done!' : '❌ Incorrect. Try again!';
  }
}