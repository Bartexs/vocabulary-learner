import { Component, inject, model, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Lesson } from '../../../../core/models/lessons';
import { LessonService } from '../../../../shared/lesson-service/lesson.service';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snackbar-service/snackbar.service';
import { FolderService } from '../../../../shared/folder-service/folder.service';
import { Folder } from '../../../../core/models/folder';
import { EditLessonDialogComponent } from './edit-lesson-dialog.component';
import { RemoveObjectDialogComponent } from '../../../../shared/dialog/remove-object/remove-object-dialog.component';

@Component({
  selector: 'app-lessons-by-folder',
  imports: [CommonModule, MatIcon, MatProgressSpinnerModule, RouterLink, MatTooltipModule],
  templateUrl: './lessons-by-folder.component.html',
  styleUrl: './lessons-by-folder.component.css',
})
export class LessonsByFolderComponent implements OnInit {
    readonly dialog = inject(MatDialog);
    readonly folderToModify = model('');
    folder!: Folder;
    lessons: Lesson[] = [];
    isLoading = true;

    constructor(
      private route: ActivatedRoute,
      private lessonService: LessonService,
      private flashcardService: FlashcardService,
      private snackbarService: SnackbarService,
      private folderService: FolderService,
    ) {
      
    }
    
  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        this.getLessons(id);
        this.getFolder(id);
    });
  }

  private getFolder(id: number) {
    this.folderService.getFolderById(id).subscribe({
      next: (f) => this.folder = f,
      error: (err) => console.error(err),
    });
  }

  private getLessons(id: number) {
    this.lessonService.getLessonsByFolderId(id).subscribe({
        next: lessonDTOs => {
          this.lessons = lessonDTOs.map(dto => ({
            ...dto,
            flashcards: []
          }));
          this.getFlashcards(this.lessons);
          this.isLoading = false;
        },
        error: err => console.error('Failed to load lessons', err)
    });
  }

  private getFlashcards(lessons: Lesson[]) {
    lessons.forEach(lesson => {
      this.flashcardService.getFlashcardsByLessonId(lesson.id).subscribe({
        next: flashcards => {
          lesson.flashcards = flashcards;
        },
        error: err => console.error(err),
      })
    })
  }

removeLesson(lessonId: number, lessonName: string) {
  const data = {
    message: `Are you sure you want to delete lesson "${lessonName}"?`,
    objectName: lessonName,
    objectType: 'lesson',
  };

  const lesson = this.lessons.find(l => l.id === lessonId);

  const dialogRef = this.dialog.open(RemoveObjectDialogComponent, { data });

  dialogRef.afterClosed().subscribe(result => {
    if (result && lesson != undefined) {
      this.lessonService.removeLesson(lesson).subscribe({
        next: () => {
          this.snackbarService.openSnackBar(
            `Lesson "${lessonName}" has been removed`,
            'Ok'
          );
          this.getLessons(this.folder.id);
        },
        error: (err: unknown) => {
          console.error('Failed to delete lesson', err);
          this.snackbarService.openSnackBar(
            'Something went wrong, please try again',
            'Ok'
          );
        }
      });
    }
  });
}

   openEditDialog(lessonId: number) {
    const lesson = this.lessons.find(l => l.id === lessonId);

    const dialogRef = this.dialog.open(EditLessonDialogComponent, {
      data: {lesson: lesson},
    });

    dialogRef.afterClosed().subscribe((newName) => {
      if(newName && lesson != undefined) {
        this.lessonService.patchLessonName(lesson, newName, this.folder.id).subscribe({
          next: (l) => {
            this.snackbarService.openSnackBar("Lesson " + lesson.name + " name changed to " + l.data.name, "Ok");
            this.getLessons(this.folder.id);
          },
          error: (err) => {
            if(err.status === 409) {
              this.snackbarService.openSnackBar("Lesson " + newName + " already exist. Change name and try again.", "Ok")
            } else {
              this.snackbarService.openSnackBar("Something went wrong, please try again.", "Ok")
              console.log('Failed to create lesson', err);
            }
          }
        })
      }
    })
  }
}
