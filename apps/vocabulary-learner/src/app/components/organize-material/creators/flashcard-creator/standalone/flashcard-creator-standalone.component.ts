import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Lesson } from '../../../../../../../src/app/models/lessons';
import { Folder } from '../../../../../../../src/app/models/folder/folder';
import { FolderService } from '../../../../../../../src/app/models/folder/folder.service';
import { Flashcard } from '../../../../../../../src/app/models/flashcard';
import { FlashcardService } from '../../../../../../../src/app/services/flashcard.service';

@Component({
  selector: 'app-flashcard-creator-standalone',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './flashcard-creator-standalone.component.html',
  styleUrl: './flashcard-creator-standalone.component.css',
})
export class FlashcardCreatorStandaloneComponent implements OnInit{
  folderList: Folder[] | undefined;
  lessonList: Lesson[] | undefined;
  selectedLesson!: string;
  selectedFolder!: string;
  flashcardList!: Flashcard[] | undefined;

  constructor(
    private folderService: FolderService,
    private flashcardService: FlashcardService
  ) {
    
  }

  ngOnInit() {
    this.folderList = this.folderService.loadAllFolders();
  }

  selectedFolderChange() {
    this.resetInputs();

    const folderFound = this.folderList?.find((element) => element.folderName === this.selectedFolder);
 
    if(folderFound) {
      this.lessonList = folderFound.lessonList;
    };
  }

  resetInputs() {
    this.lessonList = undefined;
    this.flashcardList = undefined;
  }

  selectedLessonChange() {
    const lessonFound = this.lessonList?.find((element) => element.name === this.selectedLesson)

    if(lessonFound) this.flashcardList = this.flashcardService.getFlashcards(lessonFound.id);    
  }
}
