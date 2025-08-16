import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '../../../../core/models/folder';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FolderService } from '@vocabulary-learner/shared/folder-service/folder.service';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';

@Component({
  selector: 'app-lesson-creator',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './lesson-creator.component.html',
  styleUrl: './lesson-creator.component.css',
})
export class LessonCreatorComponent implements OnInit {
  folder!: Folder;
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
      this.folderService.getFolderById(id).subscribe({
        next: (folder) => {
          this.folder = folder;
        },
        error: err => console.error(err)
      })
    });
  }

  loadAllFolders() {
    if(!this.folder) {
      this.folderService.getFolders().subscribe({
        next: (folders) => {this.folderList = folders},
        error: (err) => {console.error(err)}
      });
    }
  }

  toggleFlashcards() {
    this.isFlashcardsExpanded = !this.isFlashcardsExpanded;
  }

  addLesson() {
    if (this.lessonName.trim()) {
      const lesson = this.lessonService.mapToLesson(this.selectedFolder?.id, this.lessonName, []);

      this.lessonService.addLesson(lesson, this.folder.id).subscribe({
        next: (lesson) => console.log(lesson),
        error: (err) => console.error(err),
      });

      this.selectedFolder.lessonList.push(lesson);
      this.folderService.addFolder(this.selectedFolder);
      this.lessonName = '';
    } else {
      console.warn('Lesson name cannot be empty.');
    }
  }
}
