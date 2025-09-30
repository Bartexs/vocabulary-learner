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
import { EditFolderDialogData } from './folders-viewer';

@Component({
  selector: 'app-edit-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-folder-dialog.component.html',
  styleUrls: ['./edit-folder-dialog.component.css'],
})
export class EditFolderDialogComponent {
  readonly dialogRef = inject<MatDialogRef<EditFolderDialogComponent>>(MatDialogRef);
  readonly data = inject<EditFolderDialogData>(MAT_DIALOG_DATA);
  folderName = this.data.folder.name;

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(newFolderName: string): void {
    this.dialogRef.close(newFolderName);
  }
}
