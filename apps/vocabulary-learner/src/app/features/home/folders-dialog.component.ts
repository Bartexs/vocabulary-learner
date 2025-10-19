import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Folder } from '@vocabulary-learner/core/models/folder';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';
import { MatIconModule } from '@angular/material/icon';


interface FolderWithLessonCounter {
  folder: Folder,
  lessonCounter: number,
}

@Component({
  selector: 'app-folders-dialog',
    imports: [
      CommonModule,
      FormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
    ],
  templateUrl: './folders-dialog.component.html',
  styleUrl: './folders-dialog.component.css',
})
export class FoldersDialogComponent implements OnInit {
  readonly dialogRef = inject<MatDialogRef<FoldersDialogComponent>>(MatDialogRef);
  readonly data = inject<FoldersDialogComponent>(MAT_DIALOG_DATA);
  
  folders: Folder[] = this.data.folders;
  foldersWithCounter: FolderWithLessonCounter[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private lessonService: LessonService
  ) {

  }

  ngOnInit() {
    this.getLessonsCounter(this.data.folders)
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getLessonsCounter(folders: Folder[]) {
    folders.forEach(f => {
      this.lessonService.getLessonsByFolderId(f.id).subscribe(
        l => {
          const folderWithCounter = {
            folder: f,
            lessonCounter: l.length
          }
          this.foldersWithCounter.push(folderWithCounter);
        }
      )
      this.isLoading = false;
    })
  }

  folderSelected(folderWithCounter: FolderWithLessonCounter) {
    if(folderWithCounter.lessonCounter > 0) {
      this.router.navigate(['/practice-selector', folderWithCounter.folder.id]);
      this.dialogRef.close();
    }
  }

  createLessonInFolder(folderId: number) {
    this.router.navigate(['/lesson-creator', folderId]);
    this.dialogRef.close();
  }
}
