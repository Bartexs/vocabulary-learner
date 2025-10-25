import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { FoldersDialogComponent } from './folders-dialog.component';
import { forkJoin } from 'rxjs';
import { Flashcard } from '../../core/models/flashcard';
import { Folder } from '../../core/models/folder';
import { FlashcardService } from '../../shared/flashcard-service/flashcard.service';
import { FolderService } from '../../shared/folder-service/folder.service';

export interface FolderWithFlashcards {
  folder: Folder;
  flashcards: Flashcard[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  folders: Folder[] = [];
  flashcardsDueToday: FolderWithFlashcards[] = [];
  noFoldersExist = true;
  loading = true;
  readonly dialog = inject(MatDialog);

  constructor(
    private folderService: FolderService,
    private flashcardService: FlashcardService,
  ) {
    
  }

  ngOnInit(): void {
    this.getUserFolders();
  }

  getUserFolders() {
    this.loading = true;

    this.folderService.getFolders()
      .subscribe({
        next: (folders) => {
          this.folders = folders;
          this.noFoldersExist = folders.length === 0;

          if(folders.length === 0) {
            this.flashcardsDueToday = [];
            this.loading = false;
            return;
          }

          const flashcardObservables = folders.map(folder => 
            this.flashcardService.getFlashcardsDueTodayByFolderId(folder.id)
          );

        forkJoin(flashcardObservables).subscribe({
          next: (flashcardsArrays) => {
            this.flashcardsDueToday = folders.map((folder, i) => ({
              folder,
              flashcards: flashcardsArrays[i]
            }));
            this.flashcardsDueToday = this.flashcardsDueToday .filter(f => {
              return f.flashcards.length > 0;
            })

            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to load flashcards due today', err);
            this.flashcardsDueToday = [];
          }
        });
      },
      error: (err) => {
        console.error('Failed to load folders', err);
        this.flashcardsDueToday = [];
        this.noFoldersExist = true;
      }
    });
  }

  openFoldersSelectorDialog() {
    console.log(this.folders);
    this.dialog.open(FoldersDialogComponent, {
      data: {folders: this.folders},
    });
  }
}
