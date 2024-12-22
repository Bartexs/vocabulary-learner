import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WritingExcerciseComponent } from "../writing-excercise/writing-excercise.component";

@Component({
  selector: 'app-practice-mode',
  imports: [CommonModule, FormsModule, WritingExcerciseComponent],
  templateUrl: './practice-mode.component.html',
  styleUrl: './practice-mode.component.css',
  standalone: true
})
export class PracticeModeComponent {
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
