import { Injectable } from '@angular/core';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { Flashcard } from '../../../../core/models/flashcard';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private practiceModeConfig!: PracticeModeConfig;
  private folderIdSubject = new BehaviorSubject<number | null>(null);
  folderId$: Observable<number | null> = this.folderIdSubject.asObservable();

  constructor(
    private flashcardService: FlashcardService
  ) {
    this.initializePracticeModeConfig();
  }

  getMaterialToPractice(): Observable<Flashcard[]> {
    return this.flashcardService.getAllFlashcards();
  }

  setPracticeModeConfig(newConfig: PracticeModeConfig) {
    this.practiceModeConfig = newConfig;
  }

  getPracticeModeConfig(): PracticeModeConfig {
    return this.practiceModeConfig
  }

  initializePracticeModeConfig(): PracticeModeConfig {
    return this.practiceModeConfig = {
      lessonList: [],
      exerciseList: [],
    };
  }

  setFolderId(id: number) {
    this.folderIdSubject.next(id);
  }

  get currentFolderId(): number | null {
    return this.folderIdSubject.value;
  }
}
