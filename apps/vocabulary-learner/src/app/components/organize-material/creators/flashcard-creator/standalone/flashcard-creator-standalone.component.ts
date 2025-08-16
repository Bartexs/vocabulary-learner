import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Lesson } from '../../../../../core/models/lessons';
import { Flashcard } from '../../../../../core/models/flashcard';
import { FlashcardCreatorComponent } from '../mini/flashcard-creator.component';
import { FolderService } from '../../../../../shared/folder-service/folder.service';
import { Folder } from '../../../../../core/models/folder';
import { LessonService } from '../../../../../shared/lesson-service/lesson.service';
import { FlashcardService } from '../../../../../shared/flashcard-service/flashcard.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-flashcard-creator-standalone',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, FlashcardCreatorComponent, MatProgressSpinner],
  templateUrl: './flashcard-creator-standalone.component.html',
  styleUrl: './flashcard-creator-standalone.component.css',
})
export class FlashcardCreatorStandaloneComponent implements OnInit{
  folderList: Folder[] | undefined;
  lessonList: Lesson[] | undefined;
  userLessonSelection!: string;
  selectedLesson!: Lesson;
  selectedFolder!: string;
  flashcardList!: Flashcard[] | undefined;
  folderName = '';
  lessonName = '';
  isLoading = true;
  isFlashcardListLoading = true;

  constructor(
    private folderService: FolderService,
    private flashcardService: FlashcardService,
    private lessonService: LessonService
  ) {
    
  }
  
  ngOnInit() {
    this.setFolders();
  }

  setFolders() {
    this.folderService.getFolders().subscribe({
      next: (f) => {
        this.folderList = f;
        this.isLoading = false;
      },
      error: (err) => console.error(err),
    });
  }

  saveFlashcards(flashcardList: Flashcard[]) {
    this.flashcardService.addFlashcardsToLesson(flashcardList, this.selectedLesson);
    this.selectedLessonChange();
  }

  createFolder() {
    this.folderList = undefined;
    this.isLoading = true;

    const folderToSave: Folder = {
      id: 0,
      name: this.folderName,
      lessonList: []
    }

    this.folderService.addFolder(folderToSave).subscribe({
      next: (f) => {
        this.lessonService.addLesson({id: 0, folderId: f.id, name: this.lessonName, flashcards: []}, f.id);
        this.folderService.getFolders().subscribe({
          next: (f) => {
            this.folderList = f;
            this.isLoading = false;
          },
          error: (err) => console.error(err),
        })
      },
      error: (err) => console.error(err),
    });
  }

  selectedFolderChange() {
    this.resetInputs();

    const folderFound = this.folderList?.find((element) => element.name === this.selectedFolder);
 
    if(folderFound) {
        this.lessonService.getLessonsByFolderId(folderFound.id).subscribe({
        next: (l) => this.lessonList = l,
        error: (err) => console.error(err),
      });
    };
  }

  resetInputs() {
    this.lessonList = undefined;
    this.flashcardList = undefined;
  }

  selectedLessonChange() {
    const lessonFound = this.lessonList?.find((element) => element.name === this.userLessonSelection);

    if(lessonFound) {
      this.selectedLesson = lessonFound;
      this.flashcardService.getFlashcardsByLessonIdFlashcardDTO(lessonFound.id).subscribe({
        next: (flashcardList) => {
          this.flashcardList = this.flashcardService.fromDTOs(flashcardList, lessonFound.id);
          this.isFlashcardListLoading = false;
        },
        error: (err) => console.error(err),
      });   
    }
  }
}
