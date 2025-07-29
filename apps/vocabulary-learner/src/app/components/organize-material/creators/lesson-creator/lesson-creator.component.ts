import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '../../../../models/folder/folder';
import { FolderService } from '../../../../models/folder/folder.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LessonService } from 'apps/vocabulary-learner/src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-creator',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './lesson-creator.component.html',
  styleUrl: './lesson-creator.component.css',
})
export class LessonCreatorComponent implements OnInit {
  folder: Folder | undefined;
  folderList: Folder[] = [];
  selectedValue = "";
  selectedFolder!: Folder;
  isFlashcardsExpanded = false;
  lessonName = '';

  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute,
    private lessonService: LessonService,
  ) {
  }

  ngOnInit() {
    this.retrieveIdFromURL();
    this.setSelectedFolder();
  }

  // if folder is passed via routerLink, set it as selectedFolder to load existing lessons
  setSelectedFolder() {
    if(this.folder) this.selectedFolder = this.folder;
  }

  selectedFolderChange() {
    const folderFound = this.folderList?.find((element) => element.name === this.selectedValue)

    if(folderFound) this.selectedFolder = folderFound;
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.folder = this.folderService.getFolderById(id)

      if(!this.folder) {
        this.folderList = this.folderService.loadAllFolders();
      }
    });
  }

  toggleFlashcards() {
    this.isFlashcardsExpanded = !this.isFlashcardsExpanded;
  }

  addLesson() {
    if (this.lessonName.trim()) {
      const lesson = this.lessonService.createLesson(this.selectedFolder?.id, this.lessonName, []);
      this.lessonService.saveLesson(lesson);
      this.selectedFolder.lessonList.push(lesson);
      this.folderService.saveFolder(this.selectedFolder);
      this.lessonName = '';
    } else {
      console.warn('Lesson name cannot be empty.');
    }
  }
}
