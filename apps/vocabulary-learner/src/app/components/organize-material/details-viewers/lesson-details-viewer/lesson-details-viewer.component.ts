import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../../../core/models/lessons';
import { LessonService } from '../../../../../../src/app/services/lesson.service';
import { Flashcard } from '../../../../core/models/flashcard';
import { FlashcardCreatorComponent } from '../../creators/flashcard-creator/mini/flashcard-creator.component';

@Component({
  selector: 'app-lesson-details-viewer',
  imports: [CommonModule, FlashcardCreatorComponent],
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
    flashcardList.map(flashcard => {
      this.lesson.flashcards.push(flashcard);
    });
    this.lessonService.updateLesson(this.lesson);
  }
} 

