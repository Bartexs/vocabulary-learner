import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LessonDialogData } from '../../../../core/models/dialog-lesson-data';
import { FlashcardProficiency } from '../../../../core/models/flashcard-proficiency';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { Flashcard } from '../../../../core/models/flashcard';

@Component({
  selector: 'app-flashcards-creator-dialog',
    imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule, 
      MatRadioModule, 
      MatCheckboxModule, 
      MatSlideToggleModule
    ],
  templateUrl: './flashcards-creator-dialog.component.html',
  styleUrl: './flashcards-creator-dialog.component.css',
})
export class FlashcardsCreatorDialogComponent {
  readonly dialogRef = inject<MatDialogRef<FlashcardsCreatorDialogComponent>>(MatDialogRef);
  readonly data = inject<LessonDialogData>(MAT_DIALOG_DATA);
  checked = false;
  disabled = false;
  lesson = this.data.lesson;
  userInput = '';
  isSaveButtonDisabled = this.userInput === '';
  flashcards = [
    { definition: '', description: '' }
  ];

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveFlashcards() {
    if(this.checked) {
      this.saveFlashcardsInBatch();
    } else {
      const flashcards = this.mapToFlashcards();
      this.dialogRef.close(flashcards);
    }
  }

  mapToFlashcards(): Flashcard[] {

    return this.flashcards.map(f => {
      return {
        id: 0,
        description: '',
        lessonId: this.lesson.id,
        front: f.definition.trim(),
        back: f.description.trim(),
      }
    })
  }

  saveFlashcardsInBatch() {
    const lines = this.userInput.split('\n');
  
    const flashcards = lines
      .filter(line => line.trim() !== '') // Skip empty lines
      .map(line => {
        const [front, back] = line.split('\t'); // Split by tab character
        return {
          id: Math.floor(Math.random() * 1000000),
          description: '',
          lessonId: this.lesson.id,
          front: front?.trim() || '', // Trim and handle missing front
          back: back?.trim() || '',    // Trim and handle missing back
        };
      });
      flashcards.every(flashcard => this.lesson.flashcards.push(flashcard));
      this.userInput = '';
      this.dialogRef.close(flashcards);
  }

  addFlashcard() {
    this.flashcards.push({ definition: '', description: '' });
  }

  removeFlashcard(index: number) {
    this.flashcards.splice(index, 1);
  }
}
