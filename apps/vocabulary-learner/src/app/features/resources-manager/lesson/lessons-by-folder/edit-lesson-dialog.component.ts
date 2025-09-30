import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LessonDialogData } from '@vocabulary-learner/core/models/dialog-lesson-data';

@Component({
  selector: 'app-edit-lesson-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-lesson-dialog.component.html',
  styleUrl: './edit-lesson-dialog.component.css',
})
export class EditLessonDialogComponent {
  readonly dialogRef = inject<MatDialogRef<EditLessonDialogComponent>>(MatDialogRef);
  readonly data = inject<LessonDialogData>(MAT_DIALOG_DATA);
  lessonName = this.data.lesson.name;

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(newFolderName: string): void {
    this.dialogRef.close(newFolderName);
  }
}
