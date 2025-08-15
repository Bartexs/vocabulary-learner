import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Flashcard } from '../../../../core/models/flashcard';
import { Lesson } from '../../../../core/models/lessons';
import { FlashcardCreatorComponent } from '../../creators/flashcard-creator/mini/flashcard-creator.component';
import { LessonService } from '@vocabulary-learner/shared/lesson-service/lesson.service';
import { FlashcardService } from '@vocabulary-learner/shared/flashcard-service/flashcard.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { FlashcardProficiency } from '@vocabulary-learner/core/models/flashcard-proficiency';

@Component({
  selector: 'app-lesson-details-viewer',
  imports: [CommonModule, FlashcardCreatorComponent, MatProgressSpinner],
  templateUrl: './lesson-details-viewer.component.html',
  styleUrl: './lesson-details-viewer.component.css',
})
export class LessonDetailsViewerComponent implements OnInit {
  lesson!: Lesson;
  flashcards: Flashcard[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private flashcardService: FlashcardService,
  ) {}

  ngOnInit(): void {
    this.retrieveIdFromURL();
  }

  retrieveIdFromURL() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.getLesson(id);
    });

  }
  
  getLesson(id: number): void {
    this.lessonService.getLessonById(id).subscribe({
      next: lesson => {
        this.lesson = lesson;

        const flashcardProficiency: FlashcardProficiency = {
          flashcardMastered: false,
          masteryLevel: 0
        }

        this.flashcardService.getFlashcardDTOsByLessonId(lesson.id).subscribe({
          next: flashcardDTOs => {
            this.lesson.flashcards = flashcardDTOs.map(dto => ({
              ...dto,
              frontSide: dto.front,
              backSide: dto.back,
              lessonId: 0,
              flashcardProficiency: flashcardProficiency
            }))
            this.isLoading = false;
          },
          error: err => {
            console.error('Failed to load flashcards', err);
          }
        });
      },
      error: err => {
        console.error('Failed to load lesson', err);
      }
    });
  }

  addFlashcardsToLesson(flashcardList: Flashcard[]) {
    flashcardList.map(flashcard => {
      this.lesson.flashcards.push(flashcard);
    });
    this.flashcardService.addFlashcards(this.lesson.id, flashcardList).subscribe({
      next: (lesson) => console.log(lesson),
      error: (err) => console.error(err),
    });
  }
} 

