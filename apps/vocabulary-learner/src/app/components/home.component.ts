import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Flashcard } from '../models/flashcard';
import { FlashcardService } from '../services/flashcard.service';
import { Folder } from '../models/folder/folder';
import { FolderService } from '../models/folder/folder.service';
import { LessonService } from '../services/lesson.service';
import { DateUtilsService } from '../services/date-utils.service';

interface FolderWithFlashcards {
  folder: Folder,
  flashcardList: Flashcard[],
  newMaterial: Flashcard[];
  repetitionMaterial: Flashcard[],
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  examEnabled = false;
  practiceEnabled = true;
  repetitionFlashcardList: Flashcard[] | undefined;
  newFlashcardList: Flashcard[] | undefined;
  folderList: FolderWithFlashcards[] | undefined;

  constructor(
    private flashcardService: FlashcardService,
    private folderService: FolderService,
    private lessonService: LessonService,
    private dateUtils: DateUtilsService
  ) {

  }

  ngOnInit() {
    this.getRepetitionMaterial();
    this.getNewFlashcardList();
    this.getFolderList();
  }

  getFolderList() {
    let mergedArray;
    const folderListWithFlashcards: FolderWithFlashcards[] = [];

    if(this.repetitionFlashcardList && this.newFlashcardList) {
      mergedArray = [ ...this.repetitionFlashcardList, ...this.newFlashcardList ]
    };

    mergedArray?.forEach((element) => {
      const folderFound = this.getFolderByFlashcard(element);
 
      const folderWithFlashcard = folderListWithFlashcards.find((item) => item.folder.id === folderFound.id);
    
      if (folderWithFlashcard) {
        folderWithFlashcard.flashcardList.push(element);
      } else {
        const newList = [];
        const repetitionList = [];

        const isNewMaterial = this.flashcardService.isFlashcardNew(element);

        if(isNewMaterial) {
          newList.push(element) 
        } else {
          repetitionList.push(element);
        }

        folderListWithFlashcards.push({
          folder: folderFound,
          flashcardList: [element],
          newMaterial: [],
          repetitionMaterial: []
        });
      }
    });

    this.folderList = folderListWithFlashcards;
  }

  getFolderByFlashcard(flashcard: Flashcard): Folder {
    const lesson = this.lessonService.getLessonById(flashcard.lessonId);
    return this.folderService.getFolderById(lesson!.folderId);
  }

  getRepetitionMaterial() {
    this.repetitionFlashcardList = this.flashcardService.getRepetitionMaterial();
  }

  getNewFlashcardList() {
    this.newFlashcardList = this.flashcardService.getNewFlashcards();
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
