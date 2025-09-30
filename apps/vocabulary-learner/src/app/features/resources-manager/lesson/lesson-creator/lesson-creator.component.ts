import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Folder } from '../../../../core/models/folder';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FolderService } from '@vocabulary-learner/shared/folder-service/folder.service';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';
import { SnackbarService } from '@vocabulary-learner/shared/snackbar-service/snackbar.service';
import { Lesson } from '@vocabulary-learner/core/models/lessons';
import { filter, map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-lesson-creator',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './lesson-creator.component.html',
  styleUrl: './lesson-creator.component.css',
})
export class LessonCreatorComponent implements OnInit {
  lessonFormControl = new FormControl('', [Validators.required]);
  folder!: Folder;
  isLoading = true;
  lessons: Lesson[] = [];

  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private snackbarService: SnackbarService,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getLessonsAndFolder();
  }

  getLessonsAndFolder() {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      filter(id => !isNaN(id)),
      switchMap(id => forkJoin({
        folder: this.folderService.getFolderById(id),
        lessons: this.lessonService.getLessonsByFolderId(id)
      }))
    ).subscribe({
      next: ({ folder, lessons }) => {
        this.folder = folder;
        this.lessons = lessons;
        this.isLoading = false;
      },
      error: err => console.error(err)
    });
  }

  handleAddLesson() {
    if(this.lessonFormControl.hasError('required') || this.lessonFormControl.value === null) return; 
    const lesson = this.lessonService.mapToLesson(this.folder.id, this.lessonFormControl.value, []);
    this.addLessonApi(lesson);
  }

  addLessonApi(lesson: Lesson) {
    this.lessonService.addLesson(lesson, this.folder.id).subscribe({
      next: (lesson) => {
        this.snackbarService.openSnackBar("Lesson " + lesson.data.name + " created. Add flashcards.", "Ok");
        // Implement navigate to flashcard creator in created lesson

      },
      error: (err) => {
        if(err.status === 409) {
          this.snackbarService.openSnackBar("Lesson " + lesson.name + " already exist. Change name and try again.", "Ok")
        } else {
          this.snackbarService.openSnackBar("Something went wrong, please try again.", "Ok")
          console.log('Failed to create folder', err);
        }
      },
    });
  }

  onCancel() {
    this.location.back();
  }
}
