import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditFlashcardDialogData } from '../../lesson/lesson-details/lesson-details-viewer.component';

@Component({
  selector: 'app-flashcards-edit-dialog',
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
    MatSlideToggleModule,
    ReactiveFormsModule
],
  templateUrl: './flashcards-edit-dialog.component.html',
  styleUrl: './flashcards-edit-dialog.component.css',
})
export class FlashcardsEditDialogComponent {
  readonly dialogRef = inject<MatDialogRef<FlashcardsEditDialogComponent>>(MatDialogRef);
  readonly data = inject<EditFlashcardDialogData>(MAT_DIALOG_DATA);
  flashcard = this.data.flashcard;
  flashcardDataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.flashcardDataForm = this.fb.group({
      description: [this.flashcard.front, Validators.required],
      definition: [this.flashcard.back, Validators.required]
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  saveChanges(): void {
    const newValues = {
      description: this.flashcardDataForm.controls["description"].value,
      definition: this.flashcardDataForm.controls["definition"].value
    }

    this.dialogRef.close(newValues);
  }
}
