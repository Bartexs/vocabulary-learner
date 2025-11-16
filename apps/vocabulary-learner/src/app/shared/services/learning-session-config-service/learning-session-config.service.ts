import { Injectable } from "@angular/core";
import { Lesson } from "@vocabulary-learner/core/models/lessons";
import { LearningSessionConfig } from "@vocabulary-learner/features/training-modes/practice/models/learning-session-config";
import { FlashcardService } from "@vocabulary-learner/shared/flashcard-service/flashcard.service";
import { BehaviorSubject, filter, Observable, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LearningSessionConfigService {
  private configSubject = new BehaviorSubject<LearningSessionConfig | null>(null);
  readonly config$ = this.configSubject.asObservable();

  constructor(private flashcardService: FlashcardService) {}

  // aktualizacja części configu
  updateConfig(partial: Partial<LearningSessionConfig>) {
    const updated = { ...this.configSubject.value, ...partial };
    this.configSubject.next(updated as LearningSessionConfig);
  }

  // predicate typu
  private isConfigComplete = (cfg: LearningSessionConfig | null | undefined): cfg is LearningSessionConfig =>
    !!cfg &&
    !!cfg.learningSessionType &&
    !!cfg.flashcards &&
    !!cfg.exerciseList;

  // zwraca pierwszy kompletny config
  getCompleteConfig(): Observable<LearningSessionConfig> {
    return this.config$.pipe(
      filter(this.isConfigComplete),
      take(1)
    );
  }

  // przykład ładowania flashcards
  loadFlashcards(lessons: Lesson[]) {
    this.flashcardService.getFlashcardsByLessonsIds(lessons).subscribe({
      next: flashcards => this.updateConfig({ flashcards }),
      error: err => console.error(err)
    });
  }
}
