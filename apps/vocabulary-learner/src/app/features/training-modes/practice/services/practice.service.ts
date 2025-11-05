import { Injectable } from '@angular/core';
import { PracticeModeConfig } from '../models/practice-mode-config';
import { FlashcardService } from '../../../../shared/flashcard-service/flashcard.service';
import { Flashcard } from '../../../../core/models/flashcard';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExerciseType } from '../../../../core/models/exercise';

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
  }

  createLearningSessionConfig(type: string, flashcards: Flashcard[], exercises: ExerciseType[]): PracticeModeConfig {
    const config: PracticeModeConfig = {
      learningSessionType: type,
      flashcards: flashcards,
      exerciseList: exercises,
    }
    
    return config;
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

  setFolderId(id: number) {
    this.folderIdSubject.next(id);
  }

  get currentFolderId(): number | null {
    return this.folderIdSubject.value;
  }
}
