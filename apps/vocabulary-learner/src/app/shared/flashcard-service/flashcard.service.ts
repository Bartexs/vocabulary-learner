import { Injectable } from '@angular/core';
import { Flashcard } from '../../core/models/flashcard';
import { map, Observable } from 'rxjs';
import { FlashcardGatewayService } from './flashcard-gateway.service';
import { Lesson } from '../../core/models/lessons';
import { FlashcardDTO } from '../../core/models/flashcardDTO';
import { ApiResponse } from '../../core/models/apiResponse';
import { FlashcardProficiency } from '../../core/models/flashcard-proficiency';


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
        enabledSRS: flashcard.enabledSRS,
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
      front: dto.front,
      back: dto.back,
      enabledSRS: false,
    };
  }

  fromDTOs(dtos: FlashcardDTO[], lessonId: number): Flashcard[] {
    return dtos.map(dto => this.mapFlashcardDtoToFlashcard(dto, lessonId));
  }

  removeFlashcard(lesson: Lesson, flashcard: Flashcard): Observable<ApiResponse<void>> {
    return this.flashcardGateway.removeFlashcard(lesson, flashcard);
  }

  getFlashcardsWithProficiencyByLessonId(lessonId: number): Observable<Flashcard[]> {
    return this.flashcardGateway.getFlashcardsWithProficiencyByLessonId(lessonId);
  }

  getFlashcardsDueTodayByFolderId(folderId: number): Observable<Flashcard[]> {
    return this.flashcardGateway.getFlashcardsDueTodayByFolderId(folderId).pipe(map(res => res.data ?? []));
  }

  getFlashcardProficiencyByFlashcardId(flashcard: Flashcard): Observable<FlashcardProficiency> {
    return this.flashcardGateway.getFlashcardProficiencyByFlashcardId(flashcard).pipe(
      map(res => res.data)
    );
  }

  patchFlashcardProficiency(flashcardProf: FlashcardProficiency) {
    return this.flashcardGateway.patchFlashcardProficiency(flashcardProf).pipe(
      map(res => res.data)
    );
  }

  addFlashcardProficiencyToFlashcard(flashcard: Flashcard): Observable<FlashcardProficiency> {
    return this.flashcardGateway.addFlashcardProficiencyToFlashcard(flashcard).pipe(
      map(res => res.data)
    );
  }
}
