import { Injectable } from '@angular/core';
import { Flashcard } from '../../core/models/flashcard';
import { Observable } from 'rxjs';
import { FlashcardGatewayService } from './flashcard-gateway.service';
import { Lesson } from '../../core/models/lessons';
import { FlashcardDTO } from '../../core/models/flashcardDTO';
import { ApiResponse } from '../../core/models/apiResponse';


@Injectable({
  providedIn: 'root'
})

export class FlashcardService {
    constructor(
    private flashcardGateway: FlashcardGatewayService,
  ) { }

  patchFlashcard(flashcardId: number, newFlashcardValues: Partial<Flashcard>): Observable<ApiResponse<Flashcard>> {
    return this.flashcardGateway.patchFlashcard(flashcardId, newFlashcardValues);
  }

  getAllFlashcards(): Observable<Flashcard[]> {
    return this.flashcardGateway.getAllFlashcards();
  }

  getFlashcardsByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.flashcardGateway.getFlashcardsByLessonId(lessonId);
  }

  // fix flashcard objects to more unified and remove it
  getFlashcardsByLessonIdFlashcardDTO(lessonId: number): Observable<FlashcardDTO[]> {
    return this.flashcardGateway.getFlashcardsByLessonIdDTO(lessonId);
  }

  getFlashcardsByLessonsIds(lessons: Lesson[]): Observable<Flashcard[]> {
    return this.flashcardGateway.getFlashcardsByLessonsIds(lessons);
  }

  getFlashcardDTOsByLessonId(lessonId: number): Observable<FlashcardDTO[]> {
    return this.flashcardGateway.getFlashcardDTOsByLessonId(lessonId);
  }
  
  private addFlashcards(lessonId: number, flashcards: Flashcard[]): Observable<Lesson> {

    const flashcardsDTO: FlashcardDTO[] = [];

    flashcards.forEach(flashcard => {
      const f: FlashcardDTO = {
        id: 0,
        front: flashcard.front,
        back: flashcard.back,
        flashcardProficiencyId: flashcard.flashcardProficiencyId,
      }

      flashcardsDTO.push(f);
    })

    return this.flashcardGateway.addFlashcards(lessonId, flashcardsDTO);
  }

  addFlashcardsToLesson(flashcardList: Flashcard[], lesson: Lesson) {
    flashcardList.map(flashcard => {
      lesson.flashcards.push(flashcard);
    });
    this.addFlashcards(lesson.id, flashcardList).subscribe({
      next: (lesson) => console.log(lesson),
      error: (err) => console.error(err),
    });
  }

  private mapFlashcardDtoToFlashcard(dto: FlashcardDTO, lessonId: number): Flashcard {
    return {
      id: dto.id,
      description: '',
      lessonId: lessonId,
      front: dto.front,
      back: dto.back,
      flashcardProficiencyId: dto.flashcardProficiencyId,
    };
  }

  fromDTOs(dtos: FlashcardDTO[], lessonId: number): Flashcard[] {
    return dtos.map(dto => this.mapFlashcardDtoToFlashcard(dto, lessonId));
  }

  removeFlashcard(lesson: Lesson, flashcard: Flashcard): Observable<ApiResponse<void>> {
    return this.flashcardGateway.removeFlashcard(lesson, flashcard);
  }
}
