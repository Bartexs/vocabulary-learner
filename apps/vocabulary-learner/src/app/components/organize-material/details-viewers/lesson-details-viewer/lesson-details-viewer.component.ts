import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'apps/vocabulary-learner/src/app/models/lessons';
import { LessonService } from 'apps/vocabulary-learner/src/app/services/lesson.service';
import { FlashcardCreatorBundleComponent } from "../../../creating-flashcards/flashcard-creator-bundle/flashcard-creator-bundle.component";
import { Flashcard } from 'apps/vocabulary-learner/src/app/models/flashcard';

@Component({
  selector: 'app-lesson-details-viewer',
  imports: [CommonModule, FlashcardCreatorBundleComponent],
  templateUrl: './lesson-details-viewer.component.html',
  styleUrl: './lesson-details-viewer.component.css',
})
export class LessonDetailsViewerComponent implements OnInit {
  lesson!: Lesson;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
  ) {}

  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const lesson = this.lessonService.getLessonById(id);

      if(lesson) this.lesson = lesson;
    });
  }

  addFlashcardsToLesson(flashcardList: Flashcard[]) {
    this.lesson.flashcards = flashcardList;
    this.lessonService.updateLesson(this.lesson);
  }
} 

