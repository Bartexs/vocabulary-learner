import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';
import { Lesson } from '@vocabulary-learner/core/models/lessons';
import { FolderService } from '@vocabulary-learner/shared/folder-service/folder.service';
import { FlashcardService } from '@vocabulary-learner/shared/flashcard-service/flashcard.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Folder } from '@vocabulary-learner/core/models/folder/folder';

@Component({
  selector: 'app-folder-details-viewer',
  imports: [CommonModule, MatIconModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './folder-details-viewer.component.html',
  styleUrl: './folder-details-viewer.component.css',
})
export class FolderDetailsViewerComponent implements OnInit {
  folder!: Folder;
  lessons: Lesson[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private folderService: FolderService,
    private lessonService: LessonService,
    private flashcardService: FlashcardService,
  ) {
    
  }
  
  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.getFolder(id)
      this.getLessons(id)
    });
  }

  private getFolder(id: number) {
    this.folderService.getFolderById(id).subscribe({
      next: folder => {
        this.folder = folder
        this.checkIfLoaded()
      },
      error: err => console.error('Failed to load folder', err),
    });
  }

  private getLessons(id: number) {
    this.lessonService.getLessonsByFolderId(id).subscribe({
        next: lessonDTOs => {
          this.lessons = lessonDTOs.map(dto => ({
            ...dto,
            folderId: 0,
            flashcards: []
          }));
          this.getFlashcards(this.lessons);
          this.checkIfLoaded();
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

  private checkIfLoaded() {
    if (this.folder && this.lessons) {
      this.isLoading = false;
    }
  }
}
