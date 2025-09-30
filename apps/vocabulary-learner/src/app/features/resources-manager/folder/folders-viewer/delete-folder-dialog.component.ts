import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EditFolderDialogData } from './folders-viewer';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-folder-dialog',
  imports: [CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
  ],
  templateUrl: './delete-folder-dialog.component.html',
  styleUrl: './delete-folder-dialog.component.css',
})
export class DeleteFolderDialogComponent {
  readonly dialogRef = inject<MatDialogRef<DeleteFolderDialogComponent>>(MatDialogRef);
  readonly data = inject<EditFolderDialogData>(MAT_DIALOG_DATA);
  folder = this.data.folder;

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeFolder(): void {
    this.dialogRef.close(true);
  }
}
