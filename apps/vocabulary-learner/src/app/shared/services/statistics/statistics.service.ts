import { Injectable } from '@angular/core';
import { StatisticsDTO } from '../../dtos/statisticsDTO';
import { StatisticsGatewayService } from '../../gateways/statistics-gateway.service';
import { map, Observable } from 'rxjs';
import { StudySessionLogDTO } from '../../dtos/studySessionLogDTO';
import { Flashcard } from '../../../core/models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(
    private statisticsGateway: StatisticsGatewayService
  ) {

  }

  getTotalFlashcards(): Observable<StatisticsDTO> {
    return this.statisticsGateway.getTotalFlashcards().pipe(map(s => s.data));
  }

  getCurrentDaySummary(): Observable<StudySessionLogDTO> {
    return this.statisticsGateway.getCurrentDaySummary().pipe(map(s => s.data));
  }

  patchFlashcardPracticedCount(flashcard: Flashcard): void {
    this.statisticsGateway
      .patchFlashcardPracticedCount(flashcard)
      .subscribe();
  } 
}
