import { Injectable } from '@angular/core';
import { StatisticsDTO } from '@vocabulary-learner/shared/dtos/statisticsDTO';
import { StatisticsGatewayService } from '@vocabulary-learner/shared/gateways/statistics-gateway.service';
import { map, Observable } from 'rxjs';

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
}
