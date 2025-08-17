import { Injectable } from '@angular/core';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { Flashcard } from '../../../../core/models/flashcard';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  private practiceModeConfig!: PracticeModeConfig;

  constructor(
    private flashcardService: FlashcardService
  ) {
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
}
