import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RemoveObjectData } from '@vocabulary-learner/core/models/removeObjectData';

@Component({
  selector: 'app-remove-object-dialog',
    imports: [CommonModule,
          FormsModule,
          MatDialogModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
    ],
  templateUrl: './remove-object-dialog.component.html',
  styleUrl: './remove-object-dialog.component.css',
})
export class RemoveObjectDialogComponent {
  readonly dialogRef = inject<MatDialogRef<RemoveObjectDialogComponent>>(MatDialogRef);
  readonly data = inject<RemoveObjectData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeObject(): void {
    this.dialogRef.close(true);
  }
}
