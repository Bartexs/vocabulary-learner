import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from '../../../../core/models/flashcard';
import { Lesson } from '../../../../core/models/lessons';
import { LessonService } from '../../../../shared/lesson-service/lesson.service';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FlashcardsCreatorDialogComponent } from '../../flashcards/creator-dialog/flashcards-creator-dialog.component';
import { RemoveObjectDialogComponent } from '../../../../shared/dialog/remove-object/remove-object-dialog.component';
import { SnackbarService } from '../../../../shared/snackbar-service/snackbar.service';
import { FlashcardsEditDialogComponent } from '../../flashcards/editor-dialog/flashcards-edit-dialog.component';
import { FlashcardProgress } from '../../../../shared/models/flashcard-progress';

export interface EditFlashcardDialogData {
  lesson: Lesson,
  flashcard: Flashcard
}

@Component({
  selector: 'app-lesson-details-viewer',
  imports: [CommonModule, MatProgressSpinner, MatIcon, MatTooltipModule],
  templateUrl: './lesson-details-viewer.component.html',
  styleUrl: './lesson-details-viewer.component.css',
})

export class LessonDetailsViewerComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  lesson!: Lesson;
  flashcards: Flashcard[] = [];
  flashcardsProgress!: FlashcardProgress[];
  isLoading = true;
  lessonId!: number;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private flashcardService: FlashcardService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      this.lessonId = Number(params.get('id'));
      this.getLesson(this.lessonId);
    });

  }
  
  getLesson(id: number): void {
    this.lessonService.getLessonById(id).subscribe({
      next: lesson => {
        this.lesson = lesson;

        this.flashcardService.getFlashcardProgressForLesson(lesson.id).subscribe({
          next: (flashcardProgress) => {
            console.log(flashcardProgress);
          },
          error: err => {
            console.error(err);
          }
      })

        this.flashcardService.getFlashcardDTOsByLessonId(lesson.id).subscribe({
          next: flashcardDTOs => {
            this.lesson.flashcards = flashcardDTOs.map(dto => ({
              ...dto,
              description: '',
              frontSide: dto.front,
              backSide: dto.back,
              lessonId: 0,
              enabledSRS: dto.enabledSRS,
            }))
            this.isLoading = false;
          },
          error: err => {
            console.error('Failed to load flashcards', err);
          }
        });
      },
      error: err => {
        console.error('Failed to load lesson', err);
      }
    });
  }

  openFlashcardsCreatorDialog() {
    const dialogRef = this.dialog.open(FlashcardsCreatorDialogComponent, {
      data: {lesson: this.lesson},
    });

    dialogRef.afterClosed().subscribe((flashcards) => {
      this.flashcardService.addFlashcardsToLesson(flashcards, this.lesson);
      this.getLesson(this.lesson.id);
    })
  }

  removeFlashcard(flashcard: Flashcard) {
    const data = {
      message: `Are you sure you want to delete flashcard "${flashcard.front}"?`,
      objectName: flashcard.front,
      objectType: 'flashcard',
    };
  
    const dialogRef = this.dialog.open(RemoveObjectDialogComponent, { data });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.flashcardService.removeFlashcard(this.lesson, flashcard).subscribe({
          next: () => {
            this.snackbarService.openSnackBar(`Flashcard removed`, 'Ok');
            this.getLesson(this.lesson.id);
          },
          error: err => console.error('Failed to delete flashcard', err)
        });
      }
    });
  }

  modifyFlashcard(flashcard: Flashcard) {
    const data: EditFlashcardDialogData = {
      lesson: this.lesson,
      flashcard: flashcard,
    };
  
    const dialogRef = this.dialog.open(FlashcardsEditDialogComponent, { data });
  
    dialogRef.afterClosed().subscribe((result) => {
      const fl: Partial<Flashcard> = {
        front: result.description,
        back: result.definition
      }

      this.flashcardService.patchFlashcard(flashcard.id, fl).subscribe({
        next: () => {
          this.snackbarService.openSnackBar(`Flashcard saved`, 'Ok');
          this.getLesson(this.lesson.id);
        },
        error: err => console.error('Failed to modify flashcard', err)
      })
    });
  }

  toggleSRS(flashcard: Flashcard) {
    if(flashcard.enabledSRS) {
      this.removeFlashcardProficiency(flashcard);
    } else {
      this.createFlashcardProficiency(flashcard);
    }
  }

  createFlashcardProficiency(flashcard: Flashcard) {
      this.isLoading = true;

      this.flashcardService.addFlashcardProficiencyToFlashcard(flashcard).subscribe({
        next: () => {
          this.getLesson(this.lessonId);
          this.isLoading = false;
          this.snackbarService.openSnackBar("Flashcard added to Spaced Repetition System!", "OK");
        },
        error: err => console.error('Failed add flashcard proficiency', err)
      })
  }

  removeFlashcardProficiency(flashcard: Flashcard) {
    const data = {
      message: `Are you sure you want to disable SRS for flashcard "${flashcard.front}"? /n It will remove all history!`,
      objectName: flashcard.front,
      objectType: 'flashcard',
    };
  
    const dialogRef = this.dialog.open(RemoveObjectDialogComponent, { data });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.isLoading = true;
        this.flashcardService.removeFlashcardProficiency(flashcard).subscribe({
          next: () => {
            this.snackbarService.openSnackBar(`Removed SRS history`, 'Ok');
            this.getLesson(this.lesson.id);
            this.isLoading = false;
          },
          error: err => console.error('Failed to delete flashcard proficiency', err)
        });
      }
    });
  }
} 

