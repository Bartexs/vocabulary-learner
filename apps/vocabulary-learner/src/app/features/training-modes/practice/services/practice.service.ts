import { Injectable } from '@angular/core';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { Flashcard } from '../../../../core/models/flashcard';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private folderIdSubject = new BehaviorSubject<number | null>(null);
  folderId$: Observable<number | null> = this.folderIdSubject.asObservable();

  constructor(
    private flashcardService: FlashcardService
  ) {
  }

  getMaterialToPractice(): Observable<Flashcard[]> {
    return this.flashcardService.getAllFlashcards();
  }

  setFolderId(id: number) {
    this.folderIdSubject.next(id);
  }

  get currentFolderId(): number | null {
    return this.folderIdSubject.value;
  }
}
